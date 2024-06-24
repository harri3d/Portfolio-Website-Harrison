const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(width < 40em)');
const body = document.querySelector('body');

function openMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'true');
    bodyScrollLockUpgrade.disableBodyScroll(body);
    btnClose.focus();
}

function closeMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'false');
    console.log("button clicked")
    bodyScrollLockUpgrade.enableBodyScroll(body);
    btnOpen.focus();
}


btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);