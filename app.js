const cards = document.querySelectorAll('.memory-card');

let lockBoard = false;
let cardIsFlipped = false;
let firstCard, secondCard;

cards.forEach(function (card) {
	card.addEventListener('click', flipCard);
});

function flipCard() {
	if (lockBoard) return; //if card matches locked board
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!cardIsFlipped) {
		// first click -> first card
		cardIsFlipped = true;
		firstCard = this;

		return;
	}
	// second click -> second card
	cardIsFlipped = false;
	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	//checking whether second card matches or not
	let isMatched = firstCard.dataset.name === secondCard.dataset.name;
	isMatched ? disableCards() : unFlippedCards();
}

function disableCards() {
	// if it is matched -> removing event Listener
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

function unFlippedCards() {
	lockBoard = true;

	// if not matches -> removing flip
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 1500);
}

// reseting card board
function resetBoard() {
	[cardIsFlipped, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

// suffling
//IIFE -> Immediatley invoked function expression -> function is called imediately after its definition.
(function shuffle() {
	cards.forEach(function (card) {
		let randomPositions = Math.floor(Math.random() * 12);
		card.style.order = randomPositions;
	});
})();
