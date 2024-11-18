document.fonts.load('1em "ArchivoBlack"').then(() => {
    const runningLineContainers = document.querySelectorAll<HTMLElement>('.runline-text');
    
    runningLineContainers.forEach((container) => {
      const clonedContainer = container.cloneNode(true) as HTMLElement;
      const parentSection = container.parentElement;
      parentSection?.appendChild(clonedContainer);
    });
  
    document.querySelectorAll<HTMLElement>('.runline-text').forEach(container => {
      container.classList.add('runline-animated');
    });
  });

  function moveDiv() {
    const moveableElement = document.querySelector('.webinars-main__button') as HTMLDivElement;
    const originalContainer = document.getElementById('btn') as HTMLDivElement;
    const targetContainer = document.getElementById('btn-to') as HTMLDivElement;
  
    if (window.innerWidth < 768) {
      if (moveableElement && moveableElement.parentNode !== targetContainer) {
        targetContainer?.appendChild(moveableElement);
      }
    } else if (moveableElement && moveableElement.parentNode !== originalContainer) {
      originalContainer?.appendChild(moveableElement);
    }
  
    const moveableElementFooter = document.querySelector('.footer__inons') as HTMLDivElement;
    const originalContainerFooter = document.getElementById('icons') as HTMLDivElement;
    const targetContainerFooter = document.getElementById('icons-to') as HTMLDivElement;
  
    if (window.innerWidth < 1279) {
      if (moveableElementFooter && moveableElementFooter.parentNode !== targetContainerFooter) {
        targetContainerFooter?.appendChild(moveableElementFooter);
      }
    } else if (moveableElementFooter && moveableElementFooter.parentNode !== originalContainerFooter) {
      originalContainerFooter?.appendChild(moveableElementFooter);
    }
  
    const moveableFormFooter = document.querySelector('.footer__form') as HTMLDivElement;
    const originalContainerFormFooter = document.getElementById('form') as HTMLDivElement;
    const targetContainerFormFooter = document.getElementById('form-to') as HTMLDivElement;
  
    if (window.innerWidth < 768) {
      if (moveableFormFooter && moveableFormFooter.parentNode !== targetContainerFormFooter) {
        targetContainerFormFooter?.appendChild(moveableFormFooter);
      }
    } else if (moveableFormFooter && moveableFormFooter.parentNode !== originalContainerFormFooter) {
      originalContainerFormFooter?.appendChild(moveableFormFooter);
    }
  }
  
  window.addEventListener('load', moveDiv);
  window.addEventListener('resize', moveDiv);
 