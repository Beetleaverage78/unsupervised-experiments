/* Listeners */
// Button Listener
document.querySelector(".js-search").addEventListener('click', function () {
  checkInput();
});
// Keyboard Listener
document.querySelector(".js-userinput").addEventListener('keyup', function (key) {
  if (key.which === 13) {
    checkInput();
  }
});

/* Grab the Input */
function checkInput() {
  var grabInput = document.querySelector(".js-userinput");
  if (grabInput.value != "") {
    toggleCollate(true);
    searchGif(grabInput.value);
  } else { // If button clicked & search bar empty
    alert("Search Bar Empty");
  }
}

class showGif {
  showGif() { }

  /* Display Elements (GIFS) */
  pushToDOM(input) {
    var container = document.querySelector(".js-searchContent");
    container.innerHTML = ""; // Clear the Gifs if any

    var response = JSON.parse(input);
    var imgURLs = response.data;

    imgURLs.forEach(async function (img) {
      var src = img.images.fixed_height.url;

      var imgContainer = document.createElement('div');
      imgContainer.classList.add('container-img');

      var img = document.createElement('img');
      img.id = "imgSrc";
      img.setAttribute('src', src)

      imgContainer.appendChild(img);
      container.appendChild(imgContainer);

      var overlay = document.createElement('div');
      var overlayBtn = document.createElement('button');
      overlayBtn.addEventListener('click', function () {
        addCollate(imgContainer);
      });

      var iconSpan = document.createElement('span');
      var icon = document.createElement('i');

      overlay.classList.add('img-overlay');
      overlayBtn.classList.add('icon');
      icon.classList.add('fas', 'fa-plus-circle');

      iconSpan.appendChild(icon);
      overlayBtn.appendChild(iconSpan);
      overlay.appendChild(overlayBtn);
      imgContainer.append(overlay);

      console.log(imgContainer);
    });
  };
}

/* Communicate with Giphy API */
var showGifClass = new showGif();
function searchGif(searchQuery) {
  var api_key = "Js40wDasv9TaNwe4j6g6S2yohmdBLonn";
  var limit = 20;

  var url = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + searchQuery + "&limit=" + limit;

  var giphyCall = new XMLHttpRequest();
  giphyCall.open('GET', url);
  giphyCall.send();

  giphyCall.addEventListener('load', function (e) {
    var gifData = e.target.response;
    showGifClass.pushToDOM(gifData);
  });
}



