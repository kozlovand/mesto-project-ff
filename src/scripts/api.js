
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


function request(url, options) {
// принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkAnswer)
}
  

//--Загрузка информации пользователя с сервера
export const loadUserInfo = function() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
};

//--загрузка информации пользователя на сервер
export const uploadUserInfo = function(info){
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: info.name,
      about: info.about,
    })
  })
} 

//--Загрузка карточек с сервера
export const getUserCards = function() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

//--Загрузка карточки на сервер
export const uploadUserCard = function(card) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    })
  })
}

//--Удаление карточки с сервера
export const deleteUserCard = function(card) {
  return request(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

//--Отправка лайка карточки на сервер
export const likeUserCard = function(card) {
  return request(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      likes: card.likes,
    })
  })
};

//--Удаление лайка карточки с сервера
export const deletelikeUserCard = function(card) {
  return request(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

//--Отправка аватара на сервер
export const uploadUseravatar = function(avatar) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
}







