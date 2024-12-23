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


    document.getElementById('whoisForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const domain = document.getElementById('domain').value.trim();
        const apiKey = '746e42068a804b1395491e90f7040c46';
        const url = `https://api.whoisfreaks.com/v1.0/whois?apiKey=${apiKey}&whois=live&domainName=${domain}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const resultsDiv = document.getElementById('results');
                const output = document.getElementById('whoisOutput');

                if (data.error) {
                    output.textContent = `Error: ${data.error}`;
                } else {
                    output.textContent = `Showing results for ${domain}`;
                }

                resultsDiv.classList.remove('d-none');

                const domainCreateDate = new Date(data.create_date);
                const currentDate = new Date();
                const ageInMonths = (currentDate.getFullYear() - domainCreateDate.getFullYear()) * 12 + (currentDate.getMonth() - domainCreateDate.getMonth());

                let risk;
                let riskClass;

                if (ageInMonths < 6) {
                    risk = "75% (High Risk)";
                    riskClass = "risk-high";
                } else if (ageInMonths < 12) {
                    risk = "50% (Medium Risk)";
                    riskClass = "risk-medium";
                } else if (ageInMonths < 24) {
                    risk = "25% (Low Risk)";
                    riskClass = "risk-low";
                } else if (ageInMonths >= 60) {
                    risk = "<10% (Minimal Risk)";
                    riskClass = "risk-minimal";
                } else {
                    risk = "25% (Low Risk)";
                    riskClass = "risk-low";
                }

                const outputDiv = document.getElementById("output");

                // Create the table to display the data
                outputDiv.innerHTML = `
                    <table class="table table-striped table-primary">
                        <thead>
                            <tr>
                                <th>Domain Information</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Domain Age</td>
                                <td>${(ageInMonths / 12).toFixed(2)} years</td>
                            </tr>
                            <tr>
                                <td>Risk Level</td>
                                <td><span class="${riskClass}">${risk}</span></td>
                            </tr>
                            <tr>
                                <td>Creation Date</td>
                                <td>${domainCreateDate.toDateString()}</td>
                            </tr>
                            <tr>
                                <td>Registrar</td>
                                <td>${data.registrar || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>${data.status || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Whois Server</td>
                                <td>${data.whois_server || 'N/A'}</td>
                            </tr>
                        </tbody>
                    </table>
                `;
            })
            .catch(error => {
                document.getElementById('whoisOutput').textContent = `Error fetching data: ${error.message}`;
                document.getElementById('results').classList.remove('d-none');
            });
    });
