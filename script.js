var $title = $('.title-input');
var $body = $('.body-input');
var $saveButton = $('.save-button');
var $ideaList = $('.idea-list');

$saveButton.on('click', preventDefault);
// $saveButton.on('click', MakeCard);
// $saveButton.on('click', );
console.log($saveButton);

function preventDefault(event) {
  event.preventDefault();
  var newCard = new MakeCard($title.val(), $body.val());
  newCard.appendCard();
}

function MakeCard(title, body) {
  console.log('hi');
  this.title = title;
  this.body = body;
  this.quality = "swill";
  }; 

MakeCard.prototype.appendCard = function(){
  console.log('gothere');
  $ideaList.append(
      `<article class="card">
      <h2 class="card-title">${this.title}</h2>
      <button class="card-buttons delete-button"><img class="icon" src="FEE-ideabox-icon-assets/delete.svg" alt=""></button>
      <p class="card-body">${this.body}</p>
      <nav>
        <button class="card-buttons up-vote"><img class="icon" src="FEE-ideabox-icon-assets/upvote.svg" alt=""></button>
        <button class="card-buttons down-vote"><img class="icon" src="FEE-ideabox-icon-assets/downvote.svg" alt=""></button>
        <p class="quality">quality: ${this.quality}</p>
      </nav>
    </article>`
    )
};
