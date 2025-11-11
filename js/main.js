(() => {

    const modelViewer = document.querySelector('model-viewer');
    const hotspots = document.querySelectorAll('.Hotspot');

    // I'm storing hotspot data in an array of objects WITHOUT images for now
    const infoBoxes = [
        {
            title: "Active Noise Cancellation",
            text: "Titanium drivers with advanced ANC technology eliminate unwanted noise for truly immersive listening. Experience studio-quality sound anywhere."
        },
        {
            title: "Extended Battery Life",
            text: "Get up to 10 hours of continuous playback on a single charge. Fast charging technology gives you 2 hours of playback with just 10 minutes of charging."
        },
        {
            title: "Dual Microphones",
            text: "Dual-mic system with noise cancellation ensures crystal clear calls and voice commands. Perfect for calls, meetings, and voice assistants."
        }
    ];

    // I'm loading hotspot content from the data array
    function loadInfo() {
        infoBoxes.forEach(function(infoBox, index) {
            let selected = document.querySelector(`#hotspot-${index + 1}`);
            
            const titleElement = document.createElement('h2');
            titleElement.textContent = infoBox.title;
            selected.appendChild(titleElement);

            const textElement = document.createElement('p');
            textElement.textContent = infoBox.text;
            selected.appendChild(textElement);
        });
    }

    // I'm showing info 
    function showInfo() {
        let selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, { duration: 0.8, autoAlpha: 1 });
    }

    // I'm hiding info 
    function hideInfo() {
        let selected = document.querySelector(`#${this.slot}`);
        gsap.to(selected, { duration: 0.8, autoAlpha: 0 });
    }

    // I'm handling the progress bar for model loading
    function onProgress(event) {
        const progressBar = event.target.querySelector('.progress-bar');
        const updatingBar = event.target.querySelector('.update-bar');
        updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
        
        if (event.detail.totalProgress === 1) {
            progressBar.classList.add('hide');
            event.target.removeEventListener('progress', onProgress);
        } else {
            progressBar.classList.remove('hide');
        }
    }

  
    function init() {
        loadInfo();

        // Add event listeners for hotspots
        hotspots.forEach(function(hotspot) {
            hotspot.addEventListener('mouseenter', showInfo);
            hotspot.addEventListener('mouseleave', hideInfo);
        });

        // Add progress bar listener if model viewer exists
        if (modelViewer) {
            modelViewer.addEventListener('progress', onProgress);
        }
    }

    init();

})();