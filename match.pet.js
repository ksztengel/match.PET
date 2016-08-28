$(document).ready(function() {
    // $('select').material_select();
    console.log("ready!");
    $('.btn').on('click', function(event) {
        // event.preventDefault();
        // if($("#zip_code").val() === ''){
        //   Materialize.toast('Please enter a zip code.', 4000)
          console.log("it clicked");
        })
        var location = $('#zip_code').val();
        // function changeSearchZip(zip) {
        //   searchZip = zip;
        var animal = $('#pets').val()
        // }
        // $.ajax({
        //   method: 'GET',
        //   url: 'http://api.petfinder.com/my.method?pet.find?key=802794cfd500084ba38b444334194949&location=11937&full&animal=dog',
      //     dataType: 'json',
      // success: function(){
// }
      // error: function(err) {
      //   console.log('error', err);
      // }
      $.getJSON('http://api.petfinder.com/pet.find?format=json&key=802794cfd500084ba38b444334194949&location=11937&animal=dog&callback=?')
      .done(function(petApiData) { alert('Data retrieved!'); })
      .error(function(err) { alert('Error retrieving data!');
      })
    })
      // })
