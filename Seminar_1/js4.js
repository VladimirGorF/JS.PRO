// Представьте себе ситуацию: у нас есть группа студентов, и мы хотим отследить, кто из них посетил какие уроки и кто из преподавателей вёл данные уроки.****

// 1. Map будет использоваться для хранения соответствия между уроком и преподавателем.
// 2. Set будет использоваться для хранения уникальных уроков, которые посетил каждый студент

// 1. Map: урок => преподаватель
let lessons = new Map();
// "Математика", "Смирнов"
// "История", "Иванова"
lessons.set("Математика", "Смирнов");
lessons.set("История", "Иванова");

// 2. Map: студент => Set уроков
let students = new Map();
let ivan = { name: "Ivan" };
let ivanLessons = new Set();
ivanLessons.add(["Математика", "История"]);

let elena = { name: "Elena" };
let elenaLessons = new Set();
// elenaLessons.add(["Математика", "История", "Геометрия", "Физика" ]);
// elenaLessons.add(["Математика", "История", "Геометрия", "Физика", "Стрельба" ]);

elenaLessons.add("Математика");
elenaLessons.add("История");
elenaLessons.add("Математика");



students.set(ivan, ivanLessons);
students.set(elena, elenaLessons);

// Проверка:
console.log(`Преподаватель по Математике: ${lessons.get("Математика")}`); // Смирнов
console.log(`Уроки Ивана: ${[...students.get(ivan)]}`); // Математика, История
console.log(`Уроки Ивана: ${[...students.get(elena)]}`); // Математика, История