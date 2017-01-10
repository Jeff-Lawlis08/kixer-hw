// Create a "close" button and append it to each list item
function addCloseButtonsToHTML() {
  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
}


// Click on a close button to hide the current list item
function hideClickedListItems(){
  var close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}


// Add a "checked" symbol when clicking on a list item
function addCheckedSymbolToHTML() {
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
// Fixed mispelling of Element
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    console.log("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  hideClickedListItems();
}

// Parse returned JSON data into HTML
function parseJSONtoHTML(response) {
  var html = "";
  var i;
  // todo
  var preexistingObjs = JSON.parse(response).previousTasks;
  html = preexistingObjs.map(function (obj, i, arr){
    var listItem;
    if(obj.done==='true'){
      listItem = '<li class="checked">'+obj.name+'</li>';
    } else {
      listItem = '<li>'+obj.name+'</li>';
    }
    return listItem;
  });
  return html;
  //this function was returning an empty string
  //mapped to return a group of list items in html
}

// Load preexisting tasks from file
function getPreexistingList() {
  var url = "http://54.165.89.60/homeowork_homebot.json";
  var xmlhttp = new XMLHttpRequest();
  var preexistingList;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      preexistingList = parseJSONtoHTML(this.responseText);
      console.log('got the preexisting list items');
      console.log('copying list into view');
      document.getElementById("myUL").innerHTML = preexistingList;
      setTimeout(function() {
        addCloseButtonsToHTML();
        hideClickedListItems();
        addCheckedSymbolToHTML();
      }, 300);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
