    let activeBookId = null;

    function resizeFlipbook() {
    if (!activeBookId) return;

    let book = $("#" + activeBookId);
    let isMobile = window.innerWidth < 768;
    
    // Calculate max available bounds with padding
    let maxWidth = window.innerWidth * 0.99;
    let maxHeight = window.innerHeight * 0.8;

    // Base dimensions (Desktop spread ratio vs Mobile single-page ratio)
    let baseWidth = isMobile ? 350 : 822;
    let baseHeight = isMobile ? 450 : 532.5;
    let aspectRatio = baseWidth / baseHeight;

    let newWidth = maxWidth;
    let newHeight = newWidth / aspectRatio;

    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
    }

    // Update display mode and dimensions
    if (book.data('done')) {
        book.turn("display", isMobile ? "single" : "double");
        book.turn("size", newWidth, newHeight);
    } else {
        book.turn({
        width: newWidth,
        height: newHeight,
        display: isMobile ? "single" : "double",
        autoCenter: true
        });
    }
    }

    function openFlipbook(modalId, bookId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "block";
    activeBookId = bookId;

    // Small delay ensures DOM renders dimensions before calculation
    setTimeout(() => {
        resizeFlipbook();
    }, 50);
    }

    function closeFlipbook(modalId) {
    document.getElementById(modalId).style.display = "none";
    activeBookId = null;
    }

    // Automatically recalculate size on window resize
    $(window).on("resize", function () {
    resizeFlipbook();
    });













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















    $(document).ready(function () {
        const $targets = $('.logo-small, .search');
        const threshold = 50; // Pixels from the top before fading in
    
        // Set opacity to 0 immediately on load via jQuery
        $targets.css('opacity', 0);
    
        function handleScroll() {
        if ($(window).scrollTop() > threshold) {
            // Fade to opacity 1 when scrolled down past threshold
            $targets.stop().animate({ opacity: 1 }, 300);
        } else {
            $targets.stop().animate({ opacity: 0 }, 300);
        }
        }
    
        // Check position on load
        handleScroll();
    
        // Trigger on scroll
        $(window).on('scroll', handleScroll);
    });