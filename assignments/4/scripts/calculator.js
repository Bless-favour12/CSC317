const display = document.getElementById("display");

let currentValue = "0";
let previousValue = null;
let operator = null;
let overwrite = true;
let memory = 0;

/* ------------------ DISPLAY HELPERS ------------------ */

function updateDisplay() {
  display.textContent = currentValue;
}

function setValue(v) {
  currentValue = v.toString();
  updateDisplay();
}

function getNumber() {
  return parseFloat(currentValue);
}

/* ------------------ DIGITS & DECIMALS ------------------ */

function inputDigit(digit) {
  if (overwrite) {
    currentValue = digit;
    overwrite = false;
  } else {
    currentValue = currentValue === "0" ? digit : currentValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (overwrite) {
    currentValue = "0.";
    overwrite = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

/* ------------------ OPERATORS ------------------ */

function setOperator(op) {
  if (operator && !overwrite) {
    calculate();
  } else {
    previousValue = getNumber();
  }

  operator = op;
  overwrite = true;
}

function calculate() {
  if (!operator || overwrite) return;

  const a = previousValue;
  const b = getNumber();
  let result;

  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/":
      if (b === 0) {
        currentValue = "Err";
        updateDisplay();
        operator = null;
        previousValue = null;
        overwrite = true;
        return;
      }
      result = a / b;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  updateDisplay();
  previousValue = result;
  operator = null;
  overwrite = true;
}

/* ------------------ PERCENT (IOS STYLE) ------------------ */

function handlePercent() {
  const val = getNumber();

  if (previousValue !== null && operator !== null) {
    currentValue = (previousValue * (val / 100)).toString();
  } else {
    currentValue = (val / 100).toString();
  }

  updateDisplay();
  overwrite = true;
}

/* ------------------ PLUS / MINUS ------------------ */

function toggleSign() {
  currentValue = (getNumber() * -1).toString();
  updateDisplay();
}

/* ------------------ CLEAR & BACKSPACE ------------------ */

function clearAll() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  overwrite = true;
  updateDisplay();
}

function backspace() {
  if (overwrite) return;
  if (currentValue.length <= 1) {
    currentValue = "0";
    overwrite = true;
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
}

/* ------------------ MEMORY FUNCTIONS ------------------ */

function updateMemoryIndicator() {
  if (memory !== 0) {
    display.classList.add("memory-active");
  } else {
    display.classList.remove("memory-active");
  }
}

function memoryAdd() {
  memory += getNumber();
  updateMemoryIndicator();
}

function memorySubtract() {
  memory -= getNumber();
  updateMemoryIndicator();
}

function memoryRecall() {
  currentValue = memory.toString();
  overwrite = true;
  updateDisplay();
}

function memoryClear() {
  memory = 0;
  updateMemoryIndicator();
}

/* ------------------ CLICK HANDLING ------------------ */

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) return inputDigit(value);
    if (!action) return;

    switch (action) {
      case "decimal": inputDecimal(); break;
      case "operator": setOperator(btn.dataset.value); break;
      case "equals": calculate(); break;
      case "clear": clearAll(); break;
      case "percent": handlePercent(); break;
      case "plus-minus": toggleSign(); break;
      case "mc": memoryClear(); break;
      case "mr": memoryRecall(); break;
      case "mplus": memoryAdd(); break;
      case "mminus": memorySubtract(); break;
    }
  });
});

/* ------------------ KEYBOARD SUPPORT ------------------ */

document.addEventListener("keydown", e => {
  if (!isNaN(e.key)) inputDigit(e.key);

  if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);

  if (e.key === "Enter") calculate();
  if (e.key === ".") inputDecimal();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clearAll();
});
