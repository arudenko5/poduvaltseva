/* Ебанем слайдер */
(function(){
    $(window).on("load", function(){
        // var block_height = screen.height >= 768 ? document.documentElement.clientHeight: screen.height;
        /*var block_height = window.innerHeight;
        $(".js-first-block").css( {'height': block_height});
        console.log(screen.height);
        console.log(block_height)*/
    });
})();
(function(){
    $(document).ready(function() {

        $(".letters-slider").owlCarousel({

            autoPlay: 3000, //Set AutoPlay to 3 seconds

            items : 4,
                responsive : {
                    // breakpoint from 0 up
                    0 : {
                        items : 1,

                    },
                    480 : {
                        items : 2,

                    },
                    780 : {
                        items : 4,
                    }
                }

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
            dots: false,
            responsive : {
                // breakpoint from 0 up
                0 : {
                    items : 1,

                },
                480 : {
                    items : 2,
                },
                780 : {
                    items : 3,
                }
            }
        });

    });
})();

(function(){


        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                    center: [55.761673306976135,37.62320879895021],
                    zoom: 11,
                    controls: []
                }),
                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    hintContent: 'Юридическое бюро Аделины Подувальцевой',
                    balloonContent: 'Юридическое бюро Аделины Подувальцевой'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: '../img/marker.png',
                    // Размеры метки.
                    iconImageSize: [41, 64],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-20, -64]
                });
            myMap.behaviors.disable('scrollZoom');
            myMap.geoObjects.add(myPlacemark);
        });
})();

(function(){
    $(document).ready(function(){
        var menu_height = $('.js-header').height();
        $('.js-nav-link').click( function( e ){
            var scroll_el = $(this).data('href');

            if ($(scroll_el).length != 0) {
                $('html, body').animate({ scrollTop: $(scroll_el).offset().top - menu_height }, 500);
            }

            if($(e.target).hasClass('mobile-nav__link') && $('.js-mobile-nav').hasClass('shown')){
                $('.js-mobile-nav').removeClass('shown');
            }
            return false;
        });
    });
})();

(function(){
    $(document).ready(function(){
        $(".letter__link").fancybox({
            helpers: {
                title : {
                    type : 'float'
                },
                overlay: {
                    locked: false
                }

            }
        });
    });
})();

(function(){
    $(document).ready(function(){
        $('.js-burger').on('click', function(){
            $('.js-mobile-nav').toggleClass('shown');
        });
    });
})();

