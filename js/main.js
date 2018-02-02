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