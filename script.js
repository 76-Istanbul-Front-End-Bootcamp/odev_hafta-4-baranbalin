const data = {
  USD: {EUR: 0.82, GBP: 0.74, TRY:7.58},
  EUR: {USD: 1.23, GBP: 0.91, TRY: 9.25},
  GBP: {USD: 1.35, EUR: 1.10, TRY: 10.30},
  TRY: {USD: 0.13, EUR: 0.11, GBP: 0.097}
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName){
  for(let i =0; i< elements.length; i++){
    const currencyKeyDiv   = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);


function toast(message) {
  var x = document.getElementById("snackbar");
  x.innerHTML = message
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
  const calculateButton = document.querySelector("#calculate-button");
  calculateButton.addEventListener("click", function(){

  const currencyResult = document.querySelector("#currency-result");
  
  currencyResult.innerHTML=''

   // kimden ceviriyourz
   const fromTarget = document.querySelector("input[name='currency_from']:checked");
   // kime ceviriyoruz
   const toTarget   = document.querySelector("input[name='currency_to']:checked");
   // amountu alalim
   const amount     = document.querySelector("input[name='amount']");


  if (!fromTarget) return toast(`! İlk para birimini seçiniz !`)
  if (!toTarget) return toast(`! İkinci para birimini seçiniz !`)
  if (fromTarget.value === toTarget.value) return toast(`! Farklı seçimler yapmalısınız !`)

  if (!amount || !parseInt(amount.value) || parseInt(amount.value) != amount.value) return toast(`! Sayısal bir değer giriniz !`)

   const currentCurrencyObject = data[fromTarget.value];
   const resultForOne = currentCurrencyObject[toTarget.value];
   const result = amount.value * resultForOne;

   currencyResult.innerHTML = amount.value + " " + fromTarget.value + " = " + result + " " + toTarget.value;
});
