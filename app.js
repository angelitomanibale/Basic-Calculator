const calculator = {
    run(){
        this.cached()
        this.preassign()
        this.bind()
    },

    cached(){
        topscreen = document.querySelector("#topscreen")
        lowerscreen = document.querySelector("#lowerscreen")
        operatorscreen = document.querySelector("#operatorscreen")
        buttons = document.querySelectorAll(".btn")
        number_buttons = document.querySelectorAll(".numberBtn")
        operator_buttons = document.querySelectorAll(".operatorBtn")
        dot_button = buttons[14]
        erase_button =buttons[16]
        clearall_button = buttons[17]
        equal_button = buttons[18]
    },
    preassign(){
        number_array = []
    },

    bind(){
        equal_button.addEventListener("click", this.equals)
        dot_button.addEventListener("click", this.dot_check)
        clearall_button.addEventListener("click", this.clearall)
        erase_button.addEventListener("click", this.erase)
        for( var index = 0; index < number_buttons.length; index++){
            number_buttons[index].addEventListener("click", this.input)
            if(index <4){
                operator_buttons[index].addEventListener("click", this.screen_check)   
                operator_buttons[index].addEventListener("click", this.get)   
            }
        }
    },

    // general functions // 

    input(event){
        number  = event.target.innerText
        number_array.push(number)
        if(!topscreen.innerText&&!operatorscreen.innerText){
            lowerscreen.insertAdjacentHTML("beforeend", `<span>${number}</span>`)
        }
        if(topscreen.innerText&&operatorscreen.innerText){
            lowerscreen.insertAdjacentHTML("beforeend", `<span>${number}</span>`)
        }
        if(topscreen.innerText&&!operatorscreen.innerText&&!lowerscreen.innerText){
            alert("select a operator first")
        }
    },

    input_operator(operator){
        operatorscreen.innerText = operator
    },

    dot_check(event){
        dot = event.target.innerText
        if(!number_array.includes(".")){
            number_array.push(dot)
            lowerscreen.insertAdjacentHTML("beforeend", `<span>${dot}</span>`)
        }
    },

    erase(){
        lowerscreen.lastChild.remove()
    },

    clearall(){
        lowerscreen.innerText = null
        topscreen.innerText = null
        operatorscreen.innerText = null
    },

    equals(){
        operator_sign = operatorscreen.innerText
        calculator.get_values(operator_sign)
        calculator.clear_operator()
    },

    // checks // 

    screen_check(event){
        operator = event.target.innerText
        if(lowerscreen.innerText&&!topscreen.innerText&&!operatorscreen.innerText){
            calculator.operator_check(operator)
            calculator.lowerscreen_clear(lowerscreen.innerText)
        }
        if(lowerscreen.innerText&&topscreen.innerText&&operatorscreen.innerText){
            calculator.get_values(operator)
            calculator.clear_operator()
        }
        if(topscreen.innerText&&!lowerscreen.innerText&&!operatorscreen.innerText){
            calculator.operator_check(operator)
        }
        if(topscreen.innerText&&operatorscreen.innerText&&!lowerscreen.innerText){
            calculator.input_operator(operator)
        }
    },

    operator_check(operator){
        if(!operatorscreen.innerText){
            calculator.input_operator(operator)
        }
    },

    lowerscreen_clear(text){
        topscreen.innerText = text.replace("+", "").replace("-", "").replace("×", "").replace("÷", "")
        lowerscreen.innerText = ""
    },

    clear_screens(){
        topscreen.innerText = ""
        lowerscreen.innerText = ""
    },

    get_values(operator){
        top_value = parseFloat(topscreen.innerText)
        bottom_value =  parseFloat(lowerscreen.innerText.replace("+", "").replace("-", "").replace("×", "").replace("÷", ""))
        calculator.calculate(operator, top_value, bottom_value)
    },

    calculate(operator, top_value, bottom_value){
        switch (operator) {
            case "+":
                calculator.clear_screens()
                topscreen.innerText = top_value + bottom_value
            break;
            case "-":
                calculator.clear_screens()
                topscreen.innerText = top_value - bottom_value
            break;
            case "×":
                calculator.clear_screens()
                topscreen.innerText = top_value * bottom_value
            break;
            case "÷":
                if(bottom_value == 0){
                    topscreen.innerText = "zero is a invalid divisor"
                }
                if(bottom_value > 0){
                    calculator.clear_screens()
                    topscreen.innerText = top_value / bottom_value
                }
            break;
        }
    },

    clear_operator(){
        operatorscreen.innerText = null
    }


}

calculator.run()

