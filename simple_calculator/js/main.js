//Оптимизация - разовое получение DOM

var doc = document;

//Размножение блока промеж.значений

for (i = 0; i < 5; i++){
	var liItm = doc.querySelector('.notation__list-item').cloneNode(true);
	doc.querySelector('.notation__list').appendChild(liItm);
}

//Получение объектов в переменных

var digits = doc.querySelectorAll('.digit'),
	operations = doc.querySelectorAll('.operator'),
	clearBtns = doc.querySelectorAll('.clear-btn'),
	comma = doc.getElementById('comma'),
	backspace = doc.getElementById('backspace'),
	saveData = doc.querySelectorAll('.save-data'),
	display = doc.getElementById('display'),
	MemoryCurrentValue = 0,
	MemoryNewValue = false,
	MemoryPendingValue = '';

//Обработчики событий

for (i = 0; i < digits.length; i++){
	var digit = digits[i];
	digit.addEventListener('click', function(e){
		pressDigit(e.target.textContent);
	});
}

for (i = 0; i < operations.length; i++){
	var operator = operations[i];
	operator.addEventListener('click', function(e){
		operation(e.target.textContent);
	});
}

for (i = 0; i < clearBtns.length; i++){
	var clearBtn = clearBtns[i];
	clearBtn.addEventListener('click', function(e){
		clear(e.target.id);
	});
}

comma.addEventListener('click', decimal);

backspace.addEventListener('click', makeBackspace);

for (i = 0; i < saveData.length; i++){
	var data = saveData[i];
	data.addEventListener('click', function(e){
		makeSaveData(this.nextSibling.nextSibling);
	});
}

//Ввод с клавиатуры

addEventListener("keypress", function(event) {
	doc.querySelector('.focus-debug').focus();
	var keyEvent = parseInt(String(event.charCode)),
		keyEventValue = String.fromCharCode(event.charCode);
	if (keyEvent > 47 && keyEvent < 58){
		pressDigit(keyEventValue);
		keyPressSound();
	} else if (keyEvent === 0 || keyEvent == 13 || keyEvent == 42 || keyEvent == 43 || keyEvent == 45 || keyEvent == 47 || keyEvent == 61){
		if (keyEvent == 13 || keyEvent === 0){keyEventValue = '=';}
		if (keyEventValue === '*'){keyEventValue = '×';}
		if (keyEventValue === '/'){keyEventValue = '÷';}
		operation(keyEventValue);
		keyPressSound();
	} else if (keyEvent == 46){
		decimal();
		keyPressSound();
	}
});

//Операции

function pressDigit(digit){
	if (MemoryNewValue){
		display.value = digit;
		MemoryNewValue = false;
	} else {
		if (display.value === '0') {
			display.value = digit;
		} else if (display.value.length < 11){
			display.value += digit;
		}
	}
}

function operation(operate){
	var localOperationMemory = display.value;
	if (MemoryNewValue && MemoryPendingValue != '='){
		display.value = MemoryCurrentValue;
	} else {
		MemoryNewValue = true;
		if (MemoryPendingValue === '+'){
			MemoryCurrentValue += parseFloat(localOperationMemory);
		} else if (MemoryPendingValue === '-'){
			MemoryCurrentValue -= parseFloat(localOperationMemory);
		} else if (MemoryPendingValue === '×'){
			MemoryCurrentValue *= parseFloat(localOperationMemory);
		} else if (MemoryPendingValue === '÷'){
			MemoryCurrentValue /= parseFloat(localOperationMemory);
		} else {
			MemoryCurrentValue = parseFloat(localOperationMemory);
		}
		if (operate != '='){
			display.value = MemoryCurrentValue + operate;
			MemoryPendingValue = operate;
		} else{
			display.value = MemoryCurrentValue;
			MemoryPendingValue = operate;
		}
	}
	var testNumber = display.value.indexOf('.');
	if (display.value.length > 11 && testNumber !== -1){
		display.value = MemoryCurrentValue.toFixed(10 - MemoryCurrentValue.toFixed().length);
		while (display.value.slice(-1) === '0') {
			var str = display.value;
			display.value = str.substr(0, str.length - 1);
		}
	}
	if (display.value.length > 11 && testNumber === -1){display.value = 'TooMuchBro!';}
}

function clear(id){
	if (id === 'clear-entry'){
		display.value = '0';
		MemoryNewValue = true;
	} else if (id === 'clear-all' || id === 'clear-creeper'){
		display.value = '0';
		MemoryNewValue = true;
		MemoryCurrentValue = 0;
		MemoryPendingValue = '';
	}
}

function decimal(){
	var localDecimalMemory = display.value;
	if (MemoryNewValue){
		localDecimalMemory = '0.';
		MemoryNewValue = false;
	} else if (localDecimalMemory.indexOf('.') === -1){
		localDecimalMemory += '.';
		}
	display.value = localDecimalMemory;
}

function makeBackspace(){
	var str = display.value;
	if (display.value.indexOf('*') === -1 && display.value.indexOf('/') === -1 && display.value.indexOf('+') === -1 && display.value.indexOf('-') === -1 && display.value.indexOf('÷') === -1 && display.value.indexOf('×') === -1) {
		if (str.length > 1){
		display.value = str.substr(0, str.length - 1);
		} else if (str.length <= 1){
		display.value = '0';
		}
	}
}

function makeSaveData(e){
	if (e.value === ''){
		e.value = display.value;
		e.previousSibling.previousSibling.classList.add('notation__btn_remove');
	} else {
		e.value = null;
		e.previousSibling.previousSibling.classList.remove('notation__btn_remove');
	}
}

// Звук нажатия клавиши и вкл./выкл.

var sound = new Audio(),
	soundOn = true,
	soundToggle = doc.querySelector('.sound-toggle');
sound.src = 'aud/sound.mp3';

soundToggle.addEventListener('click', function (){
	this.classList.toggle('sound-toggle_off');
	if (soundOn){
		soundOn = false;
	} else {soundOn = true;}
});

var btns = doc.querySelectorAll('button');
for (i = 0; i < btns.length; i++){
	var btn = btns[i];
	btn.addEventListener('mousedown', function(){
		if (soundOn){sound.play();}
	}, false);
}

function keyPressSound(){
	if (soundOn){sound.play();}
}