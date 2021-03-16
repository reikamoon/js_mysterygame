const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const nameElement = document.getElementById('name')
const portrait = document.getElementById('portrait')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  nameElement.innerText = textNode.name
  portrait.src = textNode.portrait
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [

  {
    id: 1,
    name: "Vivian",
    text: "Hi!",
    portrait: "/assets/busts/Valeria/Valeria.png",
    options: [
      {
        text: 'Hi',
        nextText: 2
      },
      {
        text: 'Hello',
        nextText: 2
      }
    ]
  },

  {
    id: 2,
    name: "Vivian",
    text: "Hello!",
    portrait: "/assets/busts/Vivian/Vivian.png",
    options: [
      {
        text: "Back",
        nextText: 1
      },
      {
        text: 'Next',
        nextText: 2
      }
    ]
  }

]

startGame()