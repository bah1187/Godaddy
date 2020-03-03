/* =========================================================================
global variables
========================================================================== */
//watchers for major breakpoint changes - move from small screen to large screen layout/styles
//these match up to
(function () {
    var mq = {
        end: window.matchMedia("(max-width: 799px)")
    }

    //container ID/class names called by specific functions
    var selectors = {
        searchForm: '.search-form',
        advancedSearchForm: '.advanced-search-form',
        pageWrap: '#page',
        socialShare: '.social-share',
        socialShareMore: '.share-more'
    }

/* =========================================================================
search form panel
========================================================================== */
    //make search form expandable only on small screens
    function searchFormExpandable() {
        if (mq.end.matches) {
            $(selectors.searchForm).expandable('revive');
            $(selectors.advancedSearchForm).expandable('revive');
        }
        else {
            $(selectors.searchForm).expandable('kill');
            $(selectors.searchForm).children('div').removeAttr('style');
            $(selectors.advancedSearchForm).expandable('kill');
            $(selectors.advancedSearchForm).children('div').removeAttr('style');
        }
        return;
    }
    searchFormExpandable();
    mq.end.addListener(searchFormExpandable);

/* =========================================================================
slideout filters for search results on small screens
========================================================================= */
    if ($('#search-results').length == 1) window.APP.MODELS.FilterSlideOut.create({
        breakpoint: 800,
        animationSpeed: 200,
        pageWrapId: 'page',
        filterType: 'search',
        openToggle: 'Filter Results',
        closeToggle: 'Close'
    });

/* =========================================================================
social share open/close toggle
========================================================================== */
    $(selectors.socialShare)
        .on('click', selectors.socialShareMore, function () {
            var parent = $(this).parents(selectors.socialShare);
            parent.toggleClass('share-open');
            var moreText = $(this).attr('data-more-text');
            var lessText = $(this).attr('data-less-text');
            //on large screens, move the second list items into the first list, instead of sliding the list down
            if (parent.hasClass('share-open')) {
                $(this).text(lessText);
            }
            else {
                $(this).text(moreText);
            }
            return;
        });
})();

/* =========================================================================
Nav Toggles
========================================================================== */

$(document).ready(function(){

  $('.js-nav-button').click(function(){

    if ( $(window).width() < 800) {
      $('.js-nav-toggle').css('width','100%');
    }
    else {
      $('.js-nav-toggle').css('width','625px');
    }

   $('#overlay').css('display','block');
   $('.navigation > div').addClass('show')
   $('body').css('overflow','hidden');
  });

  $('.js-close-nav').click(function(){
   $('.js-nav-toggle').css('width','0');
   $('#overlay').css('display','none');
   $('.navigation > div').removeClass('show')
   $('body').css('overflow','auto');
  });

  $('.js-sub-nav-button').click(function(){
   $(this).parent().next('.js-sub-nav').slideToggle('fast');
   $(this).toggleClass('active');
  });

});

/* =========================================================================
footer Toggles
========================================================================== */
$(document).ready(function(){

  $('.js-footer-button').click(function(){
   $(this).next('.footer__list').slideToggle('fast');
   $(this).toggleClass('active');
  });

});

/* =========================================================================
filter toggle close & open
========================================================================== */
$(function() {

   // $('#search-filters .expandable-parent').click(function(){
   //    $('.search-filter-list').not($(this).next()).removeClass('expandable-childlist-open');
   //    $('#search-filters .expandable-parent').not($(this)).removeClass('expandable-child-open');
   //    $('.search-filter-list').not($(this).next().attr('aria-hidden' , 'true'));
   //    $('.search-filter-list').not($(this).next().attr('aria-expanded' , 'false'));
   //
   //  });

    function closeFilter() {
      $('.search-filter-list').not($(this).next()).removeClass('expandable-childlist-open');
      $('#search-filters .expandable-parent').not($(this)).removeClass('expandable-child-open');
      $('.search-filter-list').not($(this).next().attr('aria-hidden' , 'true'));
      $('.search-filter-list').not($(this).next().attr('aria-expanded' , 'false'));
    }

    $('#search-filters .expandable-parent').click(closeFilter);

});




/* =========================================================================
Close dropdown on click outsdie
========================================================================== */

// $(document).ready( function(){

// $(document).click( function(){
//     $('.filter-label').removeClass('expandable-childlist-open');
//     $('.expandable-parent').removeClass('expandable-child-open');
//     $('.search-filter-list').removeClass('expandable-childlist-open');
// });
// });

// window.onclick = function(event) {
//   if (!event.target.matches('.expandable-parent')) {
//     var dropdowns = document.getElementsByClassName("search-filter-list");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('expandable-childlist-open')) {
//         $(".expandable-child-open").click();
//       }
//     }
//   }
// }


/* =========================================================================
Lazy Load Video
========================================================================== */

$(".lazy-video a").click(function(e){
    e.preventDefault();
    var vidURL = $(this).attr('href');
    var imgURL = $(this).find('img').attr('src');
    var imgAlt = $(this).find('img').attr('alt');
    var newVideo = '<div class="video-wrapper"><iframe src="' + vidURL + '?rel=0&autoplay=1&cc_load_policy=1&enablejsapi" allow="autoplay; fullscreen" title="' + imgAlt + '"></iframe></div>';
    resetLazyVideo();
    $(this).parent().addClass('active').append(newVideo);
})
// If a video is playing already, and a visitor clicks on another video on the same page, it will destroy the initial video and then load the new one.
function resetLazyVideo(){
  $('div.lazy-video.active').each(function(i){
    $(this).removeClass('active').find('div.video-wrapper').remove();
  })
}


/* =========================================================================
Bar Graph
========================================================================== */

(function($) {
 function generateBarGraph(wrapper) {
   // Set Up Values Array
   var values = [];

   // Get Values and save to Array
   $(wrapper + ' .bar').each(function(index, el) {
     values.push($(this).data('value'));
   });

   // Get Max Value From Array
     // Got .4 because graph starts at $.8 and ends at $1.20          working with $.40
   var max_value = 0.4;

   // Set width of bar to percent of max value
   $(wrapper + ' .bar').each(function(index, el) {
     var bar = $(this),
         value = bar.data('value'),
       //Minus .8 becuase chart starts at a minimum of $.80
         percent = Math.ceil(((value - 0.8) / max_value) * 100);

     // Set Width & Add Class
     bar.width(percent + '%');
     bar.addClass('in');
   });
 }

 // Generate the bar graph on window load...
 $(window).on('load', function(event) {

   generateBarGraph('#dashboard-stats');

 });
})(jQuery); // Fully reference jQuery after this point.



/* =========================================================================
Tabbed Content
========================================================================== */


$(document).ready(function(){

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$(this).siblings().removeClass('current');
    $(this).parent().nextAll('.tab-content').removeClass('current');
		$(this).addClass('current');
		$("#"+tab_id).addClass('current');

	})

});
