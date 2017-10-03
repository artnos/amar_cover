$(function () {
    function convertToSlug(Text)
    {
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-')
            ;
    }

    $('#gen-slug').on('click', function(){
            $('input#slug').val( 
                    convertToSlug(  $.trim($('input#title').val()) )
                );
    });

    //article-index-iframe
    $('.select-url').on('click', function(){
        var target = $(this).data('target');
        $(window.parent.document).find('input#url').val(target).css({

            'background-color' : '#dff0d8'

            });
        window.parent.closeFindWindow(); 
        return false;
     });

    var tag,comma;
    $('#tag-helper .add').on("click", function(){
        tag = $.trim($('input[name=tag_string]').val() )
        console.log( $(this).html() );
        if(tag == ''){
            comma = ''
        } else {
            comma = ','
        }
        if(  $('input[name=tag_string]') )
        $('input[name=tag_string]').val($('input[name=tag_string]').val() + comma + $(this).html()  );
        //.attr('placeholder', $(this).html() );
        /* input.css('border','solid thin red'); */
        return false;
    });
   

     $('#tag-helper .clear').on("click", function(){
        $('input[name=tag_string]').val('' )
        return false;
    });

     window.closeFindWindow = function () {
          $('#find-window').removeClass('open'); 
     }

     $('#find-window .btn-gray').on('click', function(){
               $('#find-window').removeClass('open'); 
     });
     
     $('#find-image').on('click', function(){
               $('#find-window').addClass('open')
     });
     var redirect;
     $('#saveClose').click(function(event){
           redirect =  $('#addEdit').get(0).getAttribute('action') + '?redirect=/articles/index';
           //console.log(redirect);
            $('#addEdit').get(0).setAttribute('action', redirect ); //this works
            //event.preventDefault();
      });

     $('#save').click(function(event){
             //event.preventDefault();
      });


});