const doc = document;

//Генерация блока промеж.значений

for (let i = 0; i < 5; i++) {
	let liItm = doc.querySelector('.notation__list-item').cloneNode(true);
	doc.querySelector('.notation__list').appendChild(liItm);
}

//Получение объектов в переменных

let allBtns = document.getElementsByTagName('button');
let digits = doc.querySelectorAll('.digit');
let operations = doc.querySelectorAll('.operator');
let clearBtns = doc.querySelectorAll('.clear-btn');
let comma = doc.getElementById('comma');
let backspace = doc.getElementById('backspace');
let saveData = doc.querySelectorAll('.save-data');
let display = doc.getElementById('display');
let MemoryCurrentValue = 0;
let MemoryNewValue = false;
let MemoryPendingValue = '';

//Обработчики событий

for (let i = 0; i < digits.length; i++) {
	digits[i].addEventListener('click', pressDigit);
}

for (let i = 0; i < operations.length; i++) {
	operations[i].addEventListener('click', operation);
}

for (let i = 0; i < clearBtns.length; i++) {
	clearBtns[i].addEventListener('click', clear);
}

comma.addEventListener('click', decimal);

backspace.addEventListener('click', makeBackspace);

for (let i = 0; i < saveData.length; i++) {
	saveData[i].addEventListener('click', makeSaveData);
}

//Ввод с клавиатуры

addEventListener('keypress', function (event) {
	doc.querySelector('.focus-debug').focus();

	let keyEvent = parseInt(String(event.charCode));
	let keyEventValue = String.fromCharCode(event.charCode);

	if (keyEvent > 47 && keyEvent < 58) {
		pressDigit(keyEventValue);
		keyPressSound();
	} else if (keyEvent === 0
			|| keyEvent === 13
			|| keyEvent === 42
			|| keyEvent === 43
			|| keyEvent === 45
			|| keyEvent === 47
			|| keyEvent === 61) {
		if (keyEvent === 13 || keyEvent === 0) {
			keyEventValue = '=';
		}
		if (keyEventValue === '*') {
			keyEventValue = '×';
		}
		if (keyEventValue === '/') {
			keyEventValue = '÷';
		}
		operation(keyEventValue);
		keyPressSound();
	} else if (keyEvent === 46) {
		decimal();
		keyPressSound();
	}
});

//Операции

function pressDigit(e) {
	let digit = e.target.textContent;

	if (MemoryNewValue) {
		display.value = digit;
		MemoryNewValue = false;
	} else if (display.value === '0') {
		display.value = digit;
	} else if (display.value.length < 11) {
		display.value += digit;
	}
}

function operation(e) {
	let operate = e.target.textContent;
	let localOperationMemory = display.value;

	if (MemoryNewValue && MemoryPendingValue != '=') {
		display.value = MemoryCurrentValue;
	} else {
		MemoryNewValue = true;
		if (MemoryPendingValue === '+') {
			MemoryCurrentValue += parseFloat(localOperationMemory);
		} else if (MemoryPendingValue === '-') {
			MemoryCurrentValue -= parseFloat(localOperationMemory);
		} else if (MemoryPendingValue === '×') {
			MemoryCurrentValue *= parseFloat(localOperationMemory);
		} else if (MemoryPendingValue === '÷' && localOperationMemory !== '0') {
			MemoryCurrentValue /= parseFloat(localOperationMemory);
		} else if (MemoryPendingValue === '÷' && localOperationMemory === '0') {
			MemoryCurrentValue = 'Error';
			let blockedBtns = [...digits, ...operations, comma, backspace, ...saveData];

			for (let i = 0; i < blockedBtns.length; i++) {
				blockedBtns[i].setAttribute('disabled', 'disabled');
			}
		} else {
			MemoryCurrentValue = parseFloat(localOperationMemory);
		}
		if (operate !== '=') {
			display.value = MemoryCurrentValue + operate;
			MemoryPendingValue = operate;
		} else {
			display.value = MemoryCurrentValue;
			MemoryPendingValue = operate;
		}
	}

	let testNumber = display.value.indexOf('.');

	if (display.value.length > 11 && testNumber !== -1) {
		display.value = MemoryCurrentValue.toFixed(10 - MemoryCurrentValue.toFixed().length);
		while (display.value.slice(-1) === '0') {
			let str = display.value;
			display.value = str.substr(0, str.length - 1);
		}
	}
	if (display.value.length > 11 && testNumber === -1) {
		display.value = 'TooMuchBro!';
	}
}

function clear(e) {
	let id = e.target.id;

	for (let i = 0; i < allBtns.length; i++) {
		allBtns[i].removeAttribute('disabled');
	}

	if (id === 'clear-entry') {
		display.value = '0';
		MemoryNewValue = true;
	} else if (id === 'clear-all' || id === 'clear-creeper') {
		display.value = '0';
		MemoryNewValue = true;
		MemoryCurrentValue = 0;
		MemoryPendingValue = '';
	}
}

function decimal() {
	let localDecimalMemory = display.value;

	if (MemoryNewValue) {
		localDecimalMemory = '0.';
		MemoryNewValue = false;
	} else if (localDecimalMemory.indexOf('.') === -1) {
		localDecimalMemory += '.';
		}
	display.value = localDecimalMemory;
}

function makeBackspace() {
	let str = display.value;

	if (display.value.indexOf('*') === -1
		&& display.value.indexOf('/') === -1
		&& display.value.indexOf('+') === -1
		&& display.value.indexOf('-') === -1
		&& display.value.indexOf('÷') === -1
		&& display.value.indexOf('×') === -1) {
		str.length > 1 ? display.value = str.substr(0, str.length - 1) : display.value = '0';
	}
}

function makeSaveData(e) {
	let slot = e.target.closest('.save-data');
	console.log(slot);

	if (slot.nextElementSibling.value === '') {
		slot.nextElementSibling.value = display.value;
		slot.classList.add('notation__btn_remove');
	} else {
		slot.nextElementSibling.value = null;
		slot.classList.remove('notation__btn_remove');
	}
}

// Звук нажатия клавиши и вкл./выкл.

let sound = new Audio();
sound.src = 'aud/sound.mp3';

let soundOn = true;
let soundToggle = doc.querySelector('.sound-toggle');

soundToggle.addEventListener('click', function () {
	this.classList.toggle('sound-toggle_off');
	if (soundOn) {
		soundOn = false;
	} else {
		soundOn = true;
	}
});

let btns = doc.querySelectorAll('button');
for (let i = 0; i < btns.length; i++) {
	let btn = btns[i];
	btn.addEventListener('mousedown', () => {
		if (soundOn) {
			sound.play();
		}
	}, false);
}

function keyPressSound() {
	if (soundOn) {
		sound.play();
	}
}
