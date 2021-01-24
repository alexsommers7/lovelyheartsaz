// dom variables
const buttonTrack = document.querySelector(".services");
const buttons = document.querySelectorAll(".service");
const numButtons = buttons.length;
const dotContainer = document.querySelector(".carousel__dots");
const arrows = document.querySelectorAll(".carousel__arrow");
const carouselHeading = document.querySelector(".carousel__heading");
const carouselImage = document.querySelector(".carousel__image img");
const carouselText = document.querySelector(".carousel__text");

// store each carousel item's content in nested array
const headingElements = document.querySelectorAll(".service .service__heading");
const imgElements = document.querySelectorAll(".service__image");
const textElements = document.querySelectorAll(".carousel__text");

let carouselItems = [];
for (let i = 0; i < textElements.length; i++) {
    carouselItems.push([
        imgElements[i].src,
        textElements[i].textContent
    ]);
};

// create a dot for each slide. Store all in array
buttons.forEach(button => {
    let newContainer = document.createElement("div");
    newContainer.classList.add("carousel__dot");
    dotContainer.appendChild(newContainer);
});
const dots = document.querySelectorAll(".carousel__dot");

// initialize counter var. Start in middle if on mobile
let position = 0;
if (screen.width <= 900) {
    position = 2;
}

// slider functionality
function carousel(n) {

    // if at last item, reset to first. if at first item, go to last
    if (n >= numButtons) n = 0;
    else if (n < 0) n = (numButtons - 1);

    // calculate width of carousel item plus margins (for mobile)
    let buttonWidth = document.querySelector(".service:not(.active)").getBoundingClientRect().width + 40;

    // if on mobile, move slide track
    // because we are starting with position = 2 on mobile, we need to account for the + and - translates above/below the middle point
    if (screen.width <= 900) {
        if (n === 0) buttonTrack.style.transform = `translateX(${buttonWidth * (n + 2)}px)`
        else if (n < 2) buttonTrack.style.transform = `translateX(${buttonWidth * n}px)`
        else buttonTrack.style.transform = `translateX(-${buttonWidth * (n - 2)}px)`
    }

    // remove active class for all buttons & dots
    for (let i = 0; i < numButtons; i++) {
        buttons[i].classList.remove("active");
        dots[i].classList.remove("active");
    }

    // set active class to current slide & dot
    buttons[n].classList.add("active");
    dots[n].classList.add("active");

    // show content at n index
    carouselImage.src = carouselItems[n][0];
    carouselText.textContent = carouselItems[n][1];

    // add animation class
    carouselImage.classList.add('carouselImageFade');
    carouselText.classList.add('carouselTextFade');

    // remove animation class once animation finishes
    setTimeout(function () {
        carouselImage.classList.remove('carouselImageFade');
        carouselText.classList.remove('carouselTextFade');
    }, 500);

    // update and return counter variable
    return position = n;
};

// call function on page load to initalize
carousel(position);

// autoplay every 5 seconds
let autoplay = setInterval(() => carousel(position + 1), 5000);

// call carousel function and kill autoplay on click of button/dot/arrow
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        carousel(i);
        clearInterval(autoplay);
    })
    dots[i].addEventListener("click", function () {
        carousel(i);
        clearInterval(autoplay);
    })
    if (i < arrows.length) {
        arrows[i].addEventListener("click", function () {
            clearInterval(autoplay);
        })
    }
};


// swiping functionality on touchscreen
let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    if (touchendX < touchstartX) carousel(position + 1);
    if (touchendX > touchstartX) carousel(position - 1);
}

buttonTrack.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
}, { passive: true });

buttonTrack.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
    clearInterval(autoplay);
}, { passive: true });