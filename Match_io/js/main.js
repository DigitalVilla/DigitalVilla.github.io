let sec = 0;
let pair = 0;
let count = 0;
let score = 0;
let turn = 0;
let match = [];
let cards = [];
let gamePad = "";
let timer = "";
let turns = '';
let pairs = '';
let scores = '';
let scoreCard = '';

let memorax = {
    createDeck: function (cards, line) {
        let deck = cards.concat(cards);
        this.loadcards(this.shuffle(deck), line);
    },
    loadcards: function (deck, line) {
        let i = 0;
        deck.forEach(c => {
            this.createCard(c);
            if (++i == line) {
                setLineBreak();
                i = 0;
            }
        });
    },
    setLineBreak: function () {
        let div = document.createElement('div');
        div.setAttribute('class', 'linebreak');
        gamePad.appendChild(div);
    },
    createCard: function (c) {
        let div = document.createElement('div');
        div.setAttribute('class', 'game-pad_card');
        let html = [
            '<div data-id="' + c.id + '" class="game-pad_card-face face-down">',
            '<svg class="face-down_img">',
            '<use xlink:href="/Match_io/img/sprite.svg#icon-' + c.name + '"></use>',
            '</svg>', , '</div>'
        ].join('');
        div.innerHTML = html;
        gamePad.appendChild(div);
    },
    createField: function () {
        let div = document.createElement('div');
        div.setAttribute('class', 'scoreCard');
        let html = [
            '<div class="field">',
            '<h2>Well Done!</h2>',
            '<h2>Final Score: ' + this.finalScore() + '</h2>',
            '<div class="checkout-btn init">',
            '<a href="#memorax" class="checkout-btn_link init" >',
            '<span class="checkout-btn_text init">Play again</span>',
            '</a>',
            '</div>',
            '</div>'
        ].join('');
        div.innerHTML = html;
        gamePad.appendChild(div);
    },
    finalScore: function () {
        score -= (turn * 10) + (sec * 5)
        return parseInt(score * 1.5);
    },
    // Fisher--Yates Algorithm
    shuffle: function (array) {
        var m = array.length,
            t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    },
    startTime: function () {
        ++sec;
        timer.innerHTML = "Time: " + format(parseInt(sec / 60)) + ":" + format(sec % 60);

        function format(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
    }
}

init = () => {
    sec = 0;
    pair = 12;
    score = 10000;
    count = 0;
    turn = 0;
    match = [];
    game = document.querySelector('.game-table');
    gamePad = document.querySelector('.game-pad');
    timer = document.getElementById('time');
    turns = document.getElementById('turns');
    pairs = document.getElementById('pairs');
    scores = document.getElementById('score');

    gamePad.innerHTML = "";

    cards = [{
            name: "instagram",
            id: 1,
        },
        {
            name: "css",
            id: 2
        },
        {
            name: "html",
            id: 3
        },
        {
            name: "twitter",
            id: 4
        },
        {
            name: "github",
            id: 5
        },
        {
            name: "apple",
            id: 6
        },
        {
            name: "android",
            id: 7
        },
        {
            name: "firefox",
            id: 8
        },
        {
            name: "git",
            id: 9
        },
        {
            name: "codepen",
            id: 10
        },
        {
            name: "dropbox",
            id: 11
        },
        {
            name: "chrome",
            id: 12
        },
    ];
    memorax.createDeck(cards, 0);
    setInterval(memorax.startTime, 1000);
}
init();

click = true;
document.addEventListener('click', (e) => {
    if (e.target.classList.contains("init")) {
        setTimeout(() => {
            init()
        }, 300);
    }
    if (click && e.target != match.slice(-1) && e.target != match[0] && count < 2) {
        if (e.target.classList.contains("face-down")) {
            e.target.classList.remove("face-down");
            e.target.classList.add("face-up");
            var svg = e.target.firstElementChild;
            svg.attributes.class.nodeValue = "face-up_img";
            match.push(e.target);
            count++;
            if (count == 2) {
                click = false
            }
        }
    }

    if (count === 2 && match.length === 2) {
        if (match[0].getAttribute('data-id') !== match[1].getAttribute('data-id')) {
            setTimeout(() => {
                match[0].classList.remove("face-up");
                match[1].classList.remove("face-up");
                match[0].classList.add("face-down");
                match[1].classList.add("face-down");
                match[0].firstElementChild.attributes.class.nodeValue = "face-down_img";
                match[1].firstElementChild.attributes.class.nodeValue = "face-down_img";
                count = 0;
                match = [];
                click = true;
            }, 500);
            score -= 50;
        } else if (match[0] !== match[1]) {
            match[0].classList.add("match");
            match[1].classList.add("match");
            pairs.innerHTML = "Pairs Left:" + ((--pair < 10) ? "0" + pair : pair + "");
            score += 300;
            if (pair <= 0) {
                setTimeout(() => {
                    memorax.createField();
                }, 3000);
                for (let index = 0; index < gamePad.children.length; index++) {
                    gamePad.children[index].children[0].classList.remove("face-up")
                    gamePad.children[index].children[0].classList.add("finished")
                }
            }
            count = 0;
            match = [];
        }
        turns.innerHTML = "Turns:" + ((++turn < 10) ? "0" + turn : turn + "");
        scores.innerHTML = "Score:" + score;
    }
    // if (e.target.id == "init") {

    // }
    click = true;
});