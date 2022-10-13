// const { event } = require("jquery");

document.addEventListener("DOMContentLoaded", function () {
    var eventCalllback = function (e) {
        var el = e.target,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7(___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }
});


 //модалка калькулятора
 const buttonElem = document.querySelector('.calc');
 const modalElem = document.querySelector('.calculator__modal');

 modalElem.style.cssText = `
display:flex;
visibility: hidden;
opacity: 0;
transition: opacity 300ms ease;
`;

 const closeModal = event => {
     const target = event.target;

     if (target === modalElem || target.closest('.calculator__close')) {
         modalElem.style.opacity = 0;

         setTimeout(() => {
             modalElem.style.visibility = 'hidden';
         }, 300)
     }
 }

 const openModal = () => {
     modalElem.style.visibility = 'visible';
     modalElem.style.opacity = 1;
 };

 buttonElem.addEventListener('click', openModal);
 modalElem.addEventListener('click', closeModal);

 //  end модалка калькулятора


 // калькулятор
 let a = ''; // first number
 let b = ''; // secont number
 let sign = ''; // знак операции
 let finish = false;

 const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
 const action = ['-', '+', 'X', '/'];

 // экран 
 const out = document.querySelector('.calc-screen p');

 function clearAll() {
     a = ''; // first number and result
     b = ''; // second number 
     sign = ''; // знак
     finish = false;
     out.textContent = 0;
 }

 document.querySelector('.ac').addEventListener = clearAll;

 document.querySelector('.calc-buttons').addEventListener = (event) => {
     // нажата не кнопка
     if (!event.target.classList.contains('calc-btn')) return;
     // нажата кнопка clearAll ac
     if (event.target.classList.contains('ac')) return;

     out.textContent = '';
     // получаю нажатую кнопку
     const key = event.target.textContent;

     // если нажата клавиша 0-9 или .
     if (digit.includes(key)) {
         if (b === '' && sign === '') {
             a += key;

             out.textContent = a;
         }
         else if (a !== '' && b !== '' && finish) {
             b = key;
             finish = false;
             out.textContent = b;
         }
         else {
             b += key;
             out.textContent = b;
         }
         console.table(a, b, sign);
         return;
     }
     // если нажата клавиша + - / *
     if (action.includes(key)) {
         sign = key;
         out.textContent = sign;
         console.table(a, b, sign);
         return;
     }

     // нажата =
     if (key === '=') {
         if (b === '') b = a;
         switch (sign) {
             case "+":
                 a = (+a) + (+b);
                 break;
             case "-":
                 a = a - b;
                 break;
             case "X":
                 a = a * b;
                 break;
             case "/":
                 if (b === '0') {
                     out.textContent = 'Ошибка';
                     a = '';
                     b = '';
                     sign = '';
                     return;
                 }
                 a = a / b;
                 break;
         }
         finish = true;
         out.textContent = a;
         console.table(a, b, sign);
     }

 }



