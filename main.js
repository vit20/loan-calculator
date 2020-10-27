'use strict';

document.querySelector('.calculator-wrapper').addEventListener('submit', function (e) {

  document.querySelector('.results-wrapper').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});


function calculateResults() {
  console.log('calculating');

  const amount = document.getElementById('loan-amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    document.querySelector('.results-wrapper').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
    document.getElementById('loading').style.display = 'none';
  }
}

function showError(error) {
  const errorDiv = document.createElement('div');
  const mainWrapper = document.querySelector('.main-wrapper');
  const heading1 = document.querySelector('h1');
  errorDiv.className = 'error-warning';
  errorDiv.appendChild(document.createTextNode(error));
  mainWrapper.insertBefore(errorDiv, heading1);

  setTimeout(clearError, 3000);

  function clearError() {
    errorDiv.remove();
  }
};


