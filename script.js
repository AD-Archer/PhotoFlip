// Array of images and links
const images = [
    {
      src: "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_1280.jpg",
      link: "https://www.example.com/dolphin",
      alt: "Dolphin",
      music: "https://www.youtube.com/watch?v=aatr_2MstrI"
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/11/22/23/12/beach-1851101_1280.jpg",
      link: "https://www.example.com/sea",
      alt: "Sea",
      music: "https://www.youtube.com/watch?v=RO_VGv4GT9k"
    },
    {
      src: "https://cdn.pixabay.com/photo/2018/03/02/21/49/waves-3194377_1280.jpg",
      link: "https://www.example.com/waves",
      alt: "Waves",
      music: "https://www.youtube.com/results?search_query=pirate+channel+wii+theme"
    }
];

// Set the starting image index
let currentIndex = 0;

// Select the DOM elements
const mainImage = document.getElementById('mainImage');
const imageLink = document.getElementById('imageLink');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const musicButton = document.getElementById('externalLink');

// Set up the music button click event
musicButton.onclick = function() {
  window.location.href = images[currentIndex].music;
};

// Function to update the image and link
function updateImage() {
  mainImage.src = images[currentIndex].src;
  mainImage.alt = images[currentIndex].alt;
  imageLink.href = images[currentIndex].link;
}

// Event listeners for the buttons
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Cycle backward
  updateImage();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length; // Cycle forward
  updateImage();
});

// Initialize with the first image
updateImage();
