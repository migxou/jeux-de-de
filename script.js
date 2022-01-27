/**
 * Règles du jeu*
 */

/**
 - 2 joueurs, chacun jouant à son tour;
 - A chaque tour, 1 joueur lance le dé autant de fois qu'il le souhaite. Chaque tour est ajouté à son score_totale;
 - Mais, si le joueur a 1, son score sera perdu. Après coup, c'est au tour du prochain joueur.
 - Le joueur peut choisir de 'garder' son score, ce qui implique que son tour est ajouté au score_total et il passe son tour.
 - Le premier joueur a atteindre le score_totale de 100 gagne la partie.
 */

/**le code de notre jeu */

// Nos variables fondamentales du jeu
const btnRoll = document.querySelector('.btn-roll');
const bntHold = document.querySelector('.btn-hold');
const newGame = document.querySelector('.btn-new');
let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;
let gamePlaying = false;
const images = ["./img_de/face-1.png",
    "./img_de/face-2.png",
    "./img_de/face-3.png",
    "./img_de/face-4.png",
    "./img_de/face-5.png",
    "./img_de/face-6.png",];

let diceToRoll = document.querySelectorAll("img");
btnRoll.addEventListener('click', () =>
{
    if (gamePlaying)
    {
        diceToRoll.forEach(function (rollTheDice)
        {
            rollTheDice.classList.add("shake")
        });
        setTimeout(() =>
        {
            diceToRoll.forEach(function (rollTheDice)
            {
                rollTheDice.classList.remove("shake")
            })
            let randomDice = Math.floor(Math.random() * 6) + 1;

            document.querySelector('#die-1').setAttribute("src", images[randomDice - 1])
            if (randomDice !== 1)
            {
                currentScore += randomDice;
                document.querySelector('#current-' + activePlayer).textContent = (currentScore);

            } else
            {
                nextPlayer();
            }
        }, 1000);
    }

});

// accumulate point for the player

bntHold.addEventListener('click', () =>
{
    if (gamePlaying)
    {
        scores[activePlayer] += (currentScore);
        document.querySelector('#score_' + activePlayer).textContent = scores[activePlayer]
        if (scores[activePlayer] >= 100)
        {
            document.querySelector('#joueur_' + activePlayer).textContent = 'Bravo vous avez Gagné!';
            document.querySelector('.player-' + activePlayer + 'panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + 'panel').classList.remove('winner');
            gamePlaying = false;
        } else
        {
            nextPlayer();
        }
    }
});

//hold your score or start a new game for the player
newGame.addEventListener('click',init);
function init()
{
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;

    document.getElementById('score_0').textContent = '0';
    document.getElementById('score_1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //to be sure to remove active status from 'joueur_2, to give it to 'joueur_1'
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
