var appViewModel;

// array of Craft Beer & wine locations in Huntsville, AL
var locationsBeerWine = [
    {
        title: "Stem & Stein",
        category: "Wine Bar",
        location: {
            lat: 34.691411,
            lng: -86.785807
        }

	},
    {
        title: "Below the Radar Brewing Company",
        category: "Beer",
        location: {
            lat: 34.732857,
            lng: -86.585449
        }
	},

    {
        title: "Church Street Wine Shoppe",
        category: "Wine Bar",
        location: {
            lat: 34.735868,
            lng: -86.592468
        }
	},

    {
        title: "SiP",
        category: "Wine Bar",
        location: {
            lat: 34.732910,
            lng: -86.585374
        }
	},
    {
        title: "Wish You Were Beer",
        category: "Beer",
        location: {
            lat: 34.756586,
            lng: -86.724654
        }
	},
    {
        title: "Blue Pants Brewery",
        category: "Beer",
        location: {
            lat: 34.685157,
            lng: -86.738995
        }
	},
    {
        title: "Yellowhammer Brewery",
        category: "Beer",
        location: {
            lat: 34.721772,
            lng: -86.605468
        }
	},
    {
        title: "Green Bus Brewery",
        category: "Beer",
        location: {
            lat: 34.730097,
            lng: -86.583839
        }
	},
    {
        title: "Salty Nut Brewery",
        category: "Beer",
        location: {
            lat: 34.722552,
            lng: -86.603749
        }
	},
    {
        title: "Cork & Crust",
        category: "Wine Bar",
        location: {
            lat: 34.732164,
            lng: -86.786916
        }
	},
    {
        title: "Grille 29",
        category: "Wine Bar",
        location: {
            lat: 34.754318,
            lng: -86.692699
        }
	},

    {
        title: "Rocket Republic Brewing Company",
        category: "Beer",
        location: {
            lat: 34.672810,
            lng: -86.773962
        }
	}
];



// create a map variable that will be used in initMap()
var map;

// create array for listing markers in map
var markers = [];

// initialize map
function initMap() {
    // intial map view when loaded
    var myLatLng = {
        lat: 34.725619,
        lng: -86.722932

    };
    // create a map object and get map from DOM for display
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 12
    });
    // attach a click event listener to the marker objects and open an info window on click
    // creates infowindow for each place pin
    var infoWindow = new google.maps.InfoWindow();

    // iterates through all locations and drop pins on every single location
    for (j = 0; j < locationsBeerWine.length; j++) {
        (function () {
            // store title,category and location iteration in variables
            var title = locationsBeerWine[j].title;
            var location = locationsBeerWine[j].location;
            var category = locationsBeerWine[j].category;

            // drop marker after looping
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: title,
                category: category,
                animation: google.maps.Animation.DROP,
                address: address
            });
            // pushes all locations into markers array
            markers.push(marker);

            appViewModel.myLocations()[j].marker = marker;

            // Create an onclick event to open an infowindow at each marker.
            marker.addListener("click", function () {
                // show info inside infowindow when clicked
                populateInfoWindow(this, infoWindow);
                // displays all data retrieved from foursquare api down below
                infoWindow.setContent(contentString);
            });

            // This function populates the infowindow when the marker is clicked. We'll only allow
            // one infowindow which will open at the marker that is clicked, and populate based
            // on that markers position.
            function populateInfoWindow(marker, infoWindow) {
                // Check to make sure the infowindow is not already opened on this marker.
                if (infoWindow.marker != marker) {
                    infoWindow.marker = marker;
                    infoWindow.setContent(
                        '<div class="title">' +
                        marker.title +
                        "</div>" +
                        marker.contentString
                    );
                    // sets animation to bounce 2 times when marker is clicked
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        marker.setAnimation(null);
                    }, 2130);
                    infoWindow.open(map, marker);
                    // Make sure the marker property is cleared if the infowindow is closed.
                    infoWindow.addListener("closeclick", function () {
                        infoWindow.setMarker = null;
                    });
                }
            } // end of populateInfoWindow

            // foursquare client-id and client-secret
            var client_id = "MXCSJXSSP0N1ZY4WH20USJTOYQYUIVZGPLBFDPUIDGCOLX4K";
            var client_secret = "1RE3ZDEMLT24SEBGN3DOFFCFN4MFV2XAJVBNUL1FC1LSCTGL";

            // foursquare api url
            var foursquareUrl = "https://api.foursquare.com/v2/venues/search"; // + marker.position.lat() + "," + marker.position.lng();
            // creating variables outside of the for ajax request for faster loading
            var venue, address, category, foursquareId, contentString;

            // ajax request - foursquare api data (https://developer.foursquare.com/docs/)
            $.ajax({
                //	type: 'GET',
                url: foursquareUrl,
                dataType: "json",
                data: {
                    client_id: client_id,
                    client_secret: client_secret,
                    query: marker.title, // gets data from marker.title (array of object)
                    ll: "34.7240, -86.4997",
                    v: 20180323 // version equals date
                },
                success: function (data) {
                    // console.log(data);
                    // get venue info
                    venue = data.response.venues[0];
                    // get venue address info
                    address = venue.location.formattedAddress[0];
                    // get venue category info
                    category = venue.categories[0].name;
                    // gets link of place
                    foursquareId = "https://foursquare.com/v/" + venue.id;
                    // populates infowindow with api info
                    contentString =
                        "<div class='name'>" +
                        "Name: " +
                        "<span class='info'>" +
                        title +
                        "</span></div>" +
                        "<div class='category'>" +
                        "Category: " +
                        "<span class='info'>" +
                        category +
                        "</span></div>" +
                        "<div class='address'>" +
                        "Location: " +
                        "<span class='info'>" +
                        address +
                        "</span></div>" +
                        "<div class='information'>" +
                        "Foursquare: " +
                        "<a href='" +
                        foursquareId +
                        "'>" +
                        "Click here" +
                        "</a></div>";

                    marker.contentString;
                },
                error: function () {
                    contentString =
                        "<div class='name'>Data is currently not available. Please try again.</div>";
                }
            });
        })(j);
    } // end of for loop through markers [j]
}




function mapError() {
    alert("Map could not be loaded at this moment. Please try again");
}

// Location Constructor
var Location = function (data) {
    var self = this;
    this.title = data.title;
    this.location = data.location;
    this.category = data.category;
    this.show = ko.observable(true);
};

// VIEW MODEL //
var AppViewModel = function () {
    var self = this;
    // define Location observable array () // Observables and Observable Arrays are JS Functions
    this.myLocations = ko.observableArray();
    this.filteredInput = ko.observable("");
    // this.locationsList = ko.observableArray();

    for (i = 0; i < locationsBeerWine.length; i++) {
        var place = new Location(locationsBeerWine[i]);
        self.myLocations.push(place);
    }

    // from http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    this.searchFilter = ko.computed(function () {
        var filter = self.filteredInput().toLowerCase(); // listens to what user types in to the input search bar
        // iterates through myLocations observable array
        for (j = 0; j < self.myLocations().length; j++) {
            // it filters myLocations as user starts typing
            if (
                self
                .myLocations()[j].category.toLowerCase()
                .indexOf(filter) > -1
            ) {
                self.myLocations()[j].show(true); // shows locations according to match with user key words
                if (self.myLocations()[j].marker) {
                    self.myLocations()[j].marker.setVisible(true); // shows/filters map markers according to match with user key words
                }
            } else {
                self.myLocations()[j].show(false); // hides locations according to match with user key words
                if (self.myLocations()[j].marker) {
                    self.myLocations()[j].marker.setVisible(false); // hides map markers according to match with user key words
                }
            }
        }
    });

    // map marker bounces when location is clicked on list
    // https://developers.google.com/maps/documentation/javascript/events
    this.showLocation = function (locations) {
        google.maps.event.trigger(locations.marker, "click");
    };
};

// instantiate the ViewModel using the new operator and apply the bindings (aka activate KO)
appViewModel = new AppViewModel();

// activate knockout apply binding
ko.applyBindings(appViewModel);
