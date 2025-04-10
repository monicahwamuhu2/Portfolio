document.addEventListener('DOMContentLoaded', () => {
    // Page loading animation
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.classList.add('loaded');
      }, 500); // Short delay for smoother loading effect
    });
  
    // Improved Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navList.classList.toggle('active');
      document.body.classList.toggle('menu-open'); // Prevent background scrolling when menu is open
    });
    
    // Close menu when clicking a navigation link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navList.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Improved Tab Functionality
    function opentab(tabname) {
      const tabLinks = document.querySelectorAll('.tab-links');
      const tabContents = document.querySelectorAll('.tab-contents');
      
      // Remove active class from all tabs and contents
      tabLinks.forEach(link => link.classList.remove('active-link'));
      tabContents.forEach(content => content.classList.remove('active-tab'));
      
      // Add active class to selected tab and content
      event.currentTarget.classList.add('active-link');
      document.getElementById(tabname).classList.add('active-tab');
    }
    
    // Make opentab function globally available
    window.opentab = opentab;
    
    // Tech Stack Icon Animation
    const techIcons = document.querySelectorAll('.tech-icons .icon');
    let iconIndex = 0;
    
    // Initialize all icons
    techIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        techIcons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
      });
      
      icon.addEventListener('mouseleave', () => {
        if (!icon.classList.contains('hovered')) {
          techIcons[iconIndex].classList.add('active');
        }
      });
    });
    
    // Set initial icon as active
    if (techIcons.length > 0) {
      techIcons[0].classList.add('active');
    }
    
    // Set interval to cycle through icons when not hovered
    const iconInterval = setInterval(() => {
      // Check if any icon is being hovered
      const isAnyHovered = Array.from(techIcons).some(icon => 
        icon.matches(':hover') || icon.classList.contains('hovered')
      );
      
      if (!isAnyHovered) {
        // Remove active class from current icon
        techIcons.forEach(icon => icon.classList.remove('active'));
        
        // Update index and add active class to next icon
        iconIndex = (iconIndex + 1) % techIcons.length;
        techIcons[iconIndex].classList.add('active');
      }
    }, 2000);
    
    // Lightbox Gallery
    // Store UI design image groups
    const designGroups = [
      // Table Reservation System images (group 0)
      [
        { src: 'images/image1.jpeg', caption: 'Table Reservation Booking Interface' },
        { src: 'images/image2.jpeg', caption: 'Restaurant Selection Screen' },
        { src: 'images/image3.jpeg', caption: 'Booking Confirmation Screen' },
        { src: 'images/image4.jpeg', caption: 'User Dashboard' }
      ],
      // Currency Exchange Platform images (group 1)
      [
        { src: 'images/pic1.jpeg', caption: 'Currency Exchange Dashboard' },
        { src: 'images/pic2.jpeg', caption: 'Exchange Rates View' },
        { src: 'images/pic3.jpeg', caption: 'Currency Conversion Calculator' },
        { src: 'images/pic4.jpeg', caption: 'Transaction History' }
      ]
    ];
    
    // Current lightbox state
    let currentGroup = 0;
    let currentIndex = 0;
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    
    // Open lightbox function
    window.openLightbox = function(groupId, imageId) {
      currentGroup = groupId;
      currentIndex = imageId;
      
      // Update lightbox content
      updateLightboxContent();
      
      // Show lightbox with animation
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
      
      // Add escape key listener
      document.addEventListener('keydown', handleLightboxKeyPress);
    }
    
    // Close lightbox function
    window.closeLightbox = function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
      
      // Remove keyboard listener
      document.removeEventListener('keydown', handleLightboxKeyPress);
    }
    
    // Change lightbox image
    window.changeLightboxImage = function(direction) {
      // Calculate new index with wrap-around
      const groupLength = designGroups[currentGroup].length;
      currentIndex = (currentIndex + direction + groupLength) % groupLength;
      
      // Update displayed image with fade effect
      lightboxImage.style.opacity = 0;
      setTimeout(() => {
        updateLightboxContent();
        lightboxImage.style.opacity = 1;
      }, 300);
    }
    
    // Handle keyboard navigation in lightbox
    function handleLightboxKeyPress(e) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        changeLightboxImage(-1);
      } else if (e.key === 'ArrowRight') {
        changeLightboxImage(1);
      }
    }
    
    // Update lightbox content function
    function updateLightboxContent() {
      const currentImage = designGroups[currentGroup][currentIndex];
      lightboxImage.src = currentImage.src;
      lightboxImage.alt = currentImage.caption;
      lightboxCaption.textContent = currentImage.caption;
      lightboxCounter.textContent = `${currentIndex + 1} / ${designGroups[currentGroup].length}`;
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get target element
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calculate offset to account for fixed navbar
          const navbarHeight = document.getElementById('floating-navbar')?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
          
          // Scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Highlight active navigation link based on scroll position
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('.section-wrapper');
      const navLinks = document.querySelectorAll('.nav-list a');
      
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href').substring(1);
        
        if (linkHref === currentSection) {
          link.classList.add('active');
        }
      });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initialize on page load
    
    // Animated elements on scroll
    const animateScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
      animateScrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('animated');
        }
      });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on initial load
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Parallax effect for section dividers
    const sectionDividers = document.querySelectorAll('.section-divider');
    
    window.addEventListener('scroll', () => {
      sectionDividers.forEach(divider => {
        const scrollPosition = window.scrollY;
        const dividerPosition = divider.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition + windowHeight > dividerPosition) {
          const distance = scrollPosition + windowHeight - dividerPosition;
          const parallaxValue = distance * 0.05; // Adjust the multiplier for effect intensity
          
          // Apply transform to create parallax effect
          divider.style.transform = `translateY(${parallaxValue}px)`;
        }
      });
    });
    
    // Floating navbar animation
    const floatingNavbar = document.getElementById('floating-navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Add shadow and adjust size based on scroll position
      if (scrollTop > 50) {
        floatingNavbar.style.padding = '8px 20px';
        floatingNavbar.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
      } else {
        floatingNavbar.style.padding = '12px 25px';
        floatingNavbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
      }
      
      // Hide/show navbar on scroll direction change
      if (scrollTop > lastScrollTop && scrollTop > 300) {
        // Scrolling down
        floatingNavbar.style.top = '-80px';
      } else {
        // Scrolling up
        floatingNavbar.style.top = '20px';
      }
      
      lastScrollTop = scrollTop;
    });
    
    // Custom cursor functionality
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (cursor && cursorTrail) {
      document.addEventListener('mousemove', (e) => {
        // Update cursor position with transform for better performance
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Update trail with a slight delay
        setTimeout(() => {
          cursorTrail.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 50);
      });
      
      // Add hover effect to interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .button, .tab-links, .ui-design-item, .case-study-btn, .social-icon-item');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          cursor.classList.add('hover-effect');
        });
        
        element.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover-effect');
        });
      });
      
      // Hide cursor when mouse leaves window
      document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
      });
      
      document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '1';
      });
    }
    
    // Animated Background Movement
    const animatedBg = document.querySelector('.animated-bg');
    if (animatedBg) {
      document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const circles = document.querySelectorAll('.circle');
        const squares = document.querySelectorAll('.square');
        
        // Move background elements based on mouse position
        circles.forEach((circle, index) => {
          const offsetX = (mouseX - 0.5) * (index + 1) * 20;
          const offsetY = (mouseY - 0.5) * (index + 1) * 20;
          circle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        
        squares.forEach((square, index) => {
          const offsetX = (mouseX - 0.5) * (index + 1) * -15;
          const offsetY = (mouseY - 0.5) * (index + 1) * -15;
          square.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX * 0.5}deg)`;
        });
      });
    }
    
    // Initialize ScrollReveal animations if available
    if (typeof ScrollReveal !== 'undefined') {
      const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: false
      });
      
      // Apply to various sections with custom configurations
      sr.reveal('.section-title', {
        distance: '20px',
        delay: 100
      });
      
      sr.reveal('.about-col-1', { 
        origin: 'left', 
        delay: 200 
      });
      
      sr.reveal('.about-col-2', { 
        origin: 'right', 
        delay: 300 
      });
      
      sr.reveal('.tech-icons .icon', { 
        interval: 150,
        distance: '20px',
        origin: 'bottom'
      });
      
      sr.reveal('.service-card', { 
        interval: 150,
        distance: '30px',
        origin: 'bottom'
      });
      
      sr.reveal('.case-study-card', { 
        interval: 150,
        distance: '20px',
        origin: 'bottom'
      });
      
      sr.reveal('.ui-design-category', { 
        interval: 200,
        distance: '30px',
        origin: 'bottom'
      });
      
      sr.reveal('.ui-design-item', { 
        interval: 100,
        distance: '15px',
        origin: 'bottom',
        delay: 300
      });
      
      sr.reveal('.contact-left', { 
        origin: 'left', 
        delay: 200 
      });
      
      sr.reveal('.contact-right', { 
        origin: 'right', 
        delay: 300 
      });
    }
    
    // Form submission with confetti effect
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm && typeof confetti !== 'undefined') {
      contactForm.addEventListener('submit', (e) => {
        // Show success effect on valid form submission
        const formIsValid = contactForm.checkValidity();
        
        if (formIsValid) {
          // Create confetti effect
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#bb86fc', '#03dac6', '#ff4f8b', '#ffffff']
          });
        }
      });
    }
    
    // Type writer effect for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
      title.addEventListener('mouseenter', () => {
        title.classList.add('animate-glow');
      });
      
      title.addEventListener('mouseleave', () => {
        title.classList.remove('animate-glow');
      });
    });
    
    // Add pulse effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
      button.classList.add('pulse-effect');
    });
    
    // Service card interaction
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Add 3D tilt effect on hover
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset transform on mouse leave
        card.style.transform = '';
      });
      
      // Add touch support for mobile
      card.addEventListener('touchstart', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
      });
      
      card.addEventListener('touchend', () => {
        setTimeout(() => {
          card.style.transform = '';
        }, 300);
      });
    });
    
    // Initialize touch events for UI designs on mobile
    const uiDesignItems = document.querySelectorAll('.ui-design-item');
    
    uiDesignItems.forEach((item, index) => {
      const groupId = parseInt(item.closest('.ui-design-category').dataset.groupId || 0);
      
      // Add touch event listener for mobile devices
      item.addEventListener('touchend', (e) => {
        if (!item.classList.contains('touched')) {
          e.preventDefault();
          // First touch shows overlay
          item.classList.add('touched');
          setTimeout(() => {
            item.classList.remove('touched');
          }, 2000);
        } else {
          // Second touch opens lightbox
          openLightbox(groupId, index % 4);
        }
      });
    });

    // Additional code for project cards animation
  const projectCards = document.querySelectorAll('.project-card');
  
  function checkProjectCardsVisibility() {
    projectCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight - 100) {
        card.classList.add('animated');
      }
    });
  }
  
  window.addEventListener('scroll', checkProjectCardsVisibility);
  window.addEventListener('load', checkProjectCardsVisibility);
  
  // Interactive elements for project cards
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
    
    // For mobile/touch devices
    card.addEventListener('touchstart', () => {
      card.style.transform = 'translateY(-10px)';
    }, { passive: true });
    
    card.addEventListener('touchend', () => {
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    }, { passive: true });
  });
  
  // Update the ScrollReveal configurations if available
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      delay: 200,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });
    
    // Apply to project cards with custom configurations
    sr.reveal('.project-card', { 
      interval: 150,
      distance: '30px',
      origin: 'bottom'
    });
    
    // Apply to new tech stack icons
    sr.reveal('.tech-figma, .tech-adobe, .tech-sketch, .tech-azure', { 
      interval: 150,
      distance: '20px',
      origin: 'bottom'
    });
  }
  });