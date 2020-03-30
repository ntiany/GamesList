const addGameModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const startAddGameButton = document.querySelector('header button');
const cancelAddGameButton = addGameModal.querySelector('.btn--passive');
const confirmAddGameButton = cancelAddGameButton.nextElementSibling;
const userInputs = addGameModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteGameModal = document.getElementById('delete-modal');

const games = [];
let gamesNumber = games.length;

const clearInput = () => {
    for (const input of userInputs) {
        input.value = '';
    }
}

const renderNewGameElement = (id, title, imageUrl, rating) => {
    const newGameElement = document.createElement('li');
    newGameElement.className = 'movie-element'
    newGameElement.innerHTML = `
        <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/ 5 stars </p>
        </div>
    `;
    newGameElement.addEventListener('click', deleteGameHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newGameElement);
    
}

const updateUI = () => {
    number = games.length;

    if (number > 0) {
        entryTextSection.style.display = 'none';
    } else {
        entryTextSection.style.display = 'block';
    }
}

const showGameModal = () => {
    addGameModal.classList.add('visible');
    toggleBackdrop();
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const cancelAddGame = () => {
    closeGameModal();
}

const backdropClickHandler = () => {
    cancelGameDeletion();
    closeGameModal();
}

const deleteGame = gameId => {
    let gameIndex = 0;
    for (const game of games) {
        if (game.id === gameId) {
            break;
        } 
        gameIndex++;
    }
    games.splice(gameIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[gameIndex].remove();
    updateUI();
}

const cancelGameDeletion = () => {
    toggleBackdrop();
    deleteGameModal.classList.remove('visible');
}

const confirmDeleteGameHandler = gameId => {
    deleteGame(gameId);
    cancelGameDeletion();
    updateUI();
}

const deleteGameHandler = (gameId) => {
    toggleBackdrop();
    deleteGameModal.classList.add('visible');
    const cancelDeletionButton = deleteGameModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteGameModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteGameModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', cancelGameDeletion);

    cancelDeletionButton.addEventListener('click', cancelGameDeletion);
    confirmDeletionButton.addEventListener('click', confirmDeleteGameHandler.bind(null, gameId));
}

const closeGameModal = () => {
    backdrop.classList.remove('visible');
    addGameModal.classList.remove('visible');
    clearInput();
}

const addGameHandler = () => {
    const title = userInputs[0].value;
    const imageUrl = userInputs[1].value;
    const rating = userInputs[2].value;

    if (
        title.trim() === '' || 
        imageUrl.trim() === '' ||
        rating.trim() === ''
    ) {
        alert("Please enter correct values");
        return;
    }

    const newGame = {
        id: Math.random().toString(),
        title: title,
        image: imageUrl,
        rating: rating
    }

    games.push(newGame);
    closeGameModal();
    clearInput();
    renderNewGameElement(newGame.id, title, imageUrl, rating);
    updateUI();
}

startAddGameButton.addEventListener('click', showGameModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddGameButton.addEventListener('click', cancelAddGame);
confirmAddGameButton.addEventListener('click', addGameHandler);