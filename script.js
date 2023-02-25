let display = [];
let displayString = "";
let outputValue = 0;

function add (a, b) {
    a = parseInt(a);
    b = parseInt(b);
    output = a + b;
    return output.toString();
}

function subtract (a, b) {
    a = parseInt(a);
    b = parseInt(b);
    output = a - b;
    return output.toString();
}

function multiply (a, b) {
    a = parseInt(a);
    b = parseInt(b);
    output = a * b;
    return output.toString();
}

function divide (a, b) {
    a = parseInt(a);
    b = parseInt(b);
    output = a / b;
    return output.toString();
}

// do not ask me how or why this works, all I know is that it does
function computeOutput (input) {
    let num1 = "";
    let num2 = "";
    let operator = "";
    let output = 0;
    let firstTime = true;
    let nextPart = false
    for (let i = 0; i < input.length + 1; i++) {
        if ((!(input[i] == "+" || input[i] == "-" || input[i] == "/" || input[i] == "x")) && nextPart == false && firstTime == true) {
            num1 += input[i];
        } else if ((input[i] == "+" || input[i] == "-" || input[i] == "/" || input[i] == "x") && firstTime == true && nextPart == false) {
            operator = input[i];
            nextPart = true;
        } else if ((input[i] == "+" || input[i] == "-" || input[i] == "/" || input[i] == "x" || typeof input[i] == "undefined") && ((nextPart == true) || (firstTime == false) || (i == input.length))) {
            switch (true) {
                case operator == "+":
                    output = add(num1, num2);
                    break;
                case operator == "-":
                    output = subtract(num1, num2);
                    break;
                case operator == "x":
                    output = multiply(num1, num2);
                    break;
                case operator == "/":
                    output = divide(num1, num2);
                    break;
            }
            operator = input[i];
            nextPart = false;
            firstTime = false;
            num1 = output;
            num2 = "";
        } else {
            num2 += input[i];
        }
    }
    return output;
}

function deleteContent () {
    display.length = 0;
    displayString = "";
    outputDisplay.innerHTML = 0;
}

function removeLast () {
    display.pop();
    displayString = displayString.substring(0, displayString.length - 1);
    if (displayString == "") {
        outputDisplay.innerHTML = "0";
    } else {
        outputDisplay.innerHTML = displayString;
    }
}

const outputDisplay = document.querySelector(".display");

const allButtons = document.querySelectorAll("button");
for (const button of allButtons) {
    button.addEventListener("click", () => {
        if (button.classList.contains("compute")) {
            outputValue = computeOutput(display);
            outputDisplay.innerHTML = outputValue;
            display.length = 0;
            displayString = "";
            return;
        } else if (button.classList.contains("delete")) {
            deleteContent();
            return;
        } else if (button.classList.contains("deleteOne")) {
            removeLast();
            return;
        }
        if (displayString.length >= 30) {
            return;
        }
        display.push(button.innerHTML);
        displayString += button.innerHTML;
        outputDisplay.innerHTML = displayString;
    })
};