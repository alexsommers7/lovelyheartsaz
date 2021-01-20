// LOADING ANIMATION
let body = document.querySelector("body");
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    body.classList.remove("loading");
  }, 2000);
});

// INTERSECTION OBSERVER API - FADE ON SCROLL
const observerOptions = {
  root: null, // Null = use viewport as root
  rootMargin: '0px', // Margin if desired for root
  threshold: 0.25 // Percentage of visibility needed on target element to run callback function
};

function observerCallback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Fade in from top
      if (entry.target.classList.contains('fadeFromTop')) {
        entry.target.classList.replace('fadeFromTop', 'fadeFromTopVisible');
      }
      // Fade in from bottom
      else if (entry.target.classList.contains('fadeFromBottom')) {
        entry.target.classList.replace('fadeFromBottom', 'fadeFromBottomVisible');
      }
      // Fade in from left
      else if (entry.target.classList.contains('fadeFromLeft')) {
        entry.target.classList.replace('fadeFromLeft', 'fadeFromLeftVisible');
      }
      // Fade in from right
      else if (entry.target.classList.contains('fadeFromRight')) {
        entry.target.classList.replace('fadeFromRight', 'fadeFromRightVisible');
      }
    }
  });
};

const fadeElms = document.querySelectorAll('.fade');

const observer = new IntersectionObserver(observerCallback, observerOptions);
fadeElms.forEach(el => observer.observe(el));