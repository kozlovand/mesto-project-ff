// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function addCards(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function deleteCard(evt){
  const eventtarget = evt.target;
  const deleteItem = eventtarget.closest('.card');
  deleteItem.remove()
}

initialCards.forEach(card => { 
  cardList.append(addCards(card));
});




