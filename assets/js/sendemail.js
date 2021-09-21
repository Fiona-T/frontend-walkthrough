// gets the value from the contact form inputs, assigns them to parameters specified in emailjs template
// to send the email using this information
// the then part of promise logs either success or failure to console
function sendMail(contactForm) {
    emailjs.send("service_kl56f5a", "template_r8g6b9j", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "project_request": contactForm.projectsummary.value
    })
    .then (
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}