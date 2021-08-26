import debounce from 'lodash.debounce';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import fetchCountries from './fetchCountries';
import countryTemplate from './templates/countryTemplate.hbs';


const refs = {
    input: document.querySelector('#input'),
    countryList: document.querySelector('.country-list'),
}

input.addEventListener('input', debounce(searchCountry, 500));



function searchCountry() {
    let value = input.value;
    
    fetchCountries(value)
        .then(data => updateTemplate(data))
        .catch(error => console.log(error));
    
}

function updateTemplate(data) {
    const markup = countryTemplate(data);

    refs.countryList.insertAdjacentHTML('beforeend', markup);
}