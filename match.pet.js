$(document).ready(function() {
    console.log("ready!");
  $('.btn').on('click', function(event) {
      if ($('input[name=zip_code').val().length === 0){
        Materialize.toast('Please enter a zip code.', 4000)
      } else if($('input[name=pets').val().length === 0){
        Materialize.toast('Please enter dog or cat.', 4000)
      } else {
          Materialize.toast('Thank you!', 4000)
          event.preventDefault();
      }

      console.log("it clicked");
      var zip_code = $('input[name=zip_code').val()
      var pets = $('input[name=pets').val()
      console.log('location',zip_code);
      console.log('pets', pets);

    $.getJSON("http://api.petfinder.com/pet.find?format=json&key=802794cfd500084ba38b444334194949&location=" + zip_code + "&animal=" + pets + "&callback=?")
    .done(function(petApiData) { console.log('Data retrieved!');
      console.log('data',petApiData)
    })
      .fail(function(err) { alert('Error retrieving data!');
      // for(var i=0; i <petApiData.length; i++){
      //       let thing = petApiData[i]
      //       console.log(thing.location);
      //       console.log(thing.animal);
      //       console.log(thing.name);
      })
    })
  })
// })
