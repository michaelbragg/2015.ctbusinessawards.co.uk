---
sitemap:
  exclude: true
---

{% include bower_components/jquery/dist/jquery.min.js %}

/**
 * Responsive Navigation
 */
(function ( $ ) {

  $(document).ready(function() {


    $("#js-menu__icon").click(function () {
      $("#js-nav__main").toggleClass("is-active");
    });

  });

}(jQuery));

{% include bower_components/FitVids/jquery.fitvids.js %}
