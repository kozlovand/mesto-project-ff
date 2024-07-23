import { deleteUserCard, likeUserCard, deletelikeUserCard} from "./api";
import { openModal, closeModal } from "./Modal"
//--Лайк карточки
export function cardLike (evt, cardLikeCount,card, count){
  function countLike(result) {
    count = result.likes.length;
    cardLikeCount.textContent = count;
  }
  if (evt.target.classList.contains('card__like-button')){
    if (evt.target.classList.contains('card__like-button_is-active')) {
      evt.target.classList.remove('card__like-button_is-active');
      deletelikeUserCard(card)
        .then(result => {
          countLike(result)
        })
        .catch(err => {
          console.log(err)
        })
    } else  {
      evt.target.classList.add('card__like-button_is-active');
      likeUserCard(card)
        .then(result => {
          countLike(result)
        })
        .catch(err => {
          console.log(err)
        })
    }}
};
//--Удаление карточки
export function deleteCard(cardElement){
  cardElement.remove();  
}

//--Создание карточки
export function createCard(card, delCallback, likeCallback, openCallback, myId, popupDeleteCard) {
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

  function openPopupDeleteCard(card,cardElement){
    openModal(popupDeleteCard);

    document.querySelector('.popup__button_delete-card').addEventListener('click', function () {
      delCallback(cardElement);
      deleteUserCard(card);
      closeModal(popupDeleteCard);
    })
  }

  card.likes.forEach(name => {
    if(name._id === myId) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  })
  
  if (card.owner._id === myId) {
    deleteButton.addEventListener('click', function(){
      openPopupDeleteCard(card,cardElement)
    }); 
  } else {
    deleteButton.remove();
  };

  cardElement.addEventListener('click', function(evt){
    likeCallback(evt,cardLikeCount, card, count, myId);
    
  });

  cardImage.addEventListener('click', function(){
    openCallback(card);
  })

  return cardElement;
}




