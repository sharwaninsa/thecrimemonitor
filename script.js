// Initialize EmailJS (replace with your own public key if necessary)
emailjs.init("2w9e58e4IA8fj7PLy");

// Listen for form submission
document.getElementById("requestForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page reload

  // Get form values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobile").value;
  var request = document.getElementById("request").value;
  var requestUrl = document.getElementById("request_url").value;
  var message = document.getElementById("message").value;

  // Send the email using EmailJS
  emailjs.send("service_p4s6tmz", "template_ty8fgzm", {
    to_name: "Admin", // Replace with the recipient's name
    from_name: name,  // Sender's name
    from_email: email, // Sender's email
    from_mobile: mobile, // Sender's mobile number
    request: request,  // Request field
    request_url: requestUrl,  // URL/Link of the request
    message: message  // Message field
  })
  .then(function(response) {
    alert("Your message has been sent successfully!");
  }, function(error) {
    alert("There was an error sending your message, please try again later.");
  });
});
