// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.
// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.
// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.
// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.
const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];
let lastId = 4; // отфиксировали последний id в существующей базе
// функция отображения всех отзывов из репозитория
function showElements(data) {
  const listElement = document.querySelector(".listReviews");
  data.forEach((element) => {
    const newElTitle = document.createElement("ul");
    newElTitle.className = "title";
    newElTitle.textContent = element.product;
    newElTitle.style.color = "blue";
    listElement.append(newElTitle);
    element.reviews.forEach((elem) => {
      const newReviewElem = document.createElement("li");
      newReviewElem.textContent = elem.id + ": " + elem.text;
      newReviewElem.style.color = "green";
      newElTitle.append(newReviewElem);
    });
  });
}
// функция очистки html контейнера
function cleanRepoz() {
  const listElement = document.querySelector(".listReviews");
  listElement.replaceChildren(); // без параметров переносит все вникуда очищая лист
}

// отобразим изначальные отзывы
showElements(initialData);

const butElement = document.querySelector(".button");
butElement.addEventListener("click", () => {
  try {
    const titleElement = document.querySelector(".inputTitle");
    const textElement = document.querySelector(".inputText");
    if (textElement.value.length < 50 || textElement.value.length > 500) {
      throw new Error("Отзыв не может быть менее 50 и более 500 символов!");
    } else {
      // очищаем html список
      cleanRepoz();

      lastId++; // увеличиваем id на единичку
      flagIfFindTitle = false; // флаг для if в цикле
      // проверяем по циклу на наличие такого продукта в базе
      for (let i = 0; i < initialData.length; i++) {
        if (initialData[i].product === titleElement.value) {
          // если есть, то в его reviews добавляем новый отзыв
          initialData[i].reviews.push({
            id: lastId,
            text: textElement.value,
          });
          flagIfFindTitle = true;
          break; // найдя нужное название прекращаем цикл
        }
      }
      // после прохода по всему циклу, если не сработал поиск, добавляем новый отзыв в конец
      if (!flagIfFindTitle) {
        initialData.push({
          product: titleElement.value,
          reviews: [
            {
              id: lastId,
              text: textElement.value,
            },
          ],
        });
      }
      showElements(initialData); // отображаем все отзывы заново
    }
  } catch (error) {
    const inputBoxElement = document.querySelector(".inputBox");
    // если уже существует уведомление об ошибке
    if (!document.querySelector(".error")) {
      const errorElement = document.createElement("p");
      errorElement.setAttribute("class", "error");
      errorElement.textContent = error.message;
      errorElement.style.color = "red"; 
      inputBoxElement.appendChild(errorElement);
      setTimeout(() => {
        errorElement.remove();
      }, 2000);
    }
  }
});
