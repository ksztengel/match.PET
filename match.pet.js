$(document).ready(function() {
  'use strict'
  $('.modal-trigger').leanModal();


  let offset = 0;

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

    const zipCode = $('input[name=zipCode').val()
    const pets = $('input[name=pets').val()


    $.getJSON("http://api.petfinder.com/pet.find?format=json&key=802794cfd500084ba38b444334194949&location=" + zipCode + "&animal=" + pets + "&offset=" + offset + "&count=24&callback=?")
    .done(function(data) {
      const petList = data.petfinder.pets.pet

      offset = data.petfinder.lastOffset.$t

//       const mainPet = petList[0];
//       const mainName = mainPet.name.$t;
//       const mainDescription = mainPet.description.$t;
//       const mainEmail = mainPet.contact.email.$t;
//       const mainTempMedia = mainPet.media.photos.photo[0].$t;
//       const mainMedia = mainTempMedia.split('&');
//       const mainImage = mainMedia[0] + '.jpg'
//
//       $('#firstPetContainer').append(`<div class="col s12 m12">
//       <h5 class="header"></h5>
//       <div class="card horizontal z-depth-5 hoverable">
//         <div class="card-image">
//           <img src ="${mainImage}">
//             <span class="card-title">${mainName}</span>
//       </div>
//       <div class="card-stacked">
//       <div class="card-content">
//       <h5>${mainDescription}</h5>
//       </div>
//       <div class="card-action">
//       <a href="mailto: ${mainEmail}">Email The Shelter!</a>
//       </div>
//     </div>
//   </div>
// </div>
//       `)

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
  <a class="modal-trigger waves-effect waves-light btn #795548 brown" href="#modal2">Learn more!</a>
  <div id="modal${i}" class="modal modal-fixed-footer">
    <div class="modal-content">
    <div class="card">
    <div class="card-image">
        <img src=${image}>
      </div>
      </div>
      <h4>${name}: ${age} ${breed} ${sex}</h4>
      <p>${description}</p>
      <h5>Please contact the shelter:  ${email} ${phone}</h5>
    </div>
    <div class="modal-footer">
      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat #795548">X</a>
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
