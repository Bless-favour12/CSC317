const display = document.getElementById("display");

let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldReset = false;

// Update screen
function updateDisplay() {
    display.textContent = currentValue;
}

// Input numbers
function appendNumber(num) {
    if (shouldReset || currentValue === "0") {
        currentValue = num;
        shouldReset = false;
    } else {
        // prevent multiple decimals
        if (num === "." && currentValue.includes(".")) return;
        currentValue += num;
    }
    updateDisplay();
}

// Choose operator
function chooseOperator(op) {
    if (operator !== null && !shouldReset) {
        compute();
    }
    previousValue = currentValue;
    operator = op;
    shouldReset = true;
}

// Compute result
function compute() {
    if (operator === null || shouldReset) return;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result;

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "/":
            result = curr === 0 ? "Error" : prev / curr;
            break;
        default:
            return;
    }

    currentValue = String(result);
    operator = null;
    shouldReset = true;
    updateDisplay();
}

// Clear all
function clearAll() {
    currentValue = "0";
    previousValue = "";
    operator = null;
    shouldReset = false;
    updateDisplay();
}

// +/- button
function plusMinus() {
    if (currentValue === "0" || currentValue === "Error") return;
    currentValue = String(parseFloat(currentValue) * -1);
    updateDisplay();
}

// Percent button — behave like a normal calculator
// 100 - 10 %  =>  100 - (100 * 10/100) = 90
function percent() {
    if (currentValue === "Error") return;

    if (operator && previousValue !== "") {
        const base = parseFloat(previousValue);
        const pct = parseFloat(currentValue);
        const value = base * (pct / 100);
        currentValue = String(value);
    } else {
        currentValue = String(parseFloat(currentValue) / 100);
    }
    updateDisplay();
}

// Backspace (keyboard only)
function backspace() {
    if (shouldReset || currentValue === "Error") return;

    if (currentValue.length <= 1) {
        currentValue = "0";
    } else {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
}

// Button controls
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-value");
        const action = btn.getAttribute("data-action");

        if (action === "operator") {
            chooseOperator(btn.getAttribute("data-value"));
        } else if (action === "equals") {
            compute();
        } else if (action === "clear") {
            clearAll();
        } else if (action === "plus-minus") {
            plusMinus();
        } else if (action === "percent") {
            percent();
        } else if (value) {
            appendNumber(value);
        }
    });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    // numbers
    if (!isNaN(e.key) && e.key !== " ") {
        appendNumber(e.key);
    }

    // operators
    if (["+", "-", "*", "/"].includes(e.key)) {
        chooseOperator(e.key);
    }

    // decimal
    if (e.key === ".") {
        appendNumber(".");
    }

    // equals / enter
    if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        compute();
    }

    // clear
    if (e.key === "Escape") {
        clearAll();
    }

    // backspace
    if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
    }
});
