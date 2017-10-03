$(function () {
   window.closeFindWindow = function () {
        $('#find-window').removeClass('open'); 
   }

   $('#find-window .btn-gray').on('click', function(){
             $('#find-window').removeClass('open'); 
   });
  
   $('#find-article').on('click', function(){
             $('#find-window').addClass('open')
   });

});