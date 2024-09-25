// Array of images and links
let images = [
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
    alt: "One Piece",
    music: "https://www.youtube.com/watch?v=PwVT67T5Xt4"
  },
  {
    src: "images/diveOllyDive.jpg",
    link: "",
    alt: "Dive Olly Dive",
    music: "https://www.youtube.com/watch?v=QHFtmQdJm10"
  },
  {
    src: "images/Subnautica.avif",
    link: '',
    alt: "Subnatica world record",
    music: "https://www.youtube.com/watch?v=Gf4y00_Y8Ic"
  }
];

let hiddenImages = {} //hidden images
let liked = {} //liked images
let disliked = {}

// Set the starting image index
let currentIndex = 0;

// Select the DOM elements
const mainImage = document.getElementById('mainImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const hideButton = document.getElementById("hideButton")
const musicButton = document.getElementById('externalLink');
const imageList = document.getElementById('imageList');

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

// Function to create the sidebar
function populateSidebar() {
  images.forEach((image, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = image.alt;
    listItem.addEventListener('click', () => {
      currentIndex = index;
      updateImage();
    });
    imageList.appendChild(listItem);
  });
}

function hideImage() {
  // Add the current image to hiddenImages
  hiddenImages[currentIndex] = images[currentIndex];

  // Remove the image from the main images array
  images.splice(currentIndex, 1);

  // Handle the case where we removed the last image
  if (currentIndex >= images.length) {
    currentIndex = images.length - 1;
  }

  // Update the displayed image
  updateImage();
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

hideButton.addEventListener("click",hideImage)

const likeButton = document.getElementById("likebutton");
const dislikeButton = document.getElementById("dislikebutton");

// Function to trigger like animation
likeButton.addEventListener('click', () => {
  mainImage.classList.add('liked');  // Add animation class
  setTimeout(() => {
    mainImage.classList.remove('liked');  // Remove after animation finishes
  }, 1000);  // Duration matches CSS animation
});

// Function to trigger dislike animation
dislikeButton.addEventListener('click', () => {
  mainImage.classList.add('disliked');  // Add animation class
  setTimeout(() => {
    mainImage.classList.remove('disliked');  // Remove after animation finishes
  }, 1000);  // Duration matches CSS animation
});



// Initialize with the first image
updateImage();
populateSidebar();
