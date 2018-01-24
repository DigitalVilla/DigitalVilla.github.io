console.log("conected");

var menu = document.querySelector("#nav-toggle");

document.addEventListener('click', function (e) {
    if (e.target.id == 2 || e.target.id == 3 || e.target.id == 4 || e.target.id == 5) {
        menu.checked = false;
    }
});