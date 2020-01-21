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
  });

  $('.js-close-nav').click(function(){
   $('.js-nav-toggle').css('width','0');
   $('#overlay').css('display','none');
   $('.navigation > div').removeClass('show')
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
