document.addEventListener("DOMContentLoaded", function() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const addTransactionForm = document.getElementById("addTransactionForm");
  const transactionList = document.getElementById("transactionList");
  const previousMonthBtn = document.getElementById("previousMonthBtn");
  const monthDropdown = document.getElementById("monthDropdown");
  const monthSelect = document.getElementById("monthSelect");

  // Populate month dropdown with previous months
  populateMonthDropdown();

  previousMonthBtn.addEventListener("click", () => {
    monthDropdown.style.display = monthDropdown.style.display === "none" ? "block" : "none";
  });

  monthSelect.addEventListener("change", function() {
    displayTransactions(monthSelect.value);
  });

  addTransactionForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const transaction = {
      date: document.getElementById("date").value,
      description: document.getElementById("description").value,
      amount: parseFloat(document.getElementById("amount").value),
      category: document.getElementById("category").value,
      type: document.getElementById("type").value
    };
    
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    displayTransactions();
    addTransactionForm.reset();
  });

  function displayTransactions(selectedMonth) {
    transactionList.innerHTML = "";
    
    const filteredTransactions = selectedMonth ? 
      transactions.filter(tx => tx.date.startsWith(selectedMonth)) :
      transactions;

    filteredTransactions.forEach(tx => {
      const transactionItem = document.createElement("div");
      transactionItem.classList.add("transaction-item");
      transactionItem.innerHTML = `
        <strong>${tx.date}</strong> - ${tx.description} - $${tx.amount.toFixed(2)} - ${tx.category} - ${tx.type}
      `;
      transactionList.appendChild(transactionItem);
    });
  }

  function populateMonthDropdown() {
    const months = new Set(transactions.map(tx => tx.date.slice(0, 7)));
    months.forEach(month => {
      const option = document.createElement("option");
      option.value = month;
      option.textContent = month;
      monthSelect.appendChild(option);
    });
  }

  // Initial display of transactions
  displayTransactions();
});
