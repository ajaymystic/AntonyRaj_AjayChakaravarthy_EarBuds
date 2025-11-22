(() => {

    // AR Model Viewer
    const modelViewer = document.querySelector("model-viewer");
    const hotspots = document.querySelectorAll(".Hotspot");
    //  X-ray Slider
    const divisor = document.querySelector("#divisor");
    const slider = document.querySelector("#slider");
    //  Canvas Animation
    const canvas = document.querySelector("#explode-view");
    let context;
    const frameCount = 899; 
    const images = [];
    const buds = {
        frame: 0
    };
    
    // Variables - Navigation
    const navLinks = document.querySelectorAll(".nav__menu a");
    // Variables - Mobile Menu
    const hamburger = document.querySelector("#hamburger");
    const mobileMenu = document.querySelector("#mobile-menu");
    const closeButton = document.querySelector("#close-menu");
    const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");

    // Hotspot data for AR model
    const infoBoxes = [
        {
            title: "Noise-cancelling microphones",
            text: "Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.",
            image: "images/render4.jpg"

        },
        {
            title: 'Comfortable fit',
            text: "Three pairs of ultra comfortable silicone tips are included. The tips create an acoustic seal that blocks outside audio and secures the earbuds in place.",
            image: "images/render3.jpg"

        },
        {
            title: "360 AUDIO",
            text: "360 Audio places sound all around you, while Dolby Head Tracking™ technology delivers an incredible three-dimensional listening experience.",
            image: "images/render5.jpg"

        },
        {
            title: "Ultra Fast Charging",
            text: "Charge your earbuds in 30 minutes or less with our hyper charging technology.",
            image: "images/render7.jpg"

        }
    ];

    function loadInfo() {
        infoBoxes.forEach(function(infoBox, index) {
            let selected = document.querySelector(`#hotspot-${index + 1}`);
            
            const imageContent = document.createElement("img");
            const titleContent = document.createElement("h2");
            const infoContent = document.createElement("p");

            imageContent.src = infoBox.image;
            titleContent.textContent = infoBox.title;
            infoContent.textContent = infoBox.text;

            selected.appendChild(imageContent);
            selected.appendChild(titleContent);
            selected.appendChild(infoContent);
        });
    }

    function showInfo() {
        let selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, 1, { autoAlpha: 1 });
    }

    function hideInfo() {
        let selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, 1, { autoAlpha: 0 });
    }

    function handleModelProgress(event) {
        const progressBar = event.target.querySelector(".progress-bar");
        const updatingBar = event.target.querySelector(".update-bar");
        updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
        
        if (event.detail.totalProgress === 1) {
            progressBar.classList.add("hide");
            event.target.removeEventListener("progress", handleModelProgress);
        } else {
            progressBar.classList.remove("hide");
        }
    }

    // I'm moving the X-ray divisor based on slider value
    function moveDivisor() {

        divisor.style.width = `${slider.value}%`;
        if (divisor && slider) {
            divisor.style.width = `${slider.value}%`;
        }

    }

    // I'm resetting the slider to middle position
    function resetSlider() {

        slider.value = 50;
        moveDivisor();
    }

    // I'm toggling the mobile menu
    function toggleMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle("open");
        }
    }

    // I'm setting up the canvas for explode view animation
    function setupCanvas() {
        if (!canvas) return;
        
        context = canvas.getContext("2d");
        canvas.width = 1920;
        canvas.height = 1080;
    }

    // I'm preloading all explode view images
    function preloadImages() {
        if (!canvas) return;

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = `images/explode/explode_${i}.webp`;
            images.push(img);
        }

        // I'm rendering the first frame when it loads
        if (images[0]) {
            images[0].addEventListener('load', render);
        }
    }

    // I'm rendering the current frame to canvas
    function render() {
        if (!context) return;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0);
    }

    // I'm handling smooth scroll to sections
    function scrollLink(event) {
        event.preventDefault();
        let selected = event.currentTarget.hash;
        
        gsap.to(window, {
            duration: 2,
            scrollTo: {
                y: `${selected}`,
                offsetY: 100
            },
            ease: 'power2.inOut'
        });
    }

    // I'm setting up all ScrollTrigger animations
    function setupScrollAnimations() {
        
        // I'm animating the hero content on load
        gsap.from(".hero__content", {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out"
        });

        // I'm animating section titles as they enter viewport
        gsap.utils.toArray('.section-title').forEach(function(title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        // I'm animating section subtitles
        gsap.utils.toArray('.section-subtitle').forEach(function(subtitle) {
            gsap.from(subtitle, {
                scrollTrigger: {
                    trigger: subtitle,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.2,
                ease: "power2.out"
            });
        });

        // I'm animating feature cards with stagger
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.features__grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out'
        });

        // I'm animating the X-ray section
        gsap.from('.xray-container', {
            scrollTrigger: {
                trigger: '.xray-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power2.out'
        });

        // I'm animating the model viewer
        gsap.from('model-viewer', {
            scrollTrigger: {
                trigger: '.ar-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power2.out'
        });

        // I'm creating the explode view scroll animation 
        if (canvas && images.length === frameCount) {
            gsap.to(buds, {
                frame: frameCount - 1,
                snap: 'frame',
                scrollTrigger: {
                    trigger: '#explode-view',
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    // end: '+=5000'
                },
                onUpdate: render
            });
        }
    }

    
    function init() {
        
        // I'm registering GSAP plugins
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // I'm setting up AR model hotspots
        loadInfo();
        hotspots.forEach(function(hotspot) {
            hotspot.addEventListener('mouseenter', showInfo);
            hotspot.addEventListener('mouseleave', hideInfo);
        });

        // I'm setting up model viewer progress tracking
        if (modelViewer) {
            modelViewer.addEventListener('progress', handleModelProgress);
        }

        // I'm setting up X-ray slider

        // if (slider && divisor) {
            slider.addEventListener("input", moveDivisor);
            window.addEventListener("load", moveDivisor);
            resetSlider();
        // }

        if (slider && divisor) {
            slider.addEventListener("input", moveDivisor);
            window.addEventListener("load", resetSlider);  // FIXED: Now calls resetSlider
            resetSlider();
        }

        // I'm setting up mobile menu
        if (hamburger && mobileMenu) {
            hamburger.addEventListener("click", toggleMobileMenu);
        }
        
        if (closeButton) {
            closeButton.addEventListener("click", toggleMobileMenu);
        }
        
        if (mobileMenuLinks) {
            mobileMenuLinks.forEach(function(link) {
                link.addEventListener("click", toggleMobileMenu);
            });
        }

        // I'm setting up canvas animation
        setupCanvas();
        preloadImages();

        // I'm setting up smooth scroll navigation
        navLinks.forEach(function(navLink) {
            navLink.addEventListener('click', scrollLink);
        });

        // I'm setting up all scroll-triggered animations
        setupScrollAnimations();
    }

    init();
})();