const billInput = document.getElementById('bill-input')
const peopleInput = document.getElementById('people-input')
const customTip = document.getElementById('custom-tip')
const tipOptions = Array.from(document.querySelectorAll('input[type="radio"]'))
const tip = document.getElementById('display-tip')
const total = document.getElementById('display-total')
const btnReset = document.querySelector('button[type="reset"]')

let amount
let numOfPeople
let tipPercentage
let customTipPercantage

billInput.addEventListener('input', handleEvent)
peopleInput.addEventListener('input', handleEvent)
customTip.addEventListener('input', handleEvent)
tipOptions.forEach(opt => {
  opt.addEventListener('change', handleEvent)
})

function handleEvent(e) {
  amount = +billInput.value
  numOfPeople =
    e.target.id === 'people-input' && e.target.value > 0 ? +e.target.value : 1

  tipOptions.forEach(opt => {
    if (e.target.id === 'custom-tip') {
      tipPercentage = +customTip.value
      opt.checked = false
    }
    if (opt.checked) {
      customTip.value = ''
      tipPercentage = +opt.value
    }
  })

  console.log(amount, numOfPeople, tipPercentage)
  const result = calculate(amount, tipPercentage, numOfPeople)
  displayResult(result)
}

function calculate(billAmount, tipRate, numofPeople = 1) {
  const tipPerPerson = (billAmount * (tipRate / 100)) / numOfPeople
  const totalPerPerson =
    (billAmount + billAmount * (tipRate / 100)) / numOfPeople
  return {
    tipPerPerson,
    totalPerPerson,
  }
}

function displayResult({tipPerPerson, totalPerPerson}) {
  tip.textContent = `$${tipPerPerson.toFixed(2)}`
  total.textContent = `$${totalPerPerson.toFixed(2)}`
}

btnReset.addEventListener('click', () => {
  billInput.value = ''
  peopleInput.value = ''
  customTip.value = ''
  document.getElementById('15').checked = true
  tip.textContent = '$0.00'
  total.textContent = '$0.00'
})
