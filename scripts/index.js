const addBtn = document.querySelector('.add-button');
const popup = document.querySelector('.add-form');
const closeBtn = document.querySelector('.close-button');
const cards = document.querySelector('.cards__container');

const form = document.forms.cats;
const inputs = form.elements;
const imgLink = form.querySelector('.cat-photo');
const catImg = form.querySelector('.cat-img');

const createCard = (cat) => {
    return `<div id="${cat.id}"class="cat-card">
                <img src="${cat.img_link || images/cat.jpg}" alt="" class="card-img">
                    <i class="fa-sharp fa-solid fa-heart ${cat.favourite ? "active" : "inactive"}"></i>
                <div class="cat-card__content">
                    <p class="cat-name">${cat.name}</p>
                    <i class="fa-sharp fa-solid fa-magnifying-glass-plus inactive"></i>
                </div>
            </div>`
} 

const addCards = (data) => {
    data.forEach((cat) => cards.innerHTML += createCard(cat))
}

const loadData = async (url) => {
    if(localStorage.getItem('cats') === null) {
        console.log("server")
        let response = await fetch(url);

        if(response.ok) {
            const json = await response.json();
            const data = json.data;
            localStorage.setItem('cats', JSON.stringify(data));
            addCards(data);
        }
        else {
            console.log(`ERROR ${response.status}`);
        }
    } 
    else {
        const data = localStorage.cats;
        const parsed = JSON.parse(data);
        console.log(parsed);
        addCards(parsed);
    }
} 

const addData = async (url, data) => {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

imgLink.addEventListener('change', () => catImg.style.backgroundImage = `url(${imgLink.value})`);

cards.addEventListener('click', (evt) => {
    const target = evt.target;
    if(target.classList.contains('cat-card')) {
        popup.classList.toggle('active');
    }
})

addBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
    form.reset();
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

    addData("https://sb-cats.herokuapp.com/api/2/nikita-guderyanov/add", newCat)

    let card = createCard(newCat);
    cards.innerHTML += card;

    popup.classList.remove('active');
    form.reset();
})

loadData("https://sb-cats.herokuapp.com/api/2/nikita-guderyanov/show");

