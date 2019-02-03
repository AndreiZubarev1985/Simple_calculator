

// объявляем необходимые переменные
let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear_btn'),
    resultBtn = document.getElementById('result'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
   // новое число, которое будет меняться с течением времени на true or false
   // оно означает ввели мы новое число или нет: 15 + 14(memoryNewNumber = true)
    MemoryNewNumber = false,
    // результат временной операции
    MemoryPendingOperation = ''; 


// получаем кнопки цифр по клику и перебираем их
    for(let i = 0; i < numbers.length; i++) {
    // объявляем переменную одной кнопик, связываем ее 
    // переменной всех кнопок и назначаем обработчик событий
    let number = numbers[i];
    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
}

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function(e) {
        // выводим содержание кнопки, ища его в объекте события, свойстве target
        operation(e.target.textContent);
    });
}

for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function(e) {
        // через объект события узнаем id элемента
        clear(e.srcElement.id);
        
       
    });
}

resultBtn.addEventListener('click', result);

decimalBtn.addEventListener('click', decimal);





function numberPress(number) {
    if(MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if(display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }

   
 
  };

function operation(op) {
    let localOperationMemory = display.value;

    if(MemoryNewNumber && MemoryPendingOperation != '=') {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
            if(MemoryPendingOperation === '+') {
                MemoryCurrentNumber+= parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '-'){
                MemoryCurrentNumber -= parseFloat(localOperationMemory);
            } else if (MemoryPendingOperation === '*') {
                MemoryCurrentNumber *= parseFloat(localOperationMemory);
            }
            else if (MemoryPendingOperation === '/') {
                MemoryCurrentNumber /= parseFloat(localOperationMemory);
            } else {
                 MemoryCurrentNumber = parseFloat(localOperationMemory);
                }
                display.value = MemoryCurrentNumber;
                MemoryPendingOperation = op;
            }


    };


   

function decimal() {
    let localDecimalMemory = display.value;
    if(MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if(localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        };
       
        display.value = localDecimalMemory;

    }
    
};

function clear(id) {
    if(id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
    
  };



