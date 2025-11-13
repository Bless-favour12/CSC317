## Assignment 4 — JavaScript Calculator & Portfolio Integration
**Name:** Favour Godbless  
**StudentId: 924330040
**GitHub Repository:** https://github.com/Bless-favour12/CSC317  
**Live Portfolio:** https://bless-favour12.github.io/CSC317/assignments/4/index.html  
**Live Calculator:** https://bless-favour12.github.io/CSC317/assignments/4/calculator.html  

---

## Project Summary

For Assignment 4, I created a fully functional JavaScript calculator and integrated it into my personal portfolio website. I began the project by setting up a simple JavaScript environment and confirming that Node.js was working correctly. After that, I developed the calculator interface and logic using HTML, CSS, and vanilla JavaScript. The calculator performs all standard operations (+, −, ×, ÷), supports decimals, percentage calculations, sign-toggle, reset (AC), and includes full keyboard support.  

Once the calculator was complete, I replaced the group portfolio from Assignment 3 with my personal portfolio content and added the calculator as the first featured project. I updated my navigation links, added a back button on the calculator page, and verified that all pages worked correctly once deployed to GitHub Pages.

---

## Challenges & Solutions

### 1. Calculator State Management  
**Challenge:** Managing display resets and correctly appending digits after showing results.  
**Solution:** Added state variables (`shouldReset`, `previousValue`, `currentValue`, `operator`) to keep operations consistent.

### 2. Percentage (%) Behavior  
**Challenge:** Making percentage work like a real mobile calculator.  
**Solution:** Adjusted percent logic so percentages calculate relative to the first operand when an operator is active.

### 3. Keyboard and Button Synchronization  
**Challenge:** Both input methods needed to behave identically.  
**Solution:** Linked both keyboard and click events to the same calculation functions.

### 4. Portfolio Replacement  
**Challenge:** Assignment 3 used a groupmate’s profile and needed to be replaced with my personal one.  
**Solution:** Rebuilt the Assignment 4 index.html with my own content and corrected file paths.

---

## Extra Features Added

- Keyboard support (Enter, Backspace, Escape)
- Responsive calculator layout  
- Error handling for division by zero  
- Theme switcher included in the portfolio  
- Included calculator preview image  

---

## Resources Used

- MDN Web Docs — DOM, event listeners, JavaScript basics  
- HTML Living Standard documentation  
- GitHub Pages documentation  
- CSC 317 lecture materials  
- I used Claude for debugging assistance  

---

## Bonus Feature: Theme Switcher
I implemented a theme switcher with multiple alternate CSS themes (AI-generated), integrated into my portfolio. Users can toggle between the default style and additional themes using a simple UI switcher.
