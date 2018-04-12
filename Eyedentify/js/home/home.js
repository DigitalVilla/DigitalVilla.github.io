var showGallery = true;
var selected = false;
let index = 1;

$(document).ready(function () {
    $("#photoGallery").hide();
});

function photoGalleryMove() {
    if (showGallery) {
        $("#photoGallery").show();
        showGallery = false;
        window.scrollTo(0, document.body.scrollHeight);
        $("#search").removeClass("fg_muted");
        selected = true;
    } else {
        $("#photoGallery").hide();
        showGallery = true;
        $("#search").addClass("fg_muted");
        selected = false;
    }
}
function takePhoto() {
    var flash = document.getElementById("camera");
    let photo = document.getElementById(("birdSlide"+index));
    photo.classList.remove("hideIt");
    photo.setAttribute("src", "/Eyedentify/img/home/"+index+".jpg");
    $("#gallery").carousel((index-1));
    index=(++index==4)?0:index;
    flash.classList.add("flash");
    setTimeout(() => {
        flash.classList.remove("flash");
    }, 200);
    if (showGallery) {
        photoGalleryMove();
    }
}

function selectImage(image, isValid) {
    if (isValid) {
        $(image).css("border", "solid #ebebff 4px");
        $(image).css("border-radius", ".5rem");
        
    } else {
        $(image).css("border", "solid grey 2px");
    }
}

function clearBorders() {
    $("#slide1").css("border-style", "hidden");
    $("#slide2").css("border-style", "hidden");
    $("#slide3").css("border-style", "hidden");
    $("#search").addClass("text-muted")
}

function photoId () {
    if (selected)
        window.location = "/Eyedentify/pages/loading.html";
}