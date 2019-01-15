let animations, index, sliderStyles, arrowsStyle, imgStyle, context, lftArrow, rgtArrow, loopSec, loopId, LOOP, outDelay, toggle, textToggle;

const slider = $("#slider");
let imageSlider = [];


//START development

init(); // sets the slider attributes
renderImg(index); // index is the index of the image. default starts at 0 

loopId = loop(LOOP);


function init() {
    // customize 
    index = 0; //the index of the starting image
    loopDelay = 4; //the delay for the loop in Seconds
    outDelay = 800; //the delay for the outSlide in milliseconds
    LOOP = true; // pass "false" to stop the default loop

    // Change Styles  Here
    sliderStyles = {
        // maxWidth: "800px",
        width: "80vw",
        height: "90vw",
        maxHeight: "100vh",
        margin: "auto",
        backgroundColor: "transparent",
        borderRadius: "4px",
        position: "relative",
        paddingTop: "5vw",
        // overflow: "hidden",
        // boxShadow: "0 .5rem 2rem #000a",
        textAlign: "center"
    };

    //Style for the context box
    context = {
        width: "100%",
        fontSize: "1em",
        height: "20%",
        position: "absolute",
        padding: "0 2em",
        fontFamily: "Verdana, Sans-serif",
        color: "#eee",
        zIndex: "0",
        bottom: "0",
        transition: "all .5s ease-in-out",
        animationDuration: ".5s",
        animationFillMode: "both",
        animationName: "fadeIn"
    };

    //image style
    imgStyle = {
        position: "absolute",
        width: "100%",
        left: "0",
        cursor: "pointer",
        // top: "15%",

        transition: "all 1.5s ease-in-out",
        animationDuration: ".8s",
        animationFillMode: "both",
        animationName: "fadeIn"
    };

    // arrowsStyle
    arrowsStyle = {
        position: "absolute",
        top: "45%",
        opacity: ".2",
        color: "#fff",
        zIndex: "10",
        cursor: "pointer"
    };



    imageSlider = [{
            title: "Ztore",
            text: "An online store prototype in ES6 and CSS Grid",
            src: "/img/slides/ztore.png",
            color: "#ff065f"
        },
        {
            title: "Village Manager",
            text: "A Real State CRUD application in Java and Swing",
            src: "/img/slides/RealStateApp.png",
            color: "#29394f"
        },
        {
            title: "iNotes",
            text: "A note taker application using Cookies, session storage and JSP's",
            src: "/img/slides/NotesApp.png",
            color: "#0098d5"
        },
        {
            title: "RPG Card Game",
            text: "A React.js prototype for the select screen with pure CSS",
            src: "/img/slides/RpgCats.png",
            color: "#ff46a3"
        },
        {
            title: "Palace Pizza UI",
            text: "A UI mock up for a pizza application in pure CSS",
            src: "/img/slides/pizzaUI.png",
            color: "#ff2b40"
        },
        {
            title: "HighLands UI/UX",
            text: "A functional prototype for a landscaping application in pure CSS and JS",
            src: "/img/slides/Landscape.png",
            color: "#00b187"
        },
        {
            title: "Battleship Online Game",
            text: "A multiplayer online game/chat in Java and JavaFX",
            src: "/img/slides/BattleShip.png",
            color: "#365d81"
        },
        {
            title: "Carousel JS",
            text: "A no-jQuery content slider in pure vanilla",
            src: "/img/slides/Carousel.png",
            color: "#6f9d2c"
        },
        {
            title: "Duo Pong Game",
            text: "A vanilla JS game rendered in Canvas",
            src: "/img/slides/duopong.png",
            color: "#0086d2"
        },
        {
            title: "Match.io Game",
            text: "A responsive matching game in pure vanilla JS and css",
            src: "/img/slides/match.png",
            color: "#ff3066"
        },
        {
            title: "D'ice Game",
            text: "A multiplayer vanilla JS Poker/dice game",
            src: "/img/slides/dice.png",
            color: "#00a592"
        },
        {
            title: "Stats Calculator",
            text: "A responsive app to process a 'n' set of values.",
            src: "/img/slides/statscalc.png",
            color: "#1c1c1c"
        },
        {
            title: "Dice App iOS",
            text: "A simple rolling dice app developed in Swift",
            src: "/img/slides/gameDice.png",
            color: "#0081ab" //optional
        },
        {
            title: "Advance To-do App",
            text: "Add, delete & swap to-do's saved in your local Storage",
            src: "/img/slides/adTodo.png",
            color: "#ff4c6b" //optional
        },
        {
            title: "Pig Out Game",
            text: "A 2 player game in pure vanilla JS",
            src: "/img/slides/pigOut.png",
            color: "#4e8fc7" //optional
        },
        {
            title: "PocketChange App",
            text: "A responsive currency converter (web app)",
            src: "/img/slides/PocketChange.png",
            color: "#00ad96" //optional
        },
        {
            title: "Key-Search AJAX",
            text: "A prototype search app using AJAX (web app)",
            src: "/img/slides/keySearch.png",
            color: "#181818"
        }


    ]

    lftArrow = newElement("i", slider, "fas fa-arrow-alt-circle-left fa-3x");
    rgtArrow = newElement("i", slider, "fas fa-arrow-alt-circle-right fa-3x");
    textToggle = false;
    toggle = true; //avoid double clicking on arrows
}





//delete duplicate box context when the arrow is clicked 
slider.addEventListener("click", (e) => {
    if (e.target.nodeName == "IMG")
        if (!textToggle) {
            // textToggle = !textToggle;
            renderTxt(index);
        } else {
            textToggle = !textToggle;
            slider.removeChild(slider.children[3]);
        }
});


// right arrow function
rgtArrow.addEventListener('click', function nextImage() {
    if (toggle) {
        slideImage(true);
        resetLoop(loopId);
    }
});


//left Arrow function
lftArrow.addEventListener('click', function () {
    if (toggle) {
        slideImage(false);
        resetLoop(loopId);
    }
});

//starts index from zero
function resetLoop(id) {
    clearInterval(id);
    loopId = loop(LOOP);
}

/// loop on
function loop(loop) {
    if (!loop) return;
    const id = setInterval(() => {
        slideImage(true);
    }, loopDelay * 1000);
    return id;
}

function slideImage(right) {
    let slideOut = (right) ? "fadeOutLeft" : "fadeOutRight";
    animate(slideOut, index); //previous

    index = (right) ? (++index == imageSlider.length) ? 0 : index :
        (--index < 0) ? imageSlider.length - 1 : index;

    renderImg(index);
    let slideIn = (right) ? "fadeInRight" : "fadeInLeft";
    animate(slideIn, index);
    clear(index, outDelay);
    renderTxt(index);
    // textToggle = false; 
}


//add the default style for arrow and add left position
let lftStyle = Object.create(arrowsStyle);
lftStyle.left = "2%";

//add the default style for arrow and add right position
let rgtStyle = Object.create(arrowsStyle);
rgtStyle.right = "2%";

// add all styles to Node elements
setStyles(lftArrow, lftStyle);
setStyles(rgtArrow, rgtStyle);
setStyles(slider, sliderStyles);

// still in development to add transitions and fade ins/outs
function animate(animation, index) {
    try {

        let img = $("img.slide" + index);
        img.style.animationName = animation;

        let text = $("div.slide" + index);
        text.style.animationName = animation;

    } catch (TypeError) {
        // console.log("Dont! you are going to break it");
        toggle = false
        setTimeout(() => {
            toggle = true;
        }, 800);
    }

}

// Utils
function renderImg(indx = 0) {
    let img = newElement('img', slider, `slide${indx}`, {
        src: imageSlider[indx].src
    })
    setStyles(img, imgStyle);
}

function renderTxt(indx = 0) {
    let text = newElement('div', slider, `slide${indx}`);
    text.setAttribute('data-class', "text");
    text.style.backgroundColor = `${imageSlider[indx].color || "#777"}`;
    text.innerHTML = `<h2 style="margin:.6rem 0;">${imageSlider[indx].title}</h2>
    <p>${imageSlider[indx].text}</p>`;
    setStyles(text, context);
    textToggle = true;
}

function newElement(tag, parent, className, attributes) {
    let el = document.createElement(tag);
    el.setAttribute('class', className);
    if (attributes)
        for (let a in attributes) {
            el.setAttribute(a, attributes[a]);
        }
    parent.appendChild(el);
    return parent.lastElementChild;
}

//add all the styles in the style constructor 
function setStyles(tag, styles) {
    for (key in styles) {
        tag.style[key] = styles[key];
    }
}

// delete the previous slide 
function clear(pos, delay) {

    setTimeout(() => {
        [].slice.call($('[class^="slide"]')).forEach((el, i, arr) => {

            if (el.className !== `slide${pos}`) {
                el.remove();
            }
        })
    }, delay);
}

if (matchMedia) {
    let lg = window.matchMedia("(max-width : 1200px)"); //screen media query
    let md = window.matchMedia("(max-width : 800px)"); //screen media query
    let sm = window.matchMedia("(max-width : 450px)"); //screen media query
    //Event Listeners
    lg.addListener(mediaQuery);
    md.addListener(mediaQuery);
    sm.addListener(mediaQuery);
    mediaQuery(md);
}

// in beta
function mediaQuery(query) {
    if (query.media === "(max-width: 1200px)" && query.matches) {
        // slider.style.backgroundColor = "#f44";
        // slider.style.height = "30vh";
        slider.style.paddingTop = "5vw";
        slider.style.fontSize = "16px";
        slider.style.width = "90vw";
        // slider.style.height = "50vw";
    } else if (query.media === "(max-width: 800px)" && query.matches) {
        // slider.style.backgroundColor = "#faa";
        // slider.style.height = "30vh";
        slider.style.paddingTop = "5vw";
        slider.style.fontSize = "12px";
        slider.style.width = "100vw";
        // slider.style.height = "50vw";
    } else if (query.media == "(max-width: 450px)" && query.matches) {
        slider.style.width = "100vw";
        slider.style.paddingTop = "10vw";
        // slider.style.backgroundColor = "#afa";
        slider.style.fontSize = "10px";
    } else { //default
        // slider.style.height = "height:400px";
        slider.style.width = "80vw";
        // slider.style.height = "40vw";
        // slider.style.backgroundColor = "#aaf";
    }
}

// let screen = window.innerWidth ||
//     document.documentElement.clientWidth ||
//     document.body.clientWidth;

// if (screen <= 450)
//     mediaQuery(sm);
// else if (screen <= 800)
//     mediaQuery(md);
// else if (screen <= 1200)
//     mediaQuery(lg);

//Selector
function $(param) {
    let query = document.querySelectorAll(param);
    return (query.length == 1) ? query[0] : query;
}

//Custom multi listener to add multiple events that require the same functionality
function addListenerMulti(el, events, fn) {
    events.split(' ').forEach(e => el.addEventListener(e, fn, false));
}




// [id^='someId'] will match all ids starting with someId.
// [id$='someId'] will match all ids ending with someId.
// [id*='someId'] will match all ids containing someId.
// transition: background[property] 1.5s[duration] ease-in[timing] 1[delay];
// media queries 
// https: //developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
// event types
// https://developer.mozilla.org/en-US/docs/Web/Events

////