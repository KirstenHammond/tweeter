//For implementing character count

$(document).ready(function () {
  const maxLength = 140;
  
  //Find the length of the input
  $('#tweet-text').keyup(function() {
    let currentLength = $(this).val().length;
    let remaining = maxLength - currentLength;
    //$('.counter').html(remaining);

  //Traverse up and then back down to find .counter
  //section/form/textarea + div/button+ counter
    let $parent = $(this).parent();
    let counter = $parent.find('.counter');
    counter.each(function() {
      //console.log("this", $(this));
      $(this).html(remaining);

      if($(this).html() < 0) {
        $(this).addClass('negative-count');
      } else {
        $(this).removeClass('negative-count')
      }
    })

  //Conditional checking for negative value to add class and turn red
    /* if (remaining < 0) {
      $(this).addClass($('.counter').html())
    } */
  })
  return;
});