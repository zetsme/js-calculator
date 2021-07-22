const calclulatorDisplayEl = document.getElementById('calculator-display');
const btns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let result = [];
let nextVal = false;

const clickNumberBtn = (e) => {
  const textNumber = e.target.value;
  if (nextVal) {
    calclulatorDisplayEl.textContent = textNumber;
    nextVal = false;
  } else {
    const displayValue = calclulatorDisplayEl.textContent;
    calclulatorDisplayEl.textContent =
      displayValue === '0' ? textNumber : displayValue + textNumber;
  }
};
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

const clickOperatorBtn = (e) => {
  const operator = e.target.value;
  const currentValue = calclulatorDisplayEl.textContent;
  if (result.length === 2 && nextVal) {
    result[1] = operator;
    return;
  }
  if (!result.length) {
    result.push(currentValue);
  } else {
    const calculation = calculate[result[1]](Number(result[0]), Number(currentValue));
    calclulatorDisplayEl.textContent = calculation;
    result = [calculation];
  }
  if (result.length < 2) {
    result.push(operator);
  }
  nextVal = true;
};
const clickDecimalBtn = () => {
  if (nextVal && calclulatorDisplayEl.textContent !== '0') return;
  if (!calclulatorDisplayEl.textContent.includes('.')) {
    calclulatorDisplayEl.textContent = `${calclulatorDisplayEl.textContent}.`;
  }
};

btns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener('click', clickNumberBtn);
  } else if (btn.classList.contains('operator')) {
    btn.addEventListener('click', clickOperatorBtn);
  } else if (btn.classList.contains('decimal')) {
    btn.addEventListener('click', clickDecimalBtn);
  }
});

const reset = () => {
  calclulatorDisplayEl.textContent = '0';
};
clearBtn.addEventListener('click', reset);
