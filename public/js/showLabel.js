const inputName = document.querySelector('#name')
const labelName = document.querySelector('#label-name')
const inputPassword = document.querySelector('#password')
const labelPassword = document.querySelector('#label-password')
const inputEmail = document.querySelector('#email')
const labelEmail = document.querySelector('#label-email')


const showLabel = (input, label) => {
    input.addEventListener('focusin', () => {
        label.classList.add('labelfocused')
    })
};

const hideLabel = (input, label) => {
    input.addEventListener('focusout', () => {
        if (input.value.length < 1) {
            label.classList.remove('labelfocused')
        }
    })
};

if (inputName) {
    showLabel(inputName, labelName);
    hideLabel(inputName, labelName);
}

if (inputPassword) {
    showLabel(inputPassword, labelPassword);
    hideLabel(inputPassword, labelPassword);

}

if (inputEmail) {
    showLabel(inputEmail, labelEmail);
    hideLabel(inputEmail, labelEmail);
}
