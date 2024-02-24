'use strict';

window.onload = () => {
    let fullNameInput = document.getElementById('full-name');
    let usernameInput = document.getElementById('username');
    let passwordInput = document.getElementById('password');
    let agreeCheckbox = document.getElementById('agree');
    let signUpButton = document.getElementById('sign-up');
    let popup = document.getElementById('popup');
    let formLink = document.getElementById('form-link');

    // Запрещено вводить цифры
    fullNameInput.onkeydown = function (e) {
        let number = parseInt(e.key);
        if (!isNaN(number)) {
            return false;
        }
    }

    usernameInput.onkeydown = function (e) {
        let symbol = e.key;
        if (symbol === '.' || symbol === ',') {
            return false;
        }
    }

    agreeCheckbox.onchange = function (e) {
        e.target.checked ? console.log('Согласен') : console.log('Не согласен');
    }

    signUpButton.onclick = function () {
        let message = 'Заполните поле ';
        let emailInput = document.getElementById('email');
        let passwordRepeatInput = document.getElementById('password-repeat');

        if (!fullNameInput.value) {
            alert(message + 'Full Name');
            return;
        }
        if (!usernameInput.value) {
            alert(message + 'Your username');
            return;
        }
        if (!emailInput.value) {
            alert(message + 'E-mail');
            return;
        }
        if (!passwordInput.value) {
            alert(message + 'Password');
            return;
        }
        if (passwordInput.value.length < 8) {
            alert('Поле Password не может быть короче 8 символов!');
            return;
        }
        if (!passwordRepeatInput.value) {
            alert(message + 'Repeat Password');
            return;
        }
        if (passwordRepeatInput.value !== passwordInput.value) {
            alert('Пароли не совпадают!');
            return;
        }
        if (!agreeCheckbox.checked) {
            alert('Необходимо принять наши Условия обслуживания и Положение о конфиденциальности!');
            return;
        }

        popup.style.display = 'block';
    }

    document.getElementById('ok-btn').onclick = function () {
        popup.style.display = 'none';
        let inputs = document.getElementsByClassName('form__input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        agreeCheckbox.checked = false;
        pageLogin();
    }

    function pageLogin() {
        document.getElementsByClassName('main__title')[0].innerText = 'Log in to the system';
        document.getElementById('label-full-name').remove();
        document.getElementById('label-email').remove();
        document.getElementById('label-repeat-pass').remove();
        document.getElementById('label-checkbox').remove();
        signUpButton.innerText = 'Sign In';
        formLink.remove();
        signUpButton.onclick = function () {
            if (!usernameInput.value) {
                alert('Заполните поле  Your username');
                return;
            }
            if (!passwordInput.value) {
                alert('Заполните поле Password');
                return;
            }
            if (passwordInput.value.length < 8) {
                alert('Поле Password не может быть короче 8 символов!');
                return;
            }

            alert('Добро пожаловать, ' + usernameInput.value + '!');
        }
    }

    formLink.addEventListener('click', pageLogin);
}