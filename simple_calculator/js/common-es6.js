const doc = document;

// Генерация блока промеж.значений

for (let i = 0; i < 5; i++) {
	let liItm = doc.querySelector('.notation__list-item').cloneNode(true);
	doc.querySelector('.notation__list').appendChild(liItm);
}

// Получение объектов в переменных

let digits = doc.querySelectorAll('.digit');
let operations = doc.querySelectorAll('.operator');
let clearBtns = doc.querySelectorAll('.clear-btn');
let comma = doc.getElementById('comma');
let backspace = doc.getElementById('backspace');
let saveData = doc.querySelectorAll('.save-data');
let focusDebug = doc.querySelector('.focus-debug');
let display = doc.getElementById('display');
let MemoryCurrentValue = 0;
let MemoryNewValue = false;
let MemoryPendingValue = '';
let blockedBtns = [...digits, ...operations, comma, backspace, clearBtns[1], ...saveData];

// Обработчики событий

for (let i = 0; i < digits.length; i++) {
	digits[i].addEventListener('click', (e) => {
		pressDigit(e.target.textContent);
	});
}

for (let i = 0; i < operations.length; i++) {
	operations[i].addEventListener('click', (e) => {
		operation(e.target.textContent);
	});
}

for (let i = 0; i < clearBtns.length; i++) {
	clearBtns[i].addEventListener('click', clear);
}

comma.addEventListener('click', decimal);

backspace.addEventListener('click', makeBackspace);

for (let i = 0; i < saveData.length; i++) {
	saveData[i].addEventListener('click', makeSaveData);
}

// Ввод с клавиатуры

addEventListener('keydown', (e) => {

	let keyEventValue;

	switch (e.keyCode) {
		case 13: // "Enter"
			keyEventValue = '=';
			operation(keyEventValue);
			break;
		case 106: // "*"
			keyEventValue = '×';
			operation(keyEventValue);
			break;
		case 111: // "/"
			keyEventValue = '÷';
			operation(keyEventValue);
			break;
		case 107: // "+"
			keyEventValue = '+';
			operation(keyEventValue);
			break;
		case 109: // "-"
			keyEventValue = '-';
			operation(keyEventValue);
			break;
		case 110: // "."
			decimal();
			break;
		case 46: // "Del"
			makeBackspace();
			break;
		case 27: // "Esc"
			clear(e);
			break;
		default:
			// do nothing
	}
});

addEventListener('keypress', (e) => {
	if (e.charCode > 47 && e.charCode < 58) {
		let keyEventValue = String.fromCharCode(e.charCode);
		pressDigit(keyEventValue);
	}
});

// Операции

function pressDigit(digit) {
	playSound();

	if (MemoryNewValue) {
		display.value = digit;
		MemoryNewValue = false;
	} else if (display.value === '0') {
		display.value = digit;
	} else if (display.value.length < 11) {
		display.value += digit;
	}
}

function operation(operate) {
	playSound();

	let localOperationMemory = display.value;

	if (MemoryNewValue && MemoryPendingValue !== '=') {
		display.value = MemoryCurrentValue;
	} else {
		MemoryNewValue = true;

		switch (MemoryPendingValue) {
			case '+':
				MemoryCurrentValue += parseFloat(localOperationMemory);
				break;
			case '-':
				MemoryCurrentValue -= parseFloat(localOperationMemory);
				break;
			case '×':
				MemoryCurrentValue *= parseFloat(localOperationMemory);
				break;
			case '÷':
				if (localOperationMemory === '0') {
					MemoryCurrentValue = 'Error';
					blockBtns();
				} else {
					MemoryCurrentValue /= parseFloat(localOperationMemory);
				}
				break;
			default:
				MemoryCurrentValue = parseFloat(localOperationMemory);
		}

		if (operate === '=') {
			display.value = MemoryCurrentValue;
			MemoryPendingValue = operate;
		} else {
			display.value = MemoryCurrentValue + operate;
			MemoryPendingValue = operate;
		}
	}
	checkLength();
}

function clear(e) {
	playSound();

	if (e.type === 'click' && e.target.id === 'clear-entry') {
		display.value = '0';
		MemoryNewValue = true;
	} else {
		display.value = '0';
		MemoryNewValue = true;
		MemoryCurrentValue = 0;
		MemoryPendingValue = '';
		for (let i = 0; i < blockedBtns.length; i++) {
			blockedBtns[i].removeAttribute('disabled');
		}
	}
}

function decimal() {
	playSound();

	if (MemoryNewValue) {
		display.value = '0.';
		MemoryNewValue = false;
	}
	if (display.value.indexOf('.') === -1) {
		display.value += '.';
	}
}

function makeBackspace() {
	playSound();

	let str = display.value;

	if (display.value.indexOf('*') === -1 &&
		display.value.indexOf('/') === -1 &&
		display.value.indexOf('+') === -1 &&
		display.value.indexOf('-') === -1 &&
		display.value.indexOf('÷') === -1 &&
		display.value.indexOf('×') === -1 &&
		str.length > 1) {
			display.value = str.substr(0, str.length - 1);
	} else {
		display.value = '0';
	}
}

function makeSaveData(e) {
	playSound();

	let slot = e.currentTarget;

	if (slot.nextElementSibling.value === '') {
		slot.nextElementSibling.value = display.value;
		slot.classList.add('notation__btn_remove');
	} else {
		slot.nextElementSibling.value = null;
		slot.classList.remove('notation__btn_remove');
	}
	focusDebug.focus();
}

// Проверка на длину

function checkLength() {
	let isDecimal = display.value.indexOf('.');

	if (display.value.length > 11 && isDecimal !== -1) {
		display.value = MemoryCurrentValue.toFixed(10 - MemoryCurrentValue.toFixed().length);
		while (display.value.slice(-1) === '0') {
			let str = display.value;
			display.value = str.substr(0, str.length - 1);
		}
	}
	if (display.value.length > 11 && isDecimal === -1) {
		display.value = 'TooMuchBro!';
		blockBtns();
	}
}

// Заморозить кнопки

function blockBtns() {
	for (let i = 0; i < blockedBtns.length; i++) {
		blockedBtns[i].setAttribute('disabled', 'disabled');
	}
}

// Звук нажатия клавиши и вкл./выкл.

let sound = new Audio();
sound.src = 'aud/sound.mp3';

let soundOn = true;
let soundToggle = doc.querySelector('.sound-toggle');

soundToggle.addEventListener('click', (e) => {
	e.target.classList.toggle('sound-toggle_off');
	if (soundOn) {
		soundOn = false;
	} else {
		soundOn = true;
	}
});

function playSound() {
	if (soundOn) {
		sound.play();
	}
}
