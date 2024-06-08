// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function addCards(card, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = card.link; 
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  deleteButton.addEventListener('click', function(){
    deleteCard(cardElement);
  }); 
  
  return cardElement;
}

function deleteCard(cardElement){
  cardElement.remove();
}

initialCards.forEach(card => { 
  cardList.append(addCards(card, deleteCard));
});




