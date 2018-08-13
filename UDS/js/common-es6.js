let app = new Vue({
	el: '#app',
	data: {
		menuItems: {
			Главная: '/',
			Тарифы: '#',
			Интеграция: '#',
			Внедрение: '#',
			FAQ: '#',
			Контакты: '#',
			'Личный кабинет': '#'
		},
		ShiftX: '',
		ShiftY: '',
		LastPositionX: '',
		LastPositionY: '',
		isMouseonMap: false,
		usersScrollOffset: null
	},
	computed: {
		geoAnimationMap() {
			if (this.isMouseonMap) {
				this.LastPositionX = this.ShiftX;
				this.LastPositionY = this.ShiftY;
				return `top: ${(this.ShiftY / 6) - 7}px; left: ${(this.ShiftX / 2) - 4}px`;
			}
			return `top: ${(this.LastPositionY / 6) - 7}px; left: ${(this.LastPositionX / 2) - 4}px`;
		},
		geoAnimationCountry() {
			if (this.isMouseonMap) {
				this.LastPositionX = this.ShiftX;
				this.LastPositionY = this.ShiftY;
				return `top: ${(this.ShiftY / 4) + 75}px; left: ${this.ShiftX + 304}px`;
			}
			return `top: ${(this.LastPositionY / 4) + 75}px; left: ${this.LastPositionX + 304}px`;
		},
		geoAnimationName() {
			if (this.isMouseonMap) {
				this.LastPositionX = this.ShiftX;
				this.LastPositionY = this.ShiftY;
				return `top: ${(this.ShiftY / 3) + 158}px; left: ${(this.ShiftX * 1.5) + 493}px`;
			}
			return `top: ${(this.LastPositionY / 3) + 158}px; left: ${(this.LastPositionX * 1.5) + 493}px`;
		},
		shapeVariationFirst() {
			return 'clip-path: polygon(0px 438px,588px 438px,'
					+ (588 - this.ShiftX) + 'px ' + (150 - this.ShiftY) + 'px,'
					+ '0px 0px)';
		},
		shapeVariationMiddle() {
			return 'clip-path: polygon('
					+ (48 - this.ShiftX) + 'px 500px,607px 500px,'
					+ (450 - this.ShiftX) + 'px ' + (110 - this.ShiftY) + 'px,'
					+ (97 - this.ShiftX) + 'px ' + (204 - this.ShiftY) + 'px)';
		},
		shapeVariationLast() {
			return 'clip-path: polygon(' + (146 + this.ShiftX) + 'px 500px,425px 500px,425px '
					+ (172 - this.ShiftY) + 'px,'
					+ (38 - this.ShiftX) + 'px ' + (110 - this.ShiftY) + 'px)';
		},
		usersScrollPosition() {
			return `background-position: ${this.usersScrollOffset - 790}px 0`;
		}
	},
	methods: {
		mouseWatch(e) {
			this.ShiftX = 38 - (e.clientX / 25);
			this.ShiftY = 35 - (e.clientY / 20);
		},
		usersScroll(e) {
			this.usersScrollOffset += (e.deltaY / 2);
		}
	}
});
