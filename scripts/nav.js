// NAV FUNCTIONALITY
const navList = document.querySelector(".nav__list");
const navToggle = document.querySelector("#navi-toggle");

// toggle hamburger to x and open bg/nav list on nav button or item click
navToggle.addEventListener("click", updateNav);
navList.addEventListener("click", updateNav);

function updateNav() {
    navToggle.classList.toggle("nav-open");
    navToggle.classList.toggle("nav-closed");
    navList.classList.toggle("nav-open");
    navList.classList.toggle("nav-closed");
};

// STICKY NAV
const navBar = document.querySelector(".intro");

window.onscroll = () => {
    (window.pageYOffset > 500)
        ? navBar.classList.add("collapsed")
        : navBar.classList.remove("collapsed");
};

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (el) {
        el.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});