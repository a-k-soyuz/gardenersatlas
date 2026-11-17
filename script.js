
document.addEventListener('DOMContentLoaded', () => {

    // Gardener's Atlas: Environment controller

    const environment = document.getElementById('environment');
    const image = document.getElementById('environment-image');
    const layerContainer = document.getElementById('layer-container');

    const audio = document.getElementById('environment-audio');
    const soundToggle = document.getElementById('sound-toggle');

    // Remember the visitor's sound preference

    let soundEnabled = localStorage.getItem('gardenersAtlasSound') === 'true';
    let playbackBlocked = false;

    // Update the sound control

    function updateSoundButton() {

    soundToggle.setAttribute('aria-pressed', soundEnabled);

    if (!soundEnabled) {
        soundToggle.setAttribute('aria-label', 'Sound off');
    } else if (playbackBlocked) {
        soundToggle.setAttribute('aria-label', 'Sound on — tap to start');
    } else {
        soundToggle.setAttribute('aria-label', 'Sound on');
    }
}

    // Play the current environment's sound

    function playCurrentSound() {

        if (!soundEnabled || !audio.src) {
            return;
        }

        audio.play()
            .then(() => {
                playbackBlocked = false;
                updateSoundButton();
            })
            .catch(() => {
                playbackBlocked = true;
                updateSoundButton();
            });
    }

    // Change the environmental sound

    function changeEnvironmentSound(currentEnvironment) {

        // Stop the previous recording

        audio.pause();
        audio.currentTime = 0;

        playbackBlocked = false;

        // Handle environments without sound

        if (!currentEnvironment.sound) {
            audio.removeAttribute('src');
            audio.load();
            updateSoundButton();
            return;
        }

        // Load the new recording

        audio.src = currentEnvironment.sound;
        audio.load();

        // Play if the visitor has enabled sound

        playCurrentSound();

        updateSoundButton();
    }

    // Identify and display an environment

    function showEnvironment(environmentID) {

    const currentEnvironment = environments[environmentID];

    if (!currentEnvironment) {
        return;
    }

    environment.dataset.environment = environmentID;

    image.src = currentEnvironment.image;
    image.alt = currentEnvironment.name;

    document.title = currentEnvironment.name + " — Gardener's Atlas";

    // Display the environment's layers

    layerContainer.innerHTML = '';
    document.getElementById('phone-container').innerHTML = '';

    if (currentEnvironment.layers) {

        currentEnvironment.layers.forEach(layer => {

    let layerElement;

    if (layer.type === 'phone') {

        // Create the phone wrapper

        layerElement = document.createElement('div');
        layerElement.classList.add('environment-layer', 'phone-layer');

        const phoneImage = document.createElement('img');
        phoneImage.src = layer.image;
        phoneImage.alt = '';
        phoneImage.classList.add('phone-layer-image');

        layerElement.appendChild(phoneImage);

        // Create the screen text

        const screen = document.createElement('div');
        screen.classList.add('phone-screen-overlay');

        const date = document.createElement('div');
        date.textContent = layer.screen.date;
        date.classList.add('phone-date');

        const temperature = document.createElement('div');
        temperature.textContent = layer.screen.temperature;
        temperature.classList.add('phone-temperature');

        const conditions = document.createElement('div');
        conditions.textContent = layer.screen.conditions;
        conditions.classList.add('phone-conditions');

        // Place date and weather conditions on the same line

const topRow = document.createElement('div');
topRow.classList.add('phone-top-row');

topRow.appendChild(date);
topRow.appendChild(conditions);

screen.appendChild(topRow);
screen.appendChild(temperature);

        layerElement.appendChild(screen);

    } else {

        // Create an ordinary image layer

        layerElement = document.createElement('img');
        layerElement.src = layer.image;
        layerElement.alt = '';

        layerElement.classList.add('environment-layer');

    }

    layerElement.dataset.layer = layer.id;

    // Prepare the lawnmower for its intermittent appearances

// Prepare the lawnmower for its intermittent appearances

if (layer.id === 'e0002-l0002') {
    layerElement.classList.add('mower-intermittent');
}

// Apply painting coordinates to ordinary layers.
// The phone is positioned separately in the wooden menu.

if (layer.type !== 'phone') {

    layerElement.style.left = (layer.x || 0) + '%';
    layerElement.style.top = (layer.y || 0) + '%';
    layerElement.style.width = (layer.width || 20) + '%';

}

    if (layer.target) {
        layerElement.addEventListener('click', () => {
            window.location.hash = layer.target;
        });
    }

    if (layer.type === 'phone') {
    document.getElementById('phone-container').appendChild(layerElement);
} else {
    layerContainer.appendChild(layerElement);
}

    // Gardener's Atlas — intermittent lawnmower appearances

if (layer.id === 'e0002-l0002') {

    const mowerPositions = [
        { x: 65, y: 75 },
        { x: 45, y: 65 },
        { x: 25, y: 75 },
        { x: 0.8, y: 65 },
        { x: 89, y: 69 }
    ];

    let positionIndex = 0;

    function showMower() {

        const position = mowerPositions[positionIndex];

        // Move the mower while it is invisible

        layerElement.style.left = position.x + '%';
        layerElement.style.top = position.y + '%';

        // Fade in

        layerElement.style.opacity = '1';

        // After 4 seconds, begin fading out

        setTimeout(() => {

            layerElement.style.opacity = '0';

            // After the 1-second fade, wait 5 seconds

            setTimeout(() => {

                positionIndex = (positionIndex + 1) % mowerPositions.length;

                showMower();

            }, 2000);

        }, 4000);
    }

    // Begin the first appearance

    showMower();
}

});

    }

    changeEnvironmentSound(currentEnvironment);

    console.log('Current environment:', environmentID);
}

    // Handle environment navigation

    const environmentLinks = document.querySelectorAll('a[data-environment]');

    environmentLinks.forEach(link => {

        link.addEventListener('click', event => {

            event.preventDefault();

            const environmentID = link.dataset.environment;

            window.location.hash = environmentID;

        });

    });

    // Respond to URL changes

    function loadEnvironmentFromURL() {

        const environmentID = window.location.hash.substring(1)
            || environment.dataset.environment;

        showEnvironment(environmentID);
    }

    window.addEventListener('hashchange', loadEnvironmentFromURL);

    // Gardener's Atlas — Info toggle

const aboutToggle = document.getElementById('about-toggle');
const aboutText = document.getElementById('about-text');

aboutToggle.addEventListener('click', () => {

    const isExpanded = aboutToggle.getAttribute('aria-expanded') === 'true';

    aboutToggle.setAttribute('aria-expanded', !isExpanded);

    aboutText.hidden = isExpanded;

});
    
    // Sound control

    soundToggle.addEventListener('click', () => {

        if (soundEnabled && playbackBlocked) {
            playCurrentSound();
            return;
        }

        soundEnabled = !soundEnabled;

        localStorage.setItem('gardenersAtlasSound', soundEnabled);

        if (soundEnabled) {
            playCurrentSound();
        } else {
            audio.pause();
            playbackBlocked = false;
        }

        updateSoundButton();

    });

    // Initialise the website

    updateSoundButton();
    loadEnvironmentFromURL();

});
