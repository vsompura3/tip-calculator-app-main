const billInput = document.getElementById('bill-amount')
const numberOfPeopleInput = document.getElementById('number-of-people')
const customTipInput = document.getElementById('custom-tip')
const tipOptions = [...document.querySelectorAll('input[type="radio"]')]
const warningMsg = document.querySelector('[data-warning]')
const finalTip = document.querySelector('.calculated-tip')
const finalTotal = document.querySelector('.calculated-total')
const resetBtn = document.querySelector('.btn-reset')

const state = {
  billAmount: 0,
  tipAmount: 0,
  numberOfPeople: 1,
  finalResult: {
    tipPerPerson: 0,
    totalPerPerson: 0,
  },
}

function handleInputs({ target: element }) {
  checkForZero(element)
  if (element.value === '' || +element.value === 0) return
  if (element.name === 'bill-amount') state.billAmount = +element.value
  if (element.name === 'tip-amount') state.tipAmount = +element.value
  if (element.name === 'number-of-people') state.numberOfPeople = +element.value
  calculateTip(state)
  render(state)
}

function checkForZero(element) {
  if (+element.value === 0 || +element.value < 0) {
    element.style.setProperty('--outline-color', 'var(--warning)')
  } else {
    element.style.setProperty('--outline-color', 'var(--brand)')
  }
  toggleWarning(element)
}

function toggleWarning(element) {
  if (+element.value === 0 && element.name === 'number-of-people') {
    warningMsg.classList.remove('hidden')
  } else {
    warningMsg.classList.add('hidden')
  }
}

function calculateTip({ billAmount, tipAmount, numberOfPeople }) {
  const tipPerPerson = (billAmount * (tipAmount / 100)) / numberOfPeople
  const totalPerPerson =
    (billAmount + billAmount * (tipAmount / 100)) / numberOfPeople
  state.finalResult.tipPerPerson = tipPerPerson
  state.finalResult.totalPerPerson = totalPerPerson
}

function render({ finalResult: { tipPerPerson, totalPerPerson } }) {
  finalTip.textContent = `$${tipPerPerson.toFixed(2)}`
  finalTotal.textContent = `$${totalPerPerson.toFixed(2)}`
}

function resetApp() {
  state.billAmount = 0
  state.tipAmount = 0
  state.numberOfPeople = 1
  state.finalResult.tipPerPerson = 0
  state.finalResult.totalPerPerson = 0
  billInput.value = ''
  numberOfPeopleInput.value = ''
  customTipInput.value = ''
  render(state)
}

billInput.addEventListener('input', handleInputs)
numberOfPeopleInput.addEventListener('input', handleInputs)
customTipInput.addEventListener('input', handleInputs)
tipOptions.forEach(tipOption => {
  tipOption.addEventListener('change', handleInputs)
})
resetBtn.addEventListener('click', resetApp)
