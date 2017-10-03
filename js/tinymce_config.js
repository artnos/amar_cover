  // tinymce.init({ selector:'textarea#body',
    // plugins: 'powerpaste' });
//local file picker
/* https://www.tinymce.com/docs/demo/file-picker/ */
  tinymce.init({
    selector: 'textarea#body',
    height: 500,
    theme: 'modern',
    plugins: [
      'advlist autolink lists link image charmap preview hr anchor pagebreak',
      'searchreplace wordcount visualblocks visualchars code fullscreen',
      'insertdatetime media nonbreaking save table contextmenu  directionality',
      'emoticons  paste textcolor colorpicker textpattern codesample toc',
      //'template print'   imagetools
    ],
    //insert |
    toolbar1: 'undo redo |  fontsizeselect bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ',
    toolbar2: 'link image | preview media | codesample code',
    textcolor_map: [
    "000000", "Black",
    "FDA000 ","$yellow",
    "E20A16 ","$red",
    "e9e9e9","$gray",
    "3D3938 ","$dark-gray",
    "95989A ","$light-gray",
    "E3E2DF","$lighter-gray",
    "fafafa","$white",
    "2c446a","$dark-blue"
    ],
    //toolbar3: 'print',

    // templates: [
    //   { title: 'Test template 1', content: 'Test 1' },
    //   { title: 'Test template 2', content: 'Test 2' }
    // ],
    valid_children : '+body[style],p[class|strong|em|a|#text|br|sup|sub|span]',
    remove_trailing_brs: false,
    browser_spellcheck: true,
    // content_css: [
    //  //'//fonts.googleapis.com/css?family=Merriweather:400,700|Roboto:400,700,900'
    //   //'//www.tinymce.com/css/codepen.min.css'
    // ],
     fontsize_formats: "8pt 10pt 11pt 12pt 14pt 18pt 24pt 36pt",
    //don't convert my url
    convert_urls: false,
    //relative_urls: false,
    //remove_script_host : false,
/*  */
      // enable title field in the Image dialog
      image_title: true, 
      //image_advtab: true,
      image_class_list: [
          {title: 'img-responsive', value: 'img-responsive'}
         // {title: 'Dog', value: 'dog'},
          //{title: 'Cat', value: 'cat'}
        ],
        visualblocks_default_state: true,
      image_description: true,
      image_dimensions: false,
      images_reuse_filename: true,
      // enable automatic uploads of images represented by blob or data URIs
      automatic_uploads: true,
      // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
      images_upload_url: 'postAcceptor',
      // here we add custom filepicker only to Image dialog
      file_picker_types: 'image', 
      // and here's our custom image picker
      file_picker_callback: function(cb, value, meta) {

        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        // Note: In modern browsers input[type="file"] is functional without 
        // even adding it to the DOM, but that might not be the case in some older
        // or quirky browsers like IE, so you might want to add it to the DOM
        // just in case, and visually hide it. And do not forget do remove it
        // once you do not need it anymore.

        input.onchange = function() {
          //console.log(this.files);
          var file = this.files[0];

          //meta.desc = 'cat';
          //console.log( meta ); //title

         // console.log( $('#category-id').html() );
        // console.log( document.getElementById('mceu_64') );
         // console.log( $('#mceu_64').html()  );
           var editor = window.tinymce.activeEditor;
        //get image we're editing - the src is "blob:" or "data:"
        var $img = $(editor.contentDocument).find('img[src*="blob:"],img[src*="data:"]');
                // console.log($(editor.contentDocument));
            
// $('input.mce-textbox').each(function(key, value)
// {
// console.log(key + value);
// });
          // Note: Now we need to register the blob in TinyMCEs image blob
          // registry. In the next release this part hopefully won't be
          // necessary, as we are looking to handle it internally.

          var id = file.name.split('.')[0]; // + (new Date()).getTime(); //'image'; //+ (new Date()).getTime();
          var blobCache = tinymce.activeEditor.editorUpload.blobCache;
          var blobInfo = blobCache.create(id, file);
          blobCache.add(blobInfo);

          
          // call the callback and populate the Title field with the file name
          //, image_description : 'cat' 
          cb(blobInfo.blobUri(), { title: file.name});
        };

        
        input.click();
      },
    images_upload_handler: function (blobInfo, success, failure) {
      var xhr, formData;

      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', '/articles/postAcceptor');

      xhr.onload = function() {
        var json;

        if (xhr.status != 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }

        json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }

        success(json.location);
      };


      var description = '';

      jQuery(tinymce.activeEditor.dom.getRoot()).find('img').not('.loaded-before').each(
    function() {
        description = $(this).attr("alt");
        $(this).addClass('loaded-before');
    });

      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      formData.append('description', description); //found now))

      xhr.send(formData);
    }
    

    
   });

  