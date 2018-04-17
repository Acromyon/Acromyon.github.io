// Вызов меню

const headerMenuBtn = document.getElementById('header__menu-btn');
const headerMenu = document.getElementById('header__menu');
const headerMenuItem = document.getElementsByClassName('header__menu-item');

headerMenuBtn.addEventListener('click', toggleSideMenu);

for (let i = 0; i < headerMenuItem.length; i++) {
	headerMenuItem[i].addEventListener('click', toggleSideMenu);
}

function toggleSideMenu() {
	headerMenu.classList.toggle('header__menu_hidden');
}

// Открыть-Закрыть блок настроек фильтра

const filterDropDown = document.getElementById('filter__drop-down');
const commonOptionsBlock = document.getElementById('filter__common-options-block');

const blockHeight = commonOptionsBlock.clientHeight;
	commonOptionsBlock.style.height = blockHeight + 'px';

filterDropDown.addEventListener('click', toggleDropDownFilter);

function toggleDropDownFilter() {
	commonOptionsBlock.classList.toggle('filter__common-options-block_hidden');
	filterDropDown.classList.toggle('filter__drop-down-options_closed');
}

// Упрощение клика на чекбокс

const filterOptionBlocks = document.getElementsByClassName('filter__option-block');

for (let i = 0; i < filterOptionBlocks.length; i++) {
	filterOptionBlocks[i].addEventListener('click', checkedOption);
}

function checkedOption() {
	if (this.firstElementChild.checked) {
		this.firstElementChild.checked = false;
	} else this.firstElementChild.checked = true;
}
