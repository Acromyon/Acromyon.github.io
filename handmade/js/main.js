'use strict';

/* Зёздный рейтинг */

const scoreStars = document.querySelectorAll('[class*=reviews__score-star_]');

for (let i = 0; i < scoreStars.length; i++) {
	const scoreStar = scoreStars[i];
		scoreStar.addEventListener('mouseover', function () {
			if (this.previousElementSibling != null) {
				for (let a = this; a.previousElementSibling != null; a = a.previousElementSibling) {
					a.previousElementSibling.classList.add('reviews__score-star_sub-hover');
				}
		}
	});
		scoreStar.addEventListener('mouseout', function () {
			if (this.previousElementSibling != null) {
				const subHovers = document.querySelectorAll('.reviews__score-star_sub-hover');
				for (let j = 0; j < subHovers.length; j++) {
					const subHover = subHovers[j];
					subHover.classList.remove('reviews__score-star_sub-hover');
				}
		}
	});
		scoreStar.addEventListener('click', function () {
				const actives = this.parentElement.querySelectorAll('.reviews__score-star_active');
				for (let k = 0; k < actives.length; k++) {
					const active = actives[k];
					active.classList.remove('reviews__score-star_active');
				}
				this.classList.add('reviews__score-star_active');
				const subHovers = document.querySelectorAll('.reviews__score-star_sub-hover');
				for (let j = 0; j < subHovers.length; j++) {
					const subHover = subHovers[j];
					subHover.classList.add('reviews__score-star_active');
				}
		});
}

/* Сортировка отзывов */

const sortToggle = document.getElementById('sort-toggle').children;

for (let i = 0; i < sortToggle.length; i++) {
	const sortButton = sortToggle[i];
	sortButton.addEventListener('click', function () {
		if (this.classList.contains('reviews__sort_selected') === false) {
			this.classList.add('reviews__sort_selected');
			if (this.nextElementSibling != null) {
				this.nextElementSibling.classList.remove('reviews__sort_selected');
			} else this.previousElementSibling.classList.remove('reviews__sort_selected');
		}
	});
}
