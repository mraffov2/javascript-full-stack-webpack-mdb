

class GameService {

    constructor() {
        this.URI = `http://localhost:4000/api/games`;
    }

    async getGames() {
        const response = await fetch(this.URI);    
        const games = await response.json();
        return games;
    }

    async postGame(game) {
        const res = await fetch(this.URI, {
            mode: 'cors',
            method: 'POST',
            body: game,
            
        });
        const data = await res.json();
    }

    async deleteGame(gameId) {
        const res = await fetch(`${this.URI}/${gameId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'Delete'
        });
        const data = await res.json();
        console.log(data);
    }

}

export default GameService;