//adicionar listener para contornar a restricao de declaracao inline
document.getElementById("pesquisa").addEventListener("click", searchRecycling);
document.getElementById("queryInput").addEventListener("keypress", searchRecycling);

 function getCoordinates() {
    var cityName = document.getElementById("cityNameInput").value;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + cityName + '&key=AIzaSyB3aaLchT5jq7fdnvlbn7qoJh2dq8IVGwQ&libraries')
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK") {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;
                document.getElementById("latitudeInput").value = lat;
                document.getElementById("longitudeInput").value = lng;
            } else {
                alert("Não foi possível encontrar a cidade ou houve um erro na requisição.");
            }
        })
        .catch(error => {
            console.error('Houve um erro na requisição:', error);
        });
    }

    function searchRecycling() {
            var lat = parseFloat(document.getElementById("latitudeInput").value);
            var lng = parseFloat(document.getElementById("longitudeInput").value);

            if (isNaN(lat) || isNaN(lng)) {
                alert("Por favor, insira valores válidos de latitude e longitude.");
                return;
            }

            var center = {lat: lat, lng: lng};

            var map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: 15
            });

            var query = document.getElementById("queryInput").value + "reciclagem descarte lixo" ;

            var request = {
                location: center,
                radius: '500',
                query: query
            };

            var service = new google.maps.places.PlacesService(map);
            service.textSearch(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        new google.maps.Marker({
                            map: map,
                            position: place.geometry.location
                        });
                    }
                    map.setCenter(results[0].geometry.location);
                }
            });
        }
           
        