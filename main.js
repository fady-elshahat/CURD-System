var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var mainBtn = document.getElementById("btn-main");
var updetaBtn = document.getElementById("btn-updeta");
     updetaBtn.style.display ="none";
var alert = document.getElementById("alert");
     alert.style.display = "none"
var currentIndex = 0;

var productContainer ;

if(localStorage.getItem("productList") == null){
     var productContainer = []
}else{
     productContainer = JSON.parse(localStorage.getItem("productList"))
     displayProduct()
}

function addProduct() {
     if(formValidInput() == true){
          var product = {
               name : productName.value,
               price : productPrice.value,
               category : productCategory.value,
               desc : productDesc.value
          }
          productContainer.push(product);
          setItem()
          clearForm()
          displayProduct()
     }else{
          alert.style.display = "block"
          alert.innerText = "All Inputs Required";
     }
     
}


function clearForm() {
     productName.value = "";
     productPrice.value = "";
     productCategory.value = "";
     productDesc.value = "";
}
function displayProduct() {
     
     var cartona = ``;
     for( var i = 0 ; i < productContainer.length ; i++){
          cartona += `
          <tr>
          <td>${i+1}</td>
          <td>${productContainer[i].name}</td>
          <td>${productContainer[i].price}</td>
          <td>${productContainer[i].category}</td>
          <td>${productContainer[i].desc}</td>
          <td><button  class="btn btn-outline-warning" onclick="updetaProduct(${i})">Update</button></td>
          <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
          </tr>`
     }
     document.getElementById("tableBody").innerHTML = cartona;
}
function formValidInput(){
     if(productPrice.value != "" && productCategory.value != "" && productDesc.value !=""){
          return true
     }else{
          return false
     }
}
function deleteProduct(index){
     productContainer.splice(index , 1)
     setItem()
     displayProduct()
}
function setItem() {
     localStorage.setItem("productList" , JSON.stringify(productContainer))
}
function searchItem(searchTerm) {
     var cartona = ``
     for( var i = 0 ; i < productContainer.length ; i++){
          if(productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true
          || productContainer[i].price.toLowerCase().includes(searchTerm.toLowerCase()) == true
          ||productContainer[i].category.toLowerCase().includes(searchTerm.toLowerCase()) == true
          ||productContainer[i].desc.toLowerCase().includes(searchTerm.toLowerCase()) == true)
          {
               cartona += `
               <tr>
               <td>${i+1}</td>
               <td>${productContainer[i].name}</td>
               <td>${productContainer[i].price}</td>
               <td>${productContainer[i].category}</td>
               <td>${productContainer[i].desc}</td>
               <td><button class="btn btn-outline-warning" onclick="updetaProduct(${i}>Update</button></td>
               <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
               </tr>`
               
          }else{
               document.getElementById("tableBody").innerHTML = "Sorry NOT FUOND";
          }
     }
     document.getElementById("tableBody").innerHTML = cartona;
}
function updetaProduct(index) {
     currentIndex = index;

     mainBtn.style.display = "none";
     updetaBtn.style.display ="inline-block"

     productName.value = productContainer[index].name;
     productPrice.value = productContainer[index].price;
     productCategory.value = productContainer[index].category;
     productDesc.value = productContainer[index].desc;
}
function saveUpdeta() {
     if(formValid() == true){
          productContainer[currentIndex].name = productName.value;
          productContainer[currentIndex].price =  productPrice.value;
          productContainer[currentIndex].category = productCategory.value;
          productContainer[currentIndex].desc = productDesc.value;
          setItem()
          mainBtn.style.display = "inline-block";
          updetaBtn.style.display ="none";
          clearForm()
          displayProduct()
     }else{
          alert("you must update all fields")
     }
}