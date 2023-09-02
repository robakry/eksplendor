const form = document.querySelector('form');
const inputAll = document.querySelectorAll('input');
const username = document.querySelector('#name');
const password = document.querySelector('#password');
const button = document.querySelector('.btn');


window.onload = () => {
    checkButton();
};

function checkButton() {
    if (username.value.length > 1) {
        button.classList.remove('btn-invalid');
    }
};

let isValid = false;
let isLoginValid = false;
let isPasswordValid = false;

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

const checkUsername = (input) => {
    if (input.value.trim() === '') {
        showError(input, 'Proszę wprowadzić login.')
        isLoginValid = false
    } else {
        showSuccess(input);
        isLoginValid = true
    }
};

const checkPassword = (input) => {
    if (input.value.trim() === '') {
        showError(input, 'Proszę wprowadzić hasło.')
        isPasswordValid = false
    } else {
        showSuccess(input);
        isPasswordValid = true
    }
};

username.addEventListener('keyup', function () {
    checkUsername(username);
});

password.addEventListener('keyup', function () {
    checkPassword(password);
});

inputAll.forEach(input => {
    input.addEventListener('keyup', function () {
        if (isLoginValid && isPasswordValid) {
            button.classList.remove('btn-invalid')
        } else {
            button.classList.add('btn-invalid')
        }
    })
});

form.addEventListener('submit', e => {
    checkUsername(username);
    checkPassword(password);
    if (!isValid || !isLoginValid || !isPasswordValid) {
        e.preventDefault();
    }
});

