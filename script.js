document.addEventListener('DOMContentLoaded', () => {
  const btnOpen = document.querySelector('.topnav__open');
  const btnClose = document.querySelector('.topnav__close');
  const menu = document.querySelector('.topnav__menu');

  console.log({ btnOpen, btnClose, menu }); // ← add this to verify all 3 are found

  btnOpen.addEventListener('click', () => {
    menu.classList.add('is-open');
    btnOpen.setAttribute('aria-expanded', 'true');
  });

  btnClose.addEventListener('click', () => {
    menu.classList.remove('is-open');
    btnOpen.setAttribute('aria-expanded', 'false');
  });

  document.querySelectorAll('.topnav__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      btnOpen.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      menu.classList.remove('is-open');
      btnOpen.setAttribute('aria-expanded', 'false');
    }
  });
});