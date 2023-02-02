const authorizationForm = document.forms.authorization;
const authorization = document.querySelector('.authorization');

const parseCookie = () => {
    const greetings = document.cookie;

    const start = greetings.indexOf('=');
    const end = greetings.indexOf(';');

    const name = greetings.slice(start + 1, end) + '!';
    console.log('Привет,', name);
}

authorizationForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const inputs = authorizationForm.elements;
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].name !== 'sign-in') {
            document.cookie = `${inputs[i].name}=${inputs[i].value}`;
        }
    }
    parseCookie();
    authorization.classList.toggle('active');
});

const initPage = () => {
    if(!document.cookie.length) {
        authorization.classList.toggle('active');
    }
    else {
        parseCookie();
    }
}

initPage();