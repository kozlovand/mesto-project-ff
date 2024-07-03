export {openModal, closeModal, popapCloseEsc, popapCloseOverlay};

//--Открытие попапа 
  function openModal(popap) {
    popap.classList.add('popup_is-opened');
    popapCloseEsc(popap);
    popapCloseOverlay(popap);
  };

//--Закрытие попапа
  function closeModal(popap){
    popap.classList.remove('popup_is-opened');
  };

//--Закрытие на Esc
  function popapCloseEsc(popap){
    document.addEventListener('keydown', (evt)=>{
      if (evt.key ==='Escape'){
        closeModal(popap);
      }
    })
  };

//--Закрытие на Оверлей
  function popapCloseOverlay(popap){
    popap.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        closeModal(popap);
      }
    })
  };
