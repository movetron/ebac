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
    document.fonts.load('1em "ArchivoBlack"').then((function() {
        const runningLineContainers = document.querySelectorAll(".runline-text");
        runningLineContainers.forEach((container => {
            const clonedContainer = container.cloneNode(true);
            const parentSection = container.parentElement;
            parentSection.appendChild(clonedContainer);
        }));
        document.querySelectorAll(".runline-text").forEach((container => {
            container.classList.add("runline-animated");
        }));
    }));
    function moveDiv() {
        const moveableElement = document.querySelector(".webinars-main__button");
        const originalContainer = document.getElementById("btn");
        const targetContainer = document.getElementById("btn-to");
        if (window.innerWidth < 768) {
            if (moveableElement && moveableElement.parentNode !== targetContainer) targetContainer.appendChild(moveableElement);
        } else if (moveableElement && moveableElement.parentNode !== originalContainer) originalContainer.appendChild(moveableElement);
    }
    window.addEventListener("load", moveDiv);
    window.addEventListener("resize", moveDiv);
    window["FLS"] = true;
    isWebp();
})();