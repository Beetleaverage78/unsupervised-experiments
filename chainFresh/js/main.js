// Helper Functions
function success(msg) {alert(msg);}
function debug(msg) {console.log("Debug: "+msg);}
function error(msg) {alert("Error: "+msg);}

/* Cart Counter */
function addToCart() {
  alert("Added to Cart! ->");
  var storedCount = sessionStorage.getItem("cartCount");
  if (storedCount == null) {storedCount = 0;}
  storedCount++;
  var cart = document.querySelector("#cartCounter");
  cart.innerHTML = storedCount;
  sessionStorage.setItem("cartCount", storedCount);
}
/* -----------------------------------------------------*/
/* FAQ HTML JS */
var btnArray = document.getElementsByClassName("faq-category");
for (var i = 0; i < btnArray.length;i++) {
  btnArray[i].addEventListener("click", function() {
    this.classList.toggle("faq-active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
/* -----------------------------------------------------*/
/* REGISTER HTML JS */
// Tab Function for Forms
function switchForm(btn, formName) { 
  var switchContent, switchTab;
  switchContent = document.getElementsByClassName("switch-content");
  for (var i = 0; i < switchContent.length;i++) {
    switchContent[i].style.display = "none";
  }
  switchTab = document.getElementsByClassName("switchtab");
  for (var i = 0; i < switchTab.length;i++) {
    switchTab[i].classList.remove("active");
  }
  document.getElementById(formName).style.display = "block";
  btn.currentTarget.classList.add("active");
}

// CountDown function for Cart
var time_in_minutes = 10;
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes*60*1000);
function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

// Register Button
// Throws an error if one of the required fields are empty.
function registerAcc() {
  // Lazily check if all required inputs have values.
  var inputList = document.getElementsByClassName("reqInput");
  for (var i = 0;i < inputList.length;i++) {
    if (inputList[i].value == "") {
      error("Account Regisration failed! \n1. Required Fields are missing! \n2. Check fields marked with * are not empty");
      return;
    }
  }

  // Get the only input with id firstName
  var name = document.querySelector("#firstName").value;
  success("Account successfuly created!\nWelcome to the ChainFresh Community "+name+"!!!");
}


/* -----------------------------------------------------*/
/* Product HTML JS */
var btnArray = document.getElementsByClassName("sort-category");
for (var i = 0; i < btnArray.length;i++) {
  btnArray[i].addEventListener("click", function() {
    this.classList.toggle("sort-active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// Google SpreadSheets Integration for Product Page
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/18O3iVwk2ttJe7ALAZe4PpUwJ7ulWytMKUdP8IdNdkRE/edit?usp=sharing';

/* Runs at the start when all content has been loaded */
function init() {
  document.querySelector("#cartCounter").innerHTML = sessionStorage.getItem("cartCount");

  var page = window.location.pathname.split("/").pop();
  // Only run if current html file is register page.
  if (page == "register.html") {
    debug("Register Page Detected");
    document.querySelector("#reg").classList.add("active");
    document.querySelector("#Register").style.display = "block";

    var clock = document.getElementById("cd");
    function update_clock(){
      var t = time_remaining(deadline);
      if (t.seconds > 10) {
        clock.innerHTML = '0'+t.minutes+':'+t.seconds;
      } else {
        clock.innerHTML = '0'+t.minutes+':0'+t.seconds;
      }
      if(t.total<=0){ clearInterval(timeinterval); }
    }
    update_clock(); 
    var timeinterval = setInterval(update_clock,1000);
  }
  // Only run if current html file is products page.
  if (page == "products.html") {
    debug("Products Page Detected");
    Tabletop.init({
      key: publicSpreadsheetUrl,
      callback: showProducts,
      simpleSheet: true,
    });
  }
};

/* Dynamically Create Product Cards */
function showProducts(data, tabletop) {
  var products = document.querySelector(".is-multiline")

  data.forEach(async function (e) {
    var columnDiv = document.createElement("div");
    columnDiv.classList.add("column", "is-one-quarter");

    var itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    var img = document.createElement("img");
    img.setAttribute('src', e.prodImg);

    var title = document.createElement("h1");
    title.innerHTML = e.prodName;   

    var price = document.createElement("span");
    price.innerHTML = "$"+e.prodPrice;

    var buyBtn = document.createElement("button");
    buyBtn.innerHTML = "ADD TO CART";
    buyBtn.setAttribute("onclick", "addToCart()"); // Adds BUY Button Functionality

    itemDiv.appendChild(img);
    itemDiv.appendChild(title);
    itemDiv.appendChild(price);
    itemDiv.appendChild(buyBtn);

    columnDiv.appendChild(itemDiv);
    products.appendChild(columnDiv);
  });
}


 // Show Products once HTML has finished loading.
window.addEventListener('DOMContentLoaded', init);
/* -----------------------------------------------------*/