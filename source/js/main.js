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

    });
})();

(function(){
    $(document).ready(function() {
        var $map = $("#map");

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
    });
})();


