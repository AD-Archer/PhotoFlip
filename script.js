// Array of images and links
const images = [
  {
      src: "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_1280.jpg",
      link: "https://www.example.com/dolphin",
      alt: "Dolphin",
      music: "https://youtu.be/aatr_2MstrI?si=4z7RIdec3TyvfYcm&t=84"
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
      music: "https://www.youtube.com/watch?v=vzGUGq5CHio"
  },

  {
    src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/04/pjimage-(8)-2.jpg",
    link: "https://www.example.com/onepiece",
    alt: "Waves",
    music: "https://www.youtube.com/watch?v=PwVT67T5Xt4"
}




];

// Set the starting image index
let currentIndex = 0;

// Select the DOM elements
const mainImage = document.getElementById('mainImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const musicButton = document.getElementById('externalLink');

// Set up the music button click event
musicButton.onclick = function() {
  window.location.href = images[currentIndex].music;
};

// Function to update the image and link
function updateImage() {
  mainImage.classList.remove('show'); // Remove class to trigger the transition

  // Wait for the transition to end before updating the image source
  setTimeout(() => {
      mainImage.src = images[currentIndex].src;
      mainImage.alt = images[currentIndex].alt;
      mainImage.classList.add('show'); // Add class to show the image smoothly
  }, 500); // Delay matches the CSS transition duration
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

document.addEventListener('DOMContentLoaded', function() {
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function() {
            const content = this.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
                this.classList.remove('active');
            } else {
                content.style.display = "block";
                this.classList.add('active');
            }
        });
    });
});


// Initialize with the first image
updateImage();
