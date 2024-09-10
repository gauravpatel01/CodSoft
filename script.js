const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = null;
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const buttonContent = button.textContent;

        if (!action) {
            // Append number or decimal to the current input
            if (currentInput === '0' && buttonContent !== '.') {
                currentInput = buttonContent;
            } else {
                currentInput += buttonContent;
            }
            updateDisplay(currentInput);
        }

        if (action === 'decimal') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay(currentInput);
            }
        }

        if (action === 'clear') {
            clearCalculator();
        }

        if (action === 'delete') {
            currentInput = currentInput.slice(0, -1) || '0';
            updateDisplay(currentInput);
        }

        if (action === 'operator') {
            operator = buttonContent;
            previousInput = currentInput;
            currentInput = '';
        }

        if (action === 'equal') {
            if (previousInput && operator && currentInput) {
                currentInput = calculate(previousInput, operator, currentInput);
                operator = null;
                previousInput = '';
                updateDisplay(currentInput);
            }
        }
    });
});

function updateDisplay(value) {
    display.textContent = value;
}

function clearCalculator() {
    currentInput = '0';
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
}

function calculate(firstNumber, operator, secondNumber) {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result = '';

    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else if (operator === '*') {
        result = num1 * num2;
    } else if (operator === '/') {
        result = num1 / num2;
    }

    return result.toString();
}
