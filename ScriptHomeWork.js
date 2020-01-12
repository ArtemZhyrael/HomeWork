let money = prompt("Ваш бюджет на месяц?"),
    time = prompt("Введите дату в формате YYYY-MM-DD");

let appData = {   
    salary : money,
    data : time,
    optionalExpenses: {},
    expenses : {},
    income : [],
    savings : false
};

let Question1 = prompt("Введите обязательную статью расходов в этом месяце"),
    Question2 = prompt("Во сколько обойдется?");

appData.expenses[Question1] = Question2;

alert(appData.salary / 30);