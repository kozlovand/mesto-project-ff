
//--Создание карточки
export function createCard(card, likeCallback, openCallback, myId, openPopupDeleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = card.link; 
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  
  let count = card.likes.length;
  cardLikeCount.textContent = count;

 
  if (card.owner._id === myId) {
    deleteButton.addEventListener('click', function(){
      openPopupDeleteCard(card,cardElement)
    }); 
  } else {
    deleteButton.remove();
  };

  card.likes.forEach(name => {
    if(name._id === myId) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  })
  
  cardElement.addEventListener('click', function(evt){
    likeCallback(evt,cardLikeCount, card, count);
    
  });

  cardImage.addEventListener('click', function(){
    openCallback(card);
  })

  return cardElement;
}

