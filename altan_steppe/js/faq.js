var accordion = document.getElementsByClassName("accordion");
/* function for when accordion is clicked*/
function accordion_click() {
    this.classList.toggle("active");
    var dropdown = this.nextElementSibling;
    //if dropdown already expanded, then collapse (-)
    if (dropdown.style.maxHeight) {
      dropdown.style.maxHeight = null;
    } 
    //otherwise expand the dropdown (+)
    else {
      dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    } 
}
//add event listener for each accordion
for (var i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", accordion_click);
}