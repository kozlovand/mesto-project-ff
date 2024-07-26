
import './pages/index.css';

import { createCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/Modal.js';
import { deleteUserCard, likeUserCard, deletelikeUserCard} from "./scripts/api.js";
import {enableValidation, clearValidation, validationConfig} from './scripts/validation.js';
import { loadUserInfo, uploadUserInfo, getUserCards, uploadUserCard, uploadUseravatar} from './scripts/api.js';

const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');
const btnEdit = document.querySelector('.profile__edit-button');
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
let cardInfoToDelete;
let cardElementToDelete;

enableValidation(validationConfig);

//--Слушатели на все крестики закрытия
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

//--Лайк карточки
function likeCard (evt, cardLikeCount,card, count){
  function countLike(result) {
    count = result.likes.length;
    cardLikeCount.textContent = count;
  }
  if (evt.target.classList.contains('card__like-button')){
    if (evt.target.classList.contains('card__like-button_is-active')) {
      deletelikeUserCard(card)
        .then(result => {
          countLike(result)
          evt.target.classList.remove('card__like-button_is-active');
        })
        .catch(err => {
          console.log(err)
        })
    } else  {
      
      likeUserCard(card)
        .then(result => {
          countLike(result)
          evt.target.classList.add('card__like-button_is-active');
        })
        .catch(err => {
          console.log(err)
        })
    }}
};



//--Попап удаления карточки
function openPopupDeleteCard(card, cardElement){
  cardInfoToDelete = card;
  cardElementToDelete = cardElement
  openModal(popupDeleteCard);
};

//--Обработка запроса на удалениe
function handlePopupDeleteSubmit(cardInfoToDelete, cardElementToDelete) {
  deleteUserCard(cardInfoToDelete)
    .then(() => {
      cardElementToDelete.remove();  ;
      closeModal(popupDeleteCard);
    })
    .catch(err => {
      console.log(err)
    });

};

popupDeleteCard.querySelector('.popup__button_delete-card').addEventListener('click', function () {
  handlePopupDeleteSubmit(cardInfoToDelete, cardElementToDelete);
} )

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
    cardList.append(createCard(card, likeCard, openImage, myId, openPopupDeleteCard));
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
function handleAvatarFormSubmit(evt) {
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
formNewAvatar.addEventListener('submit', handleAvatarFormSubmit); 


//--Отправка формы изменения данных аккаунта
function handleInfoFormSubmit(evt) {
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
formEdit.addEventListener('submit', handleInfoFormSubmit); 

//--Отправка формы добавления карточки
formNewCard.addEventListener('submit', function(evt) {
  let card = {};
  card.name = cardName.value;
  card.link = cardUrl.value;
  evt.preventDefault();
  loading(true,formNewCard);

  uploadUserCard(card)
    .then(NewCard => {
      cardList.prepend(createCard(NewCard, likeCard, openImage, myId, openPopupDeleteCard));
      closeModal(popupNewCard);
    })
    .catch(err => {
      console.log(err);
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

btnAddCard.addEventListener('click', function(){
  openModal(popupNewCard);
  formNewCard.reset();
  clearValidation(popupNewCard, validationConfig);
});

iconEditAvatar.addEventListener('click', function() {
  openModal(popupNewAvatar);
  formNewAvatar.reset();
  clearValidation(popupNewAvatar, validationConfig);
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


