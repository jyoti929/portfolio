/**
 * Jyoti Prasad — Personal Portfolio Main JavaScript Module
 * Clean, production-ready, ES6+ interactive logic
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Dark / Light Theme Manager
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;
  
  // Check localStorage or system preference
  const savedTheme = localStorage.getItem('portfolioTheme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolioTheme', theme);
    
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    } else {
      icon.className = 'fa-solid fa-moon';
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    }
  }

  /* ==========================================================================
     2. Hero Typewriter Animation
     ========================================================================== */
  const typedTextElement = document.getElementById('typedText');
  const phrases = [
    'React Native Mobile Apps',
    'Cross-Platform Solutions',
    'Full-Stack Web Platforms',
    'Scalable RESTful APIs',
    'Clean Code Solutions'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typedTextElement) {
    typeEffect();
  }

  /* ==========================================================================
     3. Sticky Navbar & Mobile Drawer
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.toggle('open');
    mobileDrawer.classList.toggle('open', isOpen);
  });

  mobileDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('open');
      mobileDrawer.classList.remove('open');
    });
  });

  /* Active Nav Link Highlight on Scroll */
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  /* ==========================================================================
     4. Animated Skills Progress Bars
     ========================================================================== */
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fillBar = entry.target.querySelector('.progress-bar-fill');
        const percentText = entry.target.querySelector('.skill-percent');
        const targetPercent = fillBar.getAttribute('data-progress');
        
        fillBar.style.width = targetPercent;
        
        // Counter animation
        let count = 0;
        const targetNum = parseInt(targetPercent);
        const duration = 1200;
        const stepTime = Math.abs(Math.floor(duration / targetNum));
        
        const counterTimer = setInterval(() => {
          count++;
          percentText.textContent = `${count}%`;
          if (count >= targetNum) {
            clearInterval(counterTimer);
          }
        }, stepTime);

        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach(card => skillObserver.observe(card));

  /* Skills Filter Tabs */
  const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-skill-filter');
      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. Project Filtering & Modal Details
     ========================================================================== */
  const projectFilterBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-project-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-project-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* Project Details Data */
  const projectsData = {
    quickcart: {
      title: 'QuickCart — Grocery Delivery App & Admin Portal',
      img: 'assets/project1.svg',
      desc: 'QuickCart is a complete end-to-end mobile e-commerce solution tailored for fresh grocery delivery. It features real-time inventory management, user authentication, interactive cart/wishlist management, live order tracking, and an intuitive admin management portal.',
      features: [
        'User Authentication with Firebase Auth (Email/Password & Social)',
        'Real-time Firestore Database sync for product catalog & cart items',
        'Wishlist management and custom order history tracking',
        'Dedicated web admin dashboard for catalog & order updates'
      ],
      github: 'https://github.com/jyoti929/quickStart'
    },
    inappcode: {
      title: 'InAppCode — Mobile Coding Challenge IDE',
      img: 'assets/project2.svg',
      desc: 'InAppCode is an interactive mobile learning and challenge platform that enables developers to read, write, and execute programming challenges directly on Android and iOS devices with instant test-case verification.',
      features: [
        'Built with React Native & Expo for smooth cross-platform performance',
        'In-app mobile code editor UI with syntax highlighting',
        'Interactive test case validation & problem solving modules',
        'Cloud storage for user progress and solution submission'
      ],
      github: 'https://github.com/jyoti929'
    },
    disease: {
      title: 'Disease Prediction Engine & Healthcare Platform',
      img: 'assets/project3.svg',
      desc: 'An AI/ML-assisted healthcare web application that allows users to input observed medical symptoms and receive instant probability-based disease predictions along with recommended specialist consultations.',
      features: [
        'Full MERN Stack architecture (MongoDB, Express, React, Node.js)',
        'Machine learning algorithm dataset integration with RESTful API endpoints',
        'Symptom checker questionnaire interface with real-time risk assessment',
        'Secure patient data management and responsive design'
      ],
      github: 'https://github.com/jyoti929'
    },
    devpulse: {
      title: 'DevPulse — AI Annotation & Analytics Dashboard',
      img: 'assets/project4.svg',
      desc: 'DevPulse is a real-time data analytics dashboard designed for monitoring AI/ML data annotation pipelines, audit compliance metrics, and annotator productivity rates.',
      features: [
        'Interactive charts rendering quality metrics & throughput rates',
        'Data privacy auditing tools following international compliance standards',
        'Lightweight, responsive frontend built with modern ES6 JavaScript & CSS3',
        'Custom export and reporting features'
      ],
      github: 'https://github.com/jyoti929'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalGithubLink = document.getElementById('modalGithubLink');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectsData[projectId];

      if (data) {
        modalImg.src = data.img;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalGithubLink.href = data.github;

        modalFeaturesList.innerHTML = '';
        data.features.forEach(feat => {
          const li = document.createElement('li');
          li.textContent = feat;
          modalFeaturesList.appendChild(li);
        });

        projectModal.classList.add('open');
      }
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });

  function closeModal() {
    projectModal.classList.remove('open');
  }

  /* ==========================================================================
     6. Contact Form Validation & Character Counter
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const submitBtn = document.getElementById('submitBtn');

  // Live Character Counter
  if (messageInput && charCount) {
    messageInput.addEventListener('input', () => {
      charCount.textContent = messageInput.value.length;
    });
  }

  // Form Validation & Handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const nameGroup = document.getElementById('nameGroup');
      const emailGroup = document.getElementById('emailGroup');
      const messageGroup = document.getElementById('messageGroup');

      let isValid = true;

      // Validate Name
      if (nameInput.value.trim().length < 2) {
        nameGroup.classList.add('error');
        isValid = false;
      } else {
        nameGroup.classList.remove('error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailGroup.classList.add('error');
        isValid = false;
      } else {
        emailGroup.classList.remove('error');
      }

      // Validate Message
      if (messageInput.value.trim().length < 10) {
        messageGroup.classList.add('error');
        isValid = false;
      } else {
        messageGroup.classList.remove('error');
      }

      if (isValid) {
        // Show loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          contactForm.reset();
          charCount.textContent = '0';
          
          showToast('Message sent successfully! I will get back to you soon.', 'fa-solid fa-circle-check');
        }, 1200);
      }
    });
  }

  /* ==========================================================================
     7. Toast Notification System
     ========================================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, iconClass = 'fa-solid fa-info-circle') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="${iconClass} toast-icon"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* ==========================================================================
     8. Scroll-To-Top Button & Footer Year
     ========================================================================== */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const currentYearSpan = document.getElementById('currentYear');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});
