// google map initialization
function initMap(){
	var eisen_location = {lat: 48.18331, lng: 17.923645};
	
	var map = new google.maps.Map(document.getElementById('my_gmap'), {
		zoom: 12,
		
		center: eisen_location,
		
		styles: [{ 
			stylers: [{
				saturation: -100
			}]
		}],
		
		disableDefaultUI: true
	});
	
	var marker = new google.maps.Marker({
	  position: new google.maps.LatLng(eisen_location),
	  map: map
	});
	
	// console.log("google map has been initialized");
};

























