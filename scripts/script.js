$(document).ready(function () {
    let fullNameInput = $('#full-name');
    let usernameInput = $('#username');
    let passwordInput = $('#password');
    let agreeCheckbox = $('#agree');
    let signUpButton = $('#sign-up');
    let popup = $('#popup');
    let emailInput = $('#email');
    let passwordRepeatInput = $('#password-repeat');
    let formInput = $('.form__input');
    let error = $('.form__error');
    let formLink = $('#form-link');

    signUpButton.click(function (font, text) {
        let hasError = false;
        error.hide();
        formInput.css('border-bottom-color', '#C6C6C4');
        agreeCheckbox.next().css('color', '#636363');

        if (!fullNameInput.val().match(/^[a-z\s]+$/i)) {
            fullNameInput.css('border-bottom-color', 'red');
            fullNameInput.next().text('Full Name может содержать только буквы и пробел').show();
            hasError = true;
        }

        if (!usernameInput.val().match(/^[\w-]+$/i)) {
            usernameInput.css('border-bottom-color', 'red');
            usernameInput.next().text('Your username может содержать только буквы, цифры, символ подчеркивания и тире').show();
            hasError = true;
        }

        if (!emailInput.val().match(/^[\w-\.]+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/i)) {
            emailInput.css('border-bottom-color', 'red');
            emailInput.next().text('Email должен быть в формате example@mail.ru').show();
            hasError = true;
        }

        if (!passwordInput.val().match(/^.*(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]){8,}/)) {
            passwordInput.css('border-bottom-color', 'red');
            passwordInput.next().text('Поле Password должно содержать минимум 8 символов, среди которых есть: хотя бы одна буква в верхнем регистре, хотя бы одна цифра, хотя бы один спецсимвол').show();
            hasError = true;
        }

        if (passwordRepeatInput.val() !== passwordInput.val()) {
            passwordRepeatInput.css('border-bottom-color', 'red');
            passwordRepeatInput.next().text('Password и Repeat Password должны совпадать').show();
            hasError = true;
        }

        formInput.each(function (index, element) {
            if (!$(element).val()) {
                $(element).css('border-bottom-color', 'red');
                $(element).next().text('Заполните поле ' + $(element).prev().text()).show();
                hasError = true;
            }
        });

        if (!agreeCheckbox.is(':checked')) {
            agreeCheckbox.next().css('color', 'red');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        let client = {
            fullName: fullNameInput.val(),
            username: usernameInput.val(),
            email: emailInput.val(),
            password: passwordInput.val()
        };

        popup.show();
        let clientsArray = getClients();

        clientsArray.push(client);
        localStorage.setItem('clients', JSON.stringify(clientsArray));
    });

    $('#ok-btn').click(function () {
        popup.hide();
        formInput.val('');
        agreeCheckbox.prop('checked', false);
        pageLogin();
    });

    formLink.on('click', pageLogin);

    function pageLogin() {
        $('.main__title').text('Log in to the system');
        $('#label-full-name').remove();
        $('#label-email').remove();
        $('#label-repeat-pass').remove();
        $('#label-checkbox').remove();
        formLink.text('Registration');
        signUpButton.text('Sign In');

        formLink.unbind().click(() => location.reload());

        signUpButton.unbind().click(function () {
            let hasError = false;
            error.hide();
            formInput.css('border-bottom-color', '#C6C6C4');

            let client = $.grep(getClients(), function(n){
                return n.username === usernameInput.val();
            });

            if (!passwordInput.val()) {
                passwordInput.css('border-bottom-color', 'red');
                passwordInput.next().text('Заполните поле password').show();
                hasError = true;
            }

            if(!client.length) {
                usernameInput.css('border-bottom-color', 'red');
                usernameInput.next().text('Такой пользователь не зарегистрирован').show();
                hasError = true;
            }

            if (!usernameInput.val()) {
                usernameInput.css('border-bottom-color', 'red');
                usernameInput.next().text('Заполните поле username').show();
                hasError = true;
            }

            if (hasError) {
                return;
            }

            if (client[0].password !== passwordInput.val()) {
                passwordInput.css('border-bottom-color', 'red');
                passwordInput.next().text('Неверный пароль').show();
                return;
            }

            personPage(client[0]);
        });
    }

    function personPage(client) {
        $('.main__title').text(`Welcome, ${client.fullName}!`);
        signUpButton.text('Exit');

        signUpButton.unbind().click(() => location.reload());
        $('.main__text').remove();
        formLink.remove();
        $('#label-username').remove();
        $('#label-password').remove();
    }

    function getClients() {
        let clients = localStorage.getItem('clients');
        let clientsArray = [];

        if (clients) {
            clientsArray = JSON.parse(clients);
        }

        return clientsArray;
    }
});