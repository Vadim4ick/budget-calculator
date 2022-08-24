const controller = (function (model, view) {
  function setupListener() {
    const DOM = view.getDOMstrigs();
    document.querySelector(DOM.form).addEventListener("submit", addItem);
    document
      .querySelector(DOM.budgetTable)
      .addEventListener("click", removeItem);
  }

  //Функция добавления.
  function addItem(e) {
    e.preventDefault();
    const input = view.getInput();
    //Валидация
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      const newItem = model.addItem(input.type, input.description, input.value);
      view.renderItem(newItem, input.type);
      view.clearFields();
      updateBudget();
      recalculationPercentEl();

      generateData.init();
      model.test();
    }
  }

  //Функция обновления бюджета
  function updateBudget() {
    model.updateBudget();
    const budgetResult = model.budgetResult();
    view.updateBudget(budgetResult);
  }

  //Функция удаления
  function removeItem(e) {
    if (e.target.closest("[data-remove]")) {
      const itemId = e.target.closest("li").id;
      const itemSplit = itemId.split("-");

      const type = itemSplit[0];
      const id = parseInt(itemSplit[1]);

      model.removeItem(type, id);
      view.removeItem(itemId);
      updateBudget();
      recalculationPercentEl();
    }
  }

  //Пересчитываем процентное значение у каждого эл
  function recalculationPercentEl() {
    //Пересчитываем
    model.recalculationPercent();

    //Получаем для передачи id и процентное значение каждого id
    const itemPerc = model.getAllIdAndProcentages();

    //Меняем id на странице
    view.recalculationPercentEl(itemPerc);
  }

  return {
    init: function () {
      setupListener();
      model.loadFromLocalStorage();

      model.renderLocalInc().forEach((el) => {
        view.renderItem(el, "inc");
      });
      model.renderLocalExp().forEach((el) => {
        view.renderItem(el, "exp");
      });

      recalculationPercentEl();

      view.updateBudget({
        budget: model.budgetResult().budget,
        totalInc: model.budgetResult().totalInc,
        totalExp: model.budgetResult().totalExp,
        percentage: model.budgetResult().percentage,
      });
      view.renderDate();
    },
  };
})(modelController, viewController);

controller.init();
