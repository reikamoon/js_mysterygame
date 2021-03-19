const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const nameElement = document.getElementById('name')
const portrait = document.getElementById('portrait')
const photo = document.getElementById('photo')

let state = {}

// Variables used in game
//Ending Points
let score = 0
//Interrogation Points
let interrogationscore = 0


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

  if (option.interrogationscore) {
    modInterrogationScore(option.interrogationscore)
  }

  var nextTextNodeId = option.nextText
  if (nextTextNodeId == 214) {
      if(interrogationscore == 10) {
          nextTextNodeId = 215
      }
      else {
          nextTextNodeId = 216
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

function modInterrogationScore(number) {
  interrogationscore += number
  window.alert("Current Score: " + interrogationscore)
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

  {
    id: 200,
    name: "Dad",
    text: "Welcome to interrogation mode. This is a snippet of the gameplay for interrogations. I will tell you a story, and make sure you pay attention.",
    portrait: "/assets/busts/Dad/Dad.png",
    options: [
      {
        text: "Ready.",
        nextText: 201
      },
      {
        text: "Back to Menu",
        nextText: 1
      }
    ]
  },

  {
    id: 201,
    name: "Dad",
    text: "There was a crooked man, and he walked a crooked mile. He found a crooked sixpence, and a crooked stile. He bought a crooked cat, which caught a crooked mouse, and they all lived together, in a crooked little house. Did you get that?",
    portrait: "/assets/busts/Dad/DadConfused.png",
    options: [
      {
        text: "Ready.",
        nextText: 202
      },
      {
        text: "Back to Menu",
        nextText: 1
      }
    ]
  },

  {
    id: 202,
    name: "Aurelia",
    text: "I will try to retell the nursery rhyme, and if you see an error, make sure to point it out to get points. If you miss an error, you will lose points.",
    portrait: "/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Ready!",
        nextText: 203
      },
      {
        text: "Back to the Rhyme",
        nextText: 201
      }
    ]
  },

   {
    id: 203,
    name: "Aurelia",
    text: "There was a crooked woman...",
    portrait: "/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: 1,
        nextText: 205
      },
      {
        text: "Truth",
        interrogationscore: -1,
        nextText: 220
      }
    ]
  },

  {
    id: 205,
    name: "Aurelia",
    text: "Me? Wrong? Don't be absurd!",
    portrait: "/assets/busts/Aurelia/AureliaAngry.png",
    options: [
      {
        text: "The crooked man, not woman.",
        interrogationscore: 1,
        nextText: 206
      },
      {
        text: "The malformed man, not crooked.",
        interrogationscore: -1,
        nextText: 206
      }
    ]
  },

  {
    id: 206,
    name: "Aurelia",
    text: "And he walked a crooked mile.",
    portrait: "/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: -1,
        nextText: 221
      },
      {
        text: "Truth",
        interrogationscore: 1,
        nextText: 207
      }
    ]
  },

  {
    id: 207,
    name: "Aurelia",
    text: "He found a crooked sixpence and a crooked stile.",
    portrait: "/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: -1,
        nextText: 222
      },
      {
        text: "Truth",
        interrogationscore: 1,
        nextText: 208
      }
    ]
  },

  {
    id: 208,
    name: "Aurelia",
    text: "He bought a crooked dog, which caught a crooked mouse.",
    portrait: "/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: 1,
        nextText: 209
      },
      {
        text: "Truth",
        interrogationscore: -1,
        nextText: 225
      }
    ]
  },

  {
    id: 209,
    name: "Aurelia",
    text: "Me, wrong? Don't be absurd! Where's your proof?",
    portrait: "/assets/busts/Aurelia/AureliaAngry.png",
    options: [
      {
        text: "He bought a crooked hog.",
        interrogationscore: -1,
        nextText: 210
      },
      {
        text: "He bought a crooked cat.",
        interrogationscore: 1,
        nextText: 210
      }
    ]
  },

  {
    id: 210,
    name: "Aurelia",
    text: "And they all lived together.",
    portrait: "/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: -1,
        nextText: 223
      },
      {
        text: "Truth",
        interrogationscore: 1,
        nextText: 211
      }
    ]
  },

  {
    id: 211,
    name: "Aurelia",
    text: "In a crooked little hows.",
    portrait: "/assets/busts/Aurelia/Aurelia2.png",
    options: [
      {
        text: "Lie",
        interrogationscore: 1,
        nextText: 212
      },
      {
        text: "Truth",
        interrogationscore: -1,
        nextText: 224
      }
    ]
  },

  {
    id: 212,
    name: "Aurelia",
    text: "Me, wrong? Don't be absurd! Where's your proof?",
    portrait: "/assets/busts/Aurelia/AureliaAngry.png",
    options: [
      {
        text: "crooked house.",
        interrogationscore: 1,
        nextText: 213
      },
      {
        text: "crooked hausse.",
        interrogationscore: -1,
        nextText: 1
      }
    ]
  },

  {
    id: 213,
    name: "Aurelia",
    text: "Let's see how well you did. What animal caught what in the poem?",
    portrait: "/assets/busts/Aurelia/AureliaSurprised.png",
    options: [
      {
        text: "The crooked dog caught a crooked mouse.",
        interrogationscore: -1,
        nextText: 214
      },

      {
        text: "The crooked cat caught a crooked rat.",
        interrogationscore: -1,
        nextText: 214
      },

       {
        text: "The crooked cat caught a crooked mouse",
        interrogationscore: 1,
        nextText: 214
      },

      {
        text: "The crooked hamster caught a crooked dog",
        interrogationscore: -1,
        nextText: 214
      },
    ]
  },

  {
    id: 214,
    name: "Something weird",
    text: "Congratulations! A perfect score! Great job! (End of interrogation demo).",
    portrait: "/assets/busts/Aurelia/AureliaSurprised.png",
    options: [
      {
        text: "Restart",
        interrogationscore: -9,
        nextText: 200
      },

      {
        text: "Back to Menu",
        interrogationscore: -9,
        nextText: 1
      },
    ]
  },

  {
    id: 215,
    name: "Aurelia",
    text: "Congratulations! A perfect score! Great job! (End of interrogation demo).",
    portrait: "/assets/busts/Aurelia/AureliaSurprised.png",
    options: [
      {
        text: "Restart",
        interrogationscore: -9,
        nextText: 200
      },

      {
        text: "Back to Menu",
        interrogationscore: -9,
        nextText: 1
      },
    ]
  },

  {
    id: 216,
    name: "Aurelia",
    text: "Oh, dear. Looks like you lost. You need a perfect score in order to win. (End of interrogation demo).",
    portrait: "/assets/busts/Aurelia/AureliaSad2.png",
    options: [
      {
        text: "Restart",
        interrogationscore: 10,
        nextText: 200
      },

      {
        text: "Back to Menu",
        interrogationscore: 10,
        nextText: 1
      },
    ]
  },

  {
    id: 220,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 206
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

  {
    id: 221,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 207
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

  {
    id: 225,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 210
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

  {
    id: 222,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 208
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

  {
    id: 223,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 211
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

   {
    id: 224,
    name: "Aurelia",
    text: "Wrong answer, sorry. I'm never wrong, you know.",
    portrait: "/assets/busts/Aurelia/AureliaAngry2.png",
    options: [
      {
        text: "I'll get it next time...",
        nextText: 213
      },

      {
        text: "Back to Rhyme",
        nextText: 201
      },
    ]
  },

   {
    id: 300,
    name: "Valeria",
    text: "There are exactly 13 characters throughout the game. Care to meet them?",
    portrait: "/assets/busts/Valeria/ValeriaHappy2.png",
    options: [
      {
        text: "Yes",
        nextText: 301
      },

      {
        text: "Back to Menu",
        nextText: 0
      },
    ]
  },

  {
    id: 301,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Valeria",
        nextText: 306
      },

      {
        text: "Dad",
        nextText: 310
      },

      {
        text: "Sam",
        nextText: 314
      },

      {
        text: "More",
        nextText: 302
      },
    ]
  },

  {
    id: 302,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Arius",
        nextText: 318
      },

      {
        text: "Dante",
        nextText: 322
      },

      {
        text: "Katalina",
        nextText: 326
      },

      {
        text: "More",
        nextText: 303
      },
    ]
  },

   {
    id: 303,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Vivian",
        nextText: 330
      },

      {
        text: "Oskar",
        nextText: 334
      },

      {
        text: "Elijah",
        nextText: 338
      },

      {
        text: "More",
        nextText: 304
      },
    ]
  },

  {
    id: 304,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Sabrina",
        nextText: 342
      },

      {
        text: "Lena",
        nextText: 346
      },

      {
        text: "Connor",
        nextText: 350
      },

      {
        text: "More",
        nextText: 305
      },
    ]
  },

  {
    id: 305,
    name: "Valeria",
    text: "Choose who you would like to meet.",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [

      {
        text: "Aurelia",
        nextText: 354
      },

      {
        text: "Back to beginning",
        nextText: 301
      },

      {
        text: "Back to Menu",
        nextText: 1
      },
    ]
  },

   {
    id: 306,
    name: "Valeria",
    text: "My name is Valeria, I am the wife of a wealthy director, and long time friend of your father's.",
    portrait: "/assets/busts/Valeria/Valeria.png",
    options: [
      {
        text: "Special Skills",
        nextText: 307
      },

      {
        text: "Relationships",
        nextText: 308
      },
    ]
  },

  {
    id: 307,
    name: "Valeria",
    text: "My skills? Hmmm...I certainly know how to throw a party, don't you think? It's a shame what happened, though. I also know all my guests rather well...maybe even know some deep dark secrets.",
    portrait: "/assets/busts/Valeria/ValeriaThinking2.png",
    options: [
      {
        text: "Back",
        nextText: 306
      },

      {
        text: "Next",
        nextText: 309
      },
    ]
  },

  {
    id: 308,
    name: "Valeria",
    text: "My relationships? Like I said, I'm a long time friend of your father. Arius is my nephew, through my husband. Aurelia is my dear younger sister. I am well acquainted with Dante and Katalina's family as well. He seems rather rude to others, but he seems very kind and bashful around me. I wonder why?",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [
      {
        text: "Back",
        nextText: 306
      },

      {
        text: "Next",
        nextText: 309
      },
    ]
  },

  {
    id: 309,
    name: "Valeria",
    text: "Would you like to read another entry?",
    portrait: "/assets/busts/Valeria/Valeria4.png",
    options: [
      {
        text: "Back",
        nextText: 300
      },

      {
        text: "Next (Dad)",
        nextText: 310
      },
    ]
  },

  {
    id: 310,
    name: "Dad",
    text: "I am your father. I used to be a pretty big deal back in the day as an artist, but I'm retired now. I just mentor young artists nowadays.",
    portrait: "/assets/busts/Dad/Dad.png",
    options: [
      {
        text: "Special Skills",
        nextText: 311
      },

      {
        text: "Relationships",
        nextText: 312
      },
    ]
  },

  {
    id: 310,
    name: "Dad",
    text: "Sam, I am your father. I used to be a pretty big deal back in the day as an artist, but I'm retired now. I just mentor young artists nowadays.",
    portrait: "/assets/busts/Dad/Dad.png",
    options: [
      {
        text: "Special Skills",
        nextText: 311
      },

      {
        text: "Relationships",
        nextText: 312
      },
    ]
  },

  {
    id: 311,
    name: "Dad",
    text: "Skills? I'm your dad, I can do anything. ...Just kidding. I can make a good barbecue, and um...I know how to discern fake paintings.",
    portrait: "/assets/busts/Dad/Dad.png",
    options: [
      {
        text: "Back",
        nextText: 310
      },

      {
        text: "Next",
        nextText: 313
      },
    ]
  },

  {
    id: 312,
    name: "Dad",
    text: "I'm your father, and Elijah and Arius's mentor. I see them as sons to me. Let's see...I knew Valeria back when she was attempting to make it in the art world. Lena is a journalist that's been hounding me for a bit, and Connor's a bit of a 'stan' of me? Is that how you young people talk?",
    portrait: "/assets/busts/Dad/Dad.png",
    options: [
      {
        text: "Back",
        nextText: 310
      },

      {
        text: "Next",
        nextText: 313
      },
    ]
  },

  {
    id: 313,
    name: "Dad",
    text: "Care to read another entry?",
    portrait: "/assets/busts/Dad/Dad.png",
    options: [
      {
        text: "Back to Entries",
        nextText: 301
      },

      {
        text: "Next (Sam)",
        nextText: 314
      },
    ]
  },

  {
    id: 314,
    name: "Sam [Player]",
    text: "My name is Sam...I don't remember much what happened at the party, but I do know that I was the last person seen with the victim, Arius. I need to prove my innocence before the killer strikes again.",
    portrait: "",
    options: [
      {
        text: "Special Skills",
        nextText: 315
      },

      {
        text: "Relationships",
        nextText: 316
      },
    ]
  },

  {
    id: 315,
    name: "Sam [Player]",
    text: "Skills...I guess I have a close eye to detail. Maybe a little confrontational, but I can try to get along with people, right?",
    portrait: "",
    options: [
      {
        text: "Back",
        nextText: 314
      },

      {
        text: "Next",
        nextText: 317
      },
    ]
  },

  {
    id: 316,
    name: "Sam [Player]",
    text: "Relationships, huh? I have my dad...and I don't remember much else, sorry.",
    portrait: "",
    options: [
      {
        text: "Back",
        nextText: 314
      },

      {
        text: "Next",
        nextText: 317
      },
    ]
  },

  {
    id: 317,
    name: "Sam [Player]",
    text: "Read another entry?",
    portrait: "",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Arius)",
        nextText: 318
      },
    ]
  },

  {
    id: 318,
    name: "Arius",
    text: "Name's Arius. My name means 'immortal', so I'm not dying anytime soon, right?",
    portrait: "/assets/busts/Arius/Arius.png",
    options: [
      {
        text: "Skills",
        nextText: 319
      },

      {
        text: "Relationships",
        nextText: 320
      },
    ]
  },

  {
    id: 319,
    name: "Arius",
    text: "...Art. It's about time people realized how great my art is. No, art styles change consistently, I didn't cheat or anything...",
    portrait: "/assets/busts/Arius/Arius.png",
    options: [
      {
        text: "Back",
        nextText: 318
      },

      {
        text: "Next",
        nextText: 321
      },
    ]
  },

  {
    id: 320,
    name: "Arius",
    text: "Let's see...Auntie Valeria. She married my uncle, who is my dad's brother. Dante and Sabrina are my best friends...when Dante isn't being a complete jerk. Katalina, his sister...it's complicated.",
    portrait: "/assets/busts/Arius/Arius.png",
    options: [
      {
        text: "Back",
        nextText: 318
      },

      {
        text: "Next",
        nextText: 321
      },
    ]
  },

  {
    id: 321,
    name: "Arius",
    text: "Read another entry?",
    portrait: "/assets/busts/Arius/Arius.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Dante)",
        nextText: 322
      },
    ]
  },

  {
    id: 322,
    name: "Dante",
    text: "...What? I'm Dante.",
    portrait: "/assets/busts/Dante/Dante.png",
    options: [
      {
        text: "Skills",
        nextText: 323
      },

      {
        text: "Relationships",
        nextText: 324
      },
    ]
  },

  {
    id: 323,
    name: "Dante",
    text: "My special skills include knowing when to shut up and mind my own business. I'd be happy to mentor you.",
    portrait: "/assets/busts/Dante/DanteConfident.png",
    options: [
      {
        text: "Back",
        nextText: 322
      },

      {
        text: "Next",
        nextText: 325
      },
    ]
  },

  {
    id: 324,
    name: "Dante",
    text: "Relationships? Tch. I have a younger sister, Katalina...I have two flies named Arius and Sabrina that pester me and tell me to play nice. And...Valeria's pretty, isn't she?",
    portrait: "/assets/busts/Dante/DanteHappy.png",
    options: [
      {
        text: "Back",
        nextText: 322
      },

      {
        text: "Next",
        nextText: 325
      },
    ]
  },

  {
    id: 325,
    name: "Dante",
    text: "You wanna read another entry or what?",
    portrait: "/assets/busts/Dante/Dante.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Katalina)",
        nextText: 326
      },
    ]
  },

  {
    id: 326,
    name: "Katalina",
    text: "Um...hi...I'm...Katalina. I'm...studying to be a nurse...",
    portrait: "/assets/busts/Katalina/Katalina.png",
    options: [
      {
        text: "Skills",
        nextText: 327
      },

      {
        text: "Relationships",
        nextText: 328
      },
    ]
  },

  {
    id: 327,
    name: "Katalina",
    text: "I...don't think I'm great. I...I can calm my brother down...I think...",
    portrait: "/assets/busts/Katalina/KatalinaSad.png",
    options: [
      {
        text: "Back",
        nextText: 326
      },

      {
        text: "Next",
        nextText: 329
      },
    ]
  },

  {
    id: 328,
    name: "Katalina",
    text: "My brother...Dante, is very mean...but lucky, to have friends like Arius and Sabrina. Arius...used to be my boyfriend...but he and Dante fought...",
    portrait: "/assets/busts/Katalina/KatalinaHappy.png",
    options: [
      {
        text: "Back",
        nextText: 326
      },

      {
        text: "Next",
        nextText: 329
      },
    ]
  },

  {
    id: 329,
    name: "Katalina",
    text: "Um...did you want to read more?",
    portrait: "/assets/busts/Katalina/Katalina.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Vivian)",
        nextText: 330
      },
    ]
  },

  {
    id: 330,
    name: "Vivian",
    text: "Hiiiii~! I'm Vivian, but call me Vivi or Viva! I'm Oskar's girlfriend, and I won't let ANYONE slander his name!",
    portrait: "/assets/busts/Vivian/VivianHappy2.png",
    options: [
      {
        text: "Skills",
        nextText: 331
      },

      {
        text: "Relationships",
        nextText: 332
      },
    ]
  },

  {
    id: 331,
    name: "Vivian",
    text: "I'm super duper good at being a cheerleader. I cheer on Oskar all the time while he paints! Ain't he the greatest?!",
    portrait: "/assets/busts/Vivian/Vivian.png",
    options: [
      {
        text: "Back",
        nextText: 330
      },

      {
        text: "Next",
        nextText: 333
      },
    ]
  },

  {
    id: 332,
    name: "Vivian",
    text: "I'm Oskar's one and only, y'hear?! Don't get any ideas. I don't care too much for that sourpuss, Dante, I guess. Also, Arius really pisses me off! How dare he steal Oskar's victory?!",
    portrait: "/assets/busts/Vivian/VivianAngry.png",
    options: [
      {
        text: "Back",
        nextText: 330
      },

      {
        text: "Next",
        nextText: 333
      },
    ]
  },

  {
    id: 333,
    name: "Vivian",
    text: "Wanna read another entry?",
    portrait: "/assets/busts/Vivian/Vivian.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Oskar)",
        nextText: 334
      },
    ]
  },

  {
    id: 334,
    name: "Oskar",
    text: "Salutations. I am Oskar. You may have heard of my work as an artist. Please, do not refer to me as a prodigy or genius...it is embarrassing.",
    portrait: "/assets/busts/Oskar/Oskar.png",
    options: [
      {
        text: "Skills",
        nextText: 335
      },

      {
        text: "Relationships",
        nextText: 336
      },
    ]
  },

  {
    id: 335,
    name: "Oskar",
    text: "You are interested in my skillset? I am always happy to help. I did some side work as a police sketch artist before. You can describe anything and I will draw it in less than ten minutes.",
    portrait: "/assets/busts/Oskar/OskarHappy.png",
    options: [
      {
        text: "Back",
        nextText: 334
      },

      {
        text: "Next",
        nextText: 337
      },
    ]
  },

  {
    id: 336,
    name: "Oskar",
    text: "I try to get along with everyone, generally. Vivi is my significant other, but I must admit, she is a tad too overprotective over my wellbeing. I...generally try to avoid Lena. She is rather nosy, even for a journalist. I also admire Elijah's work greatly...and Arius's, I suppose.",
    portrait: "/assets/busts/Oskar/OskarHappy2.png",
    options: [
      {
        text: "Back",
        nextText: 334
      },

      {
        text: "Next",
        nextText: 337
      },
    ]
  },

  {
    id: 337,
    name: "Oskar",
    text: "Care to read another entry?",
    portrait: "/assets/busts/Oskar/Oskar.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Elijah)",
        nextText: 338
      },
    ]
  },

  {
    id: 338,
    name: "Elijah",
    text: "Hey, what's up? I'm Elijah. Future big shot in the art industry.",
    portrait: "/assets/busts/Elijah/Elijah.png",
    options: [
      {
        text: "Skills",
        nextText: 339
      },

      {
        text: "Relationships",
        nextText: 340
      },
    ]
  },

  {
    id: 339,
    name: "Elijah",
    text: "Skills, huh? I'm really good at a lot of things, hehe. Maybe I should give you a demo? Just kidding. i guess sculpting is my favorite hobby. I'm trying to make it big as a sculptor.",
    portrait: "/assets/busts/Elijah/ElijahWink2.png",
    options: [
      {
        text: "Back",
        nextText: 338
      },

      {
        text: "Next",
        nextText: 341
      },
    ]
  },

  {
    id: 340,
    name: "Elijah",
    text: "Why, you interested in me? I am single, y'know. But I'm your dad's mentee, so it'd be kinda weird. Plus, I guess Oskar and Arius are rivals of mine in the art industry, but I guess Arius's annoying mug is gone, so guess I gotta take down that egghead, Oskar. ...I'm kidding.",
    portrait: "/assets/busts/Elijah/ElijahHappy2.png",
    options: [
      {
        text: "Back",
        nextText: 338
      },

      {
        text: "Next",
        nextText: 341
      },
    ]
  },

  {
    id: 341,
    name: "Elijah",
    text: "Leaving so soon? You gonna read about someone else to compare them to me? Careful...I'm one of a kind.",
    portrait: "/assets/busts/Elijah/ElijahHappy.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Sabrina)",
        nextText: 342
      },
    ]
  },

  {
    id: 342,
    name: "Sabrina",
    text: "Hiya. I'm Sabrina. I'm currently studying to be a nurse. ...Yeah, like Kat.",
    portrait: "/assets/busts/Sabrina/Sabrina.png",
    options: [
      {
        text: "Skills",
        nextText: 343
      },

      {
        text: "Relationships",
        nextText: 344
      },
    ]
  },

  {
    id: 343,
    name: "Sabrina",
    text: "Skills? Yeah, I got a lot of 'em. I can play guitar, knit, and bake a mean pie. I'm also pretty good with mediating fights. ...I got a lot of experience.",
    portrait: "/assets/busts/Sabrina/SabrinaHappy2.png",
    options: [
      {
        text: "Back",
        nextText: 342
      },

      {
        text: "Next",
        nextText: 345
      },
    ]
  },

  {
    id: 344,
    name: "Sabrina",
    text: "Yeah. I'm supposed to be the bestie to Arius and Dante, but sometimes I feel like I'm their babysitter.Dante is so high strung and Arius often has his head in the clouds. Also, Elijah irritates me to no end. I can't stand flirts like him. I'm glad Ari put him in his place.",
    portrait: "/assets/busts/Sabrina/SabrinaAngry2.png",
    options: [
      {
        text: "Back",
        nextText: 342
      },

      {
        text: "Next",
        nextText: 345
      },
    ]
  },

  {
    id: 345,
    name: "Sabrina",
    text: "All done? Do you wanna read more?",
    portrait: "/assets/busts/Sabrina/Sabrina.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Lena)",
        nextText: 346
      },
    ]
  },

  {
    id: 346,
    name: "Lena",
    text: "Oh, yeah! Jackpot! Hey, I'm Lena, a journalist. Can I ask you some questions about your dad?",
    portrait: "/assets/busts/Lena/LenaHappy2.png",
    options: [
      {
        text: "Skills",
        nextText: 347
      },

      {
        text: "Relationships",
        nextText: 348
      },
    ]
  },

  {
    id: 347,
    name: "Lena",
    text: "I'm something of an investigator myself. I can sniff out clues better than a bloodhound!",
    portrait: "/assets/busts/Lena/Lena.png",
    options: [
      {
        text: "Back",
        nextText: 346
      },

      {
        text: "Next",
        nextText: 349
      },
    ]
  },

  {
    id: 348,
    name: "Lena",
    text: "Sure. Elijah's a buddy of mine. Don't let his honeyed words get to you, he's playing most of the time, I think. But yeah, Elijah's connection with your dad has made it really easy to get in contact with these art types. ",
    portrait: "/assets/busts/Lena/LenaHappy.png",
    options: [
      {
        text: "Back",
        nextText: 346
      },

      {
        text: "Next",
        nextText: 349
      },
    ]
  },

  {
    id: 349,
    name: "Lena",
    text: "Digging up some dirt, huh? Lemme know if you find anything juicy!",
    portrait: "/assets/busts/Lena/LenaHappy.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Connor)",
        nextText: 350
      },
    ]
  },

  {
    id: 350,
    name: "Connor",
    text: "Hey. I'm Connor, I'm 26, and a computer programmer for a tech company. Need something?",
    portrait: "/assets/busts/Connor/Connor.png",
    options: [
      {
        text: "Skills",
        nextText: 351
      },

      {
        text: "Relationships",
        nextText: 352
      },
    ]
  },

  {
    id: 351,
    name: "Connor",
    text: "Python, JavaScript, Java, C++, oh, you meant THOSE kind. Er, I'm really good with computers and tech. Hacking isn't too hard, so if you show me a security camera I might be able to get the footage.",
    portrait: "/assets/busts/Connor/Connor.png",
    options: [
      {
        text: "Back",
        nextText: 350
      },

      {
        text: "Next",
        nextText: 353
      },
    ]
  },

  {
    id: 352,
    name: "Connor",
    text: "I'm a fan of your father's work, and I'm well-acquainted with Valeria. She has commissioned me a lot back when I was a contract web developer.",
    portrait: "/assets/busts/Connor/Connor.png",
    options: [
      {
        text: "Back",
        nextText: 350
      },

      {
        text: "Next",
        nextText: 353
      },
    ]
  },

  {
    id: 353,
    name: "Connor",
    text: "I know, I'm not that interesting...want to read something else?",
    portrait: "/assets/busts/Connor/ConnorSad.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Aurelia)",
        nextText: 354
      },
    ]
  },

  {
    id: 354,
    name: "Aurelia",
    text: "Hello, darling! I'm a pretty big deal in the fashion industry. I have my own high end brand...that I doubt someone like you could afford.",
    portrait: "/assets/busts/Aurelia/Aurelia.png",
    options: [
      {
        text: "Skills",
        nextText: 355
      },

      {
        text: "Relationships",
        nextText: 356
      },
    ]
  },

  {
    id: 355,
    name: "Aurelia",
    text: "I'm really great with crafting cute little disguises. But I don't work for free, you know.",
    portrait: "/assets/busts/Aurelia/AureliaSurprised.png",
    options: [
      {
        text: "Back",
        nextText: 354
      },

      {
        text: "Next",
        nextText: 357
      },
    ]
  },

  {
    id: 356,
    name: "Aurelia",
    text: "Ooh, curious are we? No, honey. I'm single. You're a little young for my taste. My sister is that dim wit Valeria...oh and if you have any eyes on Elijah...I advise you not.",
    portrait: "/assets/busts/Aurelia/AureliaSurprised.png",
    options: [
      {
        text: "Back",
        nextText: 354
      },

      {
        text: "Next",
        nextText: 357
      },
    ]
  },

  {
    id: 357,
    name: "Aurelia",
    text: "What, am I not interesting enough for you? You want to read about someone else?",
    portrait: "/assets/busts/Aurelia/AureliaAngry.png",
    options: [
      {
        text: "Back",
        nextText: 301
      },

      {
        text: "Next (Valeria)",
        nextText: 306
      },
    ]
  },







  {
    id: 400,
    name: "Dante",
    text: "This is an example Freetime Event. What do you want?",
    portrait: "/assets/busts/Dante/Dante.png",
    options: [

      {
        text: "Talk",
        nextText: 401
      },

      {
        text: "Show",
        nextText: 400
      },

      {
        text: "Back to Menu",
        nextText: 1
      },

      {
        text: "Trivia",
        nextText: 400
      },
    ]
  },

   {
    id: 401,
    name: "Dante",
    text: "What do you want to talk about?",
    portrait: "/assets/busts/Dante/Dante.png",
    options: [

      {
        text: "The murder.",
        nextText: 402
      },

      {
        text: "How are you faring?",
        nextText: 400
      },
    ]
  },

  

]

startGame()