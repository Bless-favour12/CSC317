const display = document.getElementById("display");

let firstValue = "";
let secondValue = "";
let operator = null;
let shouldReset = false;
let memory = 0;

/* ------------------------- DISPLAY HELPERS ------------------------- */

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

/* ------------------------- MEMORY FUNCTIONS ------------------------ */

function updateMemoryIndicator() {
    if (memory !== 0) {
        display.classList.add("memory-active");
    } else {
        display.classList.remove("memory-active");
    }
}

function memoryAdd() {
    memory += parseFloat(display.textContent) || 0;
    updateMemoryIndicator();
}

function memorySubtract() {
    memory -= parseFloat(display.textContent) || 0;
    updateMemoryIndicator();
}

function memoryRecall() {
    updateDisplay(memory.toString());
    shouldReset = true;
}

function memoryClear() {
    memory = 0;
    updateMemoryIndicator();
}

/* ---------------------------- OPERATORS ---------------------------- */

function setOperator(op) {
    firstValue = display.textContent;
    operator = op;
    shouldReset = true;
}

function calculate() {
    if (!operator) return;

    secondValue = display.textContent;
    const a = parseFloat(firstValue);
    const b = parseFloat(secondValue);

    let result = 0;

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/":
            if (b === 0) {
                updateDisplay("Err");
                operator = null;
                return;
            }
            result = a / b;
            break;
    }

    updateDisplay(result.toString());
    operator = null;
    shouldReset = true;
}

function percent() {
    let value = parseFloat(display.textContent);
    updateDisplay((value / 100).toString());
    shouldReset = true;
}

function plusMinus() {
    updateDisplay((parseFloat(display.textContent) * -1).toString());
}

/* ----------------------------- CLEAR ------------------------------- */

function clearAll() {
    updateDisplay("0");
    firstValue = "";
    secondValue = "";
    operator = null;
}

/* ------------------------------ EVENTS ----------------------------- */

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.dataset.value;
        const action = btn.dataset.action;

        if (value) {
            return appendDigit(value);
        }

        if (!action) return;

        switch (action) {
            case "decimal": return addDecimal();
            case "operator": return setOperator(btn.dataset.value);
            case "equals": return calculate();
            case "clear": return clearAll();
            case "percent": return percent();
            case "plus-minus": return plusMinus();

            // MEMORY
            case "mc": return memoryClear();
            case "mr": return memoryRecall();
            case "mplus": return memoryAdd();
            case "mminus": return memorySubtract();
        }
    });
});

/* -------------------------- KEYBOARD SUPPORT ----------------------- */

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) appendDigit(e.key);

    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);

    if (e.key === "Enter") calculate();
    if (e.key === ".") addDecimal();
    if (e.key === "Backspace") {
        display.textContent = display.textContent.slice(0, -1) || "0";
    }
    if (e.key === "Escape") clearAll();
});
