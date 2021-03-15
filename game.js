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
    portrait: "assets/busts/Valeria/Valeria.png",
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
    text: "Oh, dear. You must've hit your head rather hard. My name is Valeria. I am a friend of your father's. This is my home. You were knocked unconscious for quite sometime.",
    portrait: "assets/busts/Valeria/ValeriaSad.png",
    options: [
      {
        text: "...Knocked unconscious?",
        nextText: 2
      },
      {
        text: 'My father...?',
        nextText: 2
      }
    ]
  }

]

startGame()