console.log('Connected');

// Select elements of the page
const tipBtns = document.querySelectorAll('.tip-btn');
const tipInput = document.getElementById('tip-per-person');
const amountInput = document.getElementById('amount-per-person');
const billAmount = document.querySelector('.bill__input');
const customTip = document.getElementById('custom-tip');
const numberOfPeople = document.querySelector('.people__input');


// Calculate the bill
function calculateBill(amount,taxRate, numOfPeople) {
  const tipAmount = amount * (taxRate / 100);
  const totalAmount = amount + tipAmount;
  const tipPerPerson = tipAmount / numOfPeople;
  const amountPerPerson = totalAmount / numOfPeople;
  displayBill(tipPerPerson,amountPerPerson)
}

// Display bill to UI
function displayBill(tip,bill) {
  tipInput.value = tip;
  amountInput.value = bill;
}

