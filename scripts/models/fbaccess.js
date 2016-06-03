
getFBDataByKey = function(artID) {
  var user = firebase.auth().currentUser;
  var myRef = firebase.database().ref('/users/' + user.uid + '/fbArtList').child(artID).once('value').then(function(snapshot){
    if (snapshot.val() != null ) {
      console.log(snapshot.val());
    }
  });
};

writeFBDataByKey = function(artID, property, value) {
  var myObj = '{' + property + '"' + value + '"}';
  console.log(myObj);
  var user = firebase.auth().currentUser;
  var myRef = firebase.database().ref('/users/' + user.uid + '/fbArtList').child(artID).child(property).set(value);
};

getFBData = function(){
  tempList = [];
  var user = firebase.auth().currentUser;
  var myRef = firebase.database().ref('/users/' + user.uid + '/fbArtList').once('value').then(function(snapshot){
    if (snapshot.val() != null ) {

      for (var key in snapshot.val()) {
      // skip loop if the property is from prototype
        if (!snapshot.val().hasOwnProperty(key)) continue;

        var obj = snapshot.val()[key];
        tempList.push({artID: key, title: obj.title, latitude: obj.latitude, longitude: obj.longitude});
        // for (var prop in obj) {
        //     // skip loop if the property is from prototype
        //   if(!obj.hasOwnProperty(prop)) continue;
        //     // your code
        //     console.log(prop + " = " + obj[prop]);
        // }
      }
      // console.log(snapshot.val());
    }

  });
  // return tempList;
};
