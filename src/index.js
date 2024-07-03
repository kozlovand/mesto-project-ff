
import './pages/index.css';

import { addCards, deleteCard, cardLike } from './scripts/card.js';
import { openModal, closeModal } from './scripts/Modal.js';
import { initialCards } from './scripts/cards.js'

export const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

const btnEdit = document.querySelector('.profile__edit-button');
const btnClose = document.querySelector('.popup__close');
const popapEdit = document.querySelector('.popup_type_edit');
const formEdit = popapEdit.querySelector('.popup__form');
const name = formEdit.elements.name;
const description = formEdit.elements.description;
const profileName = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const btnAddCard = document.querySelector('.profile__add-button');
const popapNewCard = document.querySelector('.popup_type_new-card');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardUrl = document.querySelector('.popup__input_type_url');
const formNewCard = popapNewCard.querySelector('.popup__form');
const popapOpenImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popapText = document.querySelector('.popup__caption');

//--Добавление карточек из массива
initialCards.forEach(card =>  { 
  cardList.append(addCards(card, deleteCard, cardLike, openImage));
});

//--Отправка формы изменения данных аккаунта
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = name.value;
    profileDescr.textContent = description.value ;
    closeModal(popapEdit);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', handleFormSubmit); 

//--Открытие картинки
function openImage(image,text){
  popupImage.src = image.src;
  popupImage.alt = text.alt 
  popapText.textContent = text.textContent;
  openModal(popapOpenImage)
};

//--Отправка формы добавления карточки
formNewCard.addEventListener('submit', function(evt) {
  let card = {};
  card.name = cardName.value;
  card.link = cardUrl.value;
  evt.preventDefault();
  cardList.prepend(addCards(card, deleteCard, cardLike, openImage));
  formNewCard.reset();
  closeModal(popapNewCard);
})


btnEdit.addEventListener('click',function(){
  openModal(popapEdit);
  name.value = profileName.textContent ;
  description.value = profileDescr.textContent;
});

btnClose.addEventListener('click',function(){
  closeModal(popapEdit);
  formEdit.reset();
  name.value = profileName.textContent ;
  description.value = profileDescr.textContent;
});


btnAddCard.addEventListener('click', function(){
  openModal(popapNewCard);
});

popapNewCard.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup__close')){
    formNewCard.reset();
    closeModal(popapNewCard);
  }
})

popapOpenImage.addEventListener('click', function(evt){
  if (evt.target.classList.contains('popup__close')){
    closeModal(popapOpenImage);
  }
})










