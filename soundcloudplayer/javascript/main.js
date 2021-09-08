// Important Stuff
var client_id = 'cd9be64eeb32d1741c17cb39e41d254d';
var displayTracks = document.querySelector('.js-search-results');

// IMG Placeholder
var placeIMG = "https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png";

/* Listeners */
// Button Listener
document.querySelector(".js-submit").addEventListener('click', function () {
  UI.processInput();
});
// Keyboard Listener
document.querySelector(".js-search").addEventListener('keyup', function (key) {
  if (key.which === 13) {
    UI.processInput();
  }
});

/* Search SoundCloud for Music */
var UI = {};

UI.processInput = function () {
  displayTracks.innerHTML = ""; // Clear Search
  var grabInput = document.querySelector('.js-search').value;
  if (grabInput != "" || grabInput != null) {
    SoundCloudAPI.getTrack(grabInput);
  } else { // If button clicked & search bar empty
    alert("Search Bar Empty");
  }
};


/* Query SoundCloud API */
var SoundCloudAPI = {};

SoundCloudAPI.init = function () {
  SC.initialize({
    client_id: client_id
  });
};
SoundCloudAPI.init();

SoundCloudAPI.getTrack = function (searchQuery) {
  // Find the Tracks, q = keyword to search
  SC.get('/tracks', {
    q: searchQuery
  }).then(function (tracks) {
    console.log(tracks);
    SoundCloudAPI.createCards(tracks);
  });
};

SoundCloudAPI.createCards = function (tracks) {
  tracks.forEach(async function (track) {
    // Grab Track info
    var trackTitle = track.title;
    var trackHref = track.permalink_url;
    var imgURL = track.artwork_url || placeIMG;

    // Create Card
    var card = document.createElement('div');
    card.classList.add('card');
    displayTracks.appendChild(card);

    // Create Image Track
    var imgDiv = document.createElement('div');
    imgDiv.classList.add('image');
    card.appendChild(imgDiv);

    var img = document.createElement('img');
    img.classList.add('image-img');
    img.setAttribute("src", imgURL);
    imgDiv.appendChild(img);

    // Content of Card
    var cardContent = document.createElement('div');
    cardContent.classList.add('content');
    card.appendChild(cardContent);

    var header = document.createElement('div');
    header.classList.add('header');
    cardContent.append(header);

    var anchor_tag = document.createElement('a');
    anchor_tag.setAttribute("href", trackHref);
    anchor_tag.setAttribute("target", "_blank");
    anchor_tag.innerHTML = '"' + trackTitle + '"';
    header.append(anchor_tag);

    // Button
    var btn = document.createElement('div');
    btn.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
    card.appendChild(btn);

    // Button Icon
    var icon = document.createElement('i');
    icon.classList.add('add', 'icon');
    btn.appendChild(icon);

    var span = document.createElement('span');
    span.innerHTML = "Add to playlist";
    btn.appendChild(span);

    // Click Event for Button
    btn.addEventListener('click', function () {
      SoundCloudAPI.addToPlaylist(trackHref);
    });
  });
};

/* Add to Playlist & Play */
SoundCloudAPI.addToPlaylist = function (trackLink) {
  SC.oEmbed(trackLink, {
    auto_play: true
  }).then(function (embed) {
    console.log('oEmbed response: ', embed);

    var sideBar = document.querySelector('.inner');
    var song = document.createElement('div');
    song.innerHTML = embed.html;
    console.log(embed);

    sideBar.insertBefore(song, sideBar.firstChild);
    //localStorage.setItem("playList", sideBar.innerHTML);
  });
};


// Data Management - On TabClose & Refresh




