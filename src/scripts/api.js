
const config = {
  baseUrl:'https://nomoreparties.co/v1/wff-cohort-19',
  headers: {
    authorization: 'd59fc7bf-cc64-40ab-9b24-655222e67808',
    'Content-Type': 'application/json'
  }
};

//--Проверка ответа
function checkAnswer(res) {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//--Загрузка информации пользователя с сервера
export const loadUserInfo = function() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
       return checkAnswer(res)
    })
};

//--загрузка информации пользователя на сервер
export const uploadUserInfo = function(info){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: info.name,
      about: info.about,
    })
  })
  .then(res => {
    return checkAnswer(res)
  });
} 

//--Загрузка карточек с сервера
export const getUserCards = function() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      return checkAnswer(res)
 })
}

//--Загрузка карточки на сервер
export const uploadUserCard = function(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    })
  })
    .then(res => {
      return checkAnswer(res)
    })
}

//--Удаление карточки с сервера
export const deleteUserCard = function(card) {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return checkAnswer(res)
  })
  .catch(err => {
    console.log(err)
  })
};

//--Отправка лайка карточки на сервер
export const likeUserCard = function(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      likes: card.likes,
    })
  })
  .then(res => {
    return checkAnswer(res)
  })
};

//--Удаление лайка карточки с сервера
export const deletelikeUserCard = function(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return checkAnswer(res)
  })
};

export const uploadUseravatar = function(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
    .then(res => {
      return checkAnswer(res)
    });
}







