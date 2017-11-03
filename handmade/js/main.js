"use strict";

let scoreStars = document.querySelectorAll('[class*=reviews__score-star_]');

for (let i = 0; i < scoreStars.length; i++){
	let scoreStar = scoreStars[i];
		scoreStar.addEventListener('mouseover', function(e){
			if (this.previousElementSibling != null){
				for (let a = this; a.previousElementSibling != null; a = a.previousElementSibling){
					a.previousElementSibling.classList.add("reviews__score-star_sub-hover");
					console.log(a);
				}
		}});
		scoreStar.addEventListener('mouseout', function(e){
			if (this.previousElementSibling != null){
				let subHovers = document.querySelectorAll('.reviews__score-star_sub-hover');
				for (let j = 0; j < subHovers.length; j++){
					let subHover = subHovers[j];
					subHover.classList.remove("reviews__score-star_sub-hover");
				}
		}});
		scoreStar.addEventListener('click', function(e){
				let actives = this.parentElement.querySelectorAll('.reviews__score-star_active');
				for (let k = 0; k < actives.length; k++){
					let active = actives[k];
					active.classList.remove("reviews__score-star_active");
				}
				this.classList.add("reviews__score-star_active");
				let subHovers = document.querySelectorAll('.reviews__score-star_sub-hover');
				for (let j = 0; j < subHovers.length; j++){
					let subHover = subHovers[j];
					subHover.classList.add("reviews__score-star_active");
				}
		});
}