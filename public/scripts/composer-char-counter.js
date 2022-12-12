//Character count helper function
(function ($) {
  $(document).ready(function () {

    $('#new-tweet-content').on('input', onInput);

  });

  /**
   * On text input, updates the character counter. Add/removes classes which turns text black/red based on counter in relation to 140.
   * @param {*} event The key pressed
   * @returns An updated value based on input length
   */
  const onInput = function (event) {

    let $input = $(this);
    let currentLength = $input.val().length;
    let remaining = 140 - currentLength;

    //Traverse up and then back down to find .counter
    let $parent = $input.parent();
    let $counter = $parent.find('.counter');
    $counter.each(function () {
      $counter.text(remaining);

      if (remaining < 0) {
        $counter.addClass('negative-count');
      } else {
        $counter.removeClass('negative-count')
      }
    })
    return;
  };

})(jQuery);