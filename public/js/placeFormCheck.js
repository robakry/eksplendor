const form = document.querySelector('form');
const inputAll = document.querySelectorAll('input');
const placeName = document.querySelector('#name');
const locationName = document.querySelector('.mapboxgl-ctrl-geocoder--input');
const button = document.querySelector('.btn');

let isValid = false;
let isPlaceNameValid = false;
let isLocationNameValid = false;

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

const checkPlaceName = (input, min, max) => {
    if (input.value.trim() === '') {
        showError(input, 'Proszę wprowadzić nazwę miejsca.')
        isPlaceNameValid = false
    } else if (input.value.length < min) {
        showError(input, `Nazwa musi zawierać minimalnie ${min} znaki.`);
        isPlaceNameValid = false
    } else if (input.value.length > max) {
        showError(input, `Nazwa nie może zawierać więcej niż ${max} znaków.`);
        isPlaceNameValid = false
    } else {
        showSuccess(input);
        isPlaceNameValid = true
    }
};

const checkLocationName = (input) => {
    if (input.value.trim() === '') {
        isLocationNameValid = false
        isValid = false
    } else {
        isLocationNameValid = true
        isValid = true
    }
};

placeName.addEventListener('keyup', function () {
    checkPlaceName(placeName, 3, 40);
});

locationName.addEventListener('change', function () {
    checkLocationName(locationName);
});

inputAll.forEach(input => {
    input.addEventListener('keyup', function () {
        if (isLocationNameValid ||isPlaceNameValid) {
            button.classList.remove('btn-invalid')
        } else {
            button.classList.add('btn-invalid')
        }
    })
});

form.addEventListener('submit', e => {
    checkPlaceName(placeName, 3, 40);
    checkLocationName(locationName);
    if (!isValid || !isLocationNameValid || !isPlaceNameValid) {
        e.preventDefault();
    }
});



