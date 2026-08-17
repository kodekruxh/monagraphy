
$(document).ready(function() {
    const $wordList = $("#word-list");
    const wordsCount = $("#word-list div").length;
    const lineHeight = 1.2; // Matches your CSS em height
    let currentIndex = 0;
    let preloaderTriggered = false;

    // Function that actually hides the preloader safely
    function dismissPreloader() {
        if (preloaderTriggered) return; // Prevent running this twice
        preloaderTriggered = true;

        clearInterval(rollingInterval); // Stop any active intervals
        
        // Add a tiny beat, then slide up
        setTimeout(function() {
            $("#preloader").addClass("slide-up-curtain");
            
            // Garbage collection
            setTimeout(function() {
                $("#preloader").remove();
            }, 1600); // Matches your 1.5s CSS transition + buffer
        }, 300); 
    }

    // 1. Rolling Animation
    const rollingInterval = setInterval(function() {
        if (currentIndex < wordsCount - 1) {
            currentIndex++;
            $wordList.css("transform", "translateY(-" + (currentIndex * lineHeight) + "em)");
        } else {
            // Fail-safe: If the words finish cycling and window hasn't loaded, dismiss anyway!
            dismissPreloader();
        }
    }, 400); // Snappy 400ms pace works great for long lists

    // 2. Normal Curtain Lift (If page loads before words finish)
    $(window).on('load', function() {
        // Give the user a moment to see the brand, then dismiss
        setTimeout(dismissPreloader, 1000); 
    });
});














































const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx298rNWZ0scWOU4qvWD2ew-tI58rGFSQjXniIsdOYsB0l_NM2yRTPFg9qUOczEnGWF/exec";

  window.addEventListener("DOMContentLoaded", () => {
    fetchEventData();
  });

  async function fetchEventData() {
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();

      if (data.status === "success") {
        document.getElementById("modalHeading").innerText = data.heading;
        document.getElementById("modalDescription").innerText = data.description;
        document.getElementById("modalImage").src = data.image;
        
        // Display the modal
        document.getElementById("eventModal").style.display = "flex";
      } else {
        console.log("No event scheduled for today or image missing.");
      }
    } catch (err) {
      console.error("Error fetching event data:", err);
    }
  }

function eventCloseModal() {
  document.getElementById("eventModal").style.display = "none";
}










































const GALLERY_DIR = 'images/gallery/';
const IMAGE_PREFIX = 'gallery_image_';
const IMAGE_EXT = '.jpg';

let totalImages = 0;
let currentIndex = 1;

const modal = document.getElementById('gallery_modal');
const openBtn = document.getElementById('open_gallery_modal');
const closeBtn = document.getElementById('gallery_modal_close');
const imgEl = document.getElementById('gallery_modal_img');
const prevBtn = document.getElementById('gallery_modal_prev');
const nextBtn = document.getElementById('gallery_modal_next');

function testImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Probes available images on initialization
async function initGallery() {
  let count = 0;
  while (true) {
    const testUrl = `${GALLERY_DIR}${IMAGE_PREFIX}${count + 1}${IMAGE_EXT}`;
    const exists = await testImageExists(testUrl);
    if (!exists) break;
    count++;
  }
  totalImages = count;
}

function showImage(index) {
  imgEl.src = `${GALLERY_DIR}${IMAGE_PREFIX}${index}${IMAGE_EXT}`;
}

// Open modal
openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (totalImages > 0) {
    currentIndex = 1;
    showImage(currentIndex);
    modal.classList.add('is-active');
  } else {
    console.warn('No images loaded or found matching naming convention.');
  }
});

// Close modal function
function closeModal() {
  modal.classList.remove('is-active');
}

closeBtn.addEventListener('click', closeModal);

// Close on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Keyboard controls (Arrow keys + Escape)
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('is-active')) return;

  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// Navigation arrows
prevBtn.addEventListener('click', () => {
  if (totalImages === 0) return;
  currentIndex = currentIndex === 1 ? totalImages : currentIndex - 1;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  if (totalImages === 0) return;
  currentIndex = currentIndex === totalImages ? 1 : currentIndex + 1;
  showImage(currentIndex);
});

// Run probing on page load
initGallery();