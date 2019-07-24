import GameService from './services/GameService';
const gameService = new GameService();

import { format } from 'timeago.js';

class UI {

	async	renderGames(){
		const games = await gameService.getGames();
		const gameCardContainer = document.getElementById('games-cards');
		gameCardContainer.innerHTML = '';
		games.forEach((game) =>{
			const div = document.createElement('div');
			div.className = 'col-10 col-sm-10 col-lg-5 col-xl-6  mt-4';
			div.innerHTML= `
	
						<div class="card card-cascade wider view overlay zoom">
							<div class="view view-cascade overlay">
								<img class="card-img-top img-fluid h-75" src="http://localhost:4000${game.imagePath}"  alt="Card image cap">
								<a href="#!">
							      <div class="mask rgba-white-slight"></div>
							    </a>
							</div>
							<div class="card-body card-body-cascade text-center">
								<h4 class="card-title"><strong>${game.title}</strong></h4>
								<h5 class="blue-text pb-2"><strong>${game.availableConsole}</strong></h5>
								<h6 class="font-weight-bold indigo-text py-2">$${game.price}</h6>
								<button type="button" class="btn btn-danger btn-rounded delete" _id="${game._id}">Delete</button>
								<div class="card-footer text-muted text-center mt-4">
						      		${format(game.created_at)}
						    	</div>
		  					</div>
						</div>			
					
			`;
			gameCardContainer.appendChild(div);
		});
	}

	async addNewGame(game){
		await gameService.postGame(game);
		this.renderGames();
		this.clearGameForm();
	}

	clearGameForm() {
		document.getElementById('game-form').reset();
		document.getElementById('title').focus()
	}

	renderMessage(message, colorMessage, secondsToRemove) {
		const div = document.createElement('div');

		div.className = `message ${colorMessage}`;

		div.appendChild(document.createTextNode(message));

		const container = document.querySelector('.selector');
		const gameForm = document.querySelector('#top-card');
		container.insertBefore(div, gameForm);

		setTimeout(() => {
	      	document.querySelector('.message').remove();
	    }, secondsToRemove);	
	}

	async deleteGame(gameId) {
		await gameService.deleteGame(gameId);
		this.renderGames();
	}
}

export default UI;