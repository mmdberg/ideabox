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
  var objectToStore = {uniqueid: this.uniqueid, title: $title.val(), body: $body.val(), quality: this.quality};
  var stringifiedObject = JSON.stringify(objectToStore);
  localStorage.setItem(this.uniqueid, stringifiedObject);
}; 

MakeCard.prototype.appendCard = function(){
  $ideaList.prepend(
    `<article class="card" id="${this.uniqueid}">
      <h2 class="card-title">${this.title}</h2>
      <button class="card-buttons delete-button"></button>
      <p class="card-body">${this.body}</p>
      <nav>
        <button class="card-buttons up-vote"></button>
        <button class="card-buttons down-vote"></button>
        <p class="quality">quality: ${this.quality}</p>
      </nav>
    </article>`)
};

retrieveCard();
console.log(localStorage.length);

function retrieveCard(){
  for(var i=0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  $ideaList.prepend(
      `<article class="card" id="${parsedObject.uniqueid}">
      <h2 class="card-title">${parsedObject.title}</h2>
      <button class="card-buttons delete-button"></button>
      <p class="card-body">${parsedObject.body}</p>
      <nav>
        <button class="card-buttons up-vote"></button>
        <button class="card-buttons down-vote"></button>
        <p class="quality">quality: ${parsedObject.quality}</p>
      </nav>
    </article>`)
}};

function getFromStorage(id){
}

function pushToStorage(id, object){
  var stringifiedObject = JSON.stringify(object);
  localStorage.setItem(id, stringifiedObject);
}

$('.idea-list').on('click', '.up-vote', function() {
  if ($(this).closest('nav').children('p').text() === 'quality: swill') 
    {$(this).siblings('.quality').text('quality: plausible');
    var id = this.closest('article').getAttribute('id');
    var retrievedObject = localStorage.getItem(id);
    var parsedObject = JSON.parse(retrievedObject);
    parsedObject.quality = 'plausible';
    pushToStorage(id, parsedObject);
 } else if ($(this).closest('nav').children('p').text() === 'quality: plausible')
    {$(this).siblings('.quality').text('quality: genius')
    var id = this.closest('article').getAttribute('id');
    var retrievedObject = localStorage.getItem(id);
    var parsedObject = JSON.parse(retrievedObject);;
    parsedObject.quality = 'genius';
    pushToStorage(id, parsedObject);
}
});

$('.idea-list').on('click', '.down-vote', function (){
  if ($(this).closest('nav').children('p').text() === 'quality: genius') 
    {$(this).siblings('.quality').text('quality: plausible');
    var id = this.closest('article').getAttribute('id');
    var retrievedObject = localStorage.getItem(id);
    var parsedObject = JSON.parse(retrievedObject);;
    parsedObject.quality = 'plausible';
    pushToStorage(id, parsedObject);
  } else if ($(this).closest('nav').children('p').text() === 'quality: plausible')
    {$(this).siblings('.quality').text('quality: swill');
    var id = this.closest('article').getAttribute('id');
    var retrievedObject = localStorage.getItem(id);
    var parsedObject = JSON.parse(retrievedObject);
    parsedObject.quality = 'swill';
    pushToStorage(id, parsedObject);
}
});

$('.idea-list').on('click', '.delete-button', deleteCard);
function deleteCard() {
  var id = this.closest('article').getAttribute('id');
  localStorage.removeItem(id);
  this.closest('article').remove();
}
