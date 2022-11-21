document.addEventListener("DOMContentLoaded", function(){
    let sign_up_form = document.querySelector("#sign_up_form");
    let login_form = document.querySelector("#login_form");

    document.querySelector("#show_sign_up_form").addEventListener("click", toggleSelectedForm);
    document.querySelector("#show_login_form").addEventListener("click", toggleSelectedForm);

    sign_up_form.addEventListener("submit", event => submitForm(event, sign_up_form));
    login_form.addEventListener("submit", event => submitForm(event, login_form));
});

/**
 * DOCU: This function will select forms <br>
 * Triggerd By: document.querySelector("#show_sign_up_form").addEventListener("click", toggleSelectedForm); <br>
 * Triggerd By: document.querySelector("#show_login_form").addEventListener("click", toggleSelectedForm); <br>
 * @param {*} event 
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const toggleSelectedForm = (event) => {
    let selected_form = event.target;

    selected_form.closest("form").classList.add("hidden");

    if(selected_form.id === "show_sign_up_form"){
        selected_form.closest("form").previousElementSibling.classList.remove("hidden");
        changeWelcomeText(selected_form.id);
    }
    else{
        selected_form.closest("form").nextElementSibling.classList.remove("hidden");
        changeWelcomeText(selected_form.id);
    }
};

/**
 * DOCU: This function will submit the form <br>
 * Triggerd By: sign_up_form.addEventListener("submit", event => submitForm(event, sign_up_form)); <br>
 * @param {*} event
 * @param {*} form signup form or login form
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const submitForm = (event, form) => {
    event.preventDefault();

    console.log(form)

    let input_fields = document.querySelectorAll(`#${form.id} input`);

    validateInput(input_fields);

    if(!(document.querySelectorAll(`#${form.id} .input_error`).length)){
        window.location.replace("wall.html");
    }
};

/**
 * DOCU: This function will change the welcome text of the form <br>
 * Triggerd By: sign_up_form.addEventListener("submit", event => submitForm(event, sign_up_form)); <br>
 * @param {*} event
 * @param {*} form signup form or login form
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const changeWelcomeText = (form) => {
    let welcome_text = document.querySelector(".form_header p");

    /* if the form is sign up, change the header form welcome text */
    welcome_text.innerHTML = form === "show_sign_up_form" ? "Register a new account." : "Login your account";
};

/**
 * DOCU: This function will validate the input field of form <br>
 * @param {*} event
 * @param {*} form_input_fields form_fields of the form
 * Last Updated At: Nov. 22, 2022
 * @author Alfie
*/
const validateInput = (form_input_fields) => {
    for(let field of form_input_fields){
        field.addEventListener("focus", () => {
            field.classList.remove("input_error");
        })

        field.value ? field.classList.remove("input_error") : field.classList.add("input_error");
    }
};