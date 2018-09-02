let app = new Vue({
	el: '#app',
	data: {
		cards: [],
		currentCards: [],
		donePairs: 0,
		cardsFrozen: false,
		timer: 0
	},
	computed: {
		percentageProgress() {
			return 100 / (this.cards.length / 2) * this.donePairs;
		}
	},
	methods: {
		getCardSet() {
			this.cards = [];
			this.donePairs = 0;
			this.cardsFrozen = false;
			this.timer = 0;
			for (let i = 0; i < 12; i++) {
				this.cards.push({});
				this.cards[i].seniority = Math.floor(this.getRandomNumber(2, 13));
				this.cards[i].suit = Math.floor(this.getRandomNumber(0, 3));
				this.$set(this.cards[i], 'state', 'closed');
			}
			this.duplicateCardSet();
		},
		getRandomNumber(min, max) {
			return min + (Math.random() * (max + 1 - min));
		},
		duplicateCardSet() {
			let cloneArray = [];
			for (let i = 0; i < this.cards.length; i++) {
				let cloneElem = {};
				for (let key in this.cards[i]) {
					cloneElem[key] = this.cards[i][key];
				}
				cloneArray.push(cloneElem);
			}
			this.cards = this.cards.concat(cloneArray);
			this.cards.sort(this.mixCardSet);
			this.timerTick();
		},
		mixCardSet() {
			return Math.random() - 0.5;
		},
		openCards(index) {
			if (!this.cardsFrozen && this.cards[index].state !== 'opened') {
				this.cards[index].state = 'opened';
				this.currentCards.push(this.cards[index]);
				if (this.currentCards.length === 2 &&
					this.currentCards[0].suit === this.currentCards[1].suit &&
					this.currentCards[0].seniority === this.currentCards[1].seniority) {
					for (let i = 0; i < this.currentCards.length; i++) {
						this.currentCards[i].state = 'done';
					}
					this.donePairs++;
					this.currentCards = [];
					this.isAllDone();
				} else if (this.currentCards.length === 2) {
					this.cardsFrozen = true;
					setTimeout(() => {
						this.closeCards();
					}, 1200);
				}
			}
		},
		closeCards() {
			for (let i = 0; i < this.cards.length; i++) {
				if (this.cards[i].state === 'opened') {
					this.cards[i].state = 'closed';
				}
			}
			this.currentCards = [];
			this.cardsFrozen = false;
		},
		timerTick() {
			if (this.donePairs < 12) {
				setTimeout(() => {
					this.timer++;
					this.timerTick();
				}, 1000);
			}
		},
		isAllDone() {
			if (this.donePairs === 12) {
				this.cardsFrozen = true;
			}
		},
		closeTab() {
			window.close();
		}
	},
	created() {
		this.getCardSet();
	}
});
