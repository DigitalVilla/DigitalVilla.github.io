console.log("conected");

addEventListener("load", function () {
    setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
    window.scrollTo(0, 1);
}

var menu = document.querySelector("#nav-toggle");

document.addEventListener('click', function (e) {
    if (e.target.id >= 1 && e.target.id <= 6) {
        menu.checked = false;
    }
});

var lightbox = document.getElementsByClassName("lightbox_photo");
lightbox.onclick = function () {
    lightbox.onhover.call(lightbox);
};

//Slider
var slideIndex = 1;
showSlides(slideIndex);

function plusDivs(indx) {
    showSlides(slideIndex += indx);
}

function currentDiv(indx) {
    showSlides(slideIndex = indx);
}

function showSlides(indx) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("slider-nav-pager-divs");
    if (indx > slides.length) {
        slideIndex = 1
    }
    if (indx < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("current", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " current";
}