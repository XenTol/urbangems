/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.getPlaces();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
    },

    takePicture: function() {
      navigator.camera.getPicture( function( imageURI ) {
        alert( imageURI );

        if(localStorage.getItem("places") === null){
          var obj = JSON.parse('{"city_hall":[{"userid":1,"uri":"http"}]}');
        }
        else{
          var obj = JSON.parse(localStorage.getItem("places"));
        }

        //var counter = 0;
        if(obj['city_hall'][0]['uri'] == "http"){
          var counter = 0;
          obj['city_hall'][counter]['userid'] = 1;
          obj['city_hall'][counter]['uri'] = imageURI;
        }
        else{
          var counter = Object.keys(obj['city_hall']).length;
          obj['city_hall'][counter] = {userid:1, uri:imageURI};
        }

        var jsonString = JSON.stringify(obj);
        localStorage.setItem("places", jsonString);

        var tags = ""
        var dropdowntags = ""
        counter = counter + 1;
        for(i = 0; i < counter; i++){
            //tags = tags + "<img src='" + obj['city_hall'][i]['uri'] + "' height=100 width=100 />";
            tags = tags +"<a href='#'>" +
            "<img class='thumb' src=" + obj['city_hall'][i]['uri'] + " width=100 height=100 />" +
            "<img class='big' src=" + obj['city_hall'][i]['uri'] + " width=200 height=200 />" +
            "</a>";
            dropdowntags = dropdowntags + "<img src=" + obj['city_hall'][i]['uri'] + " width=100 height=80 /><label>This is our description!</label>";
        }
        //document.getElementById("pictureslider").innerHTML = tags;
        //document.getElementById("myDropdown").innerHTML = dropdowntags;
      },
      function( message ) {
        alert( message );
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true
      });
    },


    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
  myFunction: function() {
    document.getElementById("myDropdown").classList.toggle("show");
  },

  getPlaces: function(){
      $.getJSON("places.json", function(potentialJson){

      var screwit = JSON.stringify(potentialJson);

      localStorage.setItem("convertThis", screwit);
    });

    var obj = JSON.parse(localStorage.getItem("convertThis"));
    var table = "";

    for(i = 0; i < counter; i++){
      table = table + "<table><tr><td><img src='" + obj['places'][i]['pic'] + "' alt='Upload image' /></td><td>" + obj['places'][i]['name'] + "</td></tr></table>";
    }
    document.getElementById("myDropdown").innerHTML = table;
  }
};
