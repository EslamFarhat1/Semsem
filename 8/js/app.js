//  define our maps boudry and info and map itself

let bounds, info, map;

//decalre my favourite locations 
const locations = [
    {
        title: 'Banha City',
        location: {
            lat: 30.465993,
            lng: 31.184831
        },
        about: ' Banha City in egypt' + '<br>' +
            '<img src="img/banha.jpg" alt="banha city">'
        },

    {
        title: 'cairo City',
        location: {
            lat: 30.044420,
            lng: 31.235712
        },
        about: ' cairo City in egypt' + '<br>' +
            '<img src="img/cairo.jpg" alt="cairo City">'
        },
    {
        title: 'new cairo city',
        location: {
            lat: 30.0074133,
            lng: 31.491318
        },
        about: ' new cairo city in egypt' + '<br>' +
            '<img src="img/newcairo.jpg" alt="new cairo city">'
        },
    {
        title: 'El Obour City',
        location: {
            lat: 30.228341,
            lng: 31.479895
        },
        about: ' El Obour City' + '<br>' +
            '<img src="img/elobour.jpg" alt="banha city">'
        },
    {
        title: 'sphinx international airport',
        location: {
            lat: 30.115946,
            lng: 30.910808
        },
        about: ' sphinx international airport' + '<br>' +
            '<img src="img/sphinx.jpg" alt="banha city">'
        }

    ];

//starting marker
let marker = function (inf) {
    const self = this;
    this.title = inf.title;
    this.about = inf.about;
    this.position = inf.location;

    this.visible = ko.observable(true);


    this.marker = new google.maps.Marker({

        position: this.position,
        title: this.title,
        about: this.about,
        animation: google.maps.Animation.DROP
    });

    // implement a function which set cotnent and show info
    function populateInfo(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('none');
            infowindow.marker = marker;
            const wikipediaSource = 'https://en.wikipedia.org/wiki/' + marker.title;
            const wikipediaURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + marker.title;
            $.ajax({
                type: 'Get',
                dataType: 'jsonp',
                data: {},
                url: wikipediaURL
            }).done(function (response) {
                console.log(marker);
                const extract = response.query.pages[Object.keys(response.query.pages)[0]].extract;
                infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<br> (check the source: : ' + '<a href=' + wikipediaSource + '> Wikipedia site: </a>' + marker.about + '</div>');
            }).fail(function () {
                alert('unexpected error');
            });
            infowindow.open(map, marker);
            infowindow.addListener('closeclick', function () {
                infowindow.close();
                if (infowindow.marker !== null)
                    infowindow.marker.setAnimation(null);
                infowindow.marker = null;
            });

        }
    }



    // fit Bounds 
    self.filterMarkers = ko.computed(function () {
        if (self.visible() === true) {
            self.marker.setMap(map);
            bounds.extend(self.marker.position);
            map.fitBounds(bounds);
        } else {
            self.marker.setMap(null);
        }
    });

    this.marker.addListener('click', function () {
        populateInfo(this, info);
        map.panTo(this.getPosition());
        toggleBounce(this);
    });

    //toggle animation
    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 1300);
        }
    }

    // error handling method
    function errorHandle() {
        alert(" please try again and be sure of your internet connection");
    }




    this.bounce = function (place) {
        google.maps.event.trigger(self.marker, 'click');
    };
    this.view = function (location) {
        google.maps.event.trigger(self.marker, 'click');
    };
};




//  viewmodel function 
const ViewModel = function () {
    const self = this;
    this.FilteredItem = ko.observable('');
    this.itemList = ko.observableArray([]);
    // add markers to each of  location
    locations.forEach(function (location) {
        self.itemList.push(new marker(location));
    });
    // show locations on map
    this.locationList = ko.computed(function () {
        const searchFilter = self.FilteredItem().toLowerCase();
        if (searchFilter) {
            return ko.utils.arrayFilter(self.itemList(),
                function (location) {
                    const plc = location.title.toLowerCase();
                    const res = plc.includes(searchFilter);
                    location.visible(res);
                    return res;
                });
        }
        this.itemList().forEach(function (location) {
            location.visible(true);
        });
        return self.itemList();
    }, this);

};


// initMap function which intialize  map
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.465993,
            lng: 31.184831
        },
        zoom: 15

    });
    info = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();
    ko.applyBindings(new ViewModel());
}