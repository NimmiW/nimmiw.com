document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const contactForm = document.getElementById("contact-form");
  const submitButton = document.getElementById("submit-contact");
  const spinner = document.getElementById("submit-spinner");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  // AWS Lambda endpoint
  const LAMBDA_ENDPOINT = "https://5lgbqzprb0.execute-api.us-east-1.amazonaws.com/send-email";

  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Reset messages
      successMessage.style.display = "none";
      errorMessage.style.display = "none";

      // Get form data
      const formData = {
        name: document.getElementById("contact-name").value,
        email: document.getElementById("contact-email").value,
        subject: document.getElementById("contact-subject").value,
        message: document.getElementById("contact-message").value,
        formType: document.getElementById("form-type").value
      };

      // Disable submit button and show spinner
      submitButton.disabled = true;
      spinner.style.display = "inline-block";

      try {
        console.log('Sending request to:', LAMBDA_ENDPOINT);
        console.log('With data:', formData);
        
        const response = await fetch(LAMBDA_ENDPOINT, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        // Show success message
        successMessage.style.display = "block";
        successMessage.textContent = "Message sent successfully!";

        // Reset form
        contactForm.reset();

        // Hide success message after 3 seconds
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      } catch (error) {
        console.error('Error:', error);
        // Show error message
        errorMessage.style.display = "block";
        if (error.message.includes('Failed to fetch')) {
          errorMessage.textContent = "Unable to connect to the server. Please check your internet connection and try again.";
        } else {
          errorMessage.textContent = error.message || "An error occurred. Please try again later.";
        }
      } finally {
        // Re-enable submit button and hide spinner
        submitButton.disabled = false;
        spinner.style.display = "none";
      }
    });

    // Form validation
    const inputs = contactForm.querySelectorAll(".form-control");
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (this.checkValidity()) {
          this.classList.remove("is-invalid");
          this.classList.add("is-valid");
        } else {
          this.classList.remove("is-valid");
          this.classList.add("is-invalid");
        }
      });
    });
  }
}); 