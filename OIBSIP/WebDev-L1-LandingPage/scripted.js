const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let resultDisplayed = false;

numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (display.value === "Error") {
            clearCalculator();
        }

        if (resultDisplayed) {
            display.value = button.textContent;
            firstNumber = button.textContent;
            secondNumber = "";
            currentOperator = "";
            resultDisplayed = false;
            return;
        }

        if (currentOperator !== "") {

            if (secondNumber === "") {
                secondNumber = button.textContent;
            } else {
                secondNumber += button.textContent;
            }

            display.value =
                firstNumber + " " +
                getOperatorSymbol(currentOperator) + " " +
                secondNumber;

        } else {

            if (firstNumber === "" || firstNumber === "0") {
                firstNumber = button.textContent;
            } else {
                firstNumber += button.textContent;
            }

            display.value = firstNumber;
        }
    });
});

operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (display.value === "Error") {
            return;
        }

        const operator = button.dataset.operator;

        if (firstNumber === "") {
            return;
        }

        if (currentOperator !== "" && secondNumber === "") {

            display.value = "Error";

            firstNumber = "";
            secondNumber = "";
            currentOperator = "";
            resultDisplayed = true;

            return;
        }

        if (currentOperator !== "" && secondNumber !== "") {

            const answer = calculate(
                parseFloat(firstNumber),
                parseFloat(secondNumber),
                currentOperator
            );

            if (answer === "Error") {

                display.value = "Error";

                firstNumber = "";
                secondNumber = "";
                currentOperator = "";
                resultDisplayed = true;

                return;
            }

            firstNumber = answer.toString();
            secondNumber = "";
        }

        currentOperator = operator;

        display.value =
            firstNumber + " " +
            getOperatorSymbol(currentOperator);
    });
});

decimalButton.addEventListener("click", function() {

    if (display.value === "Error") {
        clearCalculator();
        return;
    }

    if (currentOperator !== "") {

        if (secondNumber === "") {
            secondNumber = "0.";
        } else if (!secondNumber.includes(".")) {
            secondNumber += ".";
        }

        display.value =
            firstNumber + " " +
            getOperatorSymbol(currentOperator) + " " +
            secondNumber;

        return;
    }

    if (!firstNumber.includes(".")) {

        if (firstNumber === "") {
            firstNumber = "0.";
        } else {
            firstNumber += ".";
        }

        display.value = firstNumber;
    }
});

equalsButton.addEventListener("click", function() {

    if (
        firstNumber === "" ||
        currentOperator === "" ||
        secondNumber === ""
    ) {
        display.value = "Error";

        firstNumber = "";
        secondNumber = "";
        currentOperator = "";
        resultDisplayed = true;

        return;
    }

    const answer = calculate(
        parseFloat(firstNumber),
        parseFloat(secondNumber),
        currentOperator
    );

    if (answer === "Error") {

        display.value = "Error";

        firstNumber = "";
        secondNumber = "";
        currentOperator = "";
        resultDisplayed = true;

        return;
    }

    display.value = answer;

    firstNumber = answer.toString();
    secondNumber = "";
    currentOperator = "";
    resultDisplayed = true;
});

backspaceButton.addEventListener("click", function() {

    if (display.value === "Error") {
        clearCalculator();
        return;
    }

    if (currentOperator !== "" && secondNumber !== "") {

        secondNumber = secondNumber.slice(0, -1);

        if (secondNumber === "") {

            display.value =
                firstNumber + " " +
                getOperatorSymbol(currentOperator);

        } else {

            display.value =
                firstNumber + " " +
                getOperatorSymbol(currentOperator) +
                " " +
                secondNumber;
        }

        return;
    }

    if (currentOperator !== "" && secondNumber === "") {

        currentOperator = "";
        display.value = firstNumber;

        return;
    }

    firstNumber = firstNumber.slice(0, -1);

    if (firstNumber === "") {
        display.value = "0";
    } else {
        display.value = firstNumber;
    }
});

clearButton.addEventListener("click", function() {
    clearCalculator();
});

function calculate(number1, number2, operator) {

    if (operator === "+") {
        return number1 + number2;
    }

    if (operator === "-") {
        return number1 - number2;
    }

    if (operator === "*") {
        return number1 * number2;
    }

    if (operator === "/") {

        if (number2 === 0) {
            return "Error";
        }

        return number1 / number2;
    }

    if (operator === "%") {

        if (number2 === 0) {
            return "Error";
        }

        return number1 % number2;
    }

    return "Error";
}

function getOperatorSymbol(operator) {

    if (operator === "+") {
        return "+";
    }

    if (operator === "-") {
        return "−";
    }

    if (operator === "*") {
        return "×";
    }

    if (operator === "/") {
        return "÷";
    }

    if (operator === "%") {
        return "%";
    }
}

function clearCalculator() {

    display.value = "0";

    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    resultDisplayed = false;
}
