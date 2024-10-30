// Function to fetch a cat fact
const fetchCatFact = async () => {
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        document.getElementById('catFact').textContent = data.fact;
    } catch (error) {
        console.error('Error fetching the cat fact:', error);
        document.getElementById('catFact').textContent = 'Fetching the cat fact failed. Please try again.';
    }
};

document.getElementById('newFactBtn').addEventListener('click', fetchCatFact);

// Event listener for age calculation form submission
document.getElementById('ageCalculator').addEventListener('submit', (e) => {
    e.preventDefault();
    const catAge = parseInt(document.getElementById('catAge').value);
    let humanAge;

    if (catAge === 1) {
        humanAge = 15;
    } else if (catAge === 2) {
        humanAge = 24;
    } else if (catAge > 2) {
        humanAge = 24 + (catAge - 2) * 4;
    } else {
        humanAge = 0;
    }

    const resultElement = document.getElementById('result');
    resultElement.textContent = `${catAge} year old cat is approximately ${humanAge} years old in human age.`;
    resultElement.classList.remove('hidden'); 
});

// Function to fetch a cat image
const fetchCatImage = async () => {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        document.getElementById('catImage').src = data[0].url;
    } catch (error) {
        console.error('Error fetching the cat image:', error);
        document.getElementById('catImage').alt = 'Fetching the cat image failed. Please try again.';
    }
};

// Event listener for fetching new cat image
document.getElementById('newImageBtn').addEventListener('click', fetchCatImage);


fetchCatFact();
fetchCatImage();

// Function to update the clock display
const updateClock = () => {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
};

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); 

// Tab functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabTriggers = document.querySelectorAll('.tabs-trigger');
    const tabContents = document.querySelectorAll('.tabs-content');
  
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', function () {
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
  
        const tab = this.getAttribute('data-tab');
        this.classList.add('active');
        document.getElementById(tab).classList.add('active');
      });
    });
  
    tabTriggers[0].classList.add('active');
    tabContents[0].classList.add('active');
  });

// Functionality for favorite cat breeds
document.addEventListener('DOMContentLoaded', () => {
    const breedInput = document.getElementById('catBreed');
    const addBreedBtn = document.getElementById('addBreedBtn');
    const breedList = document.getElementById('breedList');

    const loadBreeds = () => {
        const breeds = JSON.parse(localStorage.getItem('catBreeds')) || [];
        breedList.innerHTML = breeds.map(breed => `<li>${breed}</li>`).join('');
    };

    const addBreed = () => {
        const breed = breedInput.value.trim();
        const containsNumbers = /\d/.test(breed);

        // Check for valid breed input
        if (containsNumbers) {
            breedInput.setCustomValidity('Please enter a valid breed name without numbers.'); // Custom validity message
            breedInput.reportValidity(); 
            return; 
        }

         // Add breed if valid
        if (breed) {
            const breeds = JSON.parse(localStorage.getItem('catBreeds')) || [];
            breeds.push(breed);
            localStorage.setItem('catBreeds', JSON.stringify(breeds));
            breedInput.value = ''; 
            loadBreeds(); 
        } else {
            breedInput.setCustomValidity('Please fill out this field.');
            breedInput.reportValidity();
        }
    };

    // Event listener for adding a breed
    addBreedBtn.addEventListener('click', addBreed);

    // Load breeds on initial page load
    loadBreeds();
});
