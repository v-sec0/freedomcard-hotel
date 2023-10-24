$(document).ready(function(){

  // Making sure the DOC is fully loaded
    console.log("Ready to rumble.");

  // Making a function to validate the forms
  let validateForms = () => {
    
    // Validating registration
    var containerForm = document.getElementById('registration-form');
  
    containerForm.addEventListener('submit', function (event) {
      if (!containerForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        
        // If form is valid, store information for later use.
        let fullname = document.getElementById('freedomName').value;
        let email = document.getElementById('freedomEmail').value;
        
        // Was gonna use atob() but felt like it was unnessecary as the entire program is unsecure
        let password = document.getElementById('freedomPassword').value;

        // Storing name, email and password into session
        sessionStorage.setItem('fullname', fullname);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        
      }
  
      containerForm.classList.add('was-validated');
    }, false);
  }
  
  // Initializing script
  validateForms();

  // Creating a manual form
  function checkLogin() {
    const $loginForm = $('#login-form');
    const $loginPassword = $('#loginPassword');
    const $loginEmail = $('#loginEmail');
    const $feedbackPassword = $('#feedbackPassword');
    const $feedbackEmail = $('#feedbackEmail');
    let $confirmation = $("#confirmationMessage");

    $loginForm.on('submit', function(event) {
        event.preventDefault();

        // Retrieve stored values from sessionStorage
        const storedEmail = sessionStorage.getItem('email');
        const storedPassword = sessionStorage.getItem('password');
        const storedName = sessionStorage.getItem('fullname');

        // Check for empty values and assign 'is-invalid' class if needed
        if (!$loginPassword.val()) {
          $loginPassword.addClass('is-invalid');
        }

        if (!$loginEmail.val()) {
          $loginEmail.addClass('is-invalid');
        }

        if ($loginPassword.val() && $loginEmail.val()) {
          // Log the values to the console
          console.log('Email:', $loginEmail.val(), 'Password:', $loginPassword.val());
          
          // Checking is values are present in storage and going through some logic
          if (storedEmail && storedPassword) {
            if ($loginEmail.val() === storedEmail && $loginPassword.val() === storedPassword) {
              $loginEmail.addClass('is-valid');
              $loginPassword.addClass('is-valid');
              $confirmation.text(`Welcome back ${storedName}, you will be logged in shortly.`)
              setTimeout(function() {
                window.location.reload();
              }, 10000);  // 10000 milliseconds = 10 seconds
            
            } else {
              // If email is invalid
              if (storedEmail !== $loginEmail.val()) {
                $loginEmail.addClass('is-invalid');
                $feedbackEmail.text("Email is not registered with a Freedom account");
              } else {
                $feedbackEmail.text("");
              }
              // If password is invalid
              if (storedPassword !== $loginPassword.val()) {
                $loginPassword.addClass('is-invalid');
                $feedbackPassword.text("Password is incorrect");
              } else {
                $feedbackPassword.text("");
              }
            }
          } else {
            $loginEmail.addClass('is-invalid');
            $loginPassword.addClass('is-invalid');
            // If email doesn't exist
            if (!storedEmail) {
              $feedbackEmail.text('No email is not registered');
            }
            // If password doesn't exist
            if (!storedPassword) {
              $feedbackPassword.text("No password is registered.")
            }
          }
        }
    });

    // Remove 'is-invalid' class when user starts typing
    $loginPassword.on('input', function() {
        $loginPassword.removeClass('is-invalid');
    });

    $loginEmail.on('input', function() {
        $loginEmail.removeClass('is-invalid');
    });
  }

  checkLogin();

    
});