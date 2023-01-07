/** Income by category Map for rendering pie chart by category type */
const categoryIncomeTotals = new Map();
/** Expense by category Map for rendering pie chart by category type */
const categoryExpensesTotals = new Map();
/** List of all categories for dropdown select */
let categories = [];
/** All income items from /transactions */
let income = [];
/** All expenses items from /transactions */
let expenses = [];
/** Total income price (added all income items together) */
let totalIncome = 0;
/** Total expenses price (added all expenses items together) */
let totalExpense = 0;
/** Current item being edited via the Modal */
let currentModalItem = {category: {}};
/** Modal instance for Materialize API */
let modalInstance;

// Document load logic for setting up Materialize modal
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.getElementById('transaction-modal');
  modalInstance = M.Modal.init(elems, {});
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems, {});
});

const getPriceString = (price) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

/** Render errors for BDGT page */
const renderBdgtError = (errorText, errorBody) => {
  M.toast({html: errorText});
  console.error(errorText, errorBody);
};

/** Load the heading with remaining balance */
const loadRemainingBudget = () => {
  const injection = document.getElementById('remaining-budget');
  injection.innerHTML = `<h2 class="title grey-text text-lighten-3">Remaining BDGT: ${getPriceString(totalIncome - totalExpense)}</h2>`;
};

/** Load the table with transaction for viewing, editing, deleting */
const loadTransactionsTable = () => {
  const injection = document.getElementById('transactions');
  const getItem = (item, type) => {
    return `<tr>
    <td>${item.category.name}</td>
    <td>${type}</td>
    <td>${getPriceString(item.price)}</td>
    <td>
      <button class="waves-effect waves-light deep-purple lighten-3 btn" alt="Edit" onclick="editItem(${item.id})"><i class="material-icons left">edit_note</i></button>
      <button class="waves-effect waves-light deep-purple lighten-3 btn" alt="Delete" onclick="deleteItem(${item.id})"><i class="material-icons left">delete</i></button>
    </td>
  </tr>`;
  };

  injection.innerHTML = `
    <thead>
      <tr>
        <th>Category Name</th>
        <th>Type</th>
        <th>Price</th>
        <th width="120"></th>
      </tr>
    </thead>
    <tbody>
      ${income.map(item => getItem(item, 'Income')).join('')}
      ${expenses.map(item => getItem(item, 'Expense')).join('')}
    </tbody>
  `;
};

/** Create expense donut chart */
const createExpenseDonutChart = () => {
  const chart = document.getElementById('category-expense-chart');
  chart.innerHTML = '';
  const categories = [];
  const values = [];

  categoryExpensesTotals.forEach((item, key) => {
    values.push(item);
    categories.push(key);
  });

  new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        data: values,
        hoverOffset: 4
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#b39ddb',
          }
        },
        tooltip: {
          callbacks: {
            label: (data) => {
              return getPriceString(data.raw);
            }
          }
        }
      }
    },
  });
};

/** Create income donut chart */
const createIncomeDonutChart = () => {
  const chart = document.getElementById('category-income-chart');
  chart.innerHTML = '';
  const categories = [];
  const values = [];

  categoryIncomeTotals.forEach((item, key) => {
    values.push(item);
    categories.push(key);
  });

  new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        data: values,
        hoverOffset: 4
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#b39ddb',
          }
        },
        tooltip: {
          callbacks: {
            label: (data) => {
              return getPriceString(data.raw);
            }
          }
        }
      }
    },
  });
};

/** Create horizontal bar chart */
const createBarChart = () => {
  const chart = document.getElementById('total-chart');
  chart.innerHTML = '';

  new Chart(chart, {
    type: 'bar',
    data: {
      labels: ['Expenses', 'Income'],
      datasets: [{
        data: [totalExpense, totalIncome],
        borderWidth: 1,
        backgroundColor: ['#ef5350', '#c8e6c9'],
        borderColor: ['#e53935', '#81c784'],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        y: {
          ticks: {
            color: '#b39ddb',
          },
        },
        x: {
          beginAtZero: true,
          ticks: {
            color: '#b39ddb',
            callback: (value, index, ticks) => {
                return getPriceString(value);
            },
          },
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (data) => {
              return getPriceString(data.raw);
            }
          }
        }
      }
    }
  });
};

/**
 * Setup DOM for all parts that need content
 */
const setupDom = () => {
  if (!(income.length + expenses.length)) {
    document.querySelectorAll('.content-area').forEach(item => {
      item.classList.add('hide');
    });
    return;
  }

  document.querySelectorAll('.content-area').forEach(item => {
    item.classList.remove('hide');
  });
  
  createBarChart();
  loadRemainingBudget();
  createIncomeDonutChart();
  createExpenseDonutChart();
  loadTransactionsTable();
};

/**
 * This function setups the data on the Window object and renders the charts and triggers re-draws
 */
const setupData = () => {
  // Reset data on Window to avoid stacking
  categoryExpensesTotals.clear();
  categoryIncomeTotals.clear();
  income = [];
  expenses = [];
  totalExpense = 0;
  totalIncome = 0;

  fetch('/api/bdgt/categories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => Promise.reject(data));
    }
  }).then((categoryData) => {
    categories = categoryData;
    fetch('/api/bdgt/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(data => Promise.reject(data));
      }
    }).then((transactions) => {
      transactions.forEach(transaction => {
        if (!transaction.category) {
          transaction.category = {};
        }
  
        if (transaction.category.type === 'income') {
            income.push(transaction);
            totalIncome += transaction.price;
            let currentCategoryTotal = categoryIncomeTotals.get(transaction.category.name) || 0;
            currentCategoryTotal = currentCategoryTotal + transaction.price;
            categoryIncomeTotals.set(transaction.category.name, currentCategoryTotal);
        } else {
            expenses.push(transaction);
            totalExpense += transaction.price;
            let currentCategoryTotal = categoryExpensesTotals.get(transaction.category.name) || 0;
            currentCategoryTotal = currentCategoryTotal + transaction.price;
            categoryExpensesTotals.set(transaction.category.name, currentCategoryTotal);
        }
      });
  
      setupDom();
    }).catch((err) => {
      renderBdgtError(`Unable to get transactions${err?.message ? `: ${err.message}` : ''}`, err);
    });
  }).catch((err) => {
    renderBdgtError(`Unable to get categories${err?.message ? `: ${err.message}` : ''}`, err);
  });;
};

const injectSelectMenu = (type) => {
  const items = categories.filter(item => item.type === type);
  console.log(items, type);
  const inject = document.getElementById('select-list');
  inject.innerHTML = `
    <option value="" disabled ${!currentModalItem.category.id ? 'selected' : ''}>Choose your option</option>
    ${items.map(item => `<option value="${item.id}" ${item.id === currentModalItem.category.id ? 'selected' : ''}>${item.name}</option>`).join('')}
  `;
};

const addItem = (type) => {
  document.getElementById('modal-header').innerText = 'Add ' + (type === 'income' ? 'Income' : 'Expense');
  currentModalItem = {
    category: {},
  };
  injectSelectMenu(type);
  modalInstance.open();
};

const editItem = (itemId) => {
  currentModalItem = [...income, ...expenses].find(item => item.id === itemId) || {category: {}};
  document.getElementById('modal-header').innerText = 'Edit item';
  document.getElementById('price').value = currentModalItem.price;
  injectSelectMenu(currentModalItem.category.type || 'expense');
  modalInstance.open();
};

const setPrice = () => {
  currentModalItem.price = document.getElementById('price').value;
};

const setCategory = () => {
  currentModalItem.category.id = document.getElementById('select-list').value;
};

const deleteItem = (itemId) => {
  fetch(`/api/bdgt/transactions/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => Promise.reject(data));
    }
  }).then(() => {
    renderBdgtError('Item deleted', {});
    window.location.reload();
  }).catch((err) => {
    renderBdgtError(`Unable to get transactions${err?.message ? `: ${err.message}` : ''}`, err);
  });
};

const saveTransaction = () => {
  if (!currentModalItem.price || !currentModalItem.category.id) {
    renderBdgtError('Form is invalid', currentModalItem);
    return;
  }

  modalInstance.close();
  fetch(`/api/bdgt/transactions${currentModalItem.id ? `/${currentModalItem.id}` : ''}`, {
    method: currentModalItem.id ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: currentModalItem.name,
      price: currentModalItem.price,
      category_id: currentModalItem.category.id,
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => Promise.reject(data));
    }
  }).then(() => {
    renderBdgtError('Item saved', {});
    window.location.reload();
  }).catch((err) => {
    renderBdgtError(`Unable to get transactions${err?.message ? `: ${err.message}` : ''}`, err);
  });
};

const closeTransactionModal = () => {
  currentModalItem = {category: {}};
  modalInstance.close();
};

setupData();
