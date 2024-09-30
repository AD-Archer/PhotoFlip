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

let hiddenImages = {}; // Object to hold hidden images
let currentIndex = 0;

// Variables to store like/dislike counts
let likeCount = 0;
let dislikeCount = 0;

// Variables to track the like and dislike states
let liked = false;
let disliked = false;

// Select the DOM elements
const mainImage = document.getElementById('mainImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const hideButton = document.getElementById("hideButton");
const musicButton = document.getElementById('externalLink');
const likeButton = document.getElementById("likeButton");
const dislikeButton = document.getElementById("dislikeButton");
const likeCounter = document.getElementById("likeCount") || document.createElement('div'); // Fallback if not found
const dislikeCounter = document.getElementById("dislikeCount") || document.createElement('div'); // Fallback if not found
const feedbackButton = document.getElementById("feedbackButton")



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

    // Update the figcaption with the current image's alt text
    const caption = document.getElementById('caption');
    caption.textContent = images[currentIndex].alt; // Update the figcaption content

    mainImage.classList.add('show'); // Add class to show the image smoothly
  }, 500); // Delay matches the CSS transition duration
}

// Function to hide the current image
function hideImage() {
  mainImage.classList.remove('show'); // Trigger fade-out

  // Wait for the transition to end before hiding the image
  setTimeout(() => {
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
  }, 500); // Delay matches the CSS transition duration
  populateHiddenImagesDropdown();
}

// Function to populate the hidden images dropdown
function populateHiddenImagesDropdown() {
  const dropdown = document.getElementById('hiddenImagesDropdown');
  dropdown.innerHTML = ''; // Clear previous options
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '-- Select an Image --';
  dropdown.appendChild(defaultOption);

  // Populate the dropdown with hidden images
  for (const index in hiddenImages) {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = hiddenImages[index].alt; // Use the alt text for display
    dropdown.appendChild(option);
  }
}

// Function to unhide the selected image
function unhideImage() {
  const dropdown = document.getElementById('hiddenImagesDropdown');
  const selectedValue = dropdown.value;

  if (selectedValue) {
    // Retrieve the image to unhide using the selected value
    const imageToUnhide = hiddenImages[selectedValue];

    // Ensure that imageToUnhide exists before proceeding
    if (imageToUnhide) {
      // Add the image back to the main images array
      images.push(imageToUnhide);

      // Remove the image from the hidden images
      delete hiddenImages[selectedValue];

      // Populate the dropdown again
      populateHiddenImagesDropdown();

      // Set the current index to the last image after unhide, or to the unhidden image
      currentIndex = images.length - 1; // Always show the newly unhidden image
      updateImage();
    }
  }
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

hideButton.addEventListener("click", hideImage);

// Unhide button event listener
document.getElementById("unhideButton").addEventListener("click", unhideImage);

// Comment button event listener
document.getElementById("comment-button").addEventListener("click", () => { 
  document.getElementById("comment-text-area").value = ''; // Clears text area
});

// Like button event listener
likeButton.addEventListener('click', () => {
  if (liked) {
    // If already liked, unlike it
    likeCount--;
    liked = false;
  } else {
    // If not liked yet, like it
    likeCount++;
    liked = true;

    // If it was disliked, revert the dislike
    if (disliked) {
      dislikeCount--;
      disliked = false;
    }
  }

  // Trigger like animation 
  mainImage.classList.add('liked');  // Add animation class
  setTimeout(() => {
    mainImage.classList.remove('liked');  // Remove after animation finishes
  }, 1000);  // Duration matches CSS animation

  updateLikeDislikeUI(); // Update the UI with new counts
});

// Dislike button event listener
dislikeButton.addEventListener('click', () => {
  if (disliked) {
    // If already disliked, remove the dislike
    dislikeCount--;
    disliked = false;
  } else {
    // If not disliked yet, dislike it
    dislikeCount++;
    disliked = true;

    // If it was liked, revert the like
    if (liked) {
      likeCount--;
      liked = false;
    }
  }

  // Trigger dislike animation
  mainImage.classList.add('disliked');  // Add animation class
  setTimeout(() => {
    mainImage.classList.remove('disliked');  // Remove after animation finishes
  }, 1000);  // Duration matches CSS animation

  updateLikeDislikeUI(); // Update the UI with new counts
});

// Function to update like/dislike UI
function updateLikeDislikeUI() {
  // Toggle button styles for the liked state
  if (liked) {
    likeButton.classList.add('active-like');
  } else {
    likeButton.classList.remove('active-like');
  }

  // Toggle button styles for the disliked state
  if (disliked) {
    dislikeButton.classList.add('active-dislike');
  } else {
    dislikeButton.classList.remove('active-dislike');
  }

  // Update the like and dislike counters
  likeCounter.textContent = `Likes: ${likeCount}`;
  dislikeCounter.textContent = `Dislikes: ${dislikeCount}`;
}

// Share button event listener
document.getElementById('shareButton').addEventListener('click', function() {
  const currentImageLink = images[currentIndex].src; // Update to use the current image link
  const shareText = `Check out this image: ${currentImageLink}`;

  if (navigator.share) {
    navigator.share({
      title: 'Shared Image',
      text: shareText,
      url: currentImageLink
    }).then(() => {
      console.log('Successful share');
    }).catch((error) => {
      console.log('Error sharing:', error);
    });
  } else {
    console.log('Share not supported');
  }
});

// Function to handle form submission
document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const selectedTheme = document.getElementById('themeDropdown').value;

  // Validate that a theme has been selected
  if (selectedTheme) {
      // Store user preferences in local storage
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userTheme', selectedTheme);

      // Display a response message
      document.getElementById('formResponse').textContent = `Thank you, ${name}! Your preferences have been saved.`;

      // Optionally, you can apply the selected theme immediately
      applyTheme(selectedTheme);
  } else {
      document.getElementById('formResponse').textContent = 'Please select a theme.';
  }

  // Clear the form inputs
  document.getElementById('userForm').reset();
});

// Function to apply the selected theme
function applyTheme(theme) {
  document.body.classList.remove('light', 'dark', 'colorful'); // Remove existing theme classes
  document.body.classList.add(theme); // Add the selected theme class
}

// Check for saved user preferences on load
window.onload = function() {
  const savedTheme = localStorage.getItem('userTheme');
  if (savedTheme) {
      applyTheme(savedTheme);
  }
};

// Show feedback form when the feedback button is clicked
document.getElementById('feedbackButton').addEventListener('click', function() {
  const feedbackFormSection = document.getElementById('feedbackFormSection');
  feedbackFormSection.style.display = feedbackFormSection.style.display === 'none' ? 'block' : 'none';
});

// Function to handle feedback form submission
document.getElementById('feedbackForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const feedbackText = document.getElementById('feedback').value;
  const feedbackName = document.getElementById('feedbackName').value;
  const feedbackEmail = document.getElementById('feedbackEmail').value;

  // You can handle feedback submission logic here (e.g., send to server or store locally)
  
  // Display a response message
  document.getElementById('feedbackResponse').textContent = `Thank you for your feedback, ${feedbackName || 'Guest'}!`;

  // Optionally, save feedback to local storage (you can modify this as needed)
  localStorage.setItem('userFeedback', JSON.stringify({ feedbackText, feedbackName, feedbackEmail }));

  // Clear the form inputs
  document.getElementById('feedbackForm').reset();
});


// Initial image setup
updateImage();
populateHiddenImagesDropdown(); // Populate dropdown on startup
