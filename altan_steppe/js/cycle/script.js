$(document).ready(function() {

	// Adding a "JavaScript is Enabled" Body Class

	$("body").addClass("js");

	// "Become Part of the Story!" Form Submission

	$("#part-of-story-form form").submit(function(event) {

		var firstName = $("#form-first-name").val();
		var lastName = $("#form-last-name").val();
		var complete = false;

		console.log(firstName);
		console.log(lastName);

		if(firstName != "" && lastName != "") {
			complete = true;
		}

		if(firstName == "") {
			$("#form-first-name").addClass("error").closest("label").addClass("error");
		}

		if(lastName == "") {
			$("#form-last-name").addClass("error").closest("label").addClass("error");
		}

		if(complete) {

			console.log("Complete Form");
			$("#part-of-story-form form button").html("All Done!").attr('disabled', true);

			$(".name").html(firstName);

			var age = $("input[name=age]:checked").val();
			if(typeof age != "undefined" && age != "") {
				$(".name").attr("title", "Age: " + age);
			}

		}
		else {
			console.log("Incomplete Form");
			$("#part-of-story-form form button").html("Try Again");
		}

		event.preventDefault();

	});

	$("#form-first-name, #form-last-name").keydown(function() {
		$(this).removeClass("error").closest("label").removeClass("error");
	});

	// Simple Guessing Game

	function runGame(event) {

		var computerGuess = Math.ceil(Math.random() * 30);
		console.log("Computer Guess: " + computerGuess);

		var userGuess = parseInt($("#form-temperature").val());
		console.log("User Guess: " + userGuess);

		var message = "";
		var messageColour = "";

		if(userGuess == computerGuess) {
			message = "Nice work! Great minds think alike.";
			messageColour = "green";
		}
		else if(userGuess == (computerGuess - 1) || userGuess == (computerGuess + 1)) {
			message = "Nope. Close! The computer picked " + computerGuess + ".";
			messageColour = "orange";
		}
		else if(userGuess != computerGuess) {
			message = "Nope. Nowhere near it! The computer picked " + computerGuess + ".";
			messageColour = "red";
		}

		//alert(message);
		$("#simple-guessing-game .computer-guess").html(message).css("color", messageColour);

		event.preventDefault();

	}

	$("#simple-guessing-game form").submit(runGame);


});