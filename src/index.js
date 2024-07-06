
import './pages/index.css';

import { createCard, deleteCard, cardLike } from './scripts/card.js';
import { openModal, closeModal } from './scripts/Modal.js';
import { initialCards } from './scripts/cards.js'

const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

const btnEdit = document.querySelector('.profile__edit-button');
const btnClosePopupEdit = document.querySelector('.popup_type_edit').querySelector('.popup__close');
const btnClosePopupNewCard = document.querySelector('.popup_type_new-card').querySelector('.popup__close');
const btnClosePopupImage = document.querySelector('.popup_type_image').querySelector('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const name = formEdit.elements.name;
const description = formEdit.elements.description;
const profileName = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const btnAddCard = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardUrl = document.querySelector('.popup__input_type_url');
const formNewCard = popupNewCard.querySelector('.popup__form');
const popupOpenImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__caption');
const popupAll = document.querySelector('.popup');

//--Добавление карточек из массива
initialCards.forEach(card =>  { 
  cardList.append(createCard(card, deleteCard, cardLike, openImage));
});

//--Отправка формы изменения данных аккаунта
function formEditSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = name.value;
    profileDescr.textContent = description.value ;
    closeModal(popupEdit);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', formEditSubmit); 

//--Открытие картинки
function openImage(card){
  popupImage.src = card.link;
  popupImage.alt = card.name 
  popupText.textContent = card.name;
  openModal(popupOpenImage);
};

//--Отправка формы добавления карточки
formNewCard.addEventListener('submit', function(evt) {
  let card = {};
  card.name = cardName.value;
  card.link = cardUrl.value;
  evt.preventDefault();
  cardList.prepend(createCard(card, deleteCard, cardLike, openImage));
  formNewCard.reset();
  closeModal(popupNewCard);
})


btnEdit.addEventListener('click',function(){
  openModal(popupEdit);
  name.value = profileName.textContent ;
  description.value = profileDescr.textContent;
});

btnClosePopupEdit.addEventListener('click',function(){
  closeModal(popupEdit);
});


btnAddCard.addEventListener('click', function(){
  openModal(popupNewCard);
  formNewCard.reset();
});

btnClosePopupNewCard.addEventListener('click', function(){
    closeModal(popupNewCard);
});

btnClosePopupImage.addEventListener('click', function(){
    closeModal(popupOpenImage);
});







