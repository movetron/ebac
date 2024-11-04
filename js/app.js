(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const form_form = () => {
        const DataPhoto = new DataTransfer;
        const maxFiles = 5;
        const ErrorMessage = document.querySelector(".block-files__error-message"), filesList = document.querySelector(".block-files__list"), form = document.querySelector("form");
        function addDragAndDropListeners(fileItem, index) {
            fileItem.setAttribute("draggable", "true");
            fileItem.addEventListener("dragstart", (e => {
                e.dataTransfer.setData("text/plain", index);
                e.target.classList.add("dragging");
            }));
            fileItem.addEventListener("dragover", (e => e.preventDefault()));
            fileItem.addEventListener("drop", (e => {
                e.preventDefault();
                const draggedIndex = e.dataTransfer.getData("text/plain");
                swapElements(draggedIndex, index);
            }));
            fileItem.addEventListener("dragend", (() => {
                document.querySelectorAll(".dragging").forEach((el => el.classList.remove("dragging")));
            }));
        }
        function swapElements(fromIndex, toIndex) {
            const fileList = document.querySelector(".block-files__list");
            const items = Array.from(fileList.children);
            const itemToMove = items[fromIndex];
            if (fromIndex !== toIndex) fileList.insertBefore(itemToMove, items[toIndex > fromIndex ? toIndex + 1 : toIndex]);
        }
        let dropArea = document.getElementById("drop-area");
        [ "dragenter", "dragover", "dragleave", "drop" ].forEach((eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        }));
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        dropArea.addEventListener("drop", handleDrop, false);
        function handleDrop(e) {
            e.preventDefault();
            let files = e.dataTransfer.files;
            const tempData = new DataTransfer;
            Array.from(DataPhoto.files).forEach((file => tempData.items.add(file)));
            Array.from(files).forEach((file => {
                if (!Array.from(DataPhoto.files).some((existingFile => existingFile.name === file.name))) tempData.items.add(file);
            }));
            DataPhoto.items.clear();
            Array.from(tempData.files).forEach((file => DataPhoto.items.add(file)));
            document.querySelector('input[type="file"]').files = DataPhoto.files;
            handleFiles(files);
        }
        [ "dragenter", "dragover" ].forEach((eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        }));
        [ "dragleave", "drop" ].forEach((eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        }));
        function highlight() {
            dropArea.classList.add("highlight");
        }
        function unhighlight() {
            dropArea.classList.remove("highlight");
        }
        function displayFile(file, result) {
            const existingItems = document.querySelectorAll(".block-files__item");
            const fileNames = Array.from(existingItems).map((item => item.querySelector(".block-files__list-name").textContent));
            if (!fileNames.includes(`Название: ${file.name}`)) {
                const newFileInput = document.createElement("div");
                newFileInput.className = "block-files__item";
                newFileInput.draggable = true;
                const img = document.createElement("img");
                img.className = "block-files__list-img";
                img.src = result;
                const fileName = document.createElement("span");
                fileName.className = "block-files__list-name";
                fileName.textContent = `Название: ${file.name}`;
                const fileType = document.createElement("span");
                fileType.className = "block-files__list-type";
                fileType.textContent = `Формат: ${file.type}`;
                const fileSize = document.createElement("span");
                fileSize.className = "block-files__list-size";
                fileSize.textContent = `Размер: ${(file.size / (1024 * 1024)).toFixed(2)} МБ`;
                const removeLink = document.createElement("a");
                removeLink.href = "#";
                removeLink.className = "block-files__list-remove";
                removeLink.onclick = function(e) {
                    e.preventDefault();
                    removeFilesItem(removeLink, file.name);
                };
                newFileInput.appendChild(img);
                newFileInput.appendChild(fileName);
                newFileInput.appendChild(fileType);
                newFileInput.appendChild(fileSize);
                newFileInput.appendChild(removeLink);
                filesList.appendChild(newFileInput);
                addDragAndDropListeners(newFileInput, filesList.children.length - 1);
            }
        }
        function handleFiles(files) {
            const newFiles = Array.from(files);
            newFiles.forEach((file => {
                const reader = new FileReader;
                reader.readAsDataURL(file);
                reader.onloadend = function() {
                    displayFile(file, reader.result);
                };
            }));
        }
        document.querySelector(".block-files__form input[type=file]").addEventListener("change", (function() {
            ErrorMessage.innerHTML = "";
            ErrorMessage.style.display = "none";
            const newFiles = Array.from(this.files);
            const existingFiles = Array.from(DataPhoto.files).map((file => file.name));
            let validFilesCount = DataPhoto.files.length;
            newFiles.forEach((file => {
                if (validFilesCount >= maxFiles) {
                    ErrorMessage.textContent = "Превышено допустимое количество файлов: 5";
                    ErrorMessage.style.display = "block";
                    return;
                }
                if (existingFiles.includes(file.name)) {
                    ErrorMessage.textContent = `Файл ${file.name} уже добавлен`;
                    ErrorMessage.style.display = "block";
                    return;
                }
                const validFormats = [ "image/jpeg", "image/png", "image/jpg" ];
                if (!validFormats.includes(file.type)) {
                    ErrorMessage.textContent = `Неверный формат файла: ${file.type}`;
                    ErrorMessage.style.display = "block";
                    return;
                }
                if (file.size > 10 * 1024 * 1024) {
                    ErrorMessage.textContent = `Превышен максимальный размер файла: ${file.name}`;
                    ErrorMessage.style.display = "block";
                    return;
                }
                DataPhoto.items.add(file);
                validFilesCount++;
                existingFiles.push(file.name);
                updateFileInput();
            }));
            handleFiles(newFiles);
            form.addEventListener("submit", (e => {
                e.preventDefault();
                DataPhoto.items.clear();
                filesList.innerHTML = "";
                updateFileInput();
            }));
        }));
        function updateFileInput() {
            const updatedDataTransfer = new DataTransfer;
            Array.from(DataPhoto.files).forEach((file => updatedDataTransfer.items.add(file)));
            document.querySelector(".block-files__form input[type=file]").files = updatedDataTransfer.files;
        }
        function removeFilesItem(target, fileName) {
            target.closest(".block-files__item").remove();
            for (let i = 0; i < DataPhoto.items.length; i++) if (fileName === DataPhoto.items[i].getAsFile().name) {
                DataPhoto.items.remove(i);
                break;
            }
            updateFileInput();
        }
    };
    const files_form = form_form;
    const formSubmit_formSubmit = () => {
        const form = document.querySelector("form"), input = document.querySelector("#block-files__input"), filesList = document.querySelector(".block-files__list");
        const message = {
            loading: "Загрузка",
            success: "Спасибо! Скоро мы с вами свяжемся",
            failure: "Что-то пошло не так...",
            ok: "img/ok.png",
            fail: "img/fail.png"
        };
        const clearInputs = () => {
            input.value = "";
            filesList.innerHTML = "";
        };
        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: data
            });
            return await res.json();
        };
        let globalFileIndex = 1;
        form.addEventListener("submit", (e => {
            e.preventDefault();
            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            filesList.parentNode.appendChild(statusMessage);
            let statusSpinner = document.createElement("div");
            statusSpinner.classList.add("spinner");
            statusMessage.appendChild(statusSpinner);
            let statusImg = document.createElement("img");
            statusImg.classList.add("animated", "fadeInUp");
            statusMessage.appendChild(statusImg);
            let textMessage = document.createElement("div");
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);
            const formData = new FormData(form);
            const filesInfo = {};
            for (let [key, value] of formData.entries()) if (value instanceof File) {
                filesInfo[`file${globalFileIndex}`] = {
                    name: value.name,
                    size: value.size,
                    type: value.type
                };
                globalFileIndex++;
            } else filesInfo[key] = value;
            const json = JSON.stringify(filesInfo);
            postData("https://jsonplaceholder.typicode.com/posts", json).then((data => {
                console.log(data);
            })).catch((() => {
                statusImg.setAttribute("src", message.fail);
                textMessage.textContent = message.failure;
            })).finally((() => {
                clearInputs();
                setTimeout((() => {
                    statusSpinner.classList.remove("spinner");
                    statusImg.setAttribute("src", message.ok);
                    textMessage.textContent = message.success;
                    clearInputs();
                    setTimeout((() => {
                        statusMessage.remove();
                    }), 2e3);
                }), 3e3);
            }));
            filesList.innerHTML = "";
        }));
    };
    const files_formSubmit = formSubmit_formSubmit;
    window.addEventListener("DOMContentLoaded", (() => {
        "use strict";
        files_form();
        files_formSubmit();
    }));
    window["FLS"] = true;
    isWebp();
})();