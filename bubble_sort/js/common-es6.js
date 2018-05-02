// Подключение и настройка Range Slider jQuery UI

$('#slider').slider({
	min: 0,
	max: 99,
	values: [0, 99],
	range: true,
	animate: 'normal',
	slide: function(event, ui) { // Привязываем значение плзунков к отоброжающим элементам
			for (let i = 0; i < generatorRangeValue.length; i++) {
				$('.generator__range-value_' + [i]).text(ui.values[i]);
			}
		}
	});

// Вывод значенй слайдера

$('.ui-slider-handle').append('<div class="generator__range-value"></div>'); // Добавляем в слайдер отображающие элементы
let generatorRangeValue = $('.generator__range-value'); // Получаем их для дальнейшей модификации в цикле

for (var i = 0; i < generatorRangeValue.length; i++) {
	generatorRangeValue[i].classList.add('generator__range-value_' + [i]);
}

// Генератор случайных чисел

let sliderValues; // Обявляем переменную для хранения значений диапазона
const randomValues = [];

$('.generator__do-btn').click(generateData);
$('.sorter__do-btn').click(sorterData);

function generateData() {
	sliderValues = $('#slider').slider('values'); // Получаем значения диапазона из слайдера и заносим в sliderValues

	randomValues.length = 0; // Очищаем массив перед каждой новой генерацией

	for (let i = 0; i < 10; i++) {
		const j = Math.floor(Math.random() * (sliderValues[1] - sliderValues[0] + 1)) + sliderValues[0]; // Math.round() даст неравномерное распределение
		randomValues.push(j); // Вносим в массив сгенерированное число при каждой итерацие
	}

	getDataView('.generator__result', randomValues, 'generator'); // Отдаём данные в шаблонизатор
	addSortBtn();
}

// Сортировка массива "пузырьком"

function sorterData() {
	this.setAttribute('disabled', 'disabled'); // Отключаем кнопку сортировки
	getDataView('.sorter__result', randomValues, 'sorter'); // Отдаём неотсартированные данные в шаблонизатор

	const lastResultElem = document.querySelector('.sorter__result-block:last-child');
	lastResultElem.addEventListener('animationend', function() {
		const sortedValues = randomValues;
		let step = 0;
		let subStep = 0;
		(function toStepsSorter() {

/*			for (let i = 0; i < (sortedValues.length - 1); i++) {
				for (let j = 0; j < (sortedValues.length - 1) - i; j++) {
					if (sortedValues[j] > sortedValues[j + 1]) {
						const num1 = j; //сохраняем индекс текущего элемента массива
						const num2 = j + 1; //сохраняем индекс следующего элемента массива
						sortAnimate(num1, num2);

						const tempMemory = sortedValues[j];
						sortedValues[j] = sortedValues[j + 1];
						sortedValues[j + 1] = tempMemory;
					}
				}
			}*/

			console.log('step    - ' + step);
			console.log('subStep - ' + subStep);
			if (step < sortedValues.length - 1) {
				if (subStep < (sortedValues.length - 1) - step) {
					if (sortedValues[subStep] > sortedValues[subStep + 1]) {
						const num1 = subStep; //сохраняем индекс текущего элемента массива
						const num2 = subStep + 1; //сохраняем индекс следующего элемента массива
						sortAnimate(num1, num2);

						const tempMemory = sortedValues[subStep];
						sortedValues[subStep] = sortedValues[subStep + 1];
						sortedValues[subStep + 1] = tempMemory;
					}
					subStep++;
				} else {
					step++;
					subStep = 0;
				}
				setTimeout(toStepsSorter, 700);
			}
		})();
	});
}

// Универсальная функция вывода массива в HTML

function getDataView(parent, someArray, classNameModify) {
	$(parent).children().remove(); // Очищаем от старых элементов, если они были

	for (let i = 0; i < someArray.length; i++) {
		$(parent).append(
			`<div class="${classNameModify}__result-block">
				<div class="${classNameModify}__result-value">${someArray[i]}</div>
				<div class="${classNameModify}__result-spot"></div>
			</div>`);
	}
	entryDataView(parent);
}

// Вывод блока кнопок сортировки или снятие 'disabled'

function addSortBtn() {
	if ($('.sorter__btns-block').css('display') === 'none') {
		$('.sorter__btns-block').css('display', 'block');
	} else {
		$('.sorter__do-btn').removeAttr('disabled');
	}
}

// Анимация вывода данных

function entryDataView(parent) {
	const parentElem = $(parent);
	let entryLoopStep = 0;
	entryLoop();
	function entryLoop() {
		if (entryLoopStep < parentElem.children().length) {
			parentElem.children()[entryLoopStep].classList.add('entryDataUp');
			parentElem.children()[entryLoopStep].firstElementChild.classList.add('entryDataDown');
			parentElem.children()[entryLoopStep].addEventListener('animationend', function() {
				this.classList.add('visible'); // Оставляем элементы видимыми
				this.classList.remove('entryDataUp'); // Снимаем анимацию появления
				this.firstElementChild.classList.remove('entryDataDown');
			});
			entryLoopStep++;
			setTimeout(entryLoop, 170);
		}
	}
}

// Анимация сортировки

function sortAnimate(num1, num2) {
	const obj1 = $('#sorter__result .sorter__result-block:eq(' + num1 + ')'); //производим выборку текущего числа
	const obj2 = $('#sorter__result .sorter__result-block:eq(' + num2 + ')'); //производим выборку следующего числа

	console.log(obj1, obj2);
	obj1.swap(obj2); //меняем числа местами
}

// Переключение табов типа сортировки (Далее код на чистом ES6)

const sorterTabs = document.getElementsByClassName('sorter__tab-btn');
const sorterResult = document.getElementById('sorter__result');

for (let i = 0; i < sorterTabs.length; i++) {
	sorterTabs[i].addEventListener('click', toggleTabs);
}

function toggleTabs() {
	if (this.classList.contains('sorter__tab-btn_pressed') === false) {
		for (let i = 0; i < sorterTabs.length; i++) {
			sorterTabs[i].classList.remove('sorter__tab-btn_pressed');
			sorterTabs[i].setAttribute('data-tab-pressed', false);
		}
		this.classList.add('sorter__tab-btn_pressed');
		this.setAttribute('data-tab-pressed', true);

		const selectElem = this;
		sorterResultReverse(selectElem);
	}
}

// Разворот отсортированных данных (возростание - убывание)

function sorterResultReverse(selectElem) {
	if (selectElem.classList.contains('sorter__down-btn') && selectElem.getAttribute('data-tab-pressed')) {
		sorterResult.classList.add('sorter__result-reverse');
	} else sorterResult.classList.remove('sorter__result-reverse');
}
