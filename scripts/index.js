
class Activity {
    constructor(id, title, description, imgUrl){
        this.id = id;
        this.title = title,
        this.description = description,
        this.imgUrl = imgUrl
    }
}


class Repository {
    constructor(){
     this.activities = [];   
     this.contador =1;
    }

    getAllActivities(){
        return this.activities
    }

    createActivity(title, description, imgUrl){
        const newActivity = new Activity(this.contador, title, description, imgUrl);
        this.activities.push(newActivity);
        this.contador++
        
    }

    deleteActivity (id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
        
    }

    
}

const newRepo = new Repository();


function createCard({id, title, description, imgUrl}) {
    const cardContainer = document.createElement('div');
    
    const cardTitle = document.createElement('h3');    
    const cardDescription = document.createElement('p');    
    const imageContainer = document.createElement('div');
    const cardImage = document.createElement('img');
    const idHidden = document.createElement('input');
    idHidden.type = 'hidden';
    idHidden.value = '';
    
    //?? class asignment
    //*cardContainer
    cardContainer.classList.toggle('card');
    //*cardTitle
    cardTitle.textContent = title;
    cardTitle.classList.toggle('card__title');
    //*cardDescription
    cardDescription.textContent = description;
    cardDescription.classList.toggle('card__description');
    //*imageContainer
    imageContainer.classList.toggle('image__container');
    //*cardImage
    cardImage.src = imgUrl;
    cardImage.alt = `${title} related image`;
    cardImage.classList.toggle('card__image');
    //*setId
    idHidden.value = id;
    
    //*appending image to imageContainer
    imageContainer.append(cardImage);

    //*appending all in the cardContainer
    cardContainer.append(cardTitle, imageContainer, cardDescription);

    //*appending all into the cards container
    // cards.append(cardTitle, cardImage, cardDescription, idHidden);

    return cardContainer

}



function updateCards() {
    const cards = document.querySelector('.cards');

    cards.innerHTML = '';
    //*returns a new array with card objects
    const allCards = newRepo.getAllActivities().map(activity => createCard({id:activity.id, title:activity.title, description:activity.description, imgUrl:activity.imgUrl}));

    //*appends all card nodes in the card container
    allCards.forEach(card => {
        cards.append(card)
    })

}


function renderCards (){
    const inputTitle = document.querySelector('#movie-title');
    const inputDescription = document.querySelector('#movie-description');
    const inputImage = document.querySelector('#poster')

    //*usr Input
    const usrTitle = inputTitle.value;
    const usrDescription = inputDescription.value;
    const usrImage = inputImage.value;

    //*verify non-empty string
    if(!usrTitle | !usrDescription | ! usrImage) {
        alert('Complete all three fields mate');
        return
    }

    newRepo.createActivity(usrTitle, usrDescription, usrImage);
    updateCards();
     //* Clear input values
      inputTitle.value = '';
      inputDescription.value = '';
      inputImage.value = '';
  
}

//* handler button > this is my original working button + eventListener
//* but it seems that declaring dom references outside a function prevents Jasmin test to run.
//     const addButton = document.querySelector('.add-btn');


// addButton.addEventListener('click', (e)=>{
//     renderCards();
// })


//* this was done with chatGPT in order to pass the Jasmin tests.

// Attach event listener in a separate function to avoid global scope pollution
function attachEventListeners() {
    const addButton = document.querySelector('.add-btn');
    addButton.addEventListener('click', (e) => {
        renderCards();
    });
}

// Export functions and classes if using Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Activity,
        Repository,
        createCard,
        updateCards,
        renderCards,
        attachEventListeners,
    };
} else {
    // If in a browser environment, attach event listeners directly
    attachEventListeners();
}
