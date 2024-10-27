document.addEventListener("DOMContentLoaded", function () {
    const transactionForm = document.getElementById("transaction-form");
    const transactionTable = document.getElementById("transaction-table").getElementsByTagName('tbody')[0];
    const totalExpenseDisplay = document.getElementById("total-expense");
    const totalIncomeDisplay = document.getElementById("total-income");
    const currentMonthBtn = document.getElementById("current-month-btn");
    const previousMonthBtn = document.getElementById("previous-month-btn");

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const updateTable = (filterMonth = new Date().getMonth()) => {
        transactionTable.innerHTML = "";
        let totalExpense = 0;
        let totalIncome = 0;

        transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            if (transactionDate.getMonth() === filterMonth) {
                const row = transactionTable.insertRow();
                row.insertCell(0).innerText = transaction.description;
                row.insertCell(1).innerText = transaction.amount;
                row.insertCell(2).innerText = transaction.category;
                row.insertCell(3).innerText = transaction.type;
                row.insertCell(4).innerText = transaction.date;

                if (transaction.type === 'expense') {
                    totalExpense += parseFloat(transaction.amount);
                } else {
                    totalIncome += parseFloat(transaction.amount);
                }
            }
        });

        totalExpenseDisplay.innerText = totalExpense.toFixed(2);
        totalIncomeDisplay.innerText = totalIncome.toFixed(2);
    };

    transactionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const category = document.getElementById("category").value;
        const type = document.getElementById("transaction-type").value;
        const date = document.getElementById("transaction-date").value;

        const newTransaction = {
            description,
            amount,
            category,
            type,
            date
        };

        transactions.push(newTransaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        transactionForm.reset();
        updateTable();
    });

    currentMonthBtn.addEventListener("click", () => updateTable(new Date().getMonth()));
    previousMonthBtn.addEventListener("click", () => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        updateTable(lastMonth.getMonth());
    });

    updateTable();
});
