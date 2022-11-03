class Calculator { // minhca classe calculadora
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() { // Limpa tudo
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() { // Deletará o ultimo caractere digitado
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  //para eu poder colocar numeros e pontos
  appendNumber(number) { // usado para levar o numero para cima
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  // levará minha operação lá pra cima junto do numero
  chooseOperation(operation) {
    if (this.currentOperand === '') return //Toda vez que eu colocar um numero com um operação com outro numero e clicar em outra operação ele automaticamente já vai executar a operação anterior e me retornar o valor do resultado anterior com a nova operação que eu fiz
    if (this.previousOperand !== '') {//Toda vez que eu colocar um numero com um operação com outro numero e clicar em outra operação ele automaticamente já vai executar a operação anterior e me retornar o valor do resultado anterior com a nova operação que eu fiz
      this.compute() // Esse e o cara que faz
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() { // minhas operações
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  //Retornara meu numero correto no display
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() { // cada vez que eu digito um numero ou operação ele atualizara lá em cima
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

//Declarando minhas constantes
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//meus botões de números
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
//meus botoes de operações
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
//Para computar minhas operações
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})
//Para meu botão de limpar tudo
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
//Para meu botão de deletar os botões
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})