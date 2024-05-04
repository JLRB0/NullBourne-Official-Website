"use strict";

// Landing page links

function navigateToPage(url) {
    window.location.href = url;
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



    
// Carousel 
const initSlider = () => {
    const chaptersList = document.querySelector(".chapters-list");
    const slideButtons = document.querySelectorAll(".carouselbutton");
    const scrollSlider = document.querySelector(".scrollslider");
    const scrollThumb = scrollSlider.querySelector(".scrollthumb");
    const maxScrollLeft = chaptersList.scrollWidth - chaptersList.clientWidth;
    const chapters = document.querySelectorAll('.chapters-list .centerchapter img');

    // allow dragging on images; doesnt activate pdf; still allows legit clicks on images

    let isDragging = false;
    let startPos = null;


    chaptersList.addEventListener('mousedown', (e) => {
        isDragging = false;
        startPos = { x: e.clientX, y: e.clientY };
    });
    
    chaptersList.addEventListener('mousemove', (e) => {
        if (!startPos) return;
        if (Math.abs(startPos.x - e.clientX) > 10 || Math.abs(startPos.y - e.clientY) > 10) {
            isDragging = true;
        }
    });
    
    chaptersList.addEventListener('mouseup', () => {
        startPos = null;
    });
    
            // Preventing click on anchor if dragging has occurred
            
        const chapterLinks = document.querySelectorAll('.centerchapter a');
        
        chapterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (isDragging) {
                    e.preventDefault();
                }
                // Resetting isDragging after click
                isDragging = false;
            });
        });


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

    let isMouseDown = false;
    let startX;
    let scrollLeft;

    chaptersList.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX;
        scrollLeft = chaptersList.scrollLeft;
    });

    chaptersList.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    chaptersList.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    chaptersList.addEventListener('mousemove', (e) => {
        if(!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX);
        chaptersList.scrollLeft = scrollLeft - walk;

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










