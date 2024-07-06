
//--Лайк карточки
export function cardLike (evt){
  if (evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
  }
};
//--Удаление карточки
export function deleteCard(cardElement){
  cardElement.remove();
}

//--Создание карточки
export function createCard(card, delCallback, likeCallback, openCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = card.link; 
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener('click', function(){
    delCallback(cardElement);
  }); 

  cardElement.addEventListener('click', function(evt){
    likeCallback(evt)
  });

  cardImage.addEventListener('click', function(){
    openCallback(card);
  })

  return cardElement;
}




