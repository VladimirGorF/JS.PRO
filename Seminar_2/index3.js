// Вы создаете интерфейс, где пользователь вводит число.
// Ваша задача — проверить, является ли введенное значение числом или нет, и дать соответствующий ответ.

// Создайте HTML-структуру: текстовое поле для ввода числа и кнопку "Проверить".
// Добавьте место (например, div) для вывода сообщения пользователю.
// Напишите функцию, которая будет вызвана при нажатии на кнопку. Эта функция должна использовать try и catch для проверки вводимого значения.

const buttonElement = document.querySelector("button");
const inputElement = document.querySelector("input");
const informPlace = document.querySelector(".information");
buttonElement.addEventListener("click", () => {
  try {
    const inputValue = (inputElement.value).trim();
    if (
        isNaN(inputValue) || inputValue === "" || inputValue == " " * inputValue.length
    ) {
      throw new Error("НЕ является числом");
    }
    informPlace.textContent = "Введенное значение является числом";
  } catch (error) {
    informPlace.textContent = error.message;
  }
});

isNaN(inputValue) || inputValue === "" || inputValue == " " * inputValue.length;
