document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox__close');
    const portfolioImages = document.querySelectorAll('.portfolio-image, .portfolio-image-small');
  
    portfolioImages.forEach(img => {
      img.addEventListener('click', e => {
        lightbox.classList.add('active');
        lightboxImg.src = e.target.src;
      });
    });
  
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  });