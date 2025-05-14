"use strict";

// Change version in html files when updating this

// Landing page links
function navigateToPage(url) {
    window.location.href = url;
}

// Function to handle loading screen
function handleLoadingScreen() {
    const video1 = document.getElementById('video');
    const video2 = document.getElementById('videotwo');
    let videosLoaded = 0;
    let loadingTimeout;

    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500); // Adjust timing to match your CSS transition duration
        }
        clearTimeout(loadingTimeout); // Clear the fallback timeout
    }

    function checkVideosLoaded() {
        videosLoaded++;
        if ((video2 && videosLoaded === 2) || (!video2 && videosLoaded === 1)) {
            hideLoadingScreen();
        }
    }

    function setupVideo(video) {
        if (!video) return;

        video.addEventListener('canplaythrough', checkVideosLoaded);

        // Add a retry mechanism
        let retryCount = 0;
        const maxRetries = 3;
        const retryDelay = 1000; // 1 second

        function retryVideoLoad() {
            if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Retrying video load... Attempt ${retryCount}`);
                video.load();
                setTimeout(checkVideo, retryDelay);
            } else {
                console.error('Failed to load video after multiple attempts.');
                hideLoadingScreen();
            }
        }

        function checkVideo() {
            if (video.readyState >= 3) {
                console.log("Video is ready to play.");
                video.play().catch(error => {
                    console.error('Error attempting to play video:', error);
                    retryVideoLoad();
                });
            } else {
                console.warn("Video not ready, retrying...");
                setTimeout(retryVideoLoad, retryDelay);
            }
        }

        video.addEventListener('error', retryVideoLoad);
        checkVideo();
    }

    setupVideo(video1);
    setupVideo(video2);

    // Fallback to hide loading screen after 4 seconds
    loadingTimeout = setTimeout(hideLoadingScreen, 4000); // 4 seconds fallback
}

// Navs Button Animate In

function buttonAnimate() {
    var element = document.getElementById("buttons-chapters");
    element.classList.toggle('show');
}

function buttonAnimateNewsPage() {
    var element = document.getElementById("buttons-newspage");
    element.classList.toggle('newspagenav');
}

// Function to initialize the carousel
function initSlider() {
    const chaptersList = document.querySelector(".chapters-list");
    const slideButtons = document.querySelectorAll(".carouselbutton");
    const scrollSlider = document.querySelector(".scrollslider");
    const scrollThumb = scrollSlider.querySelector(".scrollthumb");
    const maxScrollLeft = chaptersList.scrollWidth - chaptersList.clientWidth;
    const chapters = document.querySelectorAll('.chapters-list .centerchapter img');

    // Hover over image element animations
    chapters.forEach(chapter => {
        chapter.addEventListener('mouseover', () => {
            chapters.forEach(c => c.classList.remove('active'));
            chapter.classList.add('active');
        });
    });

    // Drag the carousel with cursor
    let isDragging = false;
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    chaptersList.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        isDragging = false;
        startX = e.pageX - chaptersList.offsetLeft;
        scrollLeft = chaptersList.scrollLeft;
        e.preventDefault(); // Prevent image dragging
    });

    chaptersList.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        isDragging = true;
        e.preventDefault();
        const x = e.pageX - chaptersList.offsetLeft;
        const walk = (x - startX);
        chaptersList.scrollLeft = scrollLeft - walk;
    });

    chaptersList.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    chaptersList.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    const chapterLinks = document.querySelectorAll('.centerchapter a');

    chapterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
                isDragging = false;
            }
        });
    });

    // Scrollbar thumb drag
    scrollThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollThumb.offsetLeft;
        const maxThumbPosition = scrollSlider.getBoundingClientRect().width - scrollThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollThumb.style.left = `${boundedPosition}px`;
            chaptersList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Carousel move with arrows
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "leftslide" ? -1 : 1;
            const scrollAmount = chaptersList.clientWidth * direction;
            chaptersList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Hide irrelevant buttons based on carousel position
    const handleSlideButtons = () => {
        const buffer = 50; // Buttons disappear a bit before reaching end
        slideButtons[0].style.display = chaptersList.scrollLeft <= buffer ? "none" : "flex";
        slideButtons[1].style.display = chaptersList.scrollLeft >= maxScrollLeft - buffer ? "none" : "flex";
    };

    // Update scrollbar with carousel position
    const updateScrollThumbPosition = () => {
        const scrollPosition = chaptersList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (scrollSlider.clientWidth - scrollThumb.offsetWidth);
        scrollThumb.style.left = `${thumbPosition}px`;
    };

    chaptersList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });

    // Initial update for slider and buttons
    handleSlideButtons();
    updateScrollThumbPosition();
}

// Function to handle hamburger menu
function handleHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
}

// Consolidated event listener
document.addEventListener("DOMContentLoaded", function() {
    handleLoadingScreen();
    handleVideoAutoplay();
    initSlider();
    handleHamburgerMenu();
});

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

