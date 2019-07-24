import "./styles/app.css";

import Game from './models/Game.js'
import UI from './UI.js'

document.addEventListener('DOMContentLoaded', () => {
	const ui = new UI();
	ui.renderGames();
})

document.getElementById('game-form')
	.addEventListener('submit', function(e) {

		const tittle = document.getElementById('title').value;
		const availableConsole = document.getElementById('availableConsole').value;
		const price = document.getElementById('price').value;

		const image = document.getElementById('image').value

		const formData = new FormData();

		formData.append('imagePath', image[0]);
		formData.append('title', title);
		formData.append('availableConsole', availableConsole);
		formData.append('price', price);
		 console.log(formData.title)

		const ui = new UI();


		const game = new Game(tittle, availableConsole, price);

		// Validating User Input
	    if (title === '' || availableConsole === '' || price === '') {
	      ui.renderMessage('Please fill all the fields', 'error', 3000);
	    } else {
	      // Pass the new book to the UI
	      ui.addNewGame(formData);
	      ui.renderMessage('New Game Added Successfully', 'success', 2000);
	    }

	    e.preventDefault();
	})
