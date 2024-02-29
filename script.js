document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Collect form data
    var formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        degree: document.getElementById('degree').value,
        graduationYear: document.getElementById('graduationYear').value,
        itExperience: document.getElementById('itExperience').value
    };

    // Send form data to server
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Form data submitted successfully');
            // Optionally, redirect to a success page or display a success message
        } else {
            console.error('Error submitting form data');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
