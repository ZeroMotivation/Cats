const authorizationForm = document.forms.authorization;
const authorization = document.querySelector('.authorization');

const parseCookie = () => {
    let greetings = document.cookie;

    const start = greetings.indexOf('=') + 1;
    const end = greetings.indexOf(';');

    let name = greetings.slice(start, end) + '!';
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