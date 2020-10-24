let pi = "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912";
let piArr = [];
let score = 2;
let set = 1;
let won = false;
let mistakesCount;
let digits;
let seconds;
let secs;
let countdown = false;
const settings = id("settings");
const start = id("start");
const rest = id("restart");
const stats = id("stats");
const scored = id("score");
const area = id("area");
const header = document.querySelector("header");
const mistakes = id("mistakes");
const time = id("time");

let timer;

hide([header, start, stats, area, rest]);

function id(val) {return document.getElementById(val);}

settings.addEventListener('submit', sub);
function sub(event) {
    event.preventDefault();
}

function hide(e) {
    e.forEach(f => {
        f.style.display = "none";
        //f.style.visibility = "hidden";
    });
}

function show(e) {
    e.forEach(f => {
        f.style.display = "flex";
        //f.style.visibility = "visible";
    });
}

function submitF() {
    digits = id("digits").value;   
    secs = id("seconds").value;
    seconds = secs;
    mistakesCount = Math.ceil(digits / 50);
    mistakes.innerHTML = "MISTAKES: " + mistakesCount;
    for (i = 0; i < digits; i++) {
        piArr.push(pi.charAt(i));
    }
    scored.innerHTML = "SCORE: " + score + "/" + digits;
    time.innerHTML = "TIME: " + seconds;
    hide([settings]);
    show([header, start, stats]);
}

function startGame() {
    timer = setInterval(myTimer, 1000);
    countdown = true;
    hide([start]);
    for (i = 0; i < piArr.length; i++) {
        let val = "";
        if (i < 2)val = piArr[i];
        let newCell = document.createElement("input");
        newCell.setAttribute("id", "cell" + i);
        newCell.setAttribute("class", "cell");
        newCell.setAttribute("readOnly", true);
        newCell.value = val;
        if(i == 2) newCell.style.backgroundColor = "yellow";
        area.appendChild(newCell);
    }
    document.addEventListener('keypress', pressed);
    show([area]);
}

function pressed(e) {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
        var key = parseInt(String.fromCharCode(e.keyCode));
        var check = parseInt(pi.charAt(set + 1));
        console.log(key, check);
        if (key == check) {
            score++;
            scored.innerHTML = "SCORE: " + score + "/" + digits;
            set++;
            let prev = set;
            let next = set + 1;
            id("cell" + prev).value = key;
            id("cell" + prev).style.backgroundColor = "white";
            if (set + 1 == piArr.length) {
                let remain = secs - seconds;
                end("YOU WON in " + remain + " Seconds!"); 
            }
            else {
                id("cell" + next).style.backgroundColor = "yellow";
            }
        }
        else {
            mistakesCount--;
            if (mistakesCount >= 0) {
                mistakes.innerHTML = "MISTAKES: " + mistakesCount;
            }
            if (mistakesCount == -1) {
                end("YOU LOSE, GO FIND A BRAIN");
            }
        }
    }
}

function myTimer() {
    if (seconds > 0) {
        seconds--;
        time.innerHTML = "TIME: " + seconds;
    }
    else {
        end("OH NO, YOU'RE OUT OF TIME :(");
    }
}

function restart() {  
    mistakesCount = Math.ceil(digits / 50);
    mistakes.innerHTML = "MISTAKES: " + mistakesCount;
    scored.innerHTML = "SCORE: " + score + "/" + digits;
    time.innerHTML = seconds;
    seconds = secs;
    score = 2;
    set = 1;
    won = false;
    hide([settings]);
    show([header, start, stats]);
}

function end(print) {
    alert(print);
    clearInterval(timer);
    document.removeEventListener('keypress', pressed);
    show([rest]);
}
