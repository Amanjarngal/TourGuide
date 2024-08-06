<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    
        //contact us email

        (function () {
          emailjs.init("P02CDJruifXrsKGB2");
        })();

      document.getElementById("contact-form").addEventListener('submit', function (event) {
        event.preventDefault();
        var email = document.getElementById("email").value;
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
          alert("Please enter a valid email");
          return;
        }
        sendEmail(email);
        event.target.reset();
      });

      function sendEmail(email) {
        var params = {
          name: document.getElementById("Name").value,
          email: email,
          message: document.getElementById("message").value
        }

        const serviceID = "service_p6h0fhc";
        const templateID = "template_wrt6jae";

        emailjs.send(serviceID, templateID, params)
          .then(function (response) {
            console.log("Success!", response.status, response.text);
            alert("Email sent successfully!");
          },
            function (error) {
              console.log("Failed to send email...", error);
              alert("Failed to send Email. Please try again later.");
            });
      }




    