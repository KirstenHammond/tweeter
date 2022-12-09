//For implementing character count in new tweet submission

$(document).ready(function () {
  const maxLength = 140;

  //Find the length of the input
  $('#new-tweet-content').keyup(function () {
    let currentLength = $(this).val().length;
    let remaining = maxLength - currentLength;

    //Traverse up and then back down to find .counter
    let $parent = $(this).parent();
    let counter = $parent.find('.counter');
    counter.each(function () {
      //Update the counter for each keyup
      $(this).html(remaining);

      //Negative-count has red styling, so the class is removed if the number is positive
      if ($(this).html() < 0) {
        $(this).addClass('negative-count');
      } else {
        $(this).removeClass('negative-count')
      }
    })
  })
  return;
});

