const modelController = (function () {
  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Expence = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expence.prototype.setPercetAge = function (totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expence.prototype.getPercetAge = function () {
    return this.percentage;
  };

  let data = {
    allItems: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },

    budget: 0,
    percentage: -1,
  };

  function addItem(type, desc, val) {
    saveToLocalStorage();
    let newItem, ID;

    if (data.allItems[type].length > 0) {
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
      ID = 0;
    }

    if (type === "inc") {
      newItem = new Income(ID, desc, parseInt(val));
    } else {
      newItem = new Expence(ID, desc, parseInt(val));
    }

    data.allItems[type].push(newItem);

    return newItem;
  }

  function calculateTotalSum(type) {
    let sum = 0;

    data.allItems[type].forEach((el) => {
      sum += parseInt(el.value);
    });

    return sum;
  }

  function updateBudget() {
    data.totals.inc = calculateTotalSum("inc");
    data.totals.exp = calculateTotalSum("exp");
    data.budget = data.totals.inc - data.totals.exp;

    if (data.totals.inc > 0) {
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    } else {
      data.percentage = -1;
    }

    saveToLocalStorage();
  }

  function budgetResult() {
    return {
      budget: data.budget,
      totalInc: data.totals.inc,
      totalExp: data.totals.exp,
      percentage: data.percentage,
    };
  }

  function removeItem(type, id) {
    const arrId = data.allItems[type].map((el) => {
      return el.id;
    });

    const index = arrId.indexOf(id);

    if (index !== -1) {
      data.allItems[type].splice(index, 1);
      saveToLocalStorage();
    }
  }

  function recalculationPercent() {
    data.allItems.exp.forEach((el) => {
      el.setPercetAge(data.totals.inc);
    });

    saveToLocalStorage();
  }

  function getAllIdAndProcentages() {
    const allPerc = data.allItems.exp.map((el) => {
      return [el.id, el.getPercetAge()];
    });

    saveToLocalStorage();

    return allPerc;
  }

  function saveToLocalStorage() {
    localStorage.setItem("dataInc", JSON.stringify(data.allItems.inc));
    localStorage.setItem("dataExp", JSON.stringify(data.allItems.exp));
    localStorage.setItem("dataTotalsInc", JSON.stringify(data.totals.inc));
    localStorage.setItem("dataTotalsExp", JSON.stringify(data.totals.exp));
    localStorage.setItem("dataBudget", JSON.stringify(data.budget));
    localStorage.setItem("dataPercentAge", JSON.stringify(data.percentage));
  }

  function loadFromLocalStorage() {
    const dataLocalInc = localStorage.getItem("dataInc");
    const dataLocalExp = localStorage.getItem("dataExp");
    const dataLocalTotalsInc = localStorage.getItem("dataTotalsInc");
    const dataLocalTotalsExp = localStorage.getItem("dataTotalsExp");
    const dataLocalBudget = localStorage.getItem("dataBudget");
    const dataLocalPercentAge = localStorage.getItem("dataPercentAge");

    if (dataLocalInc) {
      JSON.parse(dataLocalInc).forEach((el) => {
        data.allItems.inc.push(
          new Income(el.id, el.description, parseInt(el.value))
        );
      });
    }

    if (dataLocalExp) {
      JSON.parse(dataLocalExp).forEach((el) => {
        data.allItems.exp.push(
          new Expence(el.id, el.description, parseInt(el.value))
        );
      });
    }

    if (dataLocalTotalsInc) {
      data.totals.inc = JSON.parse(dataLocalTotalsInc);
    }

    if (dataLocalTotalsExp) {
      data.totals.exp = JSON.parse(dataLocalTotalsExp);
    }

    if (dataLocalBudget) {
      data.budget = JSON.parse(dataLocalBudget);
    }

    if (dataLocalPercentAge) {
      data.percentage = JSON.parse(dataLocalPercentAge);
    }
  }

  function renderLocalInc() {
    return data.allItems.inc;
  }

  function renderLocalExp() {
    return data.allItems.exp;
  }

  return {
    addItem: addItem,
    updateBudget: updateBudget,
    budgetResult: budgetResult,
    removeItem: removeItem,
    recalculationPercent: recalculationPercent,
    getAllIdAndProcentages: getAllIdAndProcentages,
    loadFromLocalStorage: loadFromLocalStorage,
    test: function () {
      console.log(data);
    },
    renderLocalInc: renderLocalInc,
    renderLocalExp: renderLocalExp,
  };
})();
