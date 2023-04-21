var map, marker, infowindow;
var infowindowOpen = 0;
$(document).ready(function(){
  initMap();
  $(window).on("scroll",scrolled);
  scrolled();
  $('#menuBurger,nav a,a[href="#top"]').on("click",menu);
  $('#annonce_teleconsultation').on("click",function(){
    $('#teleconsultation').css("display","flex").addClass("reveal");
  });
  $('.croix').on("click",function(){
    $('#teleconsultation').css("display","").removeClass("reveal");
  });
  $('.croix_calendly').on("click",function(){
    $('.calendly-inline-widget').css("display","").removeClass("reveal");
  });
  $('.calendly').on("click",function(){
    $('.calendly-inline-widget').css("display","flex").addClass("reveal");
  });
  $('a').on("click",function(){
		$('html, body').animate({scrollTop: $($(this).attr('href')).offset().top-$('header').height()-20+1}, 750);
    return false;
	});
  $('.container_sign_hypnose a.sign').on("click",function(){
    var index = 2;
    if($(this).attr('href') == "#tarifHypnose"){
      index = 0;
    }
    else if($(this).attr('href') == "#tarifTabac"){
      index = 1;
    }
    setTimeout(function(){
      $('.container_prix').eq(index).css("transform","scale(1.2)");
      setTimeout(function(){
        $('.container_prix').eq(index).css("transform","");
      }, 1000)
    }, 750)
  });
});

function scrolled(reload){
  var scrolledTop = $(window).scrollTop();
  var screenH = $(window).height();
  $('#intro p').css("transform","translateY(-"+scrolledTop/4+"px)");
  $('section').each(function(index){
    var sectionOffsetTop = $(this).offset().top;
    if(scrolledTop >= sectionOffsetTop-screenH*0.85){
      $(this).addClass("reveal");
    }
    else if(scrolledTop < sectionOffsetTop-screenH){
      $(this).removeClass("reveal");
    }
    if(scrolledTop > sectionOffsetTop-screenH*0.08-20 && scrolledTop < sectionOffsetTop+$(this).height()+screenH*0.02-20 && index > 0){
      $('nav a')[index-1].style.color = "#5aafc6";
    }
    else if(index > 0){
      $('nav a')[index-1].style.color = "";
    }
  });
  if(reload != 1){
    setTimeout(function(){
      scrolled(1);
    }, 1000)
  }
  if(infowindowOpen == 0 && scrolledTop >= $('#map').offset().top+$('#map').height()/2-$(window).height()){
    infowindowOpen = 1;
    infowindow.open(map, marker);
  }
}

function menu(){
  if($(window).outerWidth() <= 1200){
    if($('nav').attr("style") == "transform: translateX(-100%);" || $(this).attr("href") == "#top"){
      $('#menuBurger').removeAttr('class');
      $('nav').css("transform","");
    }
    else{
      $('#menuBurger').toggleClass('open');
      $('nav').css("transform","translateX(-100%)");
    }
  }
}

function initMap(){
	map = new google.maps.Map(document.getElementById('map'),
	{
		center: {lat: 50.517300, lng: 3.0158500},
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.HYBRID,
	});
	marker = new google.maps.Marker
	({
		position: {lat: 50.517300, lng: 3.0158500},
		map: map,
		animation: google.maps.Animation.DROP,
		title: "Phalempin",
	});
	infowindow = new google.maps.InfoWindow({
    content: '<div id="container_infowindow">'+
						   '<img src="images/cabinet-phalempin.jpg" alt="Cabinet Phalempin" />'+
						   '<figure><a href="https://goo.gl/maps/eqkvEYV8zdz" target="_blank"><img src="images/itineraire.png" alt="ITINERAIRE" /><figcaption class="lien">ITINÉRAIRE</figcaption></a></figure>'+
						 '</div>',
  });
	marker.addListener('click',function(){
    infowindow.open(map, marker);
  });
};
