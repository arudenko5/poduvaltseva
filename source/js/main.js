/* Ебанем слайдер */
(function(){
    $(document).ready(function() {

        $(".letters-slider").owlCarousel({

            autoPlay: 3000, //Set AutoPlay to 3 seconds

            items : 4,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [979,3]

        });

        $(".cases").owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 3
        });

    });
})();


