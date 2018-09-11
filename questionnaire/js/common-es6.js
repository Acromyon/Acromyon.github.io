let app = new Vue({
	el: '#app',
	data: {
		headerHeight: 79,
		headerLinks: [
			{
				name: 'Личная информация',
				isActive: false
			},
			{
				name: 'Опыт',
				isActive: false
			},
			{
				name: 'JavaScript',
				isActive: false
			},
			{
				name: 'О себе',
				isActive: false
			}
		],
		headerActiveLink: null,
		yearsRange: [],
		selectedYear: 1990,
		experienceSet: {
			items: [
				[
					'БЭМ/OOCSS',
					'Stylus/LESS/SASS',
					'Работаю с SVG'
				],
				[
					'Верстаю семантично',
					'ES2015/ES2016',
					'Gulp/GRUNT'
				],
				[
					'Webpack',
					'jQuery',
					'Ипользую Git'
				]
			],
			blocks: ['left', 'center', 'right']
		},
		sliderTogglePosition: 100,
		smoothScroll: {
			speed: 0.4,
			start: null,
			elementPosY: null,
			time: null
		}
	},
	computed: {},
	methods: {
		headerChange(e) {
			if (e.target.documentElement.scrollTop > 11) {
				this.headerHeight = 39;
			} else {
				this.headerHeight = 79;
			}
			let coordX = e.target.documentElement.clientWidth / 2;
			let coordY = e.target.documentElement.clientHeight / 4;

			let currentSection = e.target.elementFromPoint(coordX, coordY).closest('section');
			if (currentSection && this.headerActiveLink !== currentSection.id) {
				for (let i = 0; i < this.headerLinks.length; i++) {
					this.headerLinks[i].isActive = false;
				}
				this.headerLinks[currentSection.id].isActive = true;
			}
		},
		smoothScrollStart(index) {
			this.smoothScroll.start = window.pageYOffset;
			this.smoothScroll.elementPosY = document.getElementById(index).getBoundingClientRect().top;
			requestAnimationFrame(this.smoothScrollStep);
		},
		smoothScrollStep(time) {
			if (this.smoothScroll.time === null) {
				this.smoothScroll.time = time;
			}
			let progress = time - this.smoothScroll.time;
			let currrentPosY;
			if (this.smoothScroll.elementPosY < 0) {
				currrentPosY = Math.max(
					this.smoothScroll.start - (progress / this.smoothScroll.speed),
					this.smoothScroll.start + this.smoothScroll.elementPosY
					);
			} else {
				currrentPosY = Math.min(
					this.smoothScroll.start + (progress / this.smoothScroll.speed),
					this.smoothScroll.start + this.smoothScroll.elementPosY
				);
			}
			window.scrollTo(0, currrentPosY);
			if (currrentPosY === this.smoothScroll.start + this.smoothScroll.elementPosY) {
				this.smoothScroll.start = null;
				this.smoothScroll.elementPosY = null;
				this.smoothScroll.time = null;
			} else {
				requestAnimationFrame(this.smoothScrollStep);
			}
		},
		getYearsRange() {
			for (let i = 1970; i < 2001; i++) {
				this.yearsRange.push(i);
			}
		},
		changeSelectedYear(e) {
			if (this.selectedYear) {
				e.target.classList.remove('personal-info__select_no-choice');
			} else {
				e.target.classList.add('personal-info__select_no-choice');
			}
		},
		startSliderToggle() {
			addEventListener('mousemove', this.moveSliderToggle);
		},
		moveSliderToggle(e) {
			if (this.prevMousePosition < e.pageX && this.sliderTogglePosition !== 100) {
				this.sliderTogglePosition += 2;
			} else if (this.prevMousePosition > e.pageX && this.sliderTogglePosition !== 0) {
				this.sliderTogglePosition -= 2;
			}
			this.prevMousePosition = e.pageX;
		},
		stopSliderToggle() {
			removeEventListener('mousemove', this.moveSliderToggle);
			// Далее привязка к делениям слайдера
			if (this.sliderTogglePosition < 12.5) {
				this.sliderTogglePosition = 0;
			} else if (this.sliderTogglePosition > 12.5 && this.sliderTogglePosition < 37.5) {
				this.sliderTogglePosition = 25;
			} else if (this.sliderTogglePosition > 37.5 && this.sliderTogglePosition < 62.5) {
				this.sliderTogglePosition = 50;
			} else if (this.sliderTogglePosition > 62.5 && this.sliderTogglePosition < 85.5) {
				this.sliderTogglePosition = 75;
			} else {
				this.sliderTogglePosition = 100;
			}
		}
	},
	created() {
		this.getYearsRange();
		document.addEventListener('scroll', this.headerChange);
	}
});
