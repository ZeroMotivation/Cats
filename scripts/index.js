const addBtn = document.querySelector('.add-button');
const popup = document.querySelector('.add-form');
const closeBtn = document.querySelector('.close-button');
const cards = document.querySelector('.cards__container');

const form = document.forms.cats;
const inputs = form.elements;

const createCard = (cat) => {
    return `<div class="cat-card">
                <img src="${cat.img_link}" alt="" class="card-img">
                <i class="fa-sharp fa-solid fa-heart ${cat.favourite ? "active" : "inactive"}"></i>
                <div class="cat-card__content">
                    <p class="cat-name">${cat.name}</p>
                    <i class="fa-sharp fa-solid fa-magnifying-glass-plus inactive"></i>
                </div>
            </div>`
} 

addBtn.addEventListener('click', () => popup.classList.toggle('active'));

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
});

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    let newCat = {};

    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].name !== 'submit') {
            newCat[inputs[i].name] = inputs[i].value;
            inputs[i].value = '';
        }
        if(inputs[i].type === 'checkbox') {
            newCat[inputs[i].name] = inputs[i].checked;
        }
    }

    cats.push(newCat);

    const lastCat = cats[cats.length - 1];

    let card = createCard(lastCat);
    cards.innerHTML += card;

    popup.classList.remove('active');
})

cats.forEach((cat) => {
    let card = createCard(cat);
    cards.innerHTML += card;
})
