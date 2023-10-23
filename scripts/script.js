$(document).ready(function(){
    // Making sure the DOC is fully loaded
    console.log("Ready to rumble.");

    
    // Making a function to validate the forms
    let validateForms = () => {
      'use strict'
    
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

          sessionStorage.setItem('fullname', fullname);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('password', password);
          
        }
    
        containerForm.classList.add('was-validated');
      }, false);
    }
    
    // Initializing script
    validateForms();
    
    

});