console.log("conected");

var menu = document.querySelector("#nav-toggle");

document.addEventListener('click', function (e) {
    if (e.target.id >= 1 && e.target.id <= 6) {
        menu.checked = false;
    }
});