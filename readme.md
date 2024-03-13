# Страница авторизации

![image](https://github.com/marrina-dm/authorization/assets/149144461/b788c011-0e6b-4a87-bdd0-797c1ddacd87)

Сайт можно посмотреть по ссылке https://marrina-dm.github.io/authorization/

## Макет и ТЗ
Сайт был создан по макету Figma: https://www.figma.com/file/eKWnbxzdFg4fteWU4X7qQw/hw_dom?type=design&t=AFp5SFKhdy0L2tME-6

### 1 страница: Регистрация

Была сделана валидация формы следующим образом:
1. Все поля должны быть заполнены
2. Full Name может содержать только буквы и пробел
3. Your username - может содержать только буквы, цифры, символ подчеркивания и тире
4. Реализовать проверку введенного E-mail на корректность
5. Поле пароля должно содержать минимум 8 символов, среди которых есть:
- хотя бы одна буква в верхнем регистре
- хотя бы одна цифра
- хотя бы один спецсимвол
6. Password и Repeat Password должны совпадать
7. Пользователь должен согласиться с условиями

Если какое-то поле не прошло валидацию, рамка поля становится красной, а под полем появляется текст, поясняющий ошибку. К примеру, «Заполните поле E-mail» или «Full Name может содержать только буквы и пробел». Для проверок использовались регулярные выражения.

После того, как пользователь зарегистрировался, происходят два действия:

1. Появляется модальное окно с текстом «На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию» и кнопкой «ОК».
2. Записываются данные о пользователе в объект, а этот объект, в свою очередь, записывается в массив clients, который хранится в Local Storage. Local Storage хранит данные обо всех зарегистрированных пользователях в виде объектов в массиве clients. То есть когда на сайте регистрируется второй пользователь, данные о первом не должны удаляться.

### 2 страница: Страница входа

При нажатии на ссылку «Already have an account?» или на кнопку «ОК» в модальном окне происходит переход на страницу логина.
В ссылке заменяется текст на «Registration» и слушатель на этой кнопке. Слушатель на кнопке «Sign In» также меняется на другой.

1. При нажатии на ссылку «Registration» страница просто перезагружаться (таким образом имитируется переход на страницу регистрации, потому что при первой загрузке страницы мы попадаем на страницу регистрации).
2. При нажатии на кнопку «Sign In» проверяем, заполнены ли поля Username и Password. Если какое-то поле не заполнено - выводим под ним ошибку и делаем рамку поля красной.
Если оба поля заполнены, то берем значения из полей Username и Password и проверяем, есть ли пользователь с таким логином в массиве clients в Local Storage.
Если пользователь не найден, то рамка поля логина становится красной и под полем выводится текст «Такой пользователь не зарегистрирован».
Если пользователь найден, но пароль не совпадает - то красным подчеркивается поле пароля, и под полем появляется ошибка «Неверный пароль».
Если пользователь найден в массиве clients и его пароль введен верно - то имитируется переход в личный кабинет.

### 3 страница: Личный кабинет

Чтобы имитировать переход в личный кабинет:
1. Текст заголовка заменен на «Welcome, name!», где name - это имя залогиненного пользователя (username).
2. Текст на кнопке «Sign In» заменен на «Exit» и заменен слушатель на этой кнопке: теперь она просто перезагружать страницу, чтобы имитировать выход на страницу регистрации.
3. Все остальные элементы (текст под заголовком, поля Username и Password, ссылку "Registration") были удалены

## Используемые технологии
- HTML
- CSS
- JavaScript
- Flexbox Layout
- jQuery
- регулярные выражения
- Local Storage
