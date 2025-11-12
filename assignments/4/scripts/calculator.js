// ============================
// Calculator Functionality
// Author: Favour Godbless
// ============================

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', () => handleInput(button.textContent));
});

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    handleInput(key);
  } else if (key === 'Enter' || key === '=') {
    handleInput('=');
  } else if (key === 'Backspace') {
    handleInput('⌫');
  } else if (key.toLowerCase() === 'c') {
    handleInput('C');
  }
});

function handleInput(value) {
  if (value === 'C') {
    display.value = '';
  } else if (value === '⌫') {
    display.value = display.value.slice(0, -1);
  } else if (value === '=') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  } else {
    display.value += value;
  }
}
