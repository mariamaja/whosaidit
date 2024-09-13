const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'love is giving something you dont have to someone who doesnt want it',
    answers: [
      { text: 'jacques lacan', correct: true },
      { text: 'paulo coelho', correct: false },
      { text: 'that is not love, that is barking at the wrong tree', correct: true }
    ]
  },
  {
    question: 'the madman is not only a beggar who thinks he is a king, but also a king who thinks he is a king',
    answers: [
        { text: 'jacques lacan', correct: true },
        { text: 'paulo coelho', correct: false }
    ]
  },
  {
    question: 'wenn der geliebte mensch sich zu sehr selbst betrügt und sich in der täuschung seiner selbst verliert, folgt die liebe nicht mehr.',
    answers: [
      { text: 'no', correct: false },
      { text: 'jacques lacan', correct: true },
      { text: 'paulo coelho', correct: false },
      { text: 'yes', correct: true }
    ]
  },
  {
    question: 'the humility of a warrior is not the same humility as that of a servile man. The warrior does not lower his head to anyone, and nor does he allow anyone to bow before him. The servile man, on the other hand, kneels before anyone he believes to be more powerful, and demands that the people under his command behave in a similar fashion before him',
    answers: [
      { text: 'jacques lacan', correct: false },
      { text: 'paulo coelho', correct: true }
    ]
  }
]