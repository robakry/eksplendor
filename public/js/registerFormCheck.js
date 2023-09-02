const form = document.querySelector('form');
const inputAll = document.querySelectorAll('input');
const username = document.querySelector('#name');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const button = document.querySelector('.btn');

let isValid = false;
let isLoginValid = false;
let isPasswordValid = false;
let isEmailValid = false;

const showError = (input, msg) => {
    const formCart = input.parentElement;
    input.classList.add('form-error');
    input.classList.remove('form-success');
    const small = formCart.querySelector('small');
    small.classList.add('form-error')
    small.innerText = msg;
    isValid = false
};

const showSuccess = (input) => {
    const formCart = input.parentElement;
    input.classList.add('form-success');
    input.classList.remove('form-error');
    const small = formCart.querySelector('small');
    small.classList.remove('form-error')
    isValid = true
};

const checkUsername = (input, min, max) => {
    if (input.value.trim() === '') {
        showError(input, 'Proszę wprowadzić login.')
        isLoginValid = false
    } else if (input.value.length < min) {
        showError(input, `Login musi zawierać minimalnie ${min} znaki.`);
        isLoginValid = false
    } else if (input.value.length > max) {
        showError(input, `Login nie może zawierać więcej niż ${min} znaków.`);
        isLoginValid = false
    } else {
        showSuccess(input);
        isLoginValid = true
    }
};

const checkPassword = (input, min, max) => {
    if (input.value.trim() === '') {
        showError(input, 'Proszę wprowadzić hasło.')
        isPasswordValid = false
    } else if (input.value.length < min) {
        showError(input, `Hasło musi zawierać minimalnie ${min} znaków.`);
        isPasswordValid = false
    } else if (input.value.length > max) {
        showError(input, `Hasło nie może zawierać więcej niż ${max} znaków.`);
        isPasswordValid = false
    } else {
        showSuccess(input);
        isPasswordValid = true
    }
};

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
        isEmailValid = true
    } else {
        showError(input, 'Proszę wprowadzić poprawny adres email');
        isEmailValid = false
    }
};

username.addEventListener('keyup', function () {
    checkUsername(username, 3, 15);
});

password.addEventListener('keyup', function () {
    checkPassword(password, 6, 25);
});

email.addEventListener('keyup', function () {
    checkEmail(email);
});

inputAll.forEach(input => {
    input.addEventListener('keyup', function () {
        if (isLoginValid && isPasswordValid && isEmailValid) {
            button.classList.remove('btn-invalid')
        } else {
            button.classList.add('btn-invalid')
        }
    })
});

form.addEventListener('submit', e => {
    checkUsername(username, 3, 15);
    checkPassword(password, 3, 15);
    checkEmail(email);
    if (!isValid || !isLoginValid || !isPasswordValid || !isEmailValid) {
        e.preventDefault();
    }
});

