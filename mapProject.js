ymaps.ready(init);

/*
fetch("polskiePlacowki.json")
  .then(response => response.json())
  .then(json => console.log(json));
*/

let adresy = [];
let nazwy = [];

url = "polskiePlacowki.json";
let jsondata;
fetch(url).then(
function(u){ return u.json();}
).then(
function(json){
    for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        
        adresy.push(obj["Adres"]);
        nazwy.push(obj["Placówka"]);

        //console.log(obj["Placówka"]);
    }
    //Object.keys(json).forEach(item => console.log(item["Adres"]))
    //console.log(jsondata);
}
)

function init () {
    //let capitals = ["Amsterdam","Andorra la Vella","Ankara","Astana","Athens","Baku","Belgrade","Berlin","Bern","Bratislava","Brussels","Bucharest","Budapest","Chisinau","Copenhagen","Dublin","Helsinki","Kiev","Lisbon","Ljubljana","London","Luxembourg","Madrid","Minsk","Monaco","Moscow","Nicosia","Oslo","Paris","Podgorica","Prague","Reykjavík","Riga","Rome","San Marino","Sarajevo","Skopje","Sofia","Stockholm","Tallinn","Tbilisi","Tirana","Vaduz","Valletta","Vatican City","Vienna","Vilnius","Warsaw","Yerevan","Zagreb"]
    //let adresy = ["Via Pietro Paolo Rubens, 20", "Mauretania, Nawakszut, B.P. 6579"];
    //let nazwy = ["Ambasada Rzeczypospolitej Polskiej w Republice Włoskiej", "Konsulat Honorowy Rzeczypospolitej Polskiej w Nawakszut"];
    //let krajMiasto = ["Italy, Lombardy, Milan", "Mauretania, Nawakszut"]

for (var i = 0; i < 10; i++) {
    console.log(i);
    console.log(nazwy[i]);
    console.log(adresy[i]);
    console.log("--------------------------------");
}

var index = 0;
var arrayLength = adresy.length;
for (var i = 0; i < 10; i++) {
    //console.log(i);

    var myGeocoder = ymaps.geocode(adresy[i]);

    myGeocoder.then(
        function (res) {
            //myMap.geoObjects.add(res.geoObjects);
            

            nazwaPlacowki = nazwy[index];

            var currentObject = res.geoObjects.get(0);

            console.log(index);
            console.log(nazwaPlacowki);
            console.log(currentObject.properties.get('balloonContentBody'));

            index++;
            
            //console.log(index);
            //console.log(res.geoObjects.get(0).properties.get('balloonContentBody'));
            //console.log(res.geoObjects.get(0));
            if (currentObject != undefined) {
                currentObject.properties.set('balloonContentHeader', nazwaPlacowki);
            }

            //res.geoObjects.get(0).properties.set('balloonContentHeader', nazwaPlacowki);

            //res.geoObjects.get(0).properties.set('balloonContentBody', "Adres");
            firstGeoObject = myMap.geoObjects.add(currentObject);
            //console.log(firstGeoObject);

            /* 
            if (firstGeoObject == undefined) {
                adresy[i] = krajMiasto[i]
                //console.log(adresy[i]);
                i = i - 1;
                console.log(i);
                //continue;
              }
              */

              
              //console.log(nazwy[index]);
              
              //firstGeoObject.properties.set('balloonContentHeader', "nazwaPlacowki");
              //firstGeoObject.properties.set('balloonContentBody', "Adres");
        }
    );

}
/*

    var index = 0;
    var arrayLength = adresy.length;
    for (var i = 0; i < arrayLength; i++) {
      // Finding coordinates of an adress.
      console.log(i);
      console.log(adresy[i]);
      ymaps.geocode(adresy[i], {
          results: 1
      }).then(function (res) {
              // Selecting the first result of geocoding.
              var firstGeoObject = res.geoObjects.get(0);
              if (firstGeoObject == undefined) {
                adresy[i] = krajMiasto[i]
                console.log(adresy[i]);
                i = i - 2;
                console.log(i);
                //continue;
              }
              nazwaPlacowki = nazwy[index]
              index++;
              firstGeoObject.properties.set('balloonContentHeader', nazwaPlacowki);
              //firstGeoObject.properties.set('balloonContentBody', "Adres");
              firstGeoObject.properties.get('balloonContentBody');
              // Adding first found geo object to the map.
              myMap.geoObjects.add(firstGeoObject);


          });
    }

  */

    
    var myMap = new ymaps.Map("map", {
            center: [54.83, 37.11],
            zoom: 2
        }, {
            searchControlProvider: 'yandex#search'
        })
        /*
        myPlacemark = new ymaps.Placemark([55.907228, 31.260503], {
            // In order for the balloon and hint to open on the placemark, you need to set certain properties.
            balloonContentHeader: "The placemark balloon",
            balloonContentBody: "Content of the <em>placemark</em> balloon",
            balloonContentFooter: "Basement",
            hintContent: "The placemark hint"
        })
        */
        ;

    //myMap.geoObjects.add(myPlacemark);


}
