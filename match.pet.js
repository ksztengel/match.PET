$(document).ready(function() {
  'use strict'

  // console.log("ready!");
  $('.btn').on('click', function(event) {
    if ($('input[name=zipCode').val().length === 0) {
      Materialize.toast('Please enter a zip code.', 4000);
    }
    else if ($('input[name=pets').val().length === 0) {
      Materialize.toast('Please enter dog or cat.', 4000);
    }
    else {
      Materialize.toast('Thank you!', 4000)
      event.preventDefault();
    }

    var zipCode = $('input[name=zipCode').val()
    var pets = $('input[name=pets').val()

    $.getJSON("http://api.petfinder.com/pet.find?format=json&key=802794cfd500084ba38b444334194949&location=" + zipCode + "&animal=" + pets + "&callback=?")
    .done(function(data) {
      let petList = data.petfinder.pets.pet

      let mainPet = petList[0];
      let mainName = mainPet.name.$t;
      let mainDescription = mainPet.description.$t;
      let mainEmail = mainPet.contact.email.$t;
      let mainTempMedia = mainPet.media.photos.photo[0].$t;
      let mainMedia = mainTempMedia.split('&');
      let mainImage = mainMedia[0] + '.jpg'

      $('#firstPetContainer').append(`<div class="col s12 m12">
      <h5 class="header"></h5>
      <div class="card horizontal">
      <div class="card-image">
      <img src ="${mainImage}">
      <span class="card-title">${mainName}</span>
      </div>
      <div class="card-stacked">
      <div class="card-content">
      <p>${mainDescription}</p>
      </div>
      <div class="card-action">
      <a href="mailto: ${mainEmail}">Email Us!</a>
      </div>
      </div>
      </div>
      </div>
      `)

      for(var i=1; i <petList.length; i++) {
        let pet = petList[i]
        let name = pet.name.$t;
        let description = pet.description.$t;
        let email = pet.contact.email.$t;
        let tempMedia = pet.media.photos.photo[0].$t;
        let media = tempMedia.split('&')
        let image = media[0] + '.jpg'

      $('#petContainer').append(`
          <div class="col s3 m3">
            <div class="card small z-depth-5">
              <div class="card-image">
                <img src="${image}">
                  <span class="card-title"></span>
          </div>
              <div class="card-content">
                <p>${name}</p>
              </div>
                <div class="card-action">
                  <a href="mailto:${email}">Email us!</a>
              </div>
            </div>
          </div>
          `)
        }
    console.log('data', data)
    })
    .fail(function() {
      })
  })
})

// })
