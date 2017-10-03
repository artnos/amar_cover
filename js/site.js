$( document ).ready(function() {
var xsBreak = 480;
var smBreak = 767;
var mdBreak = 992;
var mobileBreak= 1024;
var lrgBreak = 1200;

enquire.register("screen and (min-width: 1040px)", {
      match : function() {
              console.log('desktop');
              // $('.nav-switch').on('click', function(){
              //   $('#wrapper').toggleClass('nav-close nav-open');
              //   console.log('click desktop');
              // });
      },  
      unmatch : function() {
              console.log('mobile');       
              // $('#wrapper').addClass('nav-close');
              // $('.nav-switch').on('click', function(){
              //   $('#wrapper').toggleClass('nav-close nav-open');
              //   console.log('click mobile');
              // });
 
      }
  });

$('.nav-switch').on('click', function(){
                console.log('swith');
                console.log($(window).width() + '::' + mobileBreak);
                if($(window).width() < (mobileBreak - 14) ) {
                    $('#wrapper').toggleClass('mobile-open');
                } else{
                    $('#wrapper').toggleClass('nav-close nav-open');
                }
               $('#wrapper').removeClass('search-open');

});
 
   

var myTimer, sideTouched;
$(".parent-btn").hover(
        function(){
            var thisdiv = jQuery(this).attr("data-z")
            jQuery(thisdiv).collapse("show");
            //sideTouched = true;
        },
        function(){
            // var thisdiv = jQuery(this).attr("data-target")
            // jQuery(thisdiv).collapse("hide");
        }
);



   function closeALL() {
         $('.parent-btn').each(function(){
             var thisdiv = $(this).attr("data-z");
             $(thisdiv).collapse("hide");
         });  
     }

     function closeALL_mobile() {
           $('.parent-btn').each(function(){
               var thisdiv = $(this).attr("data-z");
               $(thisdiv).collapse("hide");
               $('#wrapper').removeClass('mobile-open');
           })  
       }

    $('#main').on('mouseenter', function(){
         myTimer = setTimeout(closeALL, 800);  
         if($(window).width() < mobileBreak ){
            myTimer = setTimeout(closeALL_mobile, 100);  

         } else{
            myTimer = setTimeout(closeALL, 800);  
         }
        
    });

    $('#side-nav').mouseenter(function() {
        clearInterval(myTimer);
        //sideTouched = false;
    });

   
    


   $(window).scroll(function(){
   	//var isHovered = $('#main').is(":hover");
    if($(window).width() < mobileBreak ){
      $('#wrapper').removeClass('mobile-open');
    } else{
    }
   	// if(isHovered){   		
    //     		$('#wrapper').removeClass('nav-open').addClass('nav-close');
    //     		$('html, body').css({
    //     		    overflow: 'auto',
    //     		    height: 'auto'
    //     		});
   	// } else {
   	// 	$('html, body').css({
   	// 	    overflow: 'hidden',
   	// 	    height: '100%'
   	// 	});
   	// }
    });



$('.message').delay(2000).fadeOut();

$('.fa-search, .search-btn, #search-window .fa-times').on('click', function(){
     //console.log('search click')
     if(!$('#wrapper').hasClass('search-open') ){
        $(".Search-input").val('');
        $('#output, #more, #count').empty();
     }

     if($('#wrapper').hasClass('nav-open')){

          $('#wrapper').toggleClass('nav-close nav-open');
          $('#wrapper').toggleClass('search-open');

     }else {
          $('#wrapper').toggleClass('search-open');
          
     }

 
 
});

var search_query;
$(".Search-input").keypress(function (e) {
     if (e.which == 13) {
         $('#output, #more, #count').empty();
         $('#output').append('<i class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></i>');
         search_query = $(".Search-input").val();
         $.getJSON( "/articles/home?page=" + 1 + '&q=' +  search_query , function( data ) {
          $('#output').empty();

          if(data.page.count != 0){
                   var items = [];
                   $.each( data.articles , function( key, val ) {
                     //console.log(key + '::' + val.id + '::' + val.title);                
                     items.push( '<li id="' + key + '"><a href="' + val.slug+ '">'+val.strip_title + '</a><a href="' + val.slug+ '">'+val.strip_body + "</a></li>" );
                   });
             
                   $( "<ul/>", {
                     "class": "",
                     html: items.join( "" )
                   }).appendTo( "#output" );
           }
           $('#count').text('There are '+data.page.count+' results that match your search');

           if(data.page.last_page == true){
            console.log('no more pages')
            } else {
              $("#more").append('<a id="more-btn" class="btn" href="/articles/home?page=' +  (1 + data.page.current_page) +  '&q=' +  search_query + '" data-page="' + (1 + data.page.current_page) +'">More</a></li>');
            }

         });



     } 
 });
$(document).on('click','#more-btn',function(e){
  //console.log( searchIndex++ );
//<i class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></i>
$('#output').append('<i class="fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></i>');
  $.getJSON( $('#more-btn').attr('href')  , function( data ) {
          $('#more').empty();
          $('#output .fa').remove();
           var items = [];
          $.each( data.articles , function( key, val ) {
                    console.log(key + '::' + val.id + '::' + val.title);                
                    items.push( '<li id="' + key + '"><a href="' + val.slug+ '">'+val.strip_title + '</a><a href="' + val.slug+ '">'+val.strip_body + "</a></li>" );
                  });

   $('#output > ul').append( items.join('') );

    
    //$("#more ul").append('<li><a id="more" href="#">More</a></li>');
    if(data.page.last_page == true){
     console.log('no more pages')
     } else {
       $("#more").append('<a id="more-btn" class="btn" href="/articles/home?page=' +  (1 + data.page.current_page) +  '&q=' +  search_query + '" data-page="' + (1 + data.page.current_page) +'">More</a></li>');
     }

  });
  
  return false;
 //handler code here
});


 $('#search-form').submit(function(e){
               e.preventDefault(e);
 })


 //contact form

   var $select = $('select');
    $select.each(function() {
        $(this).addClass('form-control status-' + $(this).children(':selected').val());
    }).on('change', function(ev) {
        $(this).attr('class', '').addClass('form-control status-' + $(this).children(':selected').val());
    });


$('#main-nav .panel-default').on('hide.bs.collapse', function () {
  // do something…
  //console.log('hide');
  $(this).find('.fa').toggleClass('fa-angle-down fa-angle-up');
});
$('#main-nav .panel-default').on('show.bs.collapse', function () {
  // do something…
 // console.log('show');
  $(this).find('.fa').toggleClass('fa-angle-down fa-angle-up');


})


$('#heroSlider').on('slide.bs.carousel', function (e) { 
  //$('#carousel-indicators-w .carousel-indicators li.active').removeClass('active');

  //4 is the image max (imageMax + currentImage - 1) % imageMax;
  var targetIndex =   $(e.relatedTarget).index();
  // var targetIndex = 4 - $(e.relatedTarget).index() % 4;
  // if(targetIndex == 4){targetIndex= 0}
  // console.log(targetIndex );
  //$('#carousel-indicators-w .carousel-indicators li').eq( targetIndex  ).addClass('active');
  $('#heroSlider').removeClass('active0 active1 active2 active3 active4').addClass('active' +  $(e.relatedTarget).index() );
});

//#amar
function checkHash(){
  var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
  console.log(hash);
  if(hash=='publications'){
    $('#learningTab a[href="#publications"]').tab('show') // Select tab by name
  }
  if(hash=='library'){
    $('#learningTab a[href="#library"]').tab('show') // Select tab by name
  }

  
}
if(window.location.hash) {
   checkHash()
} else {

}

window.onhashchange = checkHash;

//new slider mode
/*
if ($(window).width() <  smBreak) {
     $('#heroSlider .hide-on-mobile').removeClass('item').addClass('hide');
}
*/

});