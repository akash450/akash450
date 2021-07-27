//var declarations
var priceContainer = document.getElementById("price-container"),
promo = 'SAVE',
quizcode = document.getElementById("form-quizcode");
getPrice = document.getElementById("pricestimate");

// when user clicks submit, show results
submit.onclick = function() {
    displayMessage();
}

/* price display function */
function displayPrice() {
    //all variables required to calculate price
    var people = document.getElementById("form-guests").value;
    var nights = document.getElementById("form-nights").value;
    var checkbox_state = document.getElementById("form-yes").checked;
    const dailycost = 150;
    const hunttour = 25;
    const total_general_cost = dailycost * people * nights;
    const added_cost = hunttour * people * nights;
    const discount = 0.8;
    const cost_with_hunting = total_general_cost + added_cost;
    //by default, if quizcode is empty or has 'SAVE' in it, it is valid
    quizcode.className = "valid";

    /* if user types something random like 'jpxfrd' which doesn't match promo you were given */
    if (quizcode.value != promo && quizcode.value != "") {
        //adds error class which allows validator to highlight the box red with a message
        quizcode.className = "error";
    } 
    //if you get discount quiz but don't want the hunting tour
    else if ((quizcode.value == promo) && (checkbox_state == false)) {
        prices.innerHTML = "Your price estimate is $" + (total_general_cost * discount);
    }
    //if you get the promo AND want the hunting tour
    else if ((quizcode.value == promo) && (checkbox_state == true)) {
        prices.innerHTML = "Your price estimate is $" + (cost_with_hunting * discount);
    }

    /* if user doesn't type anything into discount quiz but wants the hunting tour (waste of money)*/
    else if ((quizcode.value == "") && (checkbox_state == true)) {
        prices.innerHTML = "Your price estimate is $" + cost_with_hunting;
    }

    else {
        prices.innerHTML = "Your price estimate is $" + total_general_cost;
    }
}