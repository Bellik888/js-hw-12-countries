import debounce from 'lodash.debounce';
// import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import { error, info, notice } from "@pnotify/core";
// import "@pnotify/core/dist/Material.css";
import "material-design-icons/iconfont/material-icons.css";
import { defaults } from "@pnotify/core";
import '@pnotify/core/dist/BrightTheme.css';


import fetchCountries from './fetchCountries';
import countryTemplate from './templates/countryTemplate.hbs';
import countryList from './templates/countryList.hbs';

// defaults.styling = "material";
// defaults.icons = "material";


const refs = {
    input: document.querySelector('#input'),
    countryList: document.querySelector('.country-list'),
}

input.addEventListener('input', debounce(searchCountry, 500));


function searchCountry() {
    clearInput();
    
    let value = refs.input.value;
    
    fetchCountries(value)
        .then(data => updateTemplate(data))
        .catch(error => console.log(error));
    
}

function updateTemplate(data) {
    const markup = countryTemplate(data);
    const markupList = countryList(data);

    if (!data.length || data.length === "") {
    info({
      text: `You enter empty string `,
    });
    };

    if (data.status === 404) {
    error({
      text: "No country has been found. Please enter a more specific query!",
    });
    }
    if (data.length <= 10) {
        refs.countryList.insertAdjacentHTML('beforeend', markupList);
    }
    if (data.length > 10) {
    notice({
      text: `Please enter a more specific query !`,
    });
    }

    if (data.length === 1) {
    refs.countryList.innerHTML = "";
    refs.countryList.insertAdjacentHTML("beforeend", markup);
  }

  
}

function clearInput() {
    refs.countryList.innerHTML = "";
}