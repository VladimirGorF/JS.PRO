// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)

const alboms = [
  { title: "Crazy World", artist: "George Orwell", year: 1963 },
  { title: "Brave New World", artist: "Aldous Huxley", year: 1987 },
  { title: "Fahrenheit 451", artist: "Ray Bradbury", year: 2015 },
];

const musicCollection = {
  alboms: [...alboms],
  [Symbol.iterator]: function () {
    let index = 0;
    return {
      next: () => {
        if (index < this.alboms.length) {
          return { value: this.alboms[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// Название альбома - Исполнитель (Год выпуска)
for (const albom of musicCollection) {
    console.log(`${albom.title} - ${albom.artist} (${albom.year})`);
}