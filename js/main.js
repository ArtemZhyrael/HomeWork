let money, time;
let btnStart = document.getElementById('start'),                                          //Кнопка Начать расчет
    budgetValue = document.getElementsByClassName('budget-value')[0],                     //Доход
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],               //Бюджет на один день
    levelValue = document.getElementsByClassName('level-value')[0],                       //Уровень дохода
    expensesValue = document.getElementsByClassName('expenses-value')[0],                 //Обязательные раходы
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0], //Возможные траты
    incomeValue = document.getElementsByClassName('income-value')[0],                     //Дополнительный доход
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],         //Накопления за один месяц
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],           //Накопления за один год
    expensesItem = document.getElementsByClassName('expenses-item'),                      //Блок обязательных расходов
    btnExpensesItem = document.getElementsByTagName('button')[0],                         //Кн утвердить обязательные расходы
    btnOptionalExpenses = document.getElementsByTagName('button')[1],                     //Кн утвердить неоязательные расходы
    btnCountBudget = document.getElementsByTagName('button')[2],                          //Кн рассчитать дневной бюджет
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),           //блок необязательных расходов
    chooseIncome = document.querySelector('.choose-income'),                              //Статьи возможного дохода
    checkSavings = document.querySelector('#savings'),                                    //Есть ли накопления
    chooseSum = document.querySelector('.choose-sum'),                                    //Сумма
    choosePercent = document.querySelector('.choose-percent'),                            //Процент
    yearData= document.querySelector('.year-value'),                                      //Год
    monthData= document.querySelector('.month-value'),                                    //Месяц
    dayData= document.querySelector('.day-value');                                        //day

btnExpensesItem.disabled = true;
btnOptionalExpenses.disabled = true;
btnCountBudget.disabled = true;

//Определение бюджета на месяц

btnStart.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.salary = money;
    appData.data = time;
    budgetValue.textContent = money.toFixed();
    yearData.value = new Date(Date.parse(time)).getFullYear();
    monthData.value = new Date(Date.parse(time)).getMonth() + 1;
    dayData.value = new Date(Date.parse(time)).getDate();

    btnExpensesItem.disabled = false;
    btnOptionalExpenses.disabled = false;
    btnCountBudget.disabled = false;
});

//Обязательные расходы

btnExpensesItem.addEventListener('click', function() {
    let sum = 0;
    
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
    
        if ((typeof(a)) === 'string' && (typeof(a)) != null && 
        (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            alert("Введены некорректные данные");
            i--;
        }
    }
expensesValue.textContent = sum;
});

//Необязательные расходы

btnOptionalExpenses.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

//Расчет дневного бюджета

btnCountBudget.addEventListener('click', function() {

    if (appData.salary != undefined) {
        appData.moneyPerDay = ((appData.salary - +expensesValue.textContent) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
    
        if(appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень дотстатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }

});

//Статьи возможного дохода

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;
});

//Есть ли накопления

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

//Сумма накоплений

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

//Процент для накоплений

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

//Основной объект

let appData = {   
    salary : money,
    data : time,
    optionalExpenses: {},
    expenses : {},
    income : [],
    savings : false
};
