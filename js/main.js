console.log("conected");

var menu = document.querySelector("#nav-toggle");

document.addEventListener('click', function (e) {
    if (e.target.id >= 1 && e.target.id <= 6) {
        menu.checked = false;
    }
});


// var p = document.getElementsByTagName('p')[0];
// p.onclick = function() {
//  // Trigger the `hover` event on the paragraph
//  p.onhover.call(p);
// };



//mobile function

// $(document).ready(function() {
//     $('.hover').bind('touchstart touchend', function(e) {
//         e.preventDefault();
//         $(this).toggleClass('hover_effect');
//     });
// });
var lightbox = document.getElementsByClassName("lightbox_photo");
lightbox.onclick = function () {
    lightbox.onhover.call(lightbox);
};