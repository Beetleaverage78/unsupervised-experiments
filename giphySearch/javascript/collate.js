var collateList = [];
var collateTab = document.querySelector('.collate-tab');


function zipZeFiles() {
  if (collateList.length == 0) {
    alert("No gifs were selected");
  } else {
    var zip = new JSZip();
    var gifFolder = zip.folder("gifs");
    var index = 0;

    function loadAsArrayBuffer(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "arraybuffer";
      xhr.onerror = function () { /* Error Handling*/ };
      xhr.onload = function () {
        if (xhr.status = 200) { callback(xhr.response, url) }
        else { /* Error Handling*/ }
      };
      xhr.send();
    }

    function load() {
      if (index < collateList.length) {
        loadAsArrayBuffer(collateList[index++], function (buffer, url) {
          var filename = "giphy" + index + ".gif";
          gifFolder.file(filename, buffer);
          load();
        })
      } else {
        zip.generateAsync({ type: "blob" }).then(function (c) {
          console.log(c);
          saveAs(c, "collatedGifs.zip");
        });
      }
    };

    function getFilename(url) {
      return url.substr(url.lastIndexOf("/") + 1);
    }

    load();
  }
}

function addCollate(gif) {
  var gifBtnIcon = gif.querySelector('.img-overlay');
  gifBtnIcon.innerHTML = "";

  console.log(collateList);
  collateTab.appendChild(gif);
  collateList.push(gif.querySelector('#imgSrc').src);
}

function tooLazy() {
  var collateBtn = document.querySelector('.container-collateBtn');
  var btnIcon = document.querySelector('.clt');

  collateBtn.style.backgroundColor = "red";
  btnIcon.classList.remove('fa-file-archive');
  btnIcon.classList.add('fa-times');
}

function tooLazyV2() {
  var collateBtn = document.querySelector('.container-collateBtn');
  var btnIcon = document.querySelector('.clt');

  collateBtn.style.backgroundColor = "#3b5b6d";
  btnIcon.classList.remove('fa-times');
  btnIcon.classList.add('fa-file-archive');

  console.log(collateBtn);
  console.log(btnIcon);
}

function toggleCollate(search) {
  if (collateList.length != 0 && search === false) {
    var error = document.querySelector('.error-empty');
    error.style.display = "none";
  }

  var collateContent = document.querySelector('.collate-tab');
  var searchContent = document.querySelector('.js-searchContent');

  if ((collateContent.style.display === "" || collateContent.style.display === "none") && search === false) {
    searchContent.style.display = "none";
    collateContent.style.display = "block";
    tooLazy();
  } else if (search === true) {
    collateContent.style.display = "none";
    searchContent.style.display = "block";
    tooLazyV2();
  } else {
    collateContent.style.display = "none";
    searchContent.style.display = "block";
    tooLazyV2();
  }

}