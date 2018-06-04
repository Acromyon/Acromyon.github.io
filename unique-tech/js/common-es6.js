function getAlignItems() {
	if (document.documentElement.clientWidth > 991) {
		const alignItems = document.getElementsByClassName('height-align');
		let maxItemlHeight = 0;

		for (let i = 0; i < alignItems.length; i++) {
			if (maxItemlHeight < alignItems[i].clientHeight) {
				maxItemlHeight = alignItems[i].clientHeight;
			}
		}

		maxItemlHeight += 'px';

		for (let i = 0; i < alignItems.length; i++) {
			alignItems[i].style.height = maxItemlHeight;
		}
	}
}

getAlignItems();
