const doc = document;

// Выравнивание бллоков по высоте

let alignItems = doc.getElementsByClassName('height-align');

getAlignItems(alignItems);

function clearStyle() {
	for (let i = 0; i < alignItems.length; i++) {
		alignItems[i].removeAttribute('style');
	}
	getAlignItems(alignItems);
}

function getAlignItems(items) {
	let maxItemlHeight = 0;

	for (let i = 0; i < items.length; i++) {
		if (maxItemlHeight < items[i].clientHeight) {
			maxItemlHeight = items[i].clientHeight;
		}
	}
	maxItemlHeight += 'px';

	for (let i = 0; i < items.length; i++) {
		items[i].style.height = maxItemlHeight;
	}
	window.addEventListener('resize', clearStyle);
}

// Запуска анимации самолётиков

let planes = doc.getElementsByClassName('title-btn');

doc.addEventListener('scroll', toStart);

function toStart() {
	let currentScroll = pageYOffset + (doc.documentElement.clientHeight / 2);

	for (let i = 0; i < planes.length; i++) {
		let coords = planes[i].getBoundingClientRect();
		let positionY = coords.top + pageYOffset;

		if (currentScroll >= positionY) {
			planes[i].firstElementChild.classList.add('plane-fly');
		}
	}
}
