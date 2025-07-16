const dashboardBtn = document.getElementById("dashboardBtn");
const manageBtn = document.getElementById("manageBtn");
const viewBtn = document.getElementById("viewBtn");

const dashboardSection = document.getElementById("dashboardSection");
const manageSection = document.getElementById("manageSection");
const viewSection = document.getElementById("viewSection");

const expenseForm = document.getElementById("expenseForm");
const expenseTableBody = document.getElementById("expenseTableBody");

const sections = [dashboardSection, manageSection, viewSection];

let expenses = [];
let editIndex = null;

function showSection(section) {
  sections.forEach(sec => sec.classList.remove("active"));
  section.classList.add("active");
}

dashboardBtn.onclick = () => showSection(dashboardSection);
manageBtn.onclick = () => showSection(manageSection);
viewBtn.onclick = () => {
  showSection(viewSection);
  renderTable(); // Refresh table when View is clicked
};

// Add or Update Expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;

  const expense = { amount, category, date, description };

  if (editIndex !== null) {
    expenses[editIndex] = expense;
    alert("Expense Updated!");
    editIndex = null;
  } else {
    expenses.push(expense);
    alert("Expense Added!");
  }

  expenseForm.reset();
  renderTable();
});

// Render Expense Table with Edit/Delete
function renderTable() {
  expenseTableBody.innerHTML = "";

  expenses.forEach((expense, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>${expense.amount}</td>
      <td>${expense.description}</td>
      <td>
        <button onclick="editExpense(${index})">Edit</button>
        <button onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;

    expenseTableBody.appendChild(tr);
  });
}

window.editExpense = function(index) {
  const expense = expenses[index];
  document.getElementById("amount").value = expense.amount;
  document.getElementById("category").value = expense.category;
  document.getElementById("date").value = expense.date;
  document.getElementById("description").value = expense.description;

  editIndex = index;
  showSection(manageSection);
};

window.deleteExpense = function(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index, 1);
    renderTable();
  }
};

// Charts
new Chart(document.getElementById("pieChart"), {
  type: 'pie',
  data: {
    labels: ['Food', 'Travel', 'Bills'],
    datasets: [{
      data: [1000, 1500, 850],
      backgroundColor: ['#00ffcc', '#ffcc00', '#ff6666'],
    }]
  }
});

new Chart(document.getElementById("barChart"), {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Amount',
      data: [500, 200, 100, 700, 300, 600, 950],
      backgroundColor: '#00ccff'
    }]
  }
});

// const form = document.getElementById('expense-form');
// const list = document.getElementById('expenses-list');
// let editingId = null;
// const API_URL = 'http://localhost:5000/api/expenses';

// const categoryChartCtx = document.getElementById('categoryChart').getContext('2d');
// const totalExpensesChartCtx = document.getElementById('totalExpensesChart').getContext('2d');

// let categoryChart, totalExpensesChart;

// function loadExpenses() {
//   fetch(API_URL)
//     .then(res => res.json())
//     .then(data => {
//       // Load expenses into the list
//       list.innerHTML = '';
//       data.forEach(exp => {
//         const div = document.createElement('div');
//         div.className = 'expense-item';
//         div.innerHTML = `
//           <strong>${exp.title}</strong> - ₹${exp.amount} <br/>
//           ${exp.category || ''} | ${new Date(exp.date).toLocaleDateString()}
//           <button class="edit" onclick="editExpense('${exp._id}')">Edit</button>
//           <button class="delete" onclick="deleteExpense('${exp._id}')">Delete</button>
//         `;
//         list.appendChild(div);
//       });

//       // Update charts
//       updateCharts(data);
//     });
// }

// function updateCharts(expenses) {
//   // Prepare data for category chart
//   const categoryData = expenses.reduce((acc, exp) => {
//     acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
//     return acc;
//   }, {});

//   const categoryLabels = Object.keys(categoryData);
//   const categoryAmounts = Object.values(categoryData);

//   // Create or update category chart
//   if (categoryChart) {
//     categoryChart.destroy();
//   }
//   categoryChart = new Chart(categoryChartCtx, {
//     type: 'pie',
//     data: {
//       labels: categoryLabels,
//       datasets: [{
//         data: categoryAmounts,
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5722'],
//         hoverOffset: 4
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         tooltip: {
//           callbacks: {
//             label: function(tooltipItem) {
//               return tooltipItem.label + ': ₹' + tooltipItem.raw;
//             }
//           }
//         }
//       }
//     }
//   });

//   // Prepare data for total expenses chart (Line chart)
//   const totalAmount = expenses.map(exp => exp.amount);
//   const dates = expenses.map(exp => new Date(exp.date).toLocaleDateString());

//   // Create or update total expenses chart
//   if (totalExpensesChart) {
//     totalExpensesChart.destroy();
//   }
//   totalExpensesChart = new Chart(totalExpensesChartCtx, {
//     type: 'line',
//     data: {
//       labels: dates,
//       datasets: [{
//         label: 'Total Expenses',
//         data: totalAmount,
//         fill: false,
//         borderColor: '#4CAF50',
//         tension: 0.1
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         tooltip: {
//           callbacks: {
//             label: function(tooltipItem) {
//               return '₹' + tooltipItem.raw;
//             }
//           }
//         }
//       }
//     }
//   });
// }

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const expense = {
//     title: document.getElementById('title').value,
//     amount: document.getElementById('amount').value,
//     category: document.getElementById('category').value,
//     date: document.getElementById('date').value
//   };

//   if (editingId) {
//     fetch(`${API_URL}/${editingId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(expense)
//     }).then(() => {
//       editingId = null;
//       form.reset();
//       loadExpenses();
//     });
//   } else {
//     fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(expense)
//     }).then(() => {
//       form.reset();
//       loadExpenses();
//     });
//   }
// });

// function editExpense(id) {
//   fetch(`${API_URL}/${id}`)
//     .then(res => res.json())
//     .then(data => {
//       document.getElementById('title').value = data.title;
//       document.getElementById('amount').value = data.amount;
//       document.getElementById('category').value = data.category;
//       document.getElementById('date').value = data.date.split('T')[0];
//       editingId = id;
//     });
// }

// function deleteExpense(id) {
//   fetch(`${API_URL}/${id}`, {
//     method: 'DELETE'
//   }).then(() => loadExpenses());
// }

// window.onload = loadExpenses;

// const form = document.getElementById('expense-form');
// const list = document.getElementById('expenses-list');
// let editingId = null;

// const API_URL = 'http://localhost:5000/api/expenses';

// function loadExpenses() {
//   fetch(API_URL)
//     .then(res => res.json())
//     .then(data => {
//       list.innerHTML = '';
//       data.forEach(exp => {
//         const div = document.createElement('div');
//         div.className = 'expense-item';
//         div.innerHTML = `
//           <strong>${exp.title}</strong> - ₹${exp.amount} <br/>
//           ${exp.category || ''} | ${new Date(exp.date).toLocaleDateString()}
//           <button class="edit" onclick="editExpense('${exp._id}')">Edit</button>
//           <button class="delete" onclick="deleteExpense('${exp._id}')">Delete</button>
//         `;
//         list.appendChild(div);
//       });
//     });
// }

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const expense = {
//     title: document.getElementById('title').value,
//     amount: document.getElementById('amount').value,
//     category: document.getElementById('category').value,
//     date: document.getElementById('date').value
//   };

//   if (editingId) {
//     fetch(`${API_URL}/${editingId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(expense)
//     }).then(() => {
//       editingId = null;
//       form.reset();
//       loadExpenses();
//     });
//   } else {
//     fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(expense)
//     }).then(() => {
//       form.reset();
//       loadExpenses();
//     });
//   }
// });

// function editExpense(id) {
//   fetch(`${API_URL}/${id}`)
//     .then(res => res.json())
//     .then(data => {
//       document.getElementById('title').value = data.title;
//       document.getElementById('amount').value = data.amount;
//       document.getElementById('category').value = data.category;
//       document.getElementById('date').value = data.date.split('T')[0];
//       editingId = id;
//     });
// }

// function deleteExpense(id) {
//   fetch(`${API_URL}/${id}`, {
//     method: 'DELETE'
//   }).then(() => loadExpenses());
// }

// window.onload = loadExpenses;
