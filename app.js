const cards = document.querySelectorAll('.memory-card');

let cardIsFlipped = false;
let firstCard, secondCard;

cards.forEach(function (card) {
	card.addEventListener('click', flipCard);
});

function flipCard() {
	this.classList.add('flip');

	if (!cardIsFlipped) {
		// first click -> first card
		cardIsFlipped = true;
		firstCard = this;
	} else {
		// second click -> second card
		cardIsFlipped = false;
		secondCard = this;

		checkForMatch();
	}
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
}

function unFlippedCards() {
	// if not matches -> removing flip
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
	}, 1500);
}
