const addBtn = document.querySelector('.add-button');
const popup = document.querySelector('.add-form');
const closeBtn = document.querySelector('.close-button');
const cards = document.querySelector('.cards__container');
const likeBtn = document.querySelector('.liked');

addBtn.addEventListener('click', () => popup.classList.toggle('active'));
closeBtn.addEventListener('click', () => {
    likeBtn.classList.remove('blue-text');
    popup.classList.toggle('active');
});

cats.forEach((cat) => {
    let card = `<div class="cat-card" style="background-image: url(${cat.img_link});">
    <i class="fa-sharp fa-solid fa-heart ${cat.favourite ? "active" : "inactive"}"></i>
    <div class="cat-card__content">
        <p class="cat-name">${cat.name}</p>
        <i class="fa-sharp fa-solid fa-magnifying-glass-plus inactive"></i>
    </div>
    </div>`;
    cards.innerHTML += card;
})

likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('blue-text');
})

