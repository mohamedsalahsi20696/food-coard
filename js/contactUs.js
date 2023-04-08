export class ContactUs {
    constructor() {

        // loading
        this.loading = document.querySelector('.loading');

        this.formData = document.querySelector('form');
        this.inputs = document.querySelectorAll('form input');
        this.btnRegister = document.getElementById('btnRegister');

        this.btnRegister.addEventListener('click', this.preventDefaultBtn.bind(this));

        this.inputs[0].addEventListener('input', this.validationName.bind(this));
        this.inputs[1].addEventListener('input', this.validationEmail.bind(this));
        this.inputs[2].addEventListener('input', this.validationPhone.bind(this));
        this.inputs[3].addEventListener('input', this.validationAge.bind(this));
        this.inputs[4].addEventListener('input', this.validationPassword.bind(this));
        this.inputs[5].addEventListener('input', this.validationRepassword.bind(this));

        this.validName = false;
        this.validEmail = false;
        this.validPhone = false;
        this.validAge = false;
        this.validPass = false;
        this.validRepass = false;

        this.btnRegister.setAttribute('disabled', 'true')
    }

    preventDefaultBtn() {
        this.formData.addEventListener('submit', function (e) {
            e.preventDefault();
        })

        this.reloadForm();
    }

    reloadForm() {
        this.inputs[0].value = '';
        this.inputs[1].value = '';
        this.inputs[2].value = '';
        this.inputs[3].value = '';
        this.inputs[4].value = '';
        this.inputs[5].value = '';

        this.inputs[0].classList.remove('is-valid');
        this.inputs[1].classList.remove('is-valid');
        this.inputs[2].classList.remove('is-valid');
        this.inputs[3].classList.remove('is-valid');
        this.inputs[4].classList.remove('is-valid');
        this.inputs[5].classList.remove('is-valid');
    }

    checkValidation() {
        if (this.validName && this.validEmail && this.validPhone &&
            this.validAge && this.validPass && this.validRepass) {
            this.btnRegister.removeAttribute('disabled');
        }
        else {
            this.btnRegister.setAttribute('disabled', 'true')
        }
    }

    validationName() {
        const regexStyle = /^[a-z A-Z]{1,}$/ig;
        if (regexStyle.test(this.inputs[0].value)) {

            this.inputs[0].classList.add('is-valid');
            this.inputs[0].classList.remove('is-invalid');
            this.validName = true;
        }
        else {

            this.inputs[0].classList.add('is-invalid');
            this.inputs[0].classList.remove('is-valid');
            this.validName = false;
        }
        this.checkValidation();
    }

    validationEmail() {
        const regexStyle = /\w+@\w+.\w{2,}/ig;
        if (regexStyle.test(this.inputs[1].value)) {

            this.inputs[1].classList.add('is-valid');
            this.inputs[1].classList.remove('is-invalid');
            this.validEmail = true;
        }
        else {

            this.inputs[1].classList.add('is-invalid');
            this.inputs[1].classList.remove('is-valid');
            this.validEmail = false;
        }
        this.checkValidation();

    }

    validationPhone() {
        const regexStyle = /01[0125]\d{8}$/ig;
        if (regexStyle.test(this.inputs[2].value)) {

            this.inputs[2].classList.add('is-valid');
            this.inputs[2].classList.remove('is-invalid');
            this.validPhone = true;
        }
        else {

            this.inputs[2].classList.add('is-invalid');
            this.inputs[2].classList.remove('is-valid');
            this.validPhone = false;
        }
        this.checkValidation();

    }

    validationAge() {
        const regexStyle = /^([1-7][0-9]|80)$/;
        if (regexStyle.test(this.inputs[3].value)) {

            this.inputs[3].classList.add('is-valid');
            this.inputs[3].classList.remove('is-invalid');
            this.validAge = true;
        }
        else {

            this.inputs[3].classList.add('is-invalid');
            this.inputs[3].classList.remove('is-valid');
            this.validAge = false;
        }
        this.checkValidation();

    }

    validationPassword() {
        const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regexStyle.test(this.inputs[4].value)) {
            this.validationRepassword();
            this.inputs[4].classList.add('is-valid');
            this.inputs[4].classList.remove('is-invalid');
            this.validPass = true;
        }
        else {

            this.inputs[4].classList.add('is-invalid');
            this.inputs[4].classList.remove('is-valid');
            this.validPass = false;
        }
        this.checkValidation();

    }

    validationRepassword() {
        if (this.inputs[5].value === this.inputs[4].value) {

            this.inputs[5].classList.add('is-valid');
            this.inputs[5].classList.remove('is-invalid');
            this.validRepass = true;
        }
        else {

            this.inputs[5].classList.add('is-invalid');
            this.inputs[5].classList.remove('is-valid');
            this.validRepass = false;
        }
        this.checkValidation();

    }


}
