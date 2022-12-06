//tictactoe example
const thisMoveCausedRowVictory = function($cell) {
  let victory = true;
  let candidateWinner = "";
  if($cell.hasClass("X")) {
    candidateWinner = "X";
  } else {
    candidateWinner = "O";
  }
  
  const $parent = $cell.parent();
  $parent.find('td').each(function(){
      if (!$(this).hasClass(candidateWinner)) {
        victory = false;
      }
  })

  return victory;
}


$(document).ready(function () {//no arrow function because using this
  $('selector eg div').click(function () {
    console.log("td was clicked while it was this players turn", $('#player').html());//prints whose turn it is based on the text in selector html tag
    $(this).addClass($('#player').html());//when you click on a td it will add a class with a name of the content in the html tag. then set up rules for .X or .Y in css
    $(this).off()//stop reassigning class

    //test for whether we have a winner
    if (thisMoveCausedRowVictory($(this))) {
      $('table').off();
      $('h2').html("We have a winner. Click <a href='/'>here</a> to play again.")
    }

    //otherwise if no winner then change class depending on whose playing
    if ($('#player').html() === 'X') {
      $('#player').html('O'); //changing the value in the tag
    } else {
      $('#player').html('X');
    }
  });
});