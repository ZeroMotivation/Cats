const addBtn = document.querySelector('.add-button');
const popup = document.querySelector('.add-form');
const closeBtn = document.querySelector('.close-button');
const cards = document.querySelector('.cards__container');

const form = document.forms.cats;
const inputs = form.elements;
const imgLink = form.querySelector('.cat-photo');
const catImg = form.querySelector('.cat-img');

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
    data.forEach((cat) => cards.innerHTML += createCard(cat))
}

const updStorage = async (response, storage) => {
    const json = await response.json();
    storage = json.data;
    localStorage.setItem('cats', JSON.stringify(storage));
}

storage = storage ? JSON.parse(storage) : [];
const loadData = async () => {
    if(!storage.length) {
        let response = await api.getCats();
        if(response.ok) {
            updStorage(response, storage);
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
        popup.classList.toggle('active');
        form.classList.add('update');
        form.classList.remove('add');
        const catId = target.id;
        const catData = storage.find((cat) => cat.id == catId);

        inputs.id.value = catData.id;
        inputs.id.setAttribute('disabled', 'true');
        inputs.name.value = catData.name;
        inputs.age.value = catData.age;
        inputs.rate.value = catData.rate;
        inputs.description.value = catData.description;
        inputs.img_link.value = catData.img_link;
        catImg.style.backgroundImage = `url(${imgLink.value})`;
        if(catData.favourite) {
            inputs.favourite.checked = true;
        }
    }
    else if(target.classList.contains('fa-trash')) {
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
    catImg.style.backgroundImage = 'url(images/cat.jpg)';
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
    let newCat = createCatObj(inputs);
    if(form.classList.contains('add')) {

        await api.addCat(newCat);
        
        let card = createCard(newCat);
        cards.innerHTML += card;
    
        const response = await api.getCats();
        if(response.ok) {
            updStorage(response, storage);
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


