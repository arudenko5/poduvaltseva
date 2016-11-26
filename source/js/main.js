/* Ебанем слайдер */
(function(){
    $(document).ready(function() {

        $(".letters-slider").owlCarousel({

            autoPlay: 3000, //Set AutoPlay to 3 seconds

            items : 4,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [979,3]

        });

    });
})();


(function(){
    $(document).ready(function() {
        var $cases = $(".cases");

        $cases.owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 3,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            dots: false
        });

        /*$(".js-cases-next").on('click', function(){
            console.log('next');
            $cases.trigger('owl.next');
        });

        $(".js-cases-prev").on('click', function(){
            console.log('prev');
            $cases.trigger('owl.prev');
        });*/

    });
})();


