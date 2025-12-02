// ==========================================
// Carousel Functionality
// ==========================================
let currentSlide = 0;
let autoPlayInterval;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const carouselWrapper = document.getElementById('carouselWrapper');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

function showSlide(index) {
  // Ensure index is within bounds
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  currentSlide = index;

  // Update slides
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === currentSlide) {
      slide.classList.add('active');
    }
  });

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === currentSlide) {
      dot.classList.add('active');
    }
  });

  // Transform carousel
  const offset = -currentSlide * 100;
  carouselWrapper.style.transform = `translateX(${offset}%)`;

  // Reset progress bar
  resetProgressBar();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function resetProgressBar() {
  if (progressBar) {
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressBar.style.transition = 'width 5s linear';
      progressBar.style.width = '100%';
    }, 50);
  }
}

function startAutoPlay() {
  stopAutoPlay();
  resetProgressBar();
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
  if (progressBar) {
    progressBar.style.width = '0%';
    progressBar.style.transition = 'none';
  }
}

// Initialize carousel
if (slides.length > 0) {
  showSlide(0);
  startAutoPlay();

  // Event listeners for carousel controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Pause on hover
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carouselWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    }
  }
}

// ==========================================
// Page Transition Animation
// ==========================================
function createPageTransition() {
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  transition.innerHTML = '<div class="transition-logo">🤖</div>';
  document.body.appendChild(transition);
  return transition;
}

// Smooth page transitions for navigation
const navLinksForTransition = document.querySelectorAll('.nav-link');
navLinksForTransition.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();

      // Create transition overlay
      const transition = createPageTransition();
      transition.classList.add('active');

      // Wait for transition, then scroll
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }

        // Remove transition
        setTimeout(() => {
          transition.classList.remove('active');
          setTimeout(() => {
            transition.remove();
          }, 500);
        }, 300);
      }, 300);
    }
  });
});

// ==========================================
// Enhanced Card Interactions
// ==========================================
const storyCards = document.querySelectorAll('.story-card');
storyCards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.02)';
    this.style.transition = 'transform 0.3s ease';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });
});

// ==========================================
// Keyboard Navigation for Carousel
// ==========================================
document.addEventListener('keydown', (e) => {
  if (slides.length > 0) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    }
  }
});

// ==========================================
// Enhanced Scroll Animations
// ==========================================
const carouselSection = document.getElementById('success-stories');
if (carouselSection) {
  const carouselObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }
    });
  }, { threshold: 0.5 });

  carouselObserver.observe(carouselSection);
}

// ==========================================
// Console Message for Enhanced Features
// ==========================================
console.log('%c✨ Enhanced Features Loaded!', 'font-size: 16px; font-weight: bold; color: #667eea;');
console.log('%c- Interactive Carousel with Auto-play', 'font-size: 12px; color: #764ba2;');
console.log('%c- Page Transition Animations', 'font-size: 12px; color: #764ba2;');
console.log('%c- Touch/Swipe Support', 'font-size: 12px; color: #764ba2;');
console.log('%c- Keyboard Navigation (Arrow Keys)', 'font-size: 12px; color: #764ba2;');
