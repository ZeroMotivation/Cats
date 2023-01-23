const addBtn = document.querySelector('.add-button');
const popup = document.querySelector('.add-form');
const closeBtn = document.querySelector('.close-button');
const cards = document.querySelector('.cards__container');
const submitBtn = document.querySelector('.submit-button');

const form = document.forms.cats;
const inputs = form.elements;

addBtn.addEventListener('click', () => popup.classList.toggle('active'));

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
});

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    let newCat = {};

    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].name !== 'submit-button') {
            newCat[inputs[i].name] = inputs[i].value;
        }
        if(inputs[i].type === 'checkbox') {
            newCat[inputs[i].name] = inputs[i].checked;
        }
    }
    cats.push(newCat);
    let card = `<div class="cat-card">
    <img src="${cats[cats.length - 1].img_link}" alt="" class="card-img">
    <i class="fa-sharp fa-solid fa-heart ${cats[cats.length - 1].favourite ? "active" : "inactive"}"></i>
    <div class="cat-card__content">
        <p class="cat-name">${cats[cats.length - 1].name}</p>
        <i class="fa-sharp fa-solid fa-magnifying-glass-plus inactive"></i>
    </div>
    </div>`;
    cards.innerHTML += card;
    popup.classList.toggle('active');
})

cats.forEach((cat) => {
    let card = `<div class="cat-card">
                    <img src="${cat.img_link}" alt="" class="card-img">
                    <i class="fa-sharp fa-solid fa-heart ${cat.favourite ? "active" : "inactive"}"></i>
                    <div class="cat-card__content">
                        <p class="cat-name">${cat.name}</p>
                        <i class="fa-sharp fa-solid fa-magnifying-glass-plus inactive"></i>
                    </div>
                </div>`;
    cards.innerHTML += card;
})

console.log(cats);