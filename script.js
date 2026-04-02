"use strict";

//Dark/light toggle 
document.getElementById("toggle-mode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
}); 

//Product display 
const cats = [
    { 
    name: "Luna",
    image: "Luna.jpg",
    description: "Luna is playful and loves to cuddle."
    },

    {
    name: "Shadow",
    image: "Shadow.jpg",
    description: "Shadow is a shy but sweet boy."
    },  
    
    {
    name: "Mochi",
    image: "Mochi.jpg",
    description: "Mochi is curious and clever."
    },
]; 

const catButtons = document.getElementById("cat-buttons");
const catDisplay = document.getElementById("cat-display");

//show one cat at a time to click through it
function showCat(index) {
    const cat = cats[index];
    catDisplay.innerHTML = `
    <h3>${cat.name}</h3>
    <img src="${cat.image}" alt="${cat.name}">
    <p>${cat.description}</p>
    `; 
}

//buttons for each cat
cats.forEach((cat, index) => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.addEventListener("click", () => showCat(index));
    catButtons.appendChild(btn);
}); 

showCat(0);


const gameOutput = document.getElementById("game-result");

//game play, guessing game 
document.getElementById("submit-guess").addEventListener("click", () => {
    const userGuess = parseInt(document.getElementById("guess-input").value);
    const randomNum = Math.floor(Math.random() * 10) + 1;
   
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        gameOutput.textContent = "Please enter a number between 1 and 10.";
    } else if (userGuess === randomNum) {
        gameOutput.textContent = `You guessed right! The cat's favorite number was ${randomNum}.`;
    } else {
        gameOutput.textContent = `Try again! You guessed ${userGuess}, but the number was ${randomNum}.`;
    }
});

//Contact Form and validation 
const formOutput = document.getElementById("form-message");

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name =document.getElementById("name").value.trim();
    const phone =document.getElementById("phone").value.trim();
    const email =document.getElementById("email").value.trim();
    const comments =document.getElementById("comments").value.trim();
    const contactMethod =document.querySelector('input[name = "contact-method"]:checked');

    //required field 
    if (!name || !comments || !contactMethod) {
        formOutput.textContent = "Please complete all required fields.";
        return;
    }

    //Regex validation 
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (contactMethod.value === "phone" && !phoneRegex.test(phone)) {
        formOutput.textContent = "Please enter a valid email address.";
        return;
    }
    
    //create customer object 
    const adopter = {
        name,
        phone,
        email,
        comments,
        preferredContact: contactMethod.value
    };
    
    //reset form 
    this.reset();

    //output message 
    formOutput.textContent = `Thank you, ${adopter.name}! We'll contact you via ${adopter.preferredContact}.`; 
}); 