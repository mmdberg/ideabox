var $title = $('.title-input');
var $body = $('.body-input');
var $saveButton = $('.save-button');
var $ideaList = $('.idea-list');
var $searchBar = $('.search-input');

$saveButton.on('click', newIdea);
$ideaList.on('blur', 'h2', editTitle);
$ideaList.on('blur', '.card-body', editBody);
$searchBar.on('keyup', searchList);
$ideaList.on('click', '.delete-button', deleteCard);
$ideaList.on('click', '.up-vote', qualityChange);
$ideaList.on('click', '.down-vote', qualityChange);


retrieveCards();

function newIdea(event) {
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
  var objectToStore = {uniqueid: this.uniqueid, title: $title.val(), body: $body.val(), quality: this.quality};
  var stringifiedObject = JSON.stringify(objectToStore);
  localStorage.setItem(uniqueid, stringifiedObject);
}; 

MakeCard.prototype.appendCard = function() {
  $ideaList.prepend(
    `<article class="card" id="${this.uniqueid}">
      <h2 class="card-title" contenteditable="true">${this.title}</h2>
      <button class="card-buttons delete-button"></button>
      <p class="card-body" contenteditable="true">${this.body}</p>
      <nav>
        <button class="card-buttons up-vote"></button>
        <button class="card-buttons down-vote"></button>
        <h3 class="vote">quality: </h3>
        <p class="quality"> ${this.quality}</p>
      </nav>
    </article>`)
};

function retrieveCards() {
  for(var i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    $ideaList.prepend(
        `<article class="card" id="${parsedObject.uniqueid}">
        <h2 class="card-title" contenteditable="true">${parsedObject.title}</h2>
        <button class="card-buttons delete-button"></button>
        <p class="card-body" contenteditable="true">${parsedObject.body}</p>
        <nav>
          <button class="card-buttons up-vote"></button>
          <button class="card-buttons down-vote"></button>
          <h3 class="vote">quality: </h3>
          <p class="quality"> ${parsedObject.quality}</p>
        </nav>
      </article>`)
  }
}

function pushToStorage(id, object) {
  var stringifiedObject = JSON.stringify(object);
  localStorage.setItem(id, stringifiedObject);
}

function qualityChange() {
  var qualityArray = [
  'swill',
  'plausible',
  'genius'
  ]

  var vote = $(this).attr('class');
  var originalQuality = $(this).siblings('.quality');
  var index = qualityArray.indexOf(originalQuality.text());
  var id = $(this).parents('.card')[0].id;

  if(vote === 'card-buttons up-vote' && index < 2) {
    originalQuality.text(qualityArray[index + 1]);
  } else if( vote === 'card-buttons down-vote' && index > -1) {
    originalQuality.text(qualityArray[index - 1]);
  }
  changeQualityInStorage(id, originalQuality);
}

function changeQualityInStorage(id, updatedQuality) {
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.quality = updatedQuality.text();
  pushToStorage(id, parsedObject);
}

function deleteCard() {
  var id = this.closest('article').getAttribute('id');
  localStorage.removeItem(id);
  this.closest('article').remove();
};

function editTitle() {
  var id = this.closest('article').getAttribute('id');
  var newTitle = $(this).closest('.card-title').text();
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.title = newTitle;
  pushToStorage(id, parsedObject);
};

function editBody() {
  var id = this.closest('article').getAttribute('id');
  var newTitle = $(this).closest('.card-body').text();
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.body = newTitle;
  pushToStorage(id, parsedObject);
};

function searchList(e) {
  event.preventDefault();
  var titles = $('h2');
  var bodies = $('.card-body');
  var eachtitle = '';
  var eachbody = '';
  for (var i = 0; i < (titles.length || bodies.length); i++) { 
    eachtitle = titles[i].innerText;
    eachbody = bodies[i].innerText;
    var searchInputTitle = eachtitle.includes($searchBar.val());
    var searchInputBody = eachbody.includes($searchBar.val());
    if (searchInputTitle === false && searchInputBody === false) {
      $($('h2')[i]).parent().hide();
    } else if (searchInputTitle === true || searchInputBody === true) {
      $($('h2')[i]).parent().show();
    }
  }
}