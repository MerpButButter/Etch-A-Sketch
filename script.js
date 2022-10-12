let canvas = document.querySelector(".canvas");
let clearBtn = document.querySelector("#clear");
let gridSizeBtn = document.querySelector("#grid-size");
let normalColor = document.querySelector("#normal");
let rainbowColor = document.querySelector("#rainbow");
let shadeColor = document.querySelector("#shade");
let eraser = document.querySelector("#eraser");

let colorMode = 1;
let holding = false;


gridSizeBtn.addEventListener('click', () => {
    let value = Number(prompt("How big do you want the container to be?"));
    if (typeof value === "number") {
        clearCanvas();
        let filter1 = value <= 100 ? value : 100;
        let filter2 = filter1 > 0 ? filter1 : 4;
        populateDivs(filter2);
    } else {
        clearCanvas();
        populateDivs(4);
    }
});

clearBtn.addEventListener('click', clearCanvas);

normalColor.addEventListener('click', () => {
    colorMode = 1;
});


rainbowColor.addEventListener('click', () => {
    colorMode = 2;
});

eraser.addEventListener('click', () => {
    colorMode = 10;
});

shadeColor.addEventListener('click', () => {
    colorMode = 3;
});

window.addEventListener('mousedown', () => {
    holding = true;
});

window.addEventListener('mouseup', () => {
    holding = false;
});


function clearCanvas() {
    let children = Array.from(canvas.children);

    for (const square of children) {
        canvas.removeChild(square);
        square.removeEventListener('mousedown', colorSquare);
    }
}

function populateDivs(n) {
    let amount = n * n;

    let div = document.createElement("div");
    div.className = "square";
    let ratio = 100 / n;
    div.style.height = `${ratio}%`;
    div.style.height = `${ratio}%`;

    for (let i = 0; i < amount; i++) {
        let cloneDiv = div.cloneNode();
        canvas.appendChild(cloneDiv);
        setUpColorSquareEvent(cloneDiv);
    }
}

function setUpColorSquareEvent(square) {
    square.addEventListener(`mousemove`, colorSquare);
}

function colorSquare(e) {
    if (!holding) return;
    e.preventDefault();
    let div = this;

    let rgb = window.getComputedStyle(div, null).getPropertyValue("background-color").match(/\d+/g);

    let shade = rgb[0] - 10;

    if (colorMode === 1) {
        div.style.backgroundColor = "hsla(207, 0%, 40%, 1)";
    } else if (colorMode === 2) {
        div.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 50%)`;
    } else if (colorMode === 3) {
        div.style.backgroundColor = `rgb(${shade},${shade},${shade})`;
    } else {
        div.style.backgroundColor = "#fff";
    }
}
