
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










































const GALLERY_DIR = 'images/gallery/';
const IMAGE_PREFIX = 'gallery_image_';
const IMAGE_EXT = '.jpg';

let totalImages = 0;
let currentIndex = 1;

const imgEl = document.getElementById('gallery_modal_img');
const prevBtn = document.getElementById('gallery_modal_prev');
const nextBtn = document.getElementById('gallery_modal_next');

// Helper promise to check if an image exists
function testImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Probes images sequentially starting at 1 until a 404 occurs
async function initGallery() {
  let count = 0;
  
  while (true) {
    const testUrl = `${GALLERY_DIR}${IMAGE_PREFIX}${count + 1}${IMAGE_EXT}`;
    const exists = await testImageExists(testUrl);
    
    if (!exists) break;
    count++;
  }

  totalImages = count;

  if (totalImages > 0) {
    showImage(currentIndex);
  } else {
    console.warn('No images found in images/gallery/ matching convention.');
  }
}

function showImage(index) {
  imgEl.src = `${GALLERY_DIR}${IMAGE_PREFIX}${index}${IMAGE_EXT}`;
}

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

// Run initialization
initGallery();