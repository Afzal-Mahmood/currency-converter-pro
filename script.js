import countryList from "./countryList.js";

const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const exchangeBtn = document.querySelector("#exchange")
const msge = document.querySelector(".msg")
let dropdown = document.querySelectorAll(".form-select")
let fromCurr = document.querySelector(".form select")
let toCurr = document.querySelector(".to select")


for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode
        newOption.value = currCode
        select.append(newOption) 
        if(select.name === "from" && currCode === "USD"){
             newOption.selected = "selected"
        }else if(select.name === "to" && currCode === "PKR"){
             newOption.selected = "selected"
        } 
           
    }
    select.addEventListener("change" , (evt) =>{
        updateFlag(evt.target)
    })
}


const updateExchangeRate = async() =>{
   let amount = document.querySelector("#amount")
  let amtVal = amount.value
  if(amtVal === ""  || amtVal < 1){
    amtVal = 1
    amount.value = 1;
  }
  const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
  let response = await fetch(URL)
  let data = await response.json()
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
  let finalAmount = ( amtVal * rate ).toFixed(2)
  msge.innerText = `${amtVal} ${fromCurr.value}  =  ${finalAmount} ${toCurr.value}`
}

const updateFlag = (element) =>{
        let currCode = element.value
        let countryCode = countryList[currCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
        let img = element.parentElement.querySelector("img")
        img.src = newSrc
}


exchangeBtn.addEventListener("click" ,(evt)=>{
  evt.preventDefault()
  updateExchangeRate();

})

window.addEventListener("load",()=>{
  document.querySelector("#amount").value = 1 
  updateExchangeRate()
})



  