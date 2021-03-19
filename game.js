const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const nameElement = document.getElementById('name')
const portrait = document.getElementById('portrait')
const photo = document.getElementById('photo')

let state = {}

// Variables used in game
//Ending Points
let score = 0


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
    window.alert("Current Score: " + number)
}


const textNodes = [

  {
    id: 1,
    name: "Valeria",
    text: "Welcome! Please select one of the below choices to get started.",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [
      {
        text: 'Prologue',
        nextText: 100
      },

      {
        text: 'Interrogation',
        nextText: 200
      },

       {
        text: 'Meet the Cast',
        nextText: 300
      },

       {
        text: 'Freetime',
        nextText: 400
      }
    ]
  },

    {
    id: 100,
    name: "???",
    text: "Oh, I see you're awake now. How are you feeling, Sam?",
    portrait: "/assets/busts/Valeria/ValeriaSad.png",
    options: [
      {
        text: 'Who are you?',
        nextText: 101
      },
      {
        text: 'What happened?',
        nextText: 101
      }
    ]
  },

  {
    id: 101,
    name: "???",
    text: "It's alright, calm down. My name is Valeria, I am an old friend of your father's. You are in my home, I invited you and your father here for a dinner party. Alas, you had an...accident.",
    portrait: "/assets/busts/Valeria/ValeriaSad.png",
    options: [
      {
        text: 'An accident?',
        nextText: 102
      },
      {
        text: 'Where is my father?',
        nextText: 103
      }
    ]
  },

  {
    id: 102,
    name: "Valeria",
    text: "Yes. You hit your head in the dining room, and were asleep for a while. The puzzled look on your face may suggest retrograde amnesia...but I'm no doctor. I hope your memories return soon, you were our key witness.",
    portrait: "/assets/busts/Valeria/Valeria3.png",
    options: [
      {
        text: 'Key witness?',
        nextText: 104
      },
      {
        text: 'Where is my father?',
        nextText: 103
      }
    ]
  },

  {
    id: 103,
    name: "Valeria",
    text: "Oh, you mustn't worry your little bandaged head, Sammy. Your father is with the others right now, in the den. It's best we have everyone in one room, considering there's a murderer on the loose. ",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [
      {
        text: 'Murderer?!',
        nextText: 104
      },
      {
        text: 'What happened to my head?',
        nextText: 102
      }
    ]
  },

  {
    id: 104,
    name: "Valeria",
    text: "Ah, yes. I won't beat around the bush: our guest of honor, Arius, has been murdered in the kitchen. You were the last person with Arius before he died.",
    portrait: "/assets/busts/Valeria/ValeriaSad2.png",
    options: [
      {
        text: 'Can you tell me more details about the murder?',
        nextText: 105
      },
      {
        text: 'Can you tell me about Arius?',
        nextText: 106
      }
    ]
  },

  {
    id: 105,
    name: "Valeria",
    text: "Certainly. Arius was murdered with a kitchen knife, and left bleeding on the kitchen floor. I believe it was one stab to the chest. Again, you were the last one with Arius before he died.I don't believe you did it, but the others...",
    portrait: "/assets/busts/Valeria/ValeriaThinking.png",
    photo: "/assets/busts/Arius/AriusPortraitBW.png",
    options: [
      {
        text: 'The others?',
        nextText: 107
      },
      {
        text: 'Who was Arius?',
        nextText: 106
      }
    ]
  },

  {
    id: 106,
    name: "Valeria",
    text: "Arius...he was your father's protégé. We were celebrating his very first art competition victory after several losses. It's such a tragedy...his luck has run dry.",
    portrait: "/assets/busts/Valeria/ValeriaSad2.png",
    photo: "/assets/busts/Arius/AriusPortraitBW.png",
    options: [
      {
        text: 'Any other information on his murder?',
        nextText: 105
      },
      {
        text: 'Any suspects?',
        nextText: 107
      }
    ]
  },

  {
    id: 107,
    name: "???",
    text: "Valeria, Sam, is everything alright in there?",
    portrait: "/assets/busts/Valeria/Valeria2.png",
    photo: "None",
    options: [
      {
        text: '(Answer politely)',
        score: 2,
        nextText: 108
      },
      {
        text: '(Ignore)',
        score: -2,
        nextText: 109
      }
    ]
  },

  {
    id: 108,
    name: "???",
    text: "Thank god you're alright, Valeria. It's good to see you're awake, Sam. You've got a lot to answer for.",
    portrait: "/assets/busts/Dante/DanteAnnoyed.png",
    options: [
      {
        text: 'Who are you?',
        nextText: 110
      },
      {
        text: 'Answer for?',
        nextText: 111
      }
    ]
  },

  {
    id: 109,
    name: "???",
    text: "Valeria! Thank god you're alright. It was so quiet in here...I had thought Sam gutted you as well. You've got a lot of nerve, Sam. I'll personally make sure you answer for your crimes!",
    portrait: "/assets/busts/Dante/DanteAngry2.png",
    photo: "None",
    options: [
      {
        text: 'Who are you?',
        nextText: 110
      },
      {
        text: 'My crimes? Sure, I j-walked once...',
        nextText: 111
      }
    ]
  },
  
  {
    id: 110,
    name: "Dante",
    text: "You must've hit your head harder than I thought. But you could easily be playing dumb. It's me, Dante. You know, Katalina's brother, and Arius's friend. You know, the guy your murdered in cold blood. You will pay for what you did. I swear it.",
    portrait: "/assets/busts/Dante/DanteAngry2.png",
    options: [
      {
        text: 'My crimes?',
        nextText: 111
      },
      {
        text: 'Watch your tongue.',
        score: -2,
        nextText: 112
      }
    ]
  },

  {
    id: 112,
    name: "Valeria",
    text: "Dante, stop it! There's no way that Sam killed Arius. Sam is innocent. Sam, you must prove your innocence. I cannot allow the others to slander you like this any further! ",
    portrait: "/assets/busts/Valeria/ValeriaAngry4.png",
    options: [
      {
        text: "Don't worry. I won't let you down.",
        nextText: 113
      },
      {
        text: "I swear I will find the killer.",
        nextText: 113
      }
    ]
  },

  {
    id: 111,
    name: "Dante",
    text: "Don't play stupid. You were the last one with Arius before he died. We found you unconscious in the kitchen with Arius's dead body. It had to be you!",
    portrait: "/assets/busts/Dante/DanteAngry2.png",
    options: [
      {
        text: "I swear I'm not the killer.",
        nextText: 112
      },
      {
        text: "I don't even remember what happened.",
        nextText: 112
      }
    ]
  },

  {
    id: 113,
    name: "Valeria",
    text: "Thank you, Sam. There are 11 possible suspects. (You can read more about the suspects in Meet the Cast on the menu) You must find the killer before they strike again. (Prologue End.)",
    portrait: "/assets/busts/Valeria/ValeriaSad2.png",
    options: [
      {
        text: "Restart the Prologue",
        nextText: 100
      },
      {
        text: "Back to Menu",
        nextText: 1
      }
    ]
  },

]

startGame()