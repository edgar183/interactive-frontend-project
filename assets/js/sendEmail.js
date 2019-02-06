const emailField = document.getElementById('emailaddress');
const sendButton = document.getElementById('send-btn');

emailField.addEventListener('keyup', function(event) {
    isValidEmail = emailField.checkValidity();
    if (isValidEmail) {
        sendButton.disabled = false;
    }
    else {
        sendButton.disabled = true;
    }
});

function sendEmail(contactForm) {
    emailjs.send("gmail", "edgars_peskaitis", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "project_request": contactForm.projectsummary.value
        })
        .then(
            function(response) {
                console.log("SUCCESS", response);
            },
            function(error) {
                console.log("FAILED", error);
            }
        );
    return false;

}
