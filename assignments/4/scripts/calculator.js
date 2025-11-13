const display = document.getElementById("display");

let current = "0";       // number displayed
let previous = null;     // previous number
let operator = null;     // + - * /
let overwrite = true;    // whether next digit should overwrite display

function update() {
  display.textContent = current;
}

function inputDigit(d) {
  if (overwrite) {
    current = d;
    overwrite = false;
  } else {
    current = current === "0" ? d : current + d;
  }
  update();
}

function inputDecimal() {
  if (overwrite) {
    current = "0.";
    overwrite = false;
    update();
    return;
  }
  if (!current.includes(".")) {
    current += ".";
    update();
  }
}

function setOperator(op) {
  if (operator && !overwrite) {
    calculate();
  } else {
    previous = parseFloat(current);
  }
  operator = op;
  overwrite = true;
}

function calculate() {
  if (!operator || overwrite) return;

  let a = previous;
  let b = parseFloat(current);
  let result = 0;

  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/":
      if (b === 0) {
        current = "Err";
        update();
        operator = null;
        previous = null;
        overwrite = true;
        return;
      }
      result = a / b;
      break;
  }

  current = result.toString();
  update();
  previous = result;
  operator = null;
  overwrite = true;
}

function percent() {
  current = (parseFloat(current) / 100).toString();
  update();
  overwrite = true;
}

function plusMinus() {
  current = (parseFloat(current) * -1).toString();
  update();
}

function clearDisplay() {
  current = "0";
  previous = null;
  operator = null;
  overwrite = true;
  update();
}

function backspace() {
  if (overwrite) return;
  if (current.length <= 1) {
    current = "0";
    overwrite = true;
  } else {
    current = current.slice(0, -1);
  }
  update();
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) return inputDigit(value);

    switch (action) {
      case "decimal": inputDecimal(); break;
      case "operator": setOperator(btn.dataset.value); break;
      case "equals": calculate(); break;
      case "clear": clearDisplay(); break;
      case "percent": percent(); break;
      case "plus-minus": plusMinus(); break;
    }
  });
});

document.addEventListener("keydown", e => {
  if (!isNaN(e.key)) inputDigit(e.key);
  if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === ".") inputDecimal();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clearDisplay();
});
