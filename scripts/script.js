$(document).ready(function() {
  // Making sure the DOC is fully loaded
  console.log("Ready to rumble.");
  console.log(sessionStorage.getItem('hasRegistered'));

  // Checking to see if user is a memeber or not
  let validateResult = sessionStorage.getItem('hasRegistered');

  // Remove the signup area and the signup option if an account is detected
  if (validateResult === 'Phase 1') 
  {
    $("#section-freedom-signup").hide();
    $('#nav-freedom-login').hide();
    $('#nav-freedom-home').hide();
    $("#home-btn").text("Login");
  } else if (validateResult === 'Phase 2')  // If account is signed into change the site layout
  {
    $("#section-freedom-signup").hide();
    $('#nav-freedom-home').hide();
    $('#nav-freedom-login').hide();
    $("#home-btn").text("View Account Information");
    $("#home-btn").attr('data-bs-target', '#accountInfoModal');

    // Adding additional functionality for logged in users
    let fullPhoneNumber = sessionStorage.getItem('mobile');
    let maskedPhoneNumber = fullPhoneNumber ? "xxx-xxx-" + fullPhoneNumber.slice(-4) : "xxx-xxx-xxxx";

    let fullSSN = sessionStorage.getItem('ssn');
    let maskedSSN = fullPhoneNumber ? "xxx-xx-" + fullSSN.slice(-4) : "xxx-xx-xxxx";

    // Displaying account info to user
    let userInfoHtml = `
        <h4>Welcome, ${sessionStorage.getItem('fullname')}!</h4>
        <p>Email: ${sessionStorage.getItem('email')}</p>
        <p>Member Since: ${sessionStorage.getItem('date')}</p>
        <p>Phone Number: ${maskedPhoneNumber}</p>
        <p>SSN: ${maskedSSN}</p>
        <p>Current Address: ${sessionStorage.getItem('address')}</p>
      `;
    // Adding this to the info modal body
    $("#accountInfoModal .modal-body").html(userInfoHtml);

    //Adding a logout feature that clears sessionStorage
    $("#logout-btn").on('click', function(event) {
      sessionStorage.clear()
      window.location.reload()
    })
  }

  // Making a function to validate the forms
  let validateForms = () => {
      // Validating registration
      const $containerForm = $('#registration-form');

      $containerForm.on('submit', function(event) {
          if (!$containerForm[0].checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          } else {
              // If form is valid, store information for later use.
              let $fullname = $('#freedomName').val();
              let $email = $('#freedomEmail').val();
              let $password = $('#freedomPassword').val();
              let $ssn = $('#freedomSSN').val();
              let $address = $('#freedomAddress').val();
              let $mobile = $('#freedomMobile').val();
              let $date = $('#freedomDate').val();

              // Storing name, email, and password into session
              sessionStorage.setItem('fullname', $fullname);
              sessionStorage.setItem('email', $email);
              sessionStorage.setItem('password', $password);
              sessionStorage.setItem('ssn', $ssn);
              sessionStorage.setItem('address', $address);
              sessionStorage.setItem('mobile', $mobile);
              sessionStorage.setItem('date', $date);
              sessionStorage.setItem('hasRegistered', 'Phase 1');

          }

          $containerForm.addClass('was-validated');
      });
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

              // Looking for values and making sure they exist
              if (storedEmail && storedPassword) {
                  if ($loginEmail.val() === storedEmail && $loginPassword.val() === storedPassword) {
                      $loginEmail.addClass('is-valid');
                      $loginPassword.addClass('is-valid');
                      $confirmation.text(`Welcome back ${storedName}, you will be logged in shortly.`);
                      sessionStorage.setItem('hasRegistered', 'Phase 2')
                      setTimeout(function() {
                          window.location.reload();
                      }, 5000);
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

      // Remove 'is-invalid' dynamically
      $loginPassword.on('input', function() {
          $loginPassword.removeClass('is-invalid');
          $feedbackPassword.text(''); // Clear feedback message
      });

      $loginEmail.on('input', function() {
          $loginEmail.removeClass('is-invalid');
          $feedbackEmail.text(''); // Clear feedback message
      });
  }

  checkLogin();

  // Adding a button to allow user to fill form for anonymous data!
  let $anonApply = $("#anonymous-apply");

  $anonApply.on('click', function(event) {
      $("#freedomName").val('Alexander Hamilton');
      $('#freedomEmail').val('anonymous@yahoo.com');
      $("#freedomAddress").val('123 American Pie Lane');
      $("#freedomMobile").val('2024561111');
      $("#freedomSSN").val('123456789');  // Fixed the selector here
      $("#freedomDate").val('1776-07-04');
      $("#freedomPassword").val('freedom4life');
      $("#freedomPasswordVerify").val('freedom4life');
      $("#gridCheck").prop('checked', true);  // Fixed setting checked property here
  });

  
});
