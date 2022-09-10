//Grab the calculator div element
const calc = document.getElementById('calculator')

//Create a new div for the buttons
const buttonsContainer  = document.createElement('div')

//Give the new div an id
buttonsContainer.id = 'buttons_container'

//Placeholder for the display element
let display = null
let history = []
let historyDisplay = null

//Numerator placeholder
let operandOne = null
let operandTwo = null
let operator = null
let answer = null
let decimalPresent = false

/*
    Generate the display element
*/
const generateDisplay = (calc) => {
    display = document.createElement('input')
    display.type = 'text'
    display.id = 'display'
    // display.enabled = false
    display.contentEditable = true
    display.placeholder = "0.0"
    console.log(display)
    console.log(calc)
    calc.appendChild(display)
}

const generateHistoryDisplay = (calc) =>{
    historyDisplay = document.createElement('div')
    historyDisplay.id = 'history'
    historyDisplay.style.background = 'lightgray'
    historyDisplay.style.overflow = 'scroll'
    historyDisplay.contentEditable = false
    calc.appendChild(historyDisplay)
}

const updateHistoryDisplay = () => {
    historyDisplay.innerHTML = null
    for(let i = 0; i < history.length; i++){
        let newHistoryEntry = document.createElement('div')
        newHistoryEntry.style.clear = 'both'
        if(i == 0){
            newHistoryEntry.style.color = 'green'
        }
        newHistoryEntry.innerText = history[i]
        historyDisplay.appendChild(newHistoryEntry)
    }
}

/*
    Calculate function
*/
const calculate = (num,oper,den) => {
    console.log(`Calculating ${num} ${oper} ${den}`)
    switch(oper){
        case '+':
            return Number.parseFloat(num) + Number.parseFloat(den)
        case '-':
            return num - den
        case '*':
            return num * den
        case '/':
            return num / den
        default:
            'NON OPERATION / ERR' 
    }
}

/*
    Generate the buttons
*/
const generateButtons = () => { 
    //0 - 9 btn
    for(let i = 0; i < 10;i++){
        let newBtn = document.createElement('button')
        newBtn.className = "btn"
        newBtn.id = 'btn_' + i
        newBtn.style.gridArea = 'btn_' + i
        newBtn.textContent = i
        newBtn.onclick = () => {
            display.value += i.toString()
        }
        buttonsContainer.appendChild(newBtn)
    }

    //+/- Button
    const signChangeBtn = document.createElement('button')
    signChangeBtn.className = 'btn'
    signChangeBtn.style.gridArea = "btn_sign"
    signChangeBtn.textContent = '+/-'
    signChangeBtn.onclick = ()=>{   
        let currentValue = Number.parseFloat(display.value)
        display.value = currentValue * -1
    }
    buttonsContainer.appendChild(signChangeBtn)

    //% Button
    const percentButton = document.createElement('button')
    percentButton.className = 'btn'
    percentButton.style.gridArea = 'btn_percent'
    percentButton.textContent = '%'
    percentButton.onclick = () => {
        let currentValue = Number.parseFloat(display.value)
        operandOne = currentValue
        operator = '%'
        display.value = ""
    }
    buttonsContainer.appendChild(percentButton)

    //C Button
    const cButton = document.createElement('button')
    cButton.className = 'btn'
    cButton.style.gridArea = 'btn_c'
    cButton.textContent = 'C'
    cButton.onclick = () => {
        operandOne = null
        operandTwo = null
        operator = null
        answer = null
        display.value = null
        decimalPresent = false
        historyDisplay.innerHTML = null
        history = []
    }
    buttonsContainer.appendChild(cButton)

    //divide button
    const divideButton = document.createElement('button')
    divideButton.className = 'btn_orange'
    divideButton.style.gridArea = 'btn_div'
    divideButton.textContent = '÷'
    divideButton.onclick = () => {
        if(operandOne != null && operator == null && operandTwo == null){
            operandOne = Number.parseFloat(display.value)
            operator = '/'
            display.value = null
        }else if(operandOne == null && operator == null && operandTwo == null && answer != null){
            operandOne = answer
            answer = null
            operandTwo = null
            operator = '/'
            display.value = null
        }else if(operandOne != null && operator != null && display.value != null && answer == null){
            let historyEntry = `${operandOne} ${operator} ${Number.parseFloat(display.value)}`
            operandOne = calculate(operandOne,operator,Number.parseFloat(display.value))
            historyEntry += ` = ${operandOne}`
            history.unshift(historyEntry)
            updateHistoryDisplay()
            operator = '/'
            display.value = null
        }else if(operandOne == null && operandTwo == null && operator == null && answer == null){
            operandOne = Number.parseFloat(display.value)
            operator = '/'
            display.value = null
        }

        decimalPresent = false
        console.log(operandOne + " " + operator + " " + operandTwo)

    }
    buttonsContainer.appendChild(divideButton)

    //multiply button
    const multButton = document.createElement('button')
    multButton.className = 'btn_orange'
    multButton.style.gridArea = 'btn_x'
    multButton.textContent = '×'
    multButton.onclick = () => {
        if(operandOne == null){
            let currentValue = Number.parseFloat(display.value)
            operandOne = currentValue
            display.value = null
            operator = '*'
        }else if(answer != null){
            operandOne = answer
            operandTwo = 
            operator = '*'
        }
        decimalPresent = false
    }
    buttonsContainer.appendChild(multButton)

    //minus button
    const minusButton = document.createElement('button')
    minusButton.className = 'btn_orange'
    minusButton.style.gridArea = 'btn_min'
    minusButton.textContent = '-'
    minusButton.onclick = () => {
        if(operandOne == null){
            let currentValue = Number.parseFloat(display.value)
            operandOne = currentValue
            display.value = null
            operator = '-'
        }else if(answer != null){
            operandOne = answer
            operator = '-'
        }
        decimalPresent = false
    }
    buttonsContainer.appendChild(minusButton)

    //plus button
    const plusButton = document.createElement('button')
    plusButton.className = 'btn_orange'
    plusButton.style.gridArea = 'btn_plus'
    plusButton.textContent = '+'
    plusButton.onclick = () => {
        if(operandOne == null){
            let currentValue = Number.parseFloat(display.value)
            operandOne = currentValue
            display.value = null
            operator = '+'
        }else if(answer != null){
            operandOne = answer
            operator = '+'
        }
        decimalPresent = false
    }
    buttonsContainer.appendChild(plusButton)


    //decimal button
    const decimalButton = document.createElement('button')
    decimalButton.className = 'btn'
    decimalButton.style.gridArea = 'btn_dec'
    decimalButton.textContent = '.'
    decimalButton.onclick = () => {
        display.value += '.'
        decimalPresent = true
    }
    buttonsContainer.appendChild(decimalButton)


    //equal button
    const equalButton = document.createElement('button')
    equalButton.className = 'btn_orange'
    equalButton.style.gridArea = 'btn_equals'
    equalButton.id = 'btn_equals'
    equalButton.textContent = '='
    equalButton.onclick = () => {
        let currentValue = Number.parseFloat(display.value)
        operandTwo = currentValue
        let historyEntry = `${operandOne} ${operator} ${operandTwo} = `
        answer = calculate(operandOne,operator,operandTwo)
        historyEntry += answer.toString()
        history.unshift(historyEntry)
        updateHistoryDisplay()
        display.value = answer
        decimalPresent = false
        operandOne = null
        operandTwo = null
        operator = null
    }  
    buttonsContainer.appendChild(equalButton)  

}


generateHistoryDisplay(calc)
generateDisplay(calc)
calc.appendChild(buttonsContainer)
generateButtons()
