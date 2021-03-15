const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const name = document.getElementById('name')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
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
    name: "Valeria",
    text: "Oh, you're finally awake.",
    portrait: "assets/busts/valeria/valeria.png",
    options: [
      {
        text: 'Who are you?',
        nextText: 2
      },
      {
        text: 'Where am I?',
        nextText: 2
      }
    ]
  },

  {
    id: 2,
    name: "Valeria",
    text: "Oh, dear. You must've hit your head rather hard.",
    portrait: "assets/busts/valeria/valeriasad.png"
    options: [
      {
        text: 'Take the goo',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Leave the goo',
        nextText: 2
      }
    ]
  }

]

startGame()