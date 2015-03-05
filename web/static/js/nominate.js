---
sitemap:
  exclude: true
---

{% include bower_components/jquery-validate/dist/jquery.validate.min.js %}

/**
 * jQuery Custom Validation
 */
(function ( $ ) {

  $(document).ready(function() {

    $.validator.addMethod('category', function (value) {
                  return $('.category:checked').length > 0; }, 'Please check at least one category.');

    var checkboxes = $('.category');
    var checkbox_names = $.map(checkboxes, function(e,i) { return $(e).attr("name")}).join(" ");

        // validate signup form on keyup and submit
        $("#company-details").validate({

          rules: {

            "company[name]": {
               required: true
            },
            "company[address]": {
               required: true
            },
            "contact[name]": {
               required: true
            },
            "contact[phone]": {
               required: true
            },
            "contact[email]": {
               required: true
            },
            "contact[name]": {
               required: true
            },
            "company[formation]": {
               required: true
            },
            "company[type]": {
               required: true
            },
            "company[description]": {
               required: true
            }
          },

     // validate category checkboxes
           groups: { checks: checkbox_names },
              errorPlacement: function(error, element) {
                 if (element.attr("type") == "checkbox"){
                  error.appendTo($("#category_error"));
                 }else{
                   error.insertAfter(element);
                 }
          }
        });

  });

}(jQuery));

