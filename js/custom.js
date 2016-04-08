jQuery(document).ready(function($){
	
	function goToByScroll(id){
	      // Remove "link" from the ID
	    id = id.replace("link", "");
	      // Scroll
	    $('html,body').animate({
	        scrollTop: $("#"+id).offset().top},
	        'slow');
	}
	
	$('.nav > li > a').click(function(){
		
		goToByScroll($(this).attr('class'));
				
	});
		
});	



/* -------------------- Check Browser --------------------- */

function browser() {
	
	//var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
	//var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	    // At least Safari 3+: "[object HTMLElementConstructor]"
	var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
	//var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

	function testCSS(prop) {
	    return prop in document.documentElement.style;
	}
	
	if (isSafari || isChrome) {
		
		return true;
		
	} else {
		
		return false;
		
	}
	
}


/* -------------------- Search --------------------- */

jQuery(document).ready(function($){
	
	$('.search > :input').on('keyup',function(){
		
		$(this).attr('class', 'activeSearch');

		var count;
		var timeToEnd = 1000;

		$(':input').keydown(function(){

			clearTimeout(count);

			count = setTimeout(endCount, timeToEnd);

		});

	});

	function endCount(){

		$('.search > :input').attr('class','search-form');

	}

});

/* -------------------- Buttons 3D Style --------------------- */

jQuery(document).ready(function($){

	$(':button').each(function(){

		if($(this).hasClass('btn')) {

			$(this).wrap('<div class="btn-overlay" />');

			var inner = $(this).html();
			
			if(browser()) {

				$(this).html('<span>' + inner + '</span>');
				
			}	

		}

	});
	
		
	$('a').each(function(){

		if($(this).hasClass('btnOverlay')) {
			
			$(this).wrap('<div class="btn-overlay" />');

			var inner = $(this).html();
			
			if(browser()) {

				$(this).html('<span>' + inner + '</span>');
				
			}	

		}

	});

});

	
	/* ------------------- Fancybox --------------------- */

	(function() {

		$('[rel=image]').fancybox({
			type        : 'image',
			openEffect  : 'fade',
			closeEffect	: 'fade',
			nextEffect  : 'fade',
			prevEffect  : 'fade',
			helpers     : {
				title   : {
					type : 'inside'
				}
			}
		});

		$('[rel=image-gallery]').fancybox({
			nextEffect  : 'fade',
			prevEffect  : 'fade',
			helpers     : {
				title   : {
					type : 'inside'
				},
				buttons  : {},
				media    : {}
			}
		});


	})();
	
	
	/* ------------------- Client Carousel --------------------- */

	$('.clients-carousel').flexslider({
	    animation: "slide",
		easing: "swing",
	    animationLoop: true,
	    itemWidth: 200,
	    itemMargin: 1,
	    minItems: 1,
	    maxItems: 8,
		controlNav: false,
		directionNav: false,
		move: 2
      });


	/* ------------------ Back To Top ------------------- */

	jQuery('#under-footer-back-to-top a').click(function(){
		jQuery('html, body').animate({scrollTop:0}, 300); 
		return false; 
	});
	

	/* --------------------- Tabs ------------------------ */	

		(function() {

			var $tabsNav    = $('.tabs-nav'),
				$tabsNavLis = $tabsNav.children('li'),
				$tabContent = $('.tab-content');

			$tabsNav.each(function() {
				var $this = $(this);

				$this.next().children('.tab-content').stop(true,true).hide()
													 .first().show();

				$this.children('li').first().addClass('active').stop(true,true).show();
			});

			$tabsNavLis.on('click', function(e) {
				var $this = $(this);

				$this.siblings().removeClass('active').end()
					 .addClass('active');

				$this.parent().next().children('.tab-content').stop(true,true).hide()
															  .siblings( $this.find('a').attr('href') ).fadeIn();

				e.preventDefault();
			});

		})();
		
			

/* ------------------ Tooltips ----------------- */

jQuery(document).ready(function() {

    $('.tooltips').tooltip({
      selector: "a[rel=tooltip]"
    })

});

/* ------------------ Progress Bar ------------------- */	

jQuery(document).ready(function($){
	
	$(".meter > span").each(function() {
		$(this)
		.data("origWidth", $(this).width())
		.width(0)
		.animate({
			width: $(this).data("origWidth")
		}, 1200);
	});
});

/* ------------------ Image Overlay ----------------- */

jQuery(document).ready(function () {
	
	$('.picture').hover(function () {
		$(this).find('.image-overlay-zoom, .image-overlay-link').stop().fadeTo(150, 1);
	},function () {
		$(this).find('.image-overlay-zoom, .image-overlay-link').stop().fadeTo(150, 0);
	});
	
});

/* -------------------- Isotope --------------------- */

jQuery(document).ready(function () {
	
	$('#portfolio-wrapper').imagesLoaded(function() {
		
		var $container = $('#portfolio-wrapper');
			$select = $('#filters select');

		// initialize Isotope
		$container.isotope({
		// options...
		resizable: false, // disable normal resizing
		// set columnWidth to a percentage of container width
	  	masonry: { columnWidth: $container.width() / 12 }
		});

		// update columnWidth on window resize
		$(window).smartresize(function(){
		
			$container.isotope({
			// update columnWidth to a percentage of container width
			masonry: { columnWidth: $container.width() / 12 }
			});
		});


		$container.isotope({
			itemSelector : '.portfolio-item'
		});

		$select.change(function() {
			
			var filters = $(this).val();

				$container.isotope({
					filter: filters
				});
			
			});

			var $optionSets = $('#filters .option-set'),
		  	$optionLinks = $optionSets.find('a');

		  	$optionLinks.click(function(){
			
				var $this = $(this);
				// don't proceed if already selected
				if ( $this.hasClass('selected') ) {
			  		return false;
				}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');

			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}

			return false;
			
		  });
		
	});
	
});