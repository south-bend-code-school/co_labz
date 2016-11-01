//Initialize firebase configurations
var config = {
  apiKey: "AIzaSyDOniRNpzK3BohOL8Ms_grksLpoX-RFd9o",
  authDomain: "co-labz.firebaseapp.com",
  databaseURL: "https://co-labz.firebaseio.com",
  storageBucket: "co-labz.appspot.com",
  messagingSenderId: "417450605238"
};

firebase.initializeApp(config);

//Create References to root of database and root to storage
const dbRef = firebase.database().ref();
const storageRef = firebase.storage().ref();

//Sync object changes
dbRef.on('value', snapshot=> {
    //get list of all chat rooms
    var dataKeys = Object.keys(snapshot.val());
    for( i in dataKeys){
        if( dataKeys[i] !== "Users"){
            //make new div, h3, p, img for displaying database info
            //var div = document.createElement('div');
            var name = document.createElement('h3');
            var description = document.createElement('p');
            var upper_div = document.createElement('div');
            var lower_div = document.createElement('div');
            var div = document.createElement('div');
            var image = document.createElement('img');
            var aTag = document.createElement('a');
            aTag.setAttribute('href','chat.html?room='+dataKeys[i]);

            //create text, load image to put into elements above
            var nameText = document.createTextNode(dataKeys[i]);
            if( snapshot.val()[dataKeys[i]]["Description"] ){
                var descriptionText = document.createTextNode(snapshot.val()[dataKeys[i]]["Description"]);
            } else {
                var descriptionText = document.createTextNode("No Description");
            }
            if( snapshot.val()[dataKeys[i]]["ImageURL"] ){
                var imageURL = snapshot.val()[dataKeys[i]]["ImageURL"];
            } else {
                var imageURL = "No Description";
            }
            

            //append text/pic to elements
            name.appendChild(nameText);
            description.appendChild(descriptionText);
            //add elements to div
            upper_div.appendChild(name);
            upper_div.appendChild(description);
            //make div changes
            div.style.textAlign = "center";
            div.style.border = "solid black 5px";
            div.style.float = "left";
            div.style.width = "300px";
            div.style.height = "300px";
            div.style.margin = "1em";
            div.style.display = "inline-grid";
            div.style.backgroundColor = "LightBlue";
            div.style.backgroundImage = "url("+imageURL+")";
            div.style.backgroundSize = "contain";
            upper_div.style.marginTop = "100px";
            upper_div.style.height = "25%";
            //append divs
            div.appendChild(upper_div);
            aTag.appendChild(div);
            //append a ref tag (everything) to the body of the html document
            var middle = document.getElementById("middle");
            middle.appendChild(aTag);
        }
    }
});
