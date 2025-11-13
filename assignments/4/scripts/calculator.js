const display = document.getElementById("display");

let firstValue = null;
let operator = null;
let shouldReset = false;

/* ----------- Display Helpers ----------- */
function updateDisplay(value) {
    display.textContent = value;
}

function appendDigit(digit) {
    if (display.textContent === "0" || shouldReset) {
        updateDisplay(digit);
        shouldReset = false;
    } else {
        updateDisplay(display.textContent + digit);
    }
}

/* ----------- Decimal ----------- */
function addDecimal() {
    if (shouldReset) {
        updateDisplay("0.");
        shouldReset = false;
        return;
    }
    if (!display.textContent.includes(".")) {
        updateDisplay(display.textContent + ".");
    }
}

/* ----------- Operators ----------- */
function setOperator(op) {
    if (operator !== null && !shouldReset) {
        calculate();
    } else {
        firstValue = parseFloat(display.textContent);
    }
    operator = op;
    shouldReset = true;
}

function calculate() {
    if (operator === null || shouldReset) return;

    let secondValue = parseFloat(display.textContent);
    let result = 0;

    switch (operator) {
        case "+": result = firstValue + secondValue; break;
        case "-": result = firstValue - secondValue; break;
        case "*": result = firstValue * secondValue; break;
        case "/":
            if (secondValue === 0) {
                updateDisplay("Err");
                operator = null;
                return;
            }
            result = firstValue / secondValue;
            break;
    }

    updateDisplay(result.toString());
    firstValue = result;
    operator = null;
    shouldReset = true;
}

/* ----------- Percent (correct behavior) ----------- */
function percent() {
    let val = parseFloat(display.textContent);
    updateDisplay((val / 100).toString());
    shouldReset = true;
}

/* ----------- Sign Change ----------- */
function plusMinus() {
    updateDisplay((parseFloat(display.textContent) * -1).toString());
}

/* ----------- Clear ----------- */
function clearAll() {
    updateDisplay("0");
    firstValue = null;
    operator = null;
    shouldReset = false;
}

/* ----------- Backspace ----------- */
function backspace() {
    if (shouldReset) return;
    let text = display.textContent.slice(0, -1);
    updateDisplay(text || "0");
}

/* ----------- Button Events ----------- */
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.dataset.value;
        const action = btn.dataset.action;

        if (value) return appendDigit(value);
        if (!action) return;

        switch (action) {
            case "decimal": addDecimal(); break;
            case "operator": setOperator(btn.dataset.value); break;
            case "equals": calculate(); break;
            case "clear": clearAll(); break;
            case "percent": percent(); break;
            case "plus-minus": plusMinus(); break;
        }
    });
});

/* ----------- Keyboard Support ----------- */
document.addEventListener("keydown", e => {
    if (!isNaN(e.key)) appendDigit(e.key);
    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === ".") addDecimal();
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clearAll();
});
