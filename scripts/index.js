const addBtn = document.querySelector('.add-button');
const popup = document.querySelector('.add-form');
const closeBtn = document.querySelector('.close-button');
const cards = document.querySelector('.cards__container');

const form = document.forms.cats;
const inputs = form.elements;
const imgLink = form.querySelector('.cat-photo');
const catImg = form.querySelector('.cat-img');

const defaultCatImgUrl = 'url(images/cat.jpg)';

const api = new Api('nikita-guderyanov');
let storage = localStorage.getItem('cats');

const createCard = (cat) => {
    return `<div id="${cat.id}"class="cat-card">
                <img src="${cat.img_link || 'images/cat.jpg'}" alt="" class="card-img">
                <i class="fa-sharp fa-solid fa-heart ${cat.favourite ? "active" : "inactive"}"></i>
                <i class="fa-solid fa-trash"></i>
                <div class="cat-card__content">
                    <p class="cat-name">${cat.name}</p>
                    <i class="fa-sharp fa-solid fa-magnifying-glass-plus inactive"></i>
                </div>
            </div>`
} 

const addCards = (data) => {
    cards.innerHTML = "";
    data.forEach((cat) => {
        const card = createCard(cat);
        cards.innerHTML += card;
    })
}

storage = storage ? JSON.parse(storage) : [];
const loadData = async () => {
    if(!storage.length) {
        const response = await api.getCats();
        if(response.ok) {
            const json = await response.json();
            storage = [...json.data];
            localStorage.setItem('cats', JSON.stringify(storage));
            addCards(storage);
        }
        else {
            console.log(`ERROR ${response.status}`);
        }
    }
    else {
        addCards(storage);
    }
} 

imgLink.addEventListener('input', () => catImg.style.backgroundImage = `url(${imgLink.value})`);

cards.addEventListener('click', async (evt) => {
    const target = evt.target;
    if(target.classList.contains('cat-card')) {
        const id = target.id;
        const cat = storage.find((cat) => cat.id == id);

        popup.classList.toggle('active');
        form.classList.remove('add');
        form.classList.add('update');

        inputs.id.value = cat.id;
        inputs.id.setAttribute('disabled', true);
        inputs.name.value = cat.name;
        inputs.age.value = cat.age;
        inputs.rate.value = cat.rate;
        inputs.description.value = cat.description;
        inputs.favourite.checked = cat.favourite;
        inputs.img_link.value = cat.img_link;
        catImg.style.backgroundImage = cat.img_link ? `url(${cat.img_link})` : defaultCatImgUrl;
    }
    if(target.classList.contains('fa-trash')) {
        const deletedId = target.parentNode.id;
        const response = await api.deleteCat(deletedId);

        if(response.ok) {
            storage = storage.filter((cat) => cat.id != deletedId);
            localStorage.setItem('cats', JSON.stringify(storage));
            addCards(storage);
        }
        else {
            console.log(response.status);
        }
    }
    else {
        return;
    }
})

addBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
    inputs.id.removeAttribute('disabled');
    catImg.style.backgroundImage = defaultCatImgUrl;
    form.classList.add('add');
    form.classList.remove('update');
});

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
    form.reset();
});

const createCatObj = (inputs) => {
    let newCat = {};

    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].name !== 'submit') {
            newCat[inputs[i].name] = inputs[i].value;
        }
        if(inputs[i].type === 'checkbox') {
            newCat[inputs[i].name] = inputs[i].checked;
        }
    }
    return newCat;
}

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const newCat = createCatObj(inputs);
    if(form.classList.contains('add')) {
        await api.addCat(newCat);
        
        const card = createCard(newCat);
        cards.innerHTML += card;
    
        const response = await api.getCats();
        if(response.ok) {
            storage.push(newCat);
            localStorage.setItem('cats', JSON.stringify(storage));
        }
    }

    if(form.classList.contains('update')) {

        const updId = inputs.id.value;
        const response = await api.updCat(updId, newCat);
        if(response.ok) {
            const index = storage.findIndex((cat) => cat.id == updId);
            storage[index] = newCat;
            localStorage.setItem('cats', JSON.stringify(storage));
            addCards(storage);
        }
    }

    popup.classList.remove('active');
    form.reset();
})

loadData();


