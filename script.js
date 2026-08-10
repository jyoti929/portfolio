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
     4. Skills Filter Tabs
     ========================================================================== */
  const skillCards = document.querySelectorAll('.skill-card');
  const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-skill-filter');
      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
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
        const cat = card.getAttribute('data-project-category');
        if (
          filter === 'all' || 
          cat === filter || 
          (filter === 'development' && cat !== 'annotation')
        ) {
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
    blogify: {
      title: 'Blogify – Full-Stack Blog Web Application',
      img: 'assets/project4.svg',
      desc: 'A responsive full-stack blog platform where users can register, log in, create, edit, delete, and manage blog posts through a personalized dashboard.',
      features: [
        'User Registration & Login Authentication (JWT)',
        'Create, Edit, and Delete Blog Posts (CRUD)',
        'Personalized Blog Dashboard & User Profile',
        'Blog Categories, Search & Filter Functionality',
        'Newsletter Subscription & Fully Responsive UI'
      ],
      github: 'https://github.com/jyoti929/Blog_app',
      demo: 'https://6a78931adad05a19dec58d56--starlit-bunny-060e4c.netlify.app/'
    },
    lidar_annotation: {
      title: '3D Data Annotation – LiDAR',
      img: 'assets/lidar_annotation.svg',
      desc: 'Worked on 3D data annotation and LiDAR-based annotation tasks for machine learning and autonomous driving datasets, focusing on accurate object labeling and data quality.',
      features: [
        '3D Data Annotation & LiDAR Annotation for Point Cloud Data',
        'Precision 3D Bounding Box Tagging & Object Detection',
        'Data Labeling for Autonomous Driving Datasets',
        'Spatial Data Quality Checking & Audit Compliance'
      ]
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeaturesList = document.getElementById('modalFeaturesList');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalDemoLink = document.getElementById('modalDemoLink');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectsData[projectId];

      if (data) {
        modalImg.src = data.img;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;

        if (data.github) {
          modalGithubLink.href = data.github;
          modalGithubLink.style.display = 'inline-flex';
        } else {
          modalGithubLink.style.display = 'none';
        }

        if (data.demo) {
          modalDemoLink.href = data.demo;
          modalDemoLink.style.display = 'inline-flex';
        } else {
          modalDemoLink.style.display = 'none';
        }

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
