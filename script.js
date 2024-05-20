"use strict";

// Change version in html files when updating this

// Landing page links

function navigateToPage(url) {
    window.location.href = url;
}

// // Video autoplay on IOS

// document.addEventListener('DOMContentLoaded', function () {
//     var video = document.getElementById('video');
//     function tryPlayVideo() {
//         var playPromise = video.play();
//         if (playPromise !== undefined) {
//             playPromise.then(function() {
//                 console.log('Autoplay started successfully');
//             }).catch(function(error) {
//                 console.log('Autoplay was prevented. Retrying...', error);
//                 setTimeout(tryPlayVideo, 100); // Retry after a short delay
//             });
//         }
//     }
//     tryPlayVideo();
// });

// Navs Button Animate In

function buttonAnimate() {
    var element = document.getElementById("buttons-chapters");
    element.classList.toggle('show');
}

function buttonAnimateNewsPage() {
    var element = document.getElementById("buttons-newspage");
    element.classList.toggle('newspagenav');
}



    
// Carousel 
const initSlider = () => {
    const chaptersList = document.querySelector(".chapters-list");
    const slideButtons = document.querySelectorAll(".carouselbutton");
    const scrollSlider = document.querySelector(".scrollslider");
    const scrollThumb = scrollSlider.querySelector(".scrollthumb");
    const maxScrollLeft = chaptersList.scrollWidth - chaptersList.clientWidth;
    const chapters = document.querySelectorAll('.chapters-list .centerchapter img');


    // hover over image element animations

    chapters.forEach(chapter => {
        chapter.addEventListener('mouseover', () => {
            // Remove the 'active' class from all chapters
            chapters.forEach(c => {
                c.classList.remove('active');
            });
            // Add the 'active' class to the hovered chapter
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
        e.preventDefault(); // Prevent default behavior during dragging
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
                isDragging = false; // Reset dragging state after preventing default
            }
        });
    });

    // scrollbar thumb drag

    scrollThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollThumb.offsetLeft;
        const maxThumbPosition = scrollSlider.getBoundingClientRect().width - scrollThumb.offsetWidth;

        // Update scrollthumb with mouse move

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            
            // Ensure the scrollbar thumb stays within bounds

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollThumb.style.left = `${boundedPosition}px`;
            chaptersList.scrollLeft = scrollPosition;

        }

        // Remove Event listener on no interaction

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)

        }

        // Event listener for dragging scrollbar

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

    });

    // carousel move with arrows

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "leftslide" ? -1 : 1;
            const scrollAmount = chaptersList.clientWidth * direction;
            chaptersList.scrollBy({ left: scrollAmount, behavior: "smooth" });

        });

    });

    // hide irrelevant buttons based on carousel position

    const handleSlideButtons = () => {
        const buffer = 50; // so buttons disappear a bit before reaching end
        slideButtons[0].style.display = chaptersList.scrollLeft <= buffer ? "none" : "flex";
        slideButtons[1].style.display = chaptersList.scrollLeft >= maxScrollLeft - buffer ? "none" : "flex";
    }

    // update scrollbar with carousel position 

    const updateScrollThumbPosition = () => {
        const scrollPosition = chaptersList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (scrollSlider.clientWidth - scrollThumb.offsetWidth);
        scrollThumb.style.left = `${thumbPosition}px`;

    }

    chaptersList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });


}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);










