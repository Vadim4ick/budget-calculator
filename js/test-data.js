const generateData = (function () {
  const ExampleData = function (type, description, value) {
    this.type = type;
    this.description = description;
    this.value = value;
  };

  const arrData = [];

  function addData(type, description, value) {
    const newItem = new ExampleData(type, description, value);
    arrData.push(newItem);
  }

  addData("inc", "Фриланс", 5000);
  addData("inc", "Зарплата", 15000);
  addData("inc", "Продажа кофеварки", 2000);
  addData("inc", "Ютуб", 1500);
  addData("exp", "Продукты", 750);
  addData("exp", "Развлечения", 1500);
  addData("exp", "Фаст фуд", 800);
  addData("exp", "Подарки", 1000);

  function generateRandomData() {
    const n = Math.floor(Math.random() * arrData.length);
    const randomItem = arrData[n];

    document.getElementById("input__type").value = randomItem.type;
    document.getElementById("input__description").value =
      randomItem.description;
    document.getElementById("input__value").value = randomItem.value;
  }

  return {
    init: function () {
      return generateRandomData();
    },
  };
})();

generateData.init();
