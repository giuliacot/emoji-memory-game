//https://github.com/thedevelobear/react-rewards -> adds for a fancy effects on Button

const emojiBucket = ['🐙','🦑','🦐','🐥','🐲','🐈','🦃','🦒','🐪','🦔','🌕','🐋','🦋','🐸','🐔','🦊','🐹','🍙','🍤','🍇','🍔','🍅','🍊',
                     '🌶','🦖','🦕','🦎','🐍','🌿','🐛','🐒','🐦','🦂','🍒','🍁','🌹','🦉','🌵','🎄','🌲','🌳','🌴','🎋','🍀','☘','🐢','🍃','🌾','🍏','🍐','🥦',
                     '💐','🌷','🌸','🥒','🥗','🌎','🕊','🐊','🦜','🥨','🍱','🥝','🥑','🍭'];

function isEmpty(array) {
  return array === undefined || array.length  === 0 || array === null
}

function generateRandomNum(limit) {
  return Math.floor(Math.random() * Math.floor(limit));
}

function getUnusedEmoji (index, usedEmoji, length) {
  if(!isEmpty(usedEmoji)) {
    console.log(usedEmoji.includes(index))
    while(usedEmoji.includes(index)){
      index = generateRandomNum(length); //
    } 
  } else {
    usedEmoji.push(index);
  }
  return {index, usedEmoji};
}

function createDeck(num, deck = [], emoji = emojiBucket) {
  let used = []
  let deckMould = new Array(Math.floor((num / 2))).fill(null)

  let halfDeck = deckMould.map((item) => {
    let i = generateRandomNum(emoji.length) //
    let {index, usedEmoji} = getUnusedEmoji(i, used, emoji.length)
    used = [...usedEmoji, i];
    return item = emoji[index];
  });

  return [...halfDeck, ...halfDeck]
};

function shuffleDeck(deck) {
  let deckLength = deck.length;
  for(let i = 0 ; i < deckLength; i++) {
    let j = generateRandomNum(i)
    let a = deck[i];
    let b = deck[j];
    deck[i] = b;
    deck[j] = a;
  }
  return deck;
}


function resetViewedCards(items) {
  items.forEach(item => {
    let position = item.getAttribute('data-position')
    if (!item.getAttribute('data-matched')) {
      item.setAttribute('class', `square-${position}`)
    }
  })
}

function resetAllBoard() {
  
  Array.from(document.querySelectorAll('[class^=square]')).forEach(item => {
    item.classList.remove('isShowed');
    item.removeAttribute('data-matched');
  })
  
}

function isEmojiMatch(items) {
  return items.reduce( (final, current) => { 
     if (final.length > 0) {
        console.log('The previous', final[0].innerText, 'the actual',  current.innerText, '\n',final[0].getAttribute('data-position'), current.getAttribute('data-position'))
        if (final[0].getAttribute('data-position') !== current.getAttribute('data-position') &&
            final[0].innerText.codePointAt(0) === current.innerText.codePointAt(0) && 
            !final[0].getAttribute('data-matched') && !current.getAttribute('data-matched')) {      
          return final = [...final, current];
        } else {
          return final
        }
     } else {
       return [current]
     }
  }, [])
}

function resetBoard(items, second = 0.5) {
  setTimeout(() => {
    resetViewedCards(items)
  }, second * 1000)
}

function settingWowMsg(missingToVictory) {
  // Show msg to match 
  let wowMsg = document.getElementById('wowMsg')
  wowMsg.classList.add('isMatched');
  let rotation = generateRandomNum(30)
  wowMsg.style.setProperty("--rotateWowMsg", `${missingToVictory % 3  === 0 ? '-' : '+'}${rotation}deg`);
}



// Missing how many cards to win? 

// TODO - Reset everything when the user change the board 
// TODO - How many attemps? - put on the state
// Timer 

const defaultBoardSize = 4;

export default (state = {
  rows: defaultBoardSize, 
  columns: defaultBoardSize,
  cards: [...createDeck((defaultBoardSize * defaultBoardSize))],
  viewedEmoji: [],
  missingToTheVictory: defaultBoardSize * defaultBoardSize,
  onClick: (e) => { console.log('Not setted onClick', e)}
}, action) => {
  
  switch(action.type) {
    case 'SETBOARD':
      let newRows = (typeof action.rows !== 'undefined' ? action.rows : state.rows);
      let newColumns = (typeof action.columns !== 'undefined' ? action.columns : state.columns);
      let deck = createDeck((newRows * newColumns))
      
      resetAllBoard()
      
      return {
        rows : newRows,
        columns: newColumns,
        cards: shuffleDeck(deck),
        onClick: state.onClick,
        missingToTheVictory: newRows * newColumns,
        viewedEmoji: state.viewedEmoji
      }
    case 'VIEWCARD':
      console.log('New ViewCard', action.el, state.viewedEmoji)
      
      // show Clicked Card
      action.el.className += ' isShowed'
      
      let isAMatch = false;
      
      let currentElements = [...state.viewedEmoji, action.el]
      
      if(currentElements.length === 2) {
        if(isEmojiMatch(currentElements).length > 1) {
          console.log('\nIt\'s a match\n', state)
          
          settingWowMsg(state.missingToVictory);
         
          isAMatch = true;
          
          isEmojiMatch(currentElements).forEach(item => item.setAttribute('data-matched', 'true'))
          
          // check if the user won
          setTimeout(() => {
            if (state.missingToTheVictory === 2) {
              window.alert('Hai vinto ✨')
            }
          }, 100)
          
        } else {
          resetBoard(currentElements, 1.5)
          state.viewedEmoji = []
        }
      } else {
        resetBoard(currentElements, 1.5)
        setTimeout(() => document.getElementById('wowMsg').classList.remove('isMatched'), 2000);
      }
        
      return {
        rows: state.rows,
        columns: state.columns,
        cards: state.cards,
        onClick: state.onClick,
        missingToTheVictory: isAMatch ? state.missingToTheVictory - 2 : state.missingToTheVictory,
        viewedEmoji: currentElements.length === 2 ? [] : [...state.viewedEmoji, action.el]
      }
    case 'STARTTIMER':
      return state
    default:
      return state
  }
};
