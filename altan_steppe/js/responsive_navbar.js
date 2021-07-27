function toggle_hamburger() {
    var toggle = document.getElementsByClassName("menu");
    if (toggle[0].style.display === "block") {
      toggle[0].style.display = "none";
    } else {
      toggle[0].style.display = "block";
    }
}