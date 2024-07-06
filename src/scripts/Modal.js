export {openModal, closeModal, closePupupEsc, closePopupOverlay};

//--Открытие попапа 
  function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePupupEsc);
    popup.addEventListener('click', closePopupOverlay);
  };

//--Закрытие попапа
  function closeModal(popup){
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePupupEsc);
    popup.removeEventListener('click', closePopupOverlay);
  };

//--Закрытие на Esc
  function closePupupEsc(evt){
      if (evt.key ==='Escape'){
        const popupOpen = document.querySelector('.popup_is-opened');
        closeModal(popupOpen);
      }
    };

//--Закрытие на Оверлей
  function closePopupOverlay(evt){
      if (evt.currentTarget === evt.target) {
        closeModal(evt.currentTarget);
      }
  };
