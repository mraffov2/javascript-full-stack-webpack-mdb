import "./styles/app.css";

import Game from './models/Game.js'
import UI from './UI.js'

document.addEventListener('DOMContentLoaded', () => {
	const ui = new UI();
	ui.renderGames();
})

document.getElementById('game-form')
	.addEventListener('submit', function(e) {

		const title = document.getElementById('title').value;
		const availableConsole = document.getElementById('availableConsole').value;
		const price = document.getElementById('price').value;

		const image = document.getElementById('image').files

		
		const extFile = document.getElementById('image').value;
		

		const formData = new FormData();

		formData.append('image', image[0]);
		formData.append('title', title);
		formData.append('availableConsole', availableConsole);
		formData.append('price', price);
		
		const ui = new UI();


		const game = new Game(title, availableConsole, price);

		/*var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
    	if(!allowedExtensions.exec(extFile)){
    		ui.renderMessageExtension('Teh extension file available are: jpg, jpeg, png', 'error', 5000);
    	}*/

		// Validating User Input
	    if (title === '' || availableConsole === '' || price === '') {
	      ui.renderMessage('All field are required', 'error', 5000);
	    } else {
	      // Pass the new book to the UI
	      document.getElementById("title").disabled = true;
	      document.getElementById("availableConsole").disabled = true;
	      document.getElementById("price").disabled = true;
	      document.getElementById("image").disabled = true;
	      document.getElementById("buttonSend").disabled = true;

	      ui.addNewGame(formData);
	      ui.renderMessage('New Game Added Successfully', 'success', 2000);
	      document.getElementById("title").disabled = false;
	      document.getElementById("availableConsole").disabled = false;
	      document.getElementById("price").disabled = false;
	      document.getElementById("image").disabled = false;
	      document.getElementById("buttonSend").disabled = false;
	    }

	    e.preventDefault();
	});

document.getElementById('games-cards')
  	.addEventListener('click', e => {
    const ui = new UI();
    if (e.target.classList.contains('delete')) {
      ui.deleteGame(e.target.getAttribute('_id'));
      ui.renderMessage('Game Deleted Successfully', 'success', 3000);
    }
    e.preventDefault();
});
