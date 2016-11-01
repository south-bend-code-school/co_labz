var config = {
  apiKey: "AIzaSyDOniRNpzK3BohOL8Ms_grksLpoX-RFd9o",
  authDomain: "co-labz.firebaseapp.com",
  databaseURL: "https://co-labz.firebaseio.com",
  storageBucket: "co-labz.appspot.com",
  messagingSenderId: "417450605238"
};

firebase.initializeApp(config);

var dbRef = firebase.database().ref();

//On click, create new node in db with given name, 
//add child with given group description
//load new page passing group name just created
$('#createButton').click(function (e) {
    var name = $('#nameInput').val();
    var description = $('#descriptionInput').val();
    var imageURL = $('#topicImage').val();
    var dict ={};
    dict['Description'] = description;
    dict['ImageURL'] = imageURL;
    dbRef.child(name).set(dict);
    location.assign('chat.html?room='+name);
});



