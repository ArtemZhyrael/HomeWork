let money, time;
//Определение бюджета на месяц
function start () {
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }

    time = prompt("Введите дату в формате YYYY-MM-DD", "");

}

start();

let appData = {   
    salary : money,
    data : time,
    optionalExpenses: {},
    expenses : {},
    income : [],
    savings : true,
    // Обязательная статья расходов
    chooseExpenses : function() {
        for (let i =0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
                b = prompt("Во сколько обойдется?", "");
        
            if ((typeof(a)) === 'string' && (typeof(a)) != null && 
            (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
                console.log("done");
                appData.expenses[a] = b;
            } else {
                alert("Введены некорректные данные");
                i--;
            }
        
        }
    },
    //Ежедневный бюджет
    detectDayBudget : function() {
        appData.moneyPerDay = (appData.salary / 30).toFixed();
        alert("Ежедннневный бюджет: " + appData.moneyPerDay);
    },
    //Необязательная статья расходов
    optional : function() {
        for (let i = 1; i < 4; i++) {
            let optionalExp = +prompt("Статья необязательных расходов?");
            appData.optionalExpenses[i] = optionalExp;
        }
    },
    //Уровень достатка
    detectLevel : function() {
        if(appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень дотстатка");
        } else {
            console.log("Произошла ошибка");
        }
    },
    //Доход от депозита
    checkSavings : function() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?", ""),
                percent = +prompt("Под какой процент?", "");
    
                appData.monthIncome = save/100/12*percent;
                alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    //Дополнительный доход
    chooseIncome : function() {
        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");

        if (typeof(items) != "string" || items == "" || typeof(items) == null) {
            console.log("Вы ввели некорректные данные или не ввели их вовсе");
        } else {
            appData.income = items.split(", ");
            appData.income.push(prompt("Может что-то еще?"));
            appData.income.sort();
        }

        appData.income.forEach (function (itmass, i) {
            alert("Способы доп. заработка: " + (i+1) + " - " + itmass);
        });
    }
};
//Содержание объекта appData
for (let i in appData) {
    console.log("Наша программа включает в себя данные: " + i + " - " + appData[i]);
}

// work with elements HTML

let btnStart = document.getElementById('start'),                                          //Кнопка Начать расчет
    budgetValue = document.getElementsByClassName('budget-value')[0],                     //Доход
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],               //Бюджет на один день
    levelValue = document.getElementsByClassName('level-value')[0],                       //Уровень дохода
    expensesValue = document.getElementsByClassName('expenses-value')[0],                 //Обязательные раходы
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0], //Возможные траты
    incomeValue = document.getElementsByClassName('income-value')[0],                     //Дополнительный доход
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],         //Накопления за один месяц
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],           //Накопления за один год
    expensesItem = document.getElementsByClassName('expenses-item'),                      //Блок обязательных расходов
    btnExpensesItem = document.getElementsByTagName('expenses-item-btn')[0],              //Кн утвердить обязательные расходы
    btnOptionalExpenses = document.getElementsByTagName('optionalexpenses-btn')[0],       //Кн утвердить неоязательные расходы
    btnCountBudget = document.getElementsByTagName('count-budget-btn')[0],                //Кн рассчитать дневной бюджет
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),           //блок необязательных расходов
    chooseIncome = document.querySelector('.choose-income'),                              //Статьи возможного дохода
    checkSavings = document.querySelector('.checksavings'),                               //Есть ли накопления
    chooseSum = document.querySelector('.choose-sum'),                                    //Сумма
    choosePercent = document.querySelector('.choose-percent'),                            //Процент
    yearData= document.querySelector('.year'),                                            //Год
    monthData= document.querySelector('.month'),                                          //Месяц
    dayData= document.querySelector('.day');                                              //День

