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
			div.className = 'animated fadeInRigth';
			div.innerHTML= `
				<div class="row">
					<div class="col-md-4">
						<div class="card card-cascade wider">
							<div class="view view-cascade overlay">
								<img src="${game.imagePath}" class="card-img-top img-fluid" alt="">
							</div
							<div class="card-body card-body-cascade text-center"
								<h4 class="card-title"><s${game.title}</strong></h4>
								<h5 class="blue-text pb-2"><strong>${game.availableConsole}</strong></h5>
								<h6 class="font-weight-bold indigo-text py-2">$ ${game.price}</h6>
								<button type="button" class="btn btn-danger btn-rounded" _id="${game._id}">Delete</button>
		  					</div>
						</div>
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

	clearBookForm() {
		document.getElementById('game-form').reset();
		document.getElementById('title').focus()
	}

	renderMessage(message, colorMessage, secondsToRemove) {
		const div = document.createElement('div');

		div.className = `message ${colorMessage}`;

		div.appendChild(document.createTextNode(message));

		const container = document.querySelector('.col-md-4');
		const gameForm = document.querySelector('#game-form');
		container.insertBefore(div, gameForm);

		setTimeout(() => {
	      	document.querySelector('.message').remove();
	    }, secondsToRemove);	
	}

	async deleteGame(gameId) {
		await gameService.deleteGame(bookId);
		this.renderGames();
	}
}

export default UI;