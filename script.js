// --------------------------
// NAVBAR SCROLL EFFECT
// --------------------------
const navbar = document.querySelector('.navbar');
const navbarScrollHandler = () => {
  const background = window.scrollY > 50
    ? 'rgba(10, 10, 10, 0.9)'
    : 'linear-gradient(45deg, var(--accent-1), var(--accent-2))';

  navbar.style.background = background;
  navbar.style.backdropFilter = 'blur(10px)';
};

window.addEventListener('scroll', navbarScrollHandler);

// --------------------------
// SMOOTH SCROLL
// --------------------------
const setupSmoothScroll = () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
      }
    });
  });
};

// --------------------------
// LIGHTBOX SYSTEM
// --------------------------
const lightboxController = (() => {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxContent = document.querySelector('.lightbox-content');
  let currentGalleryItems = [];
  let currentImageIndex = 0;

  let currentScale = 1;


  const handleZoom = () => {
    currentScale = currentScale === 1 ? 2 : 1;
    lightboxImage.style.transform = `scale(${currentScale})`;
    lightboxImage.classList.toggle('zoomed');

    // Responsywny zoom na mobile
    if (window.innerWidth <= 768) {
      currentScale = currentScale === 1 ? 1.5 : 1;
      lightboxImage.style.transform = `scale(${currentScale})`;
    }
  };

  const initZoom = () => {
    // Kliknięcie na desktop
    lightboxImage.addEventListener('click', handleZoom);

    // Dotknięcie na mobile
    let lastTap = 0;
    lightboxImage.addEventListener('touchend', (e) => {
      const currentTime = Date.now();
      if (currentTime - lastTap < 300) {
        handleZoom();
      }
      lastTap = currentTime;
    });
  };


  // Public methods
  return {
    init() {
      this.setupGalleryItems();
      this.setupEventListeners();
      initZoom()
    },

    setupGalleryItems() {
      document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
          currentGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));
          currentImageIndex = currentGalleryItems.indexOf(item);
          this.updateLightboxContent(item);
        });
      });
    },

    setupEventListeners() {
      // Close handlers
      document.querySelector('.close').addEventListener('click', () => this.closeLightbox());
      lightbox.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) this.closeLightbox();
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
          case 'Escape': this.closeLightbox(); break;
          case 'ArrowLeft': this.showPrevImage(); break;
          case 'ArrowRight': this.showNextImage(); break;
        }
      });

      // Buy button
      document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (e) => this.handleBuyButtonClick(e));
      });
    },

    updateLightboxContent(item) {
      // Reset animation
      lightboxContent.style.opacity = 0;
      lightboxContent.style.transform = 'scale(0.95)';

      // Set content
      lightboxImage.src = item.querySelector('img').src;
      lightbox.querySelector('.image-title').textContent = item.dataset.title;
      lightbox.querySelector('.image-description').textContent = item.dataset.description;
      lightbox.querySelector('.image-feelings').textContent = item.dataset.feelings;
      lightbox.querySelector('.price').textContent = `Cena: ${item.dataset.price}`;

      // Activate lightbox
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Force reflow for animation
      void lightboxContent.offsetWidth;
      lightboxContent.style.opacity = 1;
      lightboxContent.style.transform = 'scale(1)';
    },

    showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % currentGalleryItems.length;
      this.updateLightboxContent(currentGalleryItems[currentImageIndex]);
    },

    showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
      this.updateLightboxContent(currentGalleryItems[currentImageIndex]);
    },

    closeLightbox() {
      if (currentScale !== 1) {
        currentScale = 1;
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.classList.remove('zoomed');
      }

      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
      currentGalleryItems = [];
    },

    handleBuyButtonClick(e) {
      e.preventDefault();
      const title = lightbox.querySelector('.image-title').textContent;
      this.closeLightbox();

      const contactSection = document.querySelector('#contact');
      const targetPosition = contactSection.offsetTop - navbar.offsetHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        const messageTextarea = document.querySelector('.contact-form textarea');
        messageTextarea.value = `Szanowna Pani Meg Joni,\n\nJestem zainteresowany zakupem obrazu "${title}". Proszę o informację dotyczącą:\n- dostępności dzieła\n- terminu i kosztów dostawy\n- możliwości obejrzenia pracy osobiście\n\nZ poważaniem,\n[Imię i Nazwisko]`;
        messageTextarea.focus();
      }, 800);
    }
  };
})();

// --------------------------
// INITIALIZATION
// --------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScroll();
  lightboxController.init();
});
