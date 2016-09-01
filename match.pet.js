$(document).ready(function() {
  'use strict'
  $('select').material_select();
  $('.modal-trigger').leanModal();
  addSubmitListener()

  let offset = 0;

  function addSubmitListener() {
    $('#matchButton').on('click', function(event) {
      $("#petContainer").empty()
      if ($('input[name=zipCode').val().length === 0) {
        Materialize.toast('Please enter a zip code.', 4000);
      }
      if ($('#pets').val() === null) {
        Materialize.toast('Please choose dog or cat.', 4000);
      }
      dataCall()
    })
  }

  function dataCall() {
    const zipCode = $('input[name=zipCode').val()
    const pets = $('#pets').val()
    const sex = $('#sex').val()
    const age = $('#age').val()

    let url = "http://api.petfinder.com/pet.find?format=json&key=802794cfd500084ba38b444334194949&location=" + zipCode + "&animal=" + pets + "&offset=" + offset + "&count=24&callback=?"

    if (sex) {
      url += "&sex=" + sex
    }
    if (age) {
      url += "&age=" + age
    }

    $.getJSON(url)
    .done(function(data) {
      console.log(data);
      const petList = data.petfinder.pets.pet

      offset = data.petfinder.lastOffset.$t

      for (let i = 0; i < petList.length; i++) {
        const pet = petList[i]
        const tempMedia = pet.media.photos.photo[0].$t;
        const media = tempMedia.split('&')
        const image = media[0] + '.jpg'

        renderData(pet, i, image)
      }
    })
      .fail(function() {
      })
  }

  function renderData(pet, i, image) {
    if (!pet.breeds.breed.$t) {
      pet.breeds.breed.$t = 'no breed information available'
    }
    if (!pet.contact.phone.$t) {
      pet.contact.phone.$t = 'no phone number available'
    }
    if (!pet.description.$t) {
      pet.description.$t = 'no description available'
    }
    if (!image) {
      image = 'no photo available'
    }
    $('#petContainer').append(`
      <div class="col s12 m3 l3">
      <div class="card small z-depth-4">
      <div class="card-image">
      <img src="${image}">
      <span class="card-title"></span>
      </div>
      <div class="card-content">
      <p>${pet.name.$t}</p>
      </div>
      <div class="card-action">
      <a class="modal-trigger waves-effect waves-light btn #795548 brown z-depth-5" href="#modal${i}">Learn more!</a>
      <div id="modal${i}" class="modal modal-fixed-footer">
      <div class="modal-content">
      <div class="card small" id="popUp">
      <div class="card-image">
      <img src=${image}>
      </div>
      </div>
      <h4>${pet.name.$t}: ${pet.age.$t} - ${pet.breeds.breed.$t} - (${pet.sex.$t})</h4>
      <p>${pet.description.$t}</p>
      <h5>Please contact the shelter:  ${pet.contact.email.$t}</h5>
      <h5>${pet.contact.phone.$t}</h5>
      </div>
      <div class="modal-footer">
      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat "><h6>x</h6></a>
      </div>
      </div>
      </div>
      </div>
      </div>
      `)
    $('.modal-trigger').leanModal();
  }

  function nextButton() {
    $('#nextButton').on('click', function() {
      $("#petContainer").empty()
      dataCall()
    })
  }
  nextButton()
})
