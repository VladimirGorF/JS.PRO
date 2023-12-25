// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.
class Libriary {
  // Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.
  #books = [];
  // Реализуйте геттер allBooks, который возвращает текущий список книг.
  getBooks() {
    return this.#books;
  }
  // Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
  addBook(title) {
    try {
      if (this.#books.includes(title)) {
        throw new Error("This book already exists!");
      } else {
        this.#books.push(title);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
  removeBook(title) {
    try {
      if (!this.#books.includes(title)) {
        throw new Error("This book is absent in this libriary! And can`t be deleted.");
      } else {
        this.#books.splice(this.#books.indexOf(title), 1);
        console.log(`"${title}" удален из библиотеки`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  // Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
  hasBook(title) {
    try {
      if (this.#books === undefined) {
        throw new Error("This libriary doesn`t exists!");
      }
      if (this.#books.includes(title.trim())) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  // Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

  constructor(list) {
    try {
      const array = list;
      array.forEach((element1) => {
        let counter = 0;
        array.forEach((element2) => {
          if (element1 === element2) {
            counter++;
          }
          if (counter > 1) {
            this.#books = [];
            throw new Error(
              `Вводимый список книг содержит дубликаты: "${element1}" Индексы: ${array.indexOf(
                element1
              )}, ${array.indexOf(element2)}`
            );
          } else {
            this.#books = array;
          }
        });
      });
      console.log("Все прошло хорошо!");
    } catch (error) {
      console.log(error.message);
    }
  }
}

const listOfBooks = [
  "pikul",
  "pik",
  "pi",
  "pi",
  "pokerHouse",
  "drom",
  "docker",
];
const lib = new Libriary(listOfBooks);

lib.addBook("Приключкения Гекельберри Финна");
lib.removeBook("pi");
console.log(lib.hasBook("Приключкения Гекельберри Финна"));
console.log(lib.getBooks());
