var $title = $('.title-input');
var $body = $('.body-input');
var $saveButton = $('.save-button');
var $ideaList = $('.idea-list');

$saveButton.on('click', preventDefault);

function preventDefault(event) {
  event.preventDefault();
  var newCard = new MakeCard($title.val(), $body.val(), (new Date()).getTime());
  newCard.appendCard();
  $title.val('');
  $body.val('');
};

function MakeCard(title, body, uniqueid) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  this.uniqueid = uniqueid;
  console.log(this.uniqueid);
  var objectToStore = { title: $title.val(), body: $body.val() };
  var stringifiedObject = JSON.stringify(objectToStore);
  localStorage.setItem(this.uniqueid, stringifiedObject);
  }; 

MakeCard.prototype.appendCard = function(){
  $ideaList.prepend(
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

retrieveCard();
console.log(localStorage.length);

function retrieveCard(){
  for(var i=0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  $ideaList.prepend(
      `<article class="card">
      <h2 class="card-title">${parsedObject.title}</h2>
      <button class="card-buttons delete-button"><img class="icon" src="FEE-ideabox-icon-assets/delete.svg" alt=""></button>
      <p class="card-body">${parsedObject.body}</p>
      <nav>
        <button class="card-buttons up-vote"><img class="icon" src="FEE-ideabox-icon-assets/upvote.svg" alt=""></button>
        <button class="card-buttons down-vote"><img class="icon" src="FEE-ideabox-icon-assets/downvote.svg" alt=""></button>
        <p class="quality">quality: ${parsedObject.quality}</p>
      </nav>
    </article>`)
}}




