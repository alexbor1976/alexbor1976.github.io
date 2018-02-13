var min_height = 405; //constant value for background image & some mobile menus, in px

// initialization of my_navbar_menu_mobile
$('document').ready(initNavbarMobileMenu());
	
	
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


// initialization of my_navbar_menu_mobile
// the content of #my_navbar_menu_mobile menu will be filled from #my_navbar_menu & #my_second_links_bar
function initNavbarMobileMenu(){
	var item = {name:' ', href:'"#"'}; //temp variable with a name & href of the menu item to be process
	var items_counter = {counter:0, threshold:2}; //to calculate when we have to insert our submenu(from #my_second_links_bar)

	// var global_menu_items_count = $('#my_navbar_menu .nav-link').length;	
	// console.log('global_menu_items_count = ' + global_menu_items_count);
	
	//forming initial empty space at the beginning of the #my_navbar_menu_mobile menu 
	$('#my_navbar_menu_mobile').append('<div id="my_navbar_menu_empty_place_mobile"></div>');
	$('#my_navbar_menu_mobile').append('<div id="my_navbar_menu_first_indent_mobile"></div>');
	
	//forming general menu items from #my_navbar_menu
	$('#my_navbar_menu .nav-link').each(function(){
		items_counter.counter++;
		// console.log('items_counter.counter = ' + items_counter.counter);

		//get the current item information
		item.name = $(this).text();
		item.href = $(this).attr('href');


		//form the current item of general part of the #my_navbar_menu_mobile menu
		$('#my_navbar_menu_mobile').append(
			'<div class="my_navbar_menu_li_mobile">'+	
				'<a class="my_navbar_menu_a_mobile" href="' + item.href + '">' + item.name + '</a>' +
			'</div>');	
		
		
		if(items_counter.counter == items_counter.threshold){
			//adding a submenu from #my_second_links_bar
			initNavbarMobileSubMenu();	
		}
		
	});
	
	//forming bottom part of the #my_navbar_menu_mobile menu: phone number & pict
	if(items_counter.counter == $('#my_navbar_menu .nav-link').length){
		// console.log('adding final stub - phone number & pict');
		
		$('#my_navbar_menu_mobile').append(
		'<div id="my_navbar_menu_bottom_indent_mobile"></div>'+
		
		'<div class="align-self-center" id="my_navbar_menu_bottom_mobile">'+
			'<div class="d-flex align-items-center" id="my_navbar_menu_phone_mobile">'+
				'<div>'+
					'<img src="img/smartphone.png" style="width:12px;height:18px;" alt="phone icon" id="my_phone_pict_mobile">'+
				'</div>'+
				'<div id="my_phone_number_mobile">0917 610 774</div>'+	
			'</div>'+
		'</div>');
	}
	
	//set minimal sizes for menu & background image
	setMinHeight();
	
	//on resize check/set height of the background image for nice looking for screens with small height
	$(window).on('resize', function(){
		setBackgroundMinHeight();
	});
}


// the content of this submenu will be copied from #my_second_links_bar to my_navbar_menu_mobile
function initNavbarMobileSubMenu(){
	// console.log('adding the submenu');
			
	var item = {name:' ', href:'"#"'}; //temp variable with name & href of the menu item

	// var submenu_items_count = $('#my_second_links_bar li').length;	
	// console.log('submenu_items_count = ' + submenu_items_count);

	//forming initial empty space at the beginning of the submenu
	$('#my_navbar_menu_mobile').append('<div id="my_navbar_submenu_upper_indent_mobile"></div>');

	// forming the submenu items	
	$('#my_second_links_bar li').each(function(){
		//get the current item information
		item.name = $(this).text();
		item.name = item.name.charAt(0) + item.name.substr(1).toLowerCase();
		// console.log('item.name = ' + item.name);
		
		item.href = $(this).attr('href');
		// console.log('item.href = ' + item.href);

		//form the current item of general part of the menu - from #my_navbar_menu
		$('#my_navbar_menu_mobile').append(
			'<div class="my_navbar_submenu_li_mobile">'+
					'<a class="my_navbar_submenu_a_mobile" href="' + item.href + '">' + item.name + '</a>' +
			'</div>');	
	});

	//forming bottom empty space at the end of the submenu
	$('#my_navbar_menu_mobile').append('<div id="my_navbar_submenu_bottom_indent_mobile"></div>');
}


//sets min-height property to some elements related to my_navbar_menu_mobile
function setMinHeight(){
	var text_min_height = min_height.toString() + 'px';
	
	$('body').css('min-height', text_min_height);
	$('#my_navbar_target').css('min-height', text_min_height);
	$('#my_navbar_target_shadow').css('min-height', text_min_height);
	$('#my_navbar_menu_mobile').css('min-height', text_min_height);
	
	setBackgroundMinHeight();
}


//check/correct min height of the background image
//this function called once from setMinHeight() at the beginning and each time when the viewport changes its size
function setBackgroundMinHeight(){
	var viewport_height = $( window ).height();
	// console.log('viewport_height = ' + viewport_height);
	// console.log('background-size = ' + $('body').css('background-size'));
	
	if(viewport_height < min_height){
		//set the minimum height for the background image == the mobile menus heights
		var text_min_height = min_height.toString() + 'px';
		$('body').css('background-size', '100% ' + text_min_height);
	} else {
		//enable stretching of the background image in height automatically
		$('body').css('background-size', '100% 100%');
	}
	
	// console.log('background-size = ' + $('body').css('background-size'));
}

