
import './pages/index.css';

import { createCard, deleteCard, cardLike } from './scripts/card.js';
import { openModal, closeModal } from './scripts/Modal.js';

import {enableValidation, clearValidation, validationConfig} from './scripts/validation.js';
import { loadUserInfo, uploadUserInfo, getUserCards, uploadUserCard, uploadUseravatar} from './scripts/api.js';



const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

const btnEdit = document.querySelector('.profile__edit-button');
const btnClosePopupEdit = document.querySelector('.popup_type_edit').querySelector('.popup__close');
const btnClosePopupNewCard = document.querySelector('.popup_type_new-card').querySelector('.popup__close');
const btnClosePopupImage = document.querySelector('.popup_type_image').querySelector('.popup__close');
const btnClosePopupAvatar = document.querySelector('.popup_type_new-avatar').querySelector('.popup__close');
const btnClosePopupDeleteCard = document.querySelector('.popup_type_delete-card').querySelector('.popup__close');

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
const iconEditAvatar = document.querySelector('.profile__image');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const formNewAvatar = popupNewAvatar.querySelector('.popup__form');
const avatarUrl = document.querySelector('.popup__input_type_url-avatar')
const popupDeleteCard =document.querySelector('.popup_type_delete-card');
let myId;

enableValidation(validationConfig);

//--Загрузка
function loading(isLoading,form) {
  if(isLoading) {
    form.querySelector('.popup__button').textContent = 'Сохранение...';
  } else {
    form.querySelector('.popup__button').textContent = 'Сохранить';
  }
};

//--Отрисовка Инфы профиля
function renderProfile(data) {
  profileName.textContent = data.name;
  profileDescr.textContent = data.about;
  iconEditAvatar.style.backgroundImage = `url(${data.avatar})`
};

//--Отрисовка карточек
function renderCard(data) {
  data.forEach(card => {
    cardList.append(createCard(card, deleteCard, cardLike, openImage, myId, popupDeleteCard));
      })
};

//--Открытие картинки
function openImage(card){
  popupImage.src = card.link;
  popupImage.alt = card.name 
  popupText.textContent = card.name;
  openModal(popupOpenImage);
};

//--Отправка формы изменения аватарки
function formEditAvatar(evt) {
  evt.preventDefault();

  loading(true,formNewAvatar);
  uploadUseravatar(avatarUrl.value)
    .then(data => {
      renderProfile(data);
      closeModal(popupNewAvatar);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loading(false,formNewAvatar);
    })  
};
formNewAvatar.addEventListener('submit', formEditAvatar); 


//--Отправка формы изменения данных аккаунта
function formEditSubmit(evt) {
    evt.preventDefault();

    const info = {
      name: name.value,
      about: description.value
    }
    loading(true,formEdit);
    uploadUserInfo(info)
      .then(data => {
        renderProfile(data);
        closeModal(popupEdit);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        loading(false,formEdit);
      })
}
//--Прикрепляем обработчик к форме
formEdit.addEventListener('submit', formEditSubmit); 

//--Отправка формы добавления карточки
formNewCard.addEventListener('submit', function(evt) {
  let card = {};
  card.name = cardName.value;
  card.link = cardUrl.value;
  evt.preventDefault();
  loading(true,formNewCard);

  uploadUserCard(card)
    .then(NewCard => {
      cardList.prepend(createCard(NewCard, deleteCard, cardLike, openImage, myId, popupDeleteCard));
      closeModal(popupNewCard);
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      loading(false,formNewCard);
    })
})


btnEdit.addEventListener('click',function(){
  openModal(popupEdit);
  name.value = profileName.textContent ;
  description.value = profileDescr.textContent;
  clearValidation(popupEdit, validationConfig);
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
    clearValidation(popupNewCard, validationConfig);
});

btnClosePopupImage.addEventListener('click', function(){
    closeModal(popupOpenImage);
});

iconEditAvatar.addEventListener('click', function() {
  openModal(popupNewAvatar);
  formNewAvatar.reset();
});

btnClosePopupAvatar.addEventListener('click', function() {
  closeModal(popupNewAvatar);
});

btnClosePopupDeleteCard.addEventListener('click', function() {
  closeModal(popupDeleteCard);
});

    //--Добавление информации с сервера и карточек
Promise.all([loadUserInfo(), getUserCards()])
  .then(([result1, result2]) => {
        myId = result1._id;
        renderProfile(result1)
        renderCard(result2)
      })
  .catch((err) => {
    console.log(err)
});


