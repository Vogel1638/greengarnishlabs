document.getElementById('anrede').addEventListener('focusout', validateAnrede);
document.getElementById('vorname').addEventListener('focusout', () => validateNameField('vorname'));
document.getElementById('nachname').addEventListener('focusout', () => validateNameField('nachname'));
document.getElementById('adresse').addEventListener('focusout', validateAddressField);
document.getElementById('plz').addEventListener('focusout', validatePostalCode);
document.getElementById('ort').addEventListener('focusout', () => validateNameField('ort'));
document.getElementById('email').addEventListener('focusout', validateEmailField);
document.getElementById('nachricht').addEventListener('focusout', validateMessageField);

document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const anredeValid = validateAnrede();
    const vornameValid = validateNameField('vorname');
    const nachnameValid = validateNameField('nachname');
    const adresseValid = validateAddressField();
    const plzValid = validatePostalCode();
    const ortValid = validateNameField('ort');
    const emailValid = validateEmailField();
    const nachrichtValid = validateMessageField();

    if (
        anredeValid &&
        vornameValid &&
        nachnameValid &&
        adresseValid &&
        plzValid &&
        ortValid &&
        emailValid &&
        nachrichtValid
    ) {
        alert('Formular erfolgreich abgesendet!');
    }
});

function validateAnrede() {
    const field = document.getElementById('anrede');
    const valid = field.value !== '';
    toggleValidation(field, valid);
    return valid;
}

function validateNameField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const valid = /^[a-zA-Z\s]+$/.test(value) && value.length >= 2;
    toggleValidation(field, valid);
    return valid;
}

function validateAddressField() {
    const field = document.getElementById('adresse');
    const value = field.value.trim();
    const valid = /^[a-zA-Z0-9\s]+$/.test(value) && value.length >= 5;
    toggleValidation(field, valid);
    return valid;
}

function validatePostalCode() {
    const field = document.getElementById('plz');
    const value = field.value.trim();
    const valid = /^[0-9]{4}$/.test(value);
    toggleValidation(field, valid);
    return valid;
}

function validateEmailField() {
    const field = document.getElementById('email');
    const value = field.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    toggleValidation(field, valid);
    return valid;
}

function validateMessageField() {
    const field = document.getElementById('nachricht');
    const value = field.value.trim();
    const valid = value.length > 0 && value.length <= 500;
    toggleValidation(field, valid);
    return valid;
}

function toggleValidation(field, isValid) {
    field.classList.remove('error', 'success');
    field.classList.add(isValid ? 'success' : 'error');
}
