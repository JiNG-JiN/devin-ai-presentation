// ==========================================
// Smooth Scrolling & Navigation
// ==========================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
  const scrollPosition = window.pageYOffset + 200;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// Mobile Navigation Toggle
// ==========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// ==========================================
// Scroll Animations with Intersection Observer
// ==========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = `${entry.target.dataset.animation || 'fadeInUp'} 0.8s ease-out forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
  '.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale'
);

animatedElements.forEach(el => {
  el.style.opacity = '0';

  // Store animation class as data attribute
  if (el.classList.contains('fade-in-left')) {
    el.dataset.animation = 'fadeInLeft';
  } else if (el.classList.contains('fade-in-right')) {
    el.dataset.animation = 'fadeInRight';
  } else if (el.classList.contains('fade-in-scale')) {
    el.dataset.animation = 'fadeInScale';
  } else {
    el.dataset.animation = 'fadeInUp';
  }

  observer.observe(el);
});

// ==========================================
// Parallax Effect for Hero Section
// ==========================================
const heroSection = document.querySelector('.hero-section');
const gradientOrbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroHeight = heroSection.offsetHeight;

  if (scrolled < heroHeight) {
    gradientOrbs.forEach((orb, index) => {
      const speed = 0.5 + (index * 0.2);
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
});

// ==========================================
// Dynamic Text Animation
// ==========================================
function animateValue(element, start, end, duration, suffix = '') {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 16);
}

// Animate impact numbers when they come into view
const impactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numberElement = entry.target.querySelector('.impact-number');
      const text = numberElement.textContent;

      // Check if it's a number we can animate
      if (text.includes('x')) {
        const num = parseInt(text);
        if (!isNaN(num)) {
          numberElement.textContent = '0x';
          animateValue(numberElement, 0, num, 2000, 'x');
        }
      } else if (text.includes('%')) {
        const num = parseInt(text);
        if (!isNaN(num)) {
          numberElement.textContent = '0%';
          animateValue(numberElement, 0, num, 2000, '%');
        }
      }

      impactObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.impact-item').forEach(item => {
  impactObserver.observe(item);
});

// ==========================================
// Card Hover Effects Enhancement
// ==========================================
const cards = document.querySelectorAll('.card, .capability-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ==========================================
// Smooth Page Load Animation
// ==========================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ==========================================
// Performance Optimization
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavigation, 100);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// ==========================================
// Accessibility Enhancements
// ==========================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Focus management for better accessibility
const focusableElements = document.querySelectorAll(
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach(element => {
  element.addEventListener('focus', () => {
    element.style.outline = '2px solid var(--primary-color)';
    element.style.outlineOffset = '2px';
  });

  element.addEventListener('blur', () => {
    element.style.outline = '';
    element.style.outlineOffset = '';
  });
});

// ==========================================
// Console Welcome Message
// ==========================================
console.log('%c🤖 Devin AI 工程师范式转移', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%c欢迎探索AI驱动的软件工程未来!', 'font-size: 14px; color: #764ba2;');
console.log('%c\n这个网页展示了Devin AI如何改变软件开发的方式\n', 'font-size: 12px; color: #666;');
