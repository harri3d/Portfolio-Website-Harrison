const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const topnav__menu = document.querySelector('.topnav__menu');
const media = window.matchMedia('(width < 40em)');
const body = document.querySelector('body');

function setuptopnav() {
    topnav__menu.style.transition = 'none';
}

function openMobileMenu() {
    topnav__menu.removeAttribute('style');
    btnOpen.setAttribute('aria-expanded', 'true');
    bodyScrollLockUpgrade.disableBodyScroll(body);
    btnClose.focus();

}

function closeMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'false');
    console.log("button clicked")
    bodyScrollLockUpgrade.enableBodyScroll(body);
    btnOpen.focus();

    setTimeout(() => {
        topnav__menu.style.transition = 'none';
    }, 500)

}

setuptopnav();
btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);