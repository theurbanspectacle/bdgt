// Loading screen function.
$(document).ready(function(){
    $('.modal-trigger').leanModal();
  });
  
function signup()
{
  console.log("Hello World")
  fetch('http://localhost:3000/')
  .then((response) => response.text())
  .then((data) => console.log(data));
}