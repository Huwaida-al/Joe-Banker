const bankBtn = document.getElementById("bank-btn");
const payBtn = document.getElementById("pay-btn");
const buyNow = document.getElementById("buy-now");
const workBtn = document.getElementById("work-btn");
const computersElement = document.getElementById("computers");
const balanceElement = document.getElementById("balance");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const loanBalanceElement = document.getElementById("loan-balance");
const specsElement = document.getElementById("specs");
const stockElement = document.getElementById("stock");
const titleElement = document.getElementById("title");
const imagesElement = document.getElementById("images");
const workElement = document.getElementById("work-btn");
const payElement = document.getElementById("pay");

//get a loan button

let loanBank = 0;
function myFunction() {
  let loanBtn = parseInt(prompt("Please enter your desired amount"));
  if (loanBank > 0){
    alert("Unfortunetly, you cant get a loan");
  }
  
  else if (loanBtn < bankBalance *2) {
    loanBank += loanBtn;
    alert("Yes, you can get a loan");
    
  }
  console.log(loanBank)
  loanBalanceElement.innerText = "Loan: " + loanBank
}

//Api transfer data to laptops
let computers = [];
let balance = 0;
let price = [];
let specs = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
.then((response) => response.json())
.then((data) => (computers = data))
.then((computers) => addComputersTo(computers));

console.log(computers);

// computers = data
//Log out the data

const addComputersTo = (computers) => {
  computers.forEach((x) => addComputerTo(x));
  
  titleElement.innerText = computers[0].title;
  priceElement.innerText = computers[0].price;
  descriptionElement.innerText = computers[0].description;
  
  specsElement.innerHTML = computers[0].specs;
  stockElement.innerHTML = computers[0].stock;
};

const addComputerTo = (computer) => {
  const computerElement = document.createElement("option");
  computerElement.value = computer.id;
  computerElement.appendChild(document.createTextNode(computer.title));
  computerElement.appendChild(document.createTextNode(computer.stock));
  
  computersElement.appendChild(computerElement);
};

const handleComputerMenuChange = (e) => {
  const selectedComputer = computers[e.target.selectedIndex];
  priceElement.innerText = selectedComputer.price;
  specsElement.innerText = selectedComputer.specs;
  descriptionElement.innerText = selectedComputer.description;
  titleElement.innerText = selectedComputer.title;
  
  imagesElement.src =
  "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;
  
  console.log(
    "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image
    );
  };
  
  computersElement.addEventListener("change", handleComputerMenuChange);
  
  //function for loan to increament 100 each time the user click on the work button 
  
  workBtn.addEventListener("click", work);
  
  
  let balanceTotal = 0;
  
  function work() {
    balanceTotal += 100;
    payElement.innerText = balanceTotal;
    
  }
  
  

  //This function  transforms money from work to Joe banker when you click bankBtn/  work container. 

  bankBtn.addEventListener("click", bank);
  
  let bankBalance = 0;
  
  function bank() {
    let balanceChange = balanceTotal * 0.1;
    if(loanBank > 0 ){
      balanceTotal = balanceTotal * 0.9;
      loanBank += balanceChange;
      
    }
    
    bankBalance += balanceTotal;
    balanceTotal = 0;
    payElement.innerText = balanceTotal;
    document.getElementById("bank-balance").innerText = "Bank: " + bankBalance;
    
  } 
  
  
  
  //function to pay of the loan you have if you have taken any. 
  

  payBtn.addEventListener("click", payLoanBtn);
  
  let payBalance = 0;
  
  function payLoanBtn() {
    
    
    loanBank -= balanceTotal;
    
    
    balanceTotal = 0;
    
    payElement.innerText = payBalance
    
    loanBalanceElement.innerText = loanBank

   
  } 
  
  
  //buy now button

  // This function is for buy now, it also allows you to buy the computer if you have enough money
  
  buyNow.addEventListener("click", buyNowHandler);
  
  function buyNowHandler() {

    const price = +priceElement.innerText;
    if (price > bankBalance) {
      alert("you dont have enough");
    } else {
      bankBalance -= price;
      alert("you have bought it");
    }  document.getElementById("bank-balance").innerText = "Bank: " + bankBalance;
    
  }
  