'use strict';

$(document).ready(function () {
  'use strict';

  $('select').material_select();
  $('.modal-trigger').leanModal();
  addSubmitListener();

  var offset = 0;

  function addSubmitListener() {
    $('#matchButton').on('click', function () {
      $("#petContainer").empty();
      if ($('input[name=zipCode]').val().length === 0) {
        Materialize.toast('Please enter a zip code.', 4000);
      }
      if ($('#pets').val() === null) {
        Materialize.toast('Please choose dog or cat.', 4000);
      }
      dataCall();
    });
  }

  function dataCall() {
    var zipCode = $('input[name=zipCode]').val();
    var pets = $('#pets').val();
    var sex = $('#sex').val();
    var age = $('#age').val();

    var url = "http://api.petfinder.com/pet.find?format=json&key=802794cfd500084ba38b444334194949&location=" + zipCode + "&animal=" + pets + "&offset=" + offset + "&count=24&callback=?";

    if (sex) {
      url += "&sex=" + sex;
    }
    if (age) {
      url += "&age=" + age;
    }

    $.getJSON(url).done(function (data) {
      var petList = data.petfinder.pets.pet;

      offset = data.petfinder.lastOffset.$t;

      for (var i = 0; i < petList.length; i++) {
        var pet = petList[i];
        var tempMedia = pet.media.photos.photo[0].$t;
        var media = tempMedia.split('&');
        var image = media[0] + '.jpg';

        renderData(pet, i, image);
      }
    }).fail(function () {});
  }

  function renderData(pet, i, image) {
    if (!pet.breeds.breed.$t) {
      pet.breeds.breed.$t = 'no breed information available';
    }
    if (!pet.contact.phone.$t) {
      pet.contact.phone.$t = 'no phone number available';
    }
    if (!pet.description.$t) {
      pet.description.$t = 'no description available';
    }
    if (!image) {
      image = 'no photo available';
    }
    $('#petContainer').append('\n      <div class="col s12 m3 l3">\n      <div class="card small z-depth-4">\n      <div class="card-image">\n      <img src="' + image + '">\n      <span class="card-title"></span>\n      </div>\n      <div class="card-content">\n      <p>' + pet.name.$t + '</p>\n      </div>\n      <div class="card-action">\n      <a class="modal-trigger waves-effect waves-light btn #795548 brown z-depth-5" href="#modal' + i + '">Learn more!</a>\n      <div id="modal' + i + '" class="modal modal-fixed-footer">\n      <div class="modal-content">\n      <div class="card small" id="popUp">\n      <div class="card-image">\n      <img src=' + image + '>\n      </div>\n      </div>\n      <h4>' + pet.name.$t + ': ' + pet.age.$t + ' - ' + pet.breeds.breed.$t + ' - (' + pet.sex.$t + ')</h4>\n      <p>' + pet.description.$t + '</p>\n      <h5>Please contact the shelter:  ' + pet.contact.email.$t + '</h5>\n      <h5>' + pet.contact.phone.$t + '</h5>\n      </div>\n      <div class="modal-footer">\n      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat "><h5>x</h5></a>\n      </div>\n      </div>\n      </div>\n      </div>\n      </div>\n      ');
    $('.modal-trigger').leanModal();
  }

  function nextButton() {
    $('#nextButton').on('click', function () {
      $("#petContainer").empty();
      dataCall();
    });
  }
  nextButton();
});
