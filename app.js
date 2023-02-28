class Cards{
    async init(){
        let deckId = await axios.get('https://deckofcardsapi.com/api/deck/new')
        this.deckId = deckId.data.deck_id
        console.log(deckId.data.deck_id)

        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`)
        console.log(res)
    }

    async drawCard(){
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);

        let cardValue = JSON.stringify(res.data.cards[0].value)
        let cardSuit = JSON.stringify(res.data.cards[0].suit)
        console.log(`${cardSuit}: ${cardValue}`)
        
        let cardImage = JSON.stringify(res.data.cards[0].image)
        console.log(cardImage)
        return cardImage 
    }
}


const drawBtn = document.querySelector('.start-btn');
const newDeck = new Cards
const cardDiv = document.querySelector('.drawn-card');
let cardImage = document.createElement('img')
newDeck.init()
drawBtn.addEventListener('click', async function(){
    cardDiv.style.backgroundImage = `url(${await newDeck.drawCard()})`
    
})
