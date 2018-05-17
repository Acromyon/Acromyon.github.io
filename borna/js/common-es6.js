// Открытие блока "Mega-Menu"

const megaMenuBtn = document.getElementById('mega-menu-btn');
const megaMenuBtnClose = document.getElementById('mega-menu-btn-close');
const megaMenuBlock = document.getElementById('mega-menu-block');

megaMenuBtn.addEventListener('click', toggleMegaMenuBlock);
megaMenuBtnClose.addEventListener('click', toggleMegaMenuBlock);

function toggleMegaMenuBlock() {
	megaMenuBlock.classList.toggle('mega-menu__block_hidden');
}

// Открытие блока "Contacts"

const contactsBtn = document.getElementById('contacts-btn');
const contactsBtnClose = document.getElementById('contacts-btn-close');
const contactsBlock = document.getElementById('contacts-block');

contactsBtn.addEventListener('click', toggleContactsBlock);
contactsBtnClose.addEventListener('click', toggleContactsBlock);

function toggleContactsBlock() {
	contactsBlock.classList.toggle('contacts__block_hidden');
}

// Аккардион новостей

const newsTitle = document.getElementsByClassName('news__title');
const newsArticle = document.getElementsByClassName('news__article-preview');

for (let i = 0; i < newsTitle.length; i++) {
	newsTitle[i].addEventListener('click', toggleDropDownElem);
}

function toggleDropDownElem() {
	const thatArticle = this.nextElementSibling;
	if (!this.classList.contains('news__title_open')) {
		for (let i = 0; i < newsTitle.length; i++) {
			newsTitle[i].classList.remove('news__title_open');
			newsArticle[i].classList.remove('news__article-preview_visible');
			newsArticle[i].style.maxHeight = null;
		}
		this.classList.add('news__title_open');
		thatArticle.classList.add('news__article-preview_visible');
		thatArticle.style.maxHeight = thatArticle.scrollHeight + 'px';
	} else {
		this.classList.toggle('news__title_open');
		thatArticle.classList.toggle('news__article-preview_visible');
		thatArticle.style.maxHeight = null;
	}
}

// Переключение табов

const cardTabs = document.getElementsByClassName('offer__tab');
const offerCards = document.getElementsByClassName('offer__card');

for (let i = 0; i < cardTabs.length; i++) {
	cardTabs[i].addEventListener('click', tabToggle);
}

function tabToggle() {
	if (!this.classList.contains('offer__tab_open')) {
		const tabNum = this.getAttribute('data-tab');
		for (let i = 0; i < cardTabs.length; i++) {
			cardTabs[i].classList.remove('offer__tab_open');
		}
		for (let i = 0; i < offerCards.length; i++) {
			offerCards[i].classList.add('offer__card_hidden');
		}
		this.classList.add('offer__tab_open');
		offerCards[tabNum].classList.remove('offer__card_hidden');
	}
}

const postIndex = document.getElementsByClassName('post-index');

for (let i = 0; i < postIndex.length; i++) {
	postIndex[i].addEventListener('focus', letDropTips);
}

function letDropTips() {
	const dropTips = this.parentNode.nextElementSibling;
	dropTips.classList.remove('offer__card-post-index-tip_hidden');
	dropTips.style.zIndex = 20;
	this.onblur = function () {
		dropTips.classList.add('offer__card-post-index-tip_hidden');
	};
}

// Фильтрация подсказок при ввдое данных в input

const input = document.getElementsByClassName('post-index');
let entryValue;

for (let i = 0; i < input.length; i++) {
	input[i].addEventListener('keyup', filterTips);
}

function filterTips(e) {
	const currentTipsList = this.parentElement.nextElementSibling; // лист с подсказками текущего input - object
	const currentTipsListItems = currentTipsList.children; // массив li из листа текущего imput
	let currentTipsListFlag = true; // флаг для скрытия листа, если он пуст
	if (e.key === 'Backspace') {
		for (let i = 0; i < postIndexTips.length; i++) {
			postIndexTips[i].style.display = 'list-item';
		}
	}
	entryValue = this.value;
	for (let i = 0; i < postIndexTips.length; i++) {
		const currentTip = postIndexTips[i].getAttribute('data-tip');
		for (let j = 0; j < entryValue.length; j++) {
			if (entryValue[j] !== currentTip[j]) {
				postIndexTips[i].style.display = 'none';
			}
		}
	}
	for (let i = 0; i < currentTipsListItems.length; i++) { // проверяем лист с подсказками на наличие видимых li
		if (currentTipsListItems[i].style.display === 'none') {
			currentTipsListFlag = false;
		} else {
			currentTipsListFlag = true;
			break;
		}
	}
	if (!currentTipsListFlag) { // скрываем лист, если нет li, и наоборот
		currentTipsList.style.display = 'none';
	} else currentTipsList.style.display = 'block';
}

// Вывод выбранной подсказки в input

const postIndexTips = document.getElementsByClassName('offer__card-post-index-tip');

for (let i = 0; i < postIndexTips.length; i++) {
	postIndexTips[i].addEventListener('click', takeTip);
}

function takeTip() {
	const dataTip = this.getAttribute('data-tip');
	const postIndexCurrent = this.parentElement.previousElementSibling.firstElementChild;
	postIndexCurrent.value = dataTip;
}

// Осветление svg-иконок при наведении

const slotSet = document.getElementsByClassName('categories__slot-item');

for (let i = 0; i < slotSet.length; i++) {
	slotSet[i].addEventListener('mouseover', svgPaint);
}

function svgPaint() {
	const svg = this.firstElementChild.contentDocument.firstElementChild;
	svg.style.transition = 'all .2s ease-out';
	svg.style.fill = '#ffffff';
	this.onmouseout = function () {
		svg.style.fill = '#000000';
	};
}

// Разворачивание вкладок .text-block__fold-text

const foldBtn = document.getElementsByClassName('text-block__fold-btn');

for (let i = 0; i < foldBtn.length; i++) {
	foldBtn[i].addEventListener('click', toggleFoldText);
}

function toggleFoldText() {
	this.classList.toggle('text-block__fold-btn_closed');
	this.parentElement.classList.toggle('text-block__fold-text_closed');
}

// Подключение и настройка Range Slider jQuery UI

let sliderValue = 1; // Самообновляющееся значение слайдера количества жильцов (1 по умолчанию)

$('#slider').slider({
	min: 1,
	max: 5,
	value: 1,
	range: false,
	animate: 'normal',
	slide: function (event, ui) { 
			sliderValue = ui.value;
		}
	});

// Подключение кастомных стилей для "select" и "option"

$('input, select').styler();
