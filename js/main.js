'use strict';

const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

function fetchDoggoButton() {
  $('#getDoggos button').click(function(event) {
    event.preventDefault()
    let numberOfDoggos = $('.range').val()
    fetchDogPhotos(numberOfDoggos);
  })
}

function fetchDogPhotos(numberOf) {
  fetch(`https://dog.ceo/api/breeds/image/random/${numberOf}`)
    .then(response => response.json())
    .then(result => displayDogPictures(result))
    .catch(error => console.log('error', error));
}

function displayDogPictures(result) {
  let log = result.message.toString();
  console.log(log)
  let answerThing = result.message.reduce((result, item, index) => {
    result += `<div class="dogPhoto"> <img src="${item}"alt="">
    </div>`;
    return result;
  }, '');;
  $(".dogs").html(answerThing);
}

function fetchDoggoByBreedButton() {
  $('#getDoggoByBreed').submit(function(event) {
    event.preventDefault()
    let breed = $('.text').val()
    fetchDogByBreed(breed);
  })
}

function fetchDogByBreed(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => {
    if(response.ok) return response.json()
    return response.json().then(err => Promise.reject(err))
    })
    .then(result => displayDogBreedPicture(result))
    .catch(error => handleWrongBreed(error));
}

function displayDogBreedPicture(result) {
  $(".dogs").html(`<div class="dogPhoto"> <img src="${result.message}"alt="">
  </div>`);
}

function handleWrongBreed(error) {
  alert(error.message)
}

fetchDoggoByBreedButton()
fetchDoggoButton()
