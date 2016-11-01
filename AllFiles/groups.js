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
            var div = document.createElement('div');
            var image = document.createElement('img');
            var aTag = document.createElement('a');
            aTag.setAttribute('href','chat.html?room='+dataKeys[i]);
            var alphaRef = storageRef.child("ND_Crest.jpg");

            //create text, load image to put into elements above
            var nameText = document.createTextNode(dataKeys[i]);
            if( snapshot.val()[dataKeys[i]]["Description"] ){
                var descriptionText = document.createTextNode(snapshot.val()[dataKeys[i]]["Description"]);
            } else {
                var descriptionText = document.createTextNode("No Description");
            }

            //append text/pic to elements
            name.appendChild(nameText);
            description.appendChild(descriptionText);
            alphaRef.getDownloadURL().then(function(url){
                image.src = url;
            }).catch(function(error){
                console.log("in catch function");
            });
            //add elements to div
            div.appendChild(name);
            div.appendChild(description);
            div.appendChild(image);
            //make changes to div css
            div.style.textAlign = "center";
            div.style.border = "solid black 5px";
            div.style.float = "left";
            div.style.width = "300px";
            div.style.height = "300px";
            div.style.margin = "1em";
            div.style.display = "inline-grid";
            div.style.backgroundColor = "LightBlue";
            div.style.hover
            //append div to A tag
            aTag.appendChild(div);
            //append a ref tag (everything) to the body of the html document
            var middle = document.getElementById("middle");
            middle.appendChild(aTag);
        }
    }
});
