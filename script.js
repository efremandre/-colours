'use stript';

const cols = document.querySelectorAll('.col');
const button = document.querySelectorAll('.button');

document.addEventListener('keydown', (event) => {
	event.preventDefault();
	if (event.code.toLowerCase() === 'space') {
		setRandomColors();
	}
})

function getLockButton() {
	button.forEach((elem) => {
		elem.addEventListener('click', () => {
			const icon = elem.children[0];
			icon.classList.toggle('fa-lock-open');
			icon.classList.toggle('fa-lock');
		})
	})
}

getLockButton();

function generateRandomColor() {
	const hexCodes = '0123456789ABCDEF';
	let color = '#';

	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
	}

	return color;
}

function chekColorsLuminance(hex) {
	const R = parseInt(hex.slice(1, 3), 16);
	const G = parseInt(hex.slice(3, 5), 16);
	const B = parseInt(hex.slice(5, 7), 16);

	if ((R * 0.2126 + G * 0.7152 + B * 0.0722) > 170) {
		return true;
	}
}

function setRandomColors() {
	cols.forEach((elem) => {
		const isLock = elem.querySelector('i').classList.contains('fa-lock');
		const colorName = elem.querySelector('.title');
		const generateColors = generateRandomColor();
		const luminance = chekColorsLuminance(generateColors);

		if (isLock) return;

		colorName.textContent = generateColors;
		elem.style.background = generateColors;

		if (luminance) {
			elem.classList.add('black')
		} else {
			elem.classList.remove('black')
		}
	})
}

setRandomColors();

function copyText(text) {
	return navigator.clipboard.writeText(text);
}

function setCopyColorName() {
	cols.forEach((elem) => {
		elem.addEventListener('click', (ev) => {
			const notification = elem.querySelector('.subtitle');
			let element = ev.target;

			if (element.classList.contains('title')) {
				copyText(element.innerText);
				notification.classList.add('active');
			}

			setTimeout((() => {
				notification.classList.remove('active');
			}), 500)
		})
	})
}

setCopyColorName();

const buttonCopyAll = document.querySelector('.copy-all');
setInterval(() => {
	buttonCopyAll.classList.toggle('flashhingButton');
}, 6000);

buttonCopyAll.addEventListener('click', copiedAll);

function copiedAll() {
	const title = document.querySelectorAll('.title');
	const notification = document.querySelectorAll('.subtitle');
	const arr = [];

	title.forEach((elem) => {
		arr.push(elem.innerHTML);
	})
	copyText(arr);

	notification.forEach((elem) => {
		elem.classList.add('active');
		setTimeout((() => {
			elem.classList.remove('active');
		}), 500)
	})

}