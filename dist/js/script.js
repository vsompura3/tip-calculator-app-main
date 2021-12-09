// Selet elements of the page
const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-input');
const customInput = document.getElementById('custom-input');
const tipOptions = Array.from(document.querySelectorAll(`input[type='radio']`));
const defaultInputTip = tipOptions.find(tip => tip.checked ? tip : null);
const defaultTip = Number(defaultInputTip.value);
const tip = document.querySelector('.result__tip-per-person');
const total = document.querySelector('.result__total-per-person');
const warn = document.querySelector('.warning');

// Variables to hold values
let billAmount, numOfPeople, tipRate;

// Function that checks validation of input
function validateInput(input) {
  const inputValue = Number(input.value);
  if (inputValue > 0) {
    warn.classList.add('hide');
    return inputValue;
  } else{
    warn.classList.remove('hide');
    inputValue = 0;
    input.textContent = '0';
  }
}

// Calculate the Tip and return tipPerPerson, totalPerPerson as an object
function calculation(billAmount, tipRate, numOfPeople = 1){
  const tipPerPerson =( billAmount *  (tipRate / 100) ) / numOfPeople;
  const totalPerPerson = (billAmount + (billAmount * (tipRate / 100))) / numOfPeople;
  console.log(tipPerPerson, totalPerPerson);
  return { tipPerPerson, totalPerPerson };
}

// Function that takes an object and puts in on the DOM
function updateUI({tipPerPerson,totalPerPerson}) {
  tip.textContent = '$'+tipPerPerson.toFixed(2);
  total.textContent = '$'+totalPerPerson.toFixed(2);
}

// Function that handles input events
function handleEvent(e) {
  if (e.target.id === 'bill-input') {
    billAmount = validateInput(e.target);
  }
  if (e.target.id === 'people-input') {
    numOfPeople = validateInput(e.target);
  } else{
    numOfPeople = 1;
  }
  if (e.target.id === 'custom-input'){
    tipRate = Number(e.target.value);
    defaultInputTip.checked = false;
  } else if(e.target.checked) {
    tipRate = Number(e.target.value);
  } else{
    tipRate = defaultTip;
  }


  const output = calculation(billAmount, tipRate, numOfPeople);
  updateUI(output)
}


// Setting Event handlers
billInput.addEventListener('input', handleEvent);
peopleInput.addEventListener('input',handleEvent);
customInput.addEventListener('input', handleEvent)
tipOptions.forEach(t => {
  t.addEventListener('input', handleEvent);
})
