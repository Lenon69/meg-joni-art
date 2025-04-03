window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'linear-gradient(45deg, var(--accent-1), var(--accent-2))';
    navbar.style.backdropFilter = 'blur(10px)';
  }
});
// Dodaj obsługę kliknięć dla linków nawigacyjnych
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Aktualizuj URL (opcjonalne)
      history.pushState(null, null, targetId);
    }
  });
});

// Lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
    const lightbox = document.querySelector('.lightbox');
    const img = this.querySelector('img');

    // Pobierz dane z data-atrybutów
    const title = this.dataset.title;
    const description = this.dataset.description;
    const feelings = this.dataset.feelings;
    const price = this.dataset.price;

    // Ustaw zawartość lightboxa
    lightbox.querySelector('.lightbox-image').src = img.src;
    lightbox.querySelector('.image-title').textContent = title;
    lightbox.querySelector('.image-description').textContent = description;
    lightbox.querySelector('.image-feelings').textContent = feelings;
    lightbox.querySelector('.price-tag').textContent = `Cena: ${price}`;

    // Pokaż lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Zablokuj scroll
    // Resetuj pozycję przewijania informacji
    setTimeout(() => {
      lightbox.querySelector('.image-info').scrollTo(0, 0);
    }, 50);
  });
});

// Dodaj tę część w sekcji lightbox
document.querySelectorAll('.buy-button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();

    const title = document.querySelector('.image-title').textContent;
    closeLightbox();

    // Przewiń do sekcji kontaktowej
    const contactSection = document.querySelector('#contact');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = contactSection.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // Wypełnij formularz
    setTimeout(() => {
      const messageTextarea = document.querySelector('.contact-form textarea');
      messageTextarea.value = `Szanowna Pani Joanno,\n\nJestem zainteresowany zakupem obrazu "${title}". Proszę o informację dotyczącą:\n- dostępności dzieła\n- terminu i kosztów dostawy\n- możliwości obejrzenia pracy osobiście\n\nZ poważaniem,\n[Imię i Nazwisko]`;
      messageTextarea.focus();
    }, 800);
  });
});


// Zamknij lightbox
document.querySelector('.close').addEventListener('click', () => {
  closeLightbox();
});

document.querySelector('.lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeLightbox();
  }
});

function closeLightbox() {
  document.querySelector('.lightbox').classList.remove('active');
  document.body.style.overflow = 'auto'; // Odblokuj scroll
}
