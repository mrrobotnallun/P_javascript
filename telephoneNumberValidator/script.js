document.getElementById('check-btn').addEventListener('click', function() {
    const phoneNumber = document.getElementById('user-input').value;
    const resultsDiv = document.getElementById('results-div');

    if (!phoneNumber) {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validatePhoneNumber(phoneNumber);
    if (isValid) {
        resultsDiv.textContent = `Gültige US-Nummer: ${phoneNumber}`;
        resultsDiv.style.color = 'green';
    } else {
        resultsDiv.textContent = `Ungültige US-Nummer: ${phoneNumber}`;
        resultsDiv.style.color = 'red';
    }
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('user-input').value = '';
    document.getElementById('results-div').textContent = '';
});

function validatePhoneNumber(number) {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return regex.test(number);
}
