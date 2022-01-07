const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

/*
const dummyTransactions = [
	{ id: 1, text: 'Flower', amount: -20 },
	{ id: 2, text: 'Salary', amount: 300 },
	{ id: 3, text: 'Book', amount: -10 },
	{ id: 4, text: 'Camera', amount: 150 },
]; */

const localStorageTransactions = JSON.parse(
	localStorage.getItem('transaction')
);

let transaction =
	localStorage.getItem('transaction') !== null
		? localStorageTransactions
		: [];

// Add Transactions
function addTransaction(e) {
	e.preventDefault();

	if (text.value.trim() === '' || amount.value.trim() === '') {
		alert('Please add a text and a amount');
	} else {
		const transaction2 = {
			id: generateID(),
			text: text.value,
			amount: +amount.value,
		};

		console.log(transaction2);
		transaction.push(transaction2);
		addTransactionDOM(transaction2);
		updateValues();

		updateLocalStorage();

		text.value = '';
		amount.value = '';
	}
}

// Generate random ID
function generateID() {
	return Math.floor(Math.random() * 100000000);
}
// add transactions to DOM list
function addTransactionDOM(transaction) {
	//get sign
	const sign = transaction.amount < 0 ? '-' : '+';

	const item = document.createElement('li');

	// Add class based on value
	item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

	item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
		transaction.amount
	)}</span><button class="delete-btn" onclick="removeTransaction(${
		transaction.id
	})">x</button>`;

	list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
	const amounts = transaction.map((transaction) => transaction.amount);

	const total = amounts
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	const income = amounts
		.filter((item) => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	const expense = (
		amounts
			.filter((item) => item < 0)
			.reduce((acc, item) => (acc += item), 0) * -1
	).toFixed(2);

	console.log(amounts);
	console.log(total);
	console.log(income);
	console.log(expense);

	balance.innerHTML = `Rs.${total}`;
	money_plus.innerHTML = `Rs.${income}`;
	money_minus.innerHTML = `Rs.${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
	transaction = transaction.filter(
		(transaction) => transaction.id !== id
	);

	updateLocalStorage();
	init();
}

// Update localStorage transactions
function updateLocalStorage() {
	localStorage.setItem('transaction', JSON.stringify(transaction));
}
// Init app
function init() {
	list.innerHTML = '';
	transaction.forEach(addTransactionDOM);
	updateValues();
}

init();

form.addEventListener('submit', addTransaction);
