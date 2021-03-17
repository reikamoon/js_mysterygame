const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const nameElement = document.getElementById('name')
const portrait = document.getElementById('portrait')
const photo = document.getElementById('photo')

let state = {}

// Variables used in game
//Ending Points
let score = 0
// Friendship with suspects
let ValeriaRP = 0
let DanteRP = 0
let VivianRP = 0
let OskarRP = 0

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  nameElement.innerText = textNode.name
  portrait.src = textNode.portrait
  if (textNode.photo) {
     photo.src = textNode.photo
  }
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
  if (option.score) {
    modScore(option.score)
  }
  const nextTextNodeId = option.nextText
  if (nextTextNodeId == 35) {
      if(score >= 30) {
          nextTextNodeId = 8
      }
      else {
          nextTextNodeId = 9
      }
  }
  
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

///Scorekeeping

function modScore(number) {
    score += number
}

function modValeriaRP(number) {
    ValeriaRP += number
}

const textNodes = [

  {
    id: 1,
    name: "???",
    text: "Oh, you're finally awake.",
    portrait: "/assets/busts/Valeria/Valeria.png",
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
    text: "Goodness, you must've hit your head hard...",
    portrait: "/assets/busts/Valeria/ValeriaSad.png",
    options: [
      {
        text: "Next",
        nextText: 3
      },
      {
        text: 'Back',
        nextText: 1
      }
    ]
  },

  {
    id: 3,
    name: "Valeria",
    text: "My name is Valeria. I am a friend of your father's, and you're currently in my living room. You...had an accident.",
    portrait: "/assets/busts/Valeria/ValeriaHappy3.png",
    options: [
      {
        text: "An accident?",
        nextText: 4
      },
      {
        text: 'My Father? Where is he?',
        nextText: 5
      }
    ]
  },

  {
    id: 4,
    name: "Valeria",
    text: "Yes...judging by that puzzled look, I think you may have some sort of retrograde amnesia...but I'm no doctor. I found you unconscious in the dining room. I am unsure of what had happened before that.",
    portrait: "/assets/busts/Valeria/ValeriaHappy3.png",
    options: [
      {
        text: "So why am I here?",
        nextText: 6
      },
      {
        text: 'What about my Father?',
        nextText: 5
      }
    ]
  },

  {
    id: 5,
    name: "Valeria",
    text: "Your father and I have known each other since before you were born. He went off to look for a doctor after we found you unconscious in the dining room. He should be returning soon.",
    portrait: "/assets/busts/Valeria/Valeria.png",
    options: [
      {
        text: "So why am I here?",
        nextText: 6
      },
      {
        text: "What was I doing before my accident?",
        nextText: 6
      }
    ]
  },

  {
    id: 6,
    name: "Valeria",
    text: "...",
    portrait: "/assets/busts/Valeria/ValeriaSad2.png",
    options: [
      {
        text: "Are you alright?",
        score: 2,
        nextText: 7
      },
      {
        text: "Look, just say it already. Don't hide things from me.",
        score: -2,
        nextText: 7
      }
    ]
  },

  {
    id: 7,
    name: "Valeria",
    text: "My apologies...but it is a bit much to explain.",
    portrait: "/assets/busts/Valeria/ValeriaThinking.png",
    options: [
      {
        text: "Go on...",
        score: 2,
        nextText: 8
      },
      {
        text: "Make it quick, then.",
        score: -2,
        nextText: 8
      }
    ]
  },

   {
    id: 8,
    name: "Valeria",
    text: "I invited you and your father to my home for a dinner party. Cliché, I know...but we were celebrating a friend of mine's victory in an esteemed art competition.",
    portrait: "/assets/busts/Valeria/ValeriaSad.png",
    options: [
      {
        text: "About your friend...",
        nextText: 9
      },
      {
        text: "Art competition?",
        nextText: 10
      }
    ]
  },

   {
    id: 9,
    name: "Valeria",
    text: "Yes. My dear friend, Arius...he is no longer with us, I'm afraid. He was murdered...",
    portrait: "/assets/busts/Valeria/ValeriaSad2.png",
    photo: "/assets/busts/Arius/AriusPortraitBW.png",
    options: [
      {
        text: "Murdered? Did they catch the killer?",
        score: 1,
        nextText: 7
      },
      {
        text: "I'm sorry for your loss.",
        score: 2,
        nextText: 7
      }
    ]
  },

]

startGame()