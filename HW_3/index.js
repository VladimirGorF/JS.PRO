// Урок 3. Промисы. Хранилище
// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

const initialJSON = `[{"id":1702889102621,"title":"БМВ","text":"Прекрасная машина не ломается совсем"},{"id":1702889102622,"title":"БМВ","text":"Супер машина не ломается совсем"},{"id":1702889103318,"title":"Мерседес","text":"Ужас какой-то, все время в сервис езжу."}]`;

const localStorageKey = "reviews";
const data = localStorage.getItem(localStorageKey);

// если информации в лок хранилище еще нет, то записываем первоначальную
if (!data) {
  localStorage.setItem(localStorageKey, initialJSON);
}

// получаем массив объектов(отзывов)
const reviews = JSON.parse(localStorage.getItem(localStorageKey));
// находим контейнер
const conteinerElement = document.querySelector(".conteiner");

function showTitles() {
  // очистка контейнера
  conteinerElement.replaceChildren();

  // все заголовки отзывов объединяем в один массив
  const reviewsTitles = reviews.map((review) => review.title);

  const uniqueTitles = new Set(reviewsTitles);
  const titles = Array.from(uniqueTitles);
  const reviewsTitlesHtml = titles
    .map((title) => getreviewTitleHtml(title))
    .join("");

  // добавляем все заголовки на страницу
  conteinerElement.innerHTML = reviewsTitlesHtml;
}
showTitles();

// возвращает нам отзыв как HTML код строкой для отражения на странице
function getreviewOnlyHtml(review) {
  return `<div class="descr" data-id="${review.id}">
  <p class="text">${review.text}</p>
  <button class="delete">delete</button>
  </div>`;
}

// возвращает нам Заголвок отзыва как HTML-код строкой для отражения на странице
function getreviewTitleHtml(title) {
  return `<div class="review"">
  <div class="title">${title}</div>
  </div>`;
}

// возвращает нам Загловок HTML для функции Add
function getreviewTitleHtmlAdd(review) {
  return `<div class="review"">
  <div class="title">${review.title}</div>
  </div>`;
}

// возвращает нам отзыв как HTML код строкой для записи в locStor
function getreviewHtml(review) {
  return `<div class="review" data-id="${review.id}">
  <div class="title">${review.title}</div>
  <p class="text">${review.text}</p>
  <button class="delete">delete</button>
</div>`;
}

// по клику на контейнер с продуктами отражаем все отзывы по объекту или скрываем
conteinerElement.addEventListener("click", function (event) {
  const element = event.target;
  if (!element.classList.contains("title")) {
    return;
  }
  // Если отзывы уже открыты, то будем закрывать их
  // если за заголовком есть отзыв
  if (element.nextElementSibling) {
    // находим все эл отзывов этого продукта
    const siblingsToDelete = element.parentElement.querySelectorAll(".descr");
    siblingsToDelete.forEach((element) => {
      element.remove();
    });
    return;
  }

  const title = element.textContent;
  // собираем из полных отзывов тексты тех у кого название подошло
  // сначала отфильтруем по названию
  let titleReviewsHtml = reviews.filter((review) => review.title === title);
  //потом создадим HTML из всех отзывов подошедших
  titleReviewsHtml = titleReviewsHtml
    .map((review) => getreviewOnlyHtml(review))
    .join("");
  // добавляем отзывы в блок элемента с названием продукта
  element.insertAdjacentHTML("afterend", titleReviewsHtml);
});

// добавление отзывов
const addButtonElement = document.querySelector(".add");
addButtonElement.addEventListener("click", function () {
  //Вводим название и текст отзыва с проверкой на пустоту
  const title = prompt("Введите наименование продукта");
  while (!title) {
    title = prompt("Введите наименование продукта");
  }
  const text = prompt("Введите ваш отзыв");
  while (!title || !text) {
    text = prompt("Введите ваш отзыв");
  }

  const review = {
    id: Date.now(), // id берем из TimeStamp
    title, // title: title
    text, // text: text
  };
  reviews.push(review);
  localStorage.setItem(localStorageKey, JSON.stringify(reviews));

  // отражаем все изменения из лок хранилища на экран
  showTitles();
});

// удаление отзывов
conteinerElement.addEventListener("click", function (event) {
  if (!event.target.classList.contains("delete")) {
    return;
  }
  const parentElement = event.target.parentElement;
  console.log(parentElement);
  const id = +parentElement.dataset.id;
  const indexreview = reviews.findIndex((review) => review.id === id);
  reviews.splice(indexreview, 1);

  localStorage.setItem(localStorageKey, JSON.stringify(reviews));
  parentElement.remove();
});
