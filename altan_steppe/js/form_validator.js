$().ready(function() {
    $("#book-form").validate(
        {
        /* rules */
        rules: {
            /* name */
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            /* email */
            email: {
                required: true,
                email: true
            },
            /* address */
            address: {
                required: true,
                minlength: 5
            },
            /* starting date */
            date: {
                required: true,
            },
            guests: {
                required: true,
            },
            nights: {
                required: true,
            },
            creditno: {
                required: true,
                number: true
            },
            cvv: {
                required: true,
                number: true,
            }
        },

        /* messages */
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name",
            email: {
                required: "Please enter a valid email address",
                email:"The email should be in the format: abc@domain.com"
            },
            address: {
                required: "Please provide your address",
                minlength: "Must be at least 5 characters long!"
            },
            date: "Please provide starting date",
            guests: "Please state number of guests",
            nights: "Please state number of nights you are staying",
            creditno: {
                required: "Enter a valid credit number",
                number: "Input type not a number!"
            },
            cvv: {
                required: "Enter a valid CVV",
                number: "Input type not a number!",
            }
        },
    });
});