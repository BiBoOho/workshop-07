const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); // array
const clearBtn = document.getElementById('clear-btn');

const calculate = {
    "/":(firstNumber,secondNumber) => secondNumber != 0 ? firstNumber / secondNumber : "error",
    "*":(firstNumber,secondNumber) => firstNumber * secondNumber,
    "+":(firstNumber,secondNumber) => firstNumber + secondNumber,
    "-":(firstNumber,secondNumber) => firstNumber - secondNumber,
    "=":(firstNumber,secondNumber) => secondNumber
};



//ຕົວເລກທີ່ 1 ຕົວດຳເນີນການ ຕົວເລກທີ່ 2
// 10 + 20

//99.99 + 100

let firstValue = 0; //ຕົວເລກທີ່ 1
let operatorValue = ''; //ເກັບຕົວດຳເນີນການ
let waitForNext = false; //ເກັບສະຖານະຂອງຕົວເລກ ແລະ ຕົວດຳເນີນການ


//ກວດສອບວ່າປຸ່ມທີ່ກົດເປັນຕົວເລກ
function setNumberValue(number) {
    if (waitForNext) {
        calculatorDisplay.textContent = number;
        waitForNext = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        //0 => 1 = 1 => 4 = 1+4 = 14
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function callOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    if(operatorValue && waitForNext){
        operatorValue = operator;
        return;
    }

    if (!firstValue) {
        firstValue = currentValue; //ຄ່າເລີ່ມຕົ້ນ
    } else {
        const result = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = result;
        firstValue = result;
        if(firstValue === "error") {
            resetAll();
        }
    }

    operatorValue = operator;
    waitForNext = true;


}

function addDecimal() {
    if(waitForNext) return;
    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}


inputBtn.forEach((input) => {

    if (input.classList.length === 0) {
        input.addEventListener('click', () => setNumberValue(input.value));
    } else if (input.classList.contains("operator")) {
        input.addEventListener('click', () => callOperator(input.value));
    } else if (input.classList.contains("decimal")) {
        input.addEventListener('click', () => addDecimal());
    }
});

function resetAll() {
    firstValue = 0;
    operatorValue = '';
    waitForNext = false;
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', () => resetAll());