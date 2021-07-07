let str = "Lorem 'ipsum' aren't dolor 'sit' amet can't consectetur";
let rexExp = /\B'|'\B/g;

let strNew = str.replace(rexExp, '"');

console.log(strNew);



let form = document.querySelector('.form');
form.addEventListener('submit', validateForm);


function addColor(input) {
    input.style.borderColor = 'red';
}

function removeColor(input) {
    input.style.borderColor = '';
}

function addMsgErr(input, msg) {
    if (input.nextSibling.className != 'errorMsg') {
        var errorMsg = `<p class='errorMsg'> ${msg}</p>`;
        input.insertAdjacentHTML('afterend', errorMsg);
    }
}

function removeMsgErr(input) {
    if (input.nextSibling.className == 'errorMsg') {
        input.nextSibling.remove();
    }
}


function validateForm(event) {
    event.preventDefault()

    let inputsNotFill = document.querySelectorAll('.need-to-fill');
    inputsNotFill.forEach(input => {
        if (!input.value) {
            console.log(`input is empty`);
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    let name = inputsNotFill[0].value;
    let tel = inputsNotFill[1].value;
    let email = inputsNotFill[2].value;

    let nameRegExp = /^[А-ЯЁ]+$/gi;
    if (!nameRegExp.test(name)) {
        addColor(inputsNotFill[0]);
        addMsgErr(inputsNotFill[0], "Имя должно содержать только буквы русского алфавита.");
    } else {
        removeColor(inputsNotFill[0]);
        removeMsgErr(inputsNotFill[0]);
    }

    let telRegExp = /\+7\(\d{3}\)\d{3}-\d{4}/g;
    if (!telRegExp.test(tel)) {
        addColor(inputsNotFill[1]);
        addMsgErr(inputsNotFill[1], "Телефонный номер должен быть вида +7(000)000-0000.");
    } else {
        removeColor(inputsNotFill[1]);
        removeMsgErr(inputsNotFill[1]);
    }

    let emailRegExp = /\w+[\.\-]?\w+@\w+\.ru/g;

    if (!emailRegExp.test(email)) {
        addColor(inputsNotFill[2]);
        addMsgErr(inputsNotFill[2], "E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.");
    } else {
        removeColor(inputsNotFill[2]);
        removeMsgErr(inputsNotFill[2]);
    }
}