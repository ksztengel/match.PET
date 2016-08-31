$(document).ready(function() {
  'use strict'
  $('select').material_select();
  $('.modal-trigger').leanModal();

  let offset = 0;

  $('#matchButton').on('click', function(event) {
    $("#petContainer").empty()
    if ($('input[name=zipCode').val().length === 0) {
      Materialize.toast('Please enter a zip code.', 4000);
    }
    else if ($('#pets').val() === null) {
      Materialize.toast('Please choose dog or cat.', 4000);
    }
    else {
      Materialize.toast('Thank you!', 4000)
      event.preventDefault();
    }

    const zipCode = $('input[name=zipCode').val()
    const pets = $('#pets').val()

    $.getJSON("http://api.petfinder.com/pet.find?format=json&key=802794cfd500084ba38b444334194949&location=" + zipCode + "&animal=" + pets + "&offset=" + offset + "&count=24&callback=?")
    .done(function(data) {
      const petList = data.petfinder.pets.pet

      offset = data.petfinder.lastOffset.$t

      for (let i = 0; i < petList.length; i++) {
        const pet = petList[i]
        const name = pet.name.$t;
        const description = pet.description.$t;
        const email = pet.contact.email.$t;
        const phone = pet.contact.phone.$t;
        const age = pet.age.$t
        const breed = pet.breeds.breed.$t
        const sex = pet.sex.$t
        const tempMedia = pet.media.photos.photo[0].$t;
        const media = tempMedia.split('&')
        const image = media[0] + '.jpg'

        $('#petContainer').append(`
          <div class="col s3 m3">
            <div class="card small z-depth-4">
              <div class="card-image">
                <img src="${image}">
                  <span class="card-title"></span>
          </div>
              <div class="card-content">
                <p>${name}</p>
              </div>
                <div class="card-action">
  <a class="modal-trigger waves-effect waves-light btn #795548 brown" href="#modal${i}">Learn more!</a>
  <div id="modal${i}" class="modal modal-fixed-footer">
    <div class="modal-content">
    <div class="card small" id="popUp">
    <div class="card-image">
        <img src=${image}>
      </div>
      </div>
      <h4>${name}: ${age} ${breed} (${sex})</h4>
      <p>${description}</p>
      <h5>Please contact the shelter:  ${email}</h5>
      <h5>${phone}</h5>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat"><h4>X</h4></a>
    </div>
  </div>
              </div>
            </div>
          </div>
          `)
      }
      $('.modal-trigger').leanModal();

      console.log('data', data)
    })
    .fail(function() {
    })
  })
})
