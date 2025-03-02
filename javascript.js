

//slider functionality 
const slider = document.querySelector("#mySlider");
const output = document.querySelector("#sliderValue");
const outputTwo = document.querySelector("#repeatValue");
const resetButton = document.querySelector(".reset");
const rainbowButton = document.querySelector(".rainbow");
const black = document.querySelector(".black");
const colors = document.querySelector(".colors");
const eraser = document.querySelector(".eraser");
const save = document.querySelector(".save");
output.textContent = slider.value;
outputTwo.textContent = slider.value;
let isRainbowMode = false;

let currentColor = "#000000";


//initialize with 50 by 50 grid.
createBoxes(50);

slider.oninput = function() {
    output.textContent = this.value;
    outputTwo.textContent = this.value;
    removeDivs(".grid");
    createBoxes(this.value);
};

let isMouseDown = false;
//create boxes based on slider count
function createBoxes(n) {
    const grid = document.querySelector(".grid");
    const gridSize = 720; //we decided to set square playing field at 720px in css
    const boxSize = gridSize / n; //calculate each size of the box
    for (let i = 0; i < n * n; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `${boxSize}px`; //setting the width dynamically
        box.style.height = `${boxSize}px`; //setting the height dynamicallly 

        box.addEventListener("mousedown", function(e) {
            e.preventDefault();
            isMouseDown = true;
            this.style.backgroundColor = isRainbowMode ? getRandomColor() : currentColor;
        });

        box.addEventListener("mouseover", function() {
            if(isMouseDown) {
            this.style.backgroundColor = isRainbowMode ? getRandomColor() : currentColor;
            };
        });

        grid.append(box);
    };
};

document.addEventListener("mouseup", function() {
    isMouseDown = false;
});

//remove all the divs prior to adjusting grid size
function removeDivs(container) {
    const containerElement = document.querySelector(container);
    let allDivs = containerElement.querySelectorAll("div");
    allDivs.forEach(div => {
        div.remove();
    });
};

resetButton.addEventListener("click", function() {
    turnOffRainbow();
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        box.style.backgroundColor = "";
    });
});

rainbowButton.addEventListener("click", function() {
    isRainbowMode = !isRainbowMode;
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i ++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

black.addEventListener("click", function() {
    turnOffRainbow();
    currentColor = "#000000";
});

eraser.addEventListener("click", function() {
    turnOffRainbow();
    currentColor = "#FFFFFF";
});

colors.addEventListener("input", function(e) {
    turnOffRainbow();
    currentColor = this.value;
});

save.addEventListener("click", function() {
    const grid = document.querySelector(".grid");
    html2canvas(grid).then(canvas => {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "etch-a-sketch.png";
        link.href = dataURL;
        link.click();
    })
});

function turnOffRainbow() {
    isRainbowMode = false;
};