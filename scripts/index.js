
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
     this.contador = 1;
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
        this.activities = this.activities.filter(activity => activity.id !== parseInt(id));
        
    }    
}
//*********** Main Repository instance ***************
const newRepo = new Repository();


//********** Create a card ************ */

function createCard({id, title, description, imgUrl}) {
    //?/ node references
    const cardContainer = document.createElement('div');    
    const cardTitle = document.createElement('h3');    
    const cardDescription = document.createElement('p');    
    const imageContainer = document.createElement('div');
    const cardImage = document.createElement('img');
    const idHidden = document.createElement('input');
    const checkbox = document.createElement('input');
    idHidden.type = 'hidden';
    idHidden.value = '';
    
    //?/ class/style/value asignment
    //*cardContainer
    cardContainer.classList.toggle('card');
    //*cardTitle
    cardTitle.textContent = title;
    cardTitle.classList.toggle('card__title');
    //*cardDescription
    cardDescription.textContent = description;
    cardDescription.classList.toggle('card__description');
    //*checkbox
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.style.visibility = 'hidden';
    checkbox.classList.toggle('card-checkbox');
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
    cardContainer.append(cardTitle, imageContainer, cardDescription, checkbox);

    return cardContainer

}


//******** Update card Grid > using createCard() *******/
function updateCards() {
    const cards = document.querySelector('.cards');
    //?/ deletes grid content
    cards.innerHTML = '';
    //?/ returns a new array with card objects
    const allCards = newRepo.getAllActivities().map(activity => createCard({id:activity.id, title:activity.title, description:activity.description, imgUrl:activity.imgUrl}));

    //?/ appends all card nodes in the card container
    allCards.forEach(card => {
        cards.append(card)
    })
}


function renderCards (){
    const inputTitle = document.querySelector('#movie-title');
    const inputDescription = document.querySelector('#movie-description');
    const inputImage = document.querySelector('#poster')

    //?/ usr Input
    const usrTitle = inputTitle.value;
    const usrDescription = inputDescription.value;
    const usrImage = inputImage.value;

    //?/ verify non-empty string values
    if(!usrTitle | !usrDescription | ! usrImage) {
        alert('Complete all three fields mate');
        return
    }
    
    //?/ updates 'database' and renders grid
    newRepo.createActivity(usrTitle, usrDescription, usrImage);
    updateCards();

     //?/ Clears input values
      inputTitle.value = '';
      inputDescription.value = '';
      inputImage.value = '';
  
}



//************** Delete cards *********/

//*? toggle button and display checkboxes
let isManageMode = true;

function toggleManageMode() {
    //?/ toggle buttons
    isManageMode = !isManageMode;
    
    const manageButton = document.querySelector('.manage-btn');
    manageButton.textContent = isManageMode ? 'Manage Collection' : 'Delete Selected';


    if(!isManageMode) {
        //?/ display checkboxes
        const checkboxes = document.querySelectorAll('.card-checkbox');
    
        checkboxes.forEach((checkbox)=>{
            checkbox.style.visibility = 'visible';            
        })

    } else {
        //?/ deletes selected cards
        const checked = document.querySelectorAll('.card-checkbox:checked');
        checked.forEach(checkbox => {
            deleteSelectedCards(checkbox.id);
        })
    } 
}

//?/ identify and delete checked cards + update grid
function deleteSelectedCards() {
    //*reference all checked checkboxes
        const checkedCheckboxes = document.querySelectorAll('.card-checkbox:checked');
        checkedCheckboxes.forEach(checkbox => {
            newRepo.deleteActivity(checkbox.id)
        })
    
        updateCards();
}



//* this function was done with chatGPT in order to pass the Jasmin tests.
function attachEventListeners() {
        const addButton = document.querySelector('.add-btn');
        const manageButton = document.querySelector('.manage-btn');    
        //*add card
        addButton.addEventListener('click', (e) => {
            renderCards();
        });
        //*Manage Collection
          manageButton.addEventListener('click',() => {
            toggleManageMode();    
        })
    

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
