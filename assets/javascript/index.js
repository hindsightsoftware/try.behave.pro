var hasRun = false;
var pulseInitiated = false;

var cloudSlider = document.getElementById('slider-handles-cloud');

noUiSlider.create(cloudSlider, {
    start: 10,
    snap: true,
    range: {
        'min': [10],
        '16.66%': [15],
        '33.32%': [25],
        '49.98%': [50],
        '66.64%': [100],
        '83.3%': [500],
        'max': [2000]
    },
    step: 10,
    connect: 'lower',
    pips: {
        mode: 'positions',
        values: [0, 10, 25, 30, 40, 50, 60, 70, 80, 90, 100],
        density: 20,
        stepped: true,
        thousand: ', '
    }
});


var cloudSliderValue = document.getElementById('cloud-slider-value');
var cloudSliderUsers = document.getElementById('cloud-slider-users');

var cloudPriceMap = {
    '10': 10,
    '15': 50,
    '25': 100,
    '50': 200,
    '100': 300,
    '500': 500,
    '2000': 1000
};

cloudSlider.noUiSlider.on('update', function( values, handle ) {
    cloudSliderUsers.innerHTML = values[handle].split('.')[0] + ' users';
    cloudSliderValue.innerHTML = cloudPriceMap[values[handle].split('.')[0]]
});

var serverSlider = document.getElementById('slider-handles-server');

noUiSlider.create(serverSlider, {
    start: 10,
    snap: true,
    range: {
        'min': [10],
        '12.5%': [25],
        '25%': [50],
        '37.5%': [100],
        '50%': [250],
        '62.5%': [500],
        '75%': [2000],
        '87.5%': [10000],
        'max': [10001]
    },
    step: 10,
    connect: 'lower',
    pips: {
        mode: 'positions',
        values: [0, 10, 25, 30, 40, 50, 60, 70, 80, 90, 100],
        density: 20,
        stepped: true,
        thousand: ', ',
        format: {to: updatePips}
    }
});

function updatePips( value, type ){

    if (value == 10001) {
        value = "10000+"
    }
    return value;
}

var serverSliderValue = document.getElementById('server-slider-value');
var serverSliderUsers = document.getElementById('server-slider-users');

var serverPriceMap = {
    '10': 100,
    '25': 600,
    '50': 1100,
    '100': 2000,
    '250': 4000,
    '500': 6000,
    '2000': 8000,
    '10000': 10000,
    '10001': 12000
};

serverSlider.noUiSlider.on('update', function( values, handle ) {
    var users = values[handle].split('.')[0];
    if (users == 10001) {
        users = '10000+';
    }
    serverSliderUsers.innerHTML = users + ' users';
    serverSliderValue.innerHTML = serverPriceMap[values[handle].split('.')[0]];
});

cloudSlider.setAttribute('disabled', true);


function pricingSwitcher(name) {
    if ($(cloudSlider).attr('disabled') == 'disabled') {
        cloudSlider.removeAttribute('disabled');
    }
    if (pulseInterval) {
        // stop pulsing product options after first click
        clearInterval(pulseInterval);
    }
    if (!hasRun) {
        // on first click - set default values
        resetValues(10, 10);
    }
    hasRun = true;
    $('.slider-container').fadeTo('fast', 1);
    if (name == 'pricing-cloud') {
        $('#pricing-cloud button').removeAttr('disabled');
        $('#pricing-server button').attr('disabled', true);

        $('#server-pricing').hide();
        $('#cloud-pricing').show();

        $('#pricing-cloud').fadeTo('fast', 1, function() {
            $(this).addClass('active');
        });

        $('#pricing-server').fadeTo('fast', 0.2, function() {
            $(this).removeClass('active');
        });
    } else {
        $('#pricing-server button').removeAttr('disabled');
        $('#pricing-cloud button').attr('disabled', true);

        $('#cloud-pricing').hide();
        $('#server-pricing').show();

        $('#pricing-server').fadeTo('fast', 1, function() {
            $(this).addClass('active');
        });

        $('#pricing-cloud').fadeTo('fast', 0.2, function() {
            $(this).removeClass('active');
        });
    }
}

function resetValues(users, price) {
    cloudSliderValue.innerHTML = price;
    cloudSliderUsers.innerHTML = users + ' users';
    serverSliderValue.innerHTML = price;
    serverSliderUsers.innerHTML = users + ' users';
}

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

var pulseInterval = null;

function handlePulse() {
    if (isElementInViewport($('#pricing-cloud')) && !pulseInitiated) {
        initiatePulse();
    }
}

function initiatePulse() {
    pulseInitiated = true;
    setTimeout(function() {
        activatePulse();
        pulseInterval = setInterval(function() {
            activatePulse();
        }, 5000);
    }, 1000);
}

function activatePulse() {
    $('#pricing-cloud').transition('bounce');
    setTimeout(function () {
        $('#pricing-server').transition('bounce');
    }, 500);
}

$(document).on('scroll', handlePulse);
resetValues(0, 0);

function resizeCloud() {
    $('.jira-server').css({
        height: $('.jira-cloud').height()
    });
}

$(document).ready(resizeCloud);
$(window).resize(resizeCloud);

$('.menu .item')
  .tab()
;
