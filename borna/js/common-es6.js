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

// Подключение кастомных стилей для "select" и "option"

$('input, select').styler();
