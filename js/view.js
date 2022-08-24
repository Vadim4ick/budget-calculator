const viewController = (function () {
  const DOMstrings = {
    form: "#budget-form",
    inputType: "#input__type",
    inputDescription: "#input__description",
    inputValue: "#input__value",
    incomeList: "#income__list",
    expensesList: "#expenses__list",
    budgetLabel: "#budget-value",
    incomeLabel: "#incomeLabel",
    expansesLabel: "#expansesLabel",
    expensesPercentLabel: "#expensesPercentLabel",
    budgetTable: "#budgetTable",
    month: "#month",
    year: "#year",
  };

  const formatNum = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2,
  });

  function getInput() {
    return {
      type: document.querySelector(DOMstrings.inputType).value,
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: document.querySelector(DOMstrings.inputValue).value,
    };
  }

  function renderItem(obj, type) {
    let containerEl, markup;

    if (type === "inc") {
      containerEl = document.querySelector(DOMstrings.incomeList);
      markup = `
      <li id="inc-%id%" class="budget-list__item item item--income">
        <div class="item__title">%description%</div>
        <div class="item__right">
            <div class="item__amount">%value%</div>
            <button data-remove class="item__remove">
                <img
                    src="./img/circle-green.svg"
                    alt="delete"
                />
            </button>
        </div>
      </li>
      `;
    } else {
      containerEl = document.querySelector(DOMstrings.expensesList);
      markup = `
      <li id="exp-%id%" class="budget-list__item item item--expense">
      <div class="item__title">%description%</div>
        <div class="item__right">
          <div class="item__amount">
                  %value%
              <div class="item__badge">
                  <div data-percent class="badge badge--dark">
                      15%
                  </div>
              </div>
          </div>
           <button data-remove class="item__remove">
              <img src="./img/circle-red.svg" alt="delete" />
           </button>
       </div>
   </li>
      `;
    }

    let newMarkup = markup.replace("%id%", obj.id);
    newMarkup = newMarkup.replace("%description%", obj.description);
    newMarkup = newMarkup.replace("%value%", formatNum.format(obj.value));

    containerEl.insertAdjacentHTML("afterbegin", newMarkup);
  }

  function clearFields() {
    let inpDesc, inpVal;

    inpDesc = document.querySelector(DOMstrings.inputDescription);
    inpVal = document.querySelector(DOMstrings.inputValue);

    inpDesc.value = "";
    inpVal.value = "";

    inpDesc.focus();
  }

  function updateBudget(obj) {
    document.querySelector(DOMstrings.budgetLabel).textContent =
      formatNum.format(obj.budget);
    document.querySelector(DOMstrings.incomeLabel).textContent =
      formatNum.format(obj.totalInc);
    document.querySelector(DOMstrings.expansesLabel).textContent =
      formatNum.format(obj.totalExp);

    if (obj.percentage > 0) {
      document.querySelector(DOMstrings.expensesPercentLabel).textContent =
        obj.percentage + "%";
    } else {
      document.querySelector(DOMstrings.expensesPercentLabel).textContent =
        "--";
    }
  }

  function removeItem(itemId) {
    document.getElementById(itemId).remove();
  }

  function recalculationPercentEl(itemPerc) {
    // [0,18]

    itemPerc.forEach((el) => {
      const item = document
        .getElementById(`exp-${el[0]}`)
        .querySelector("[data-percent]");

      if (el[1] >= 0) {
        item.textContent = el[1] + "%";
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  function renderDate() {
    const today = new Date();

    const year = today.getFullYear();
    let month = today.getMonth();

    const arrDate = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    document.querySelector(DOMstrings.year).textContent = year;
    document.querySelector(DOMstrings.month).textContent = arrDate[month];
  }

  return {
    getInput: getInput,
    renderItem: renderItem,
    clearFields: clearFields,
    updateBudget: updateBudget,
    removeItem: removeItem,
    recalculationPercentEl: recalculationPercentEl,
    renderDate: renderDate,
    getDOMstrigs: function () {
      return DOMstrings;
    },
  };
})();
