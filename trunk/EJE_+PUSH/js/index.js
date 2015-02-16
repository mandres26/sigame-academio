var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};

function register() {
    var pushNotification = window.plugins.pushNotification;
    if (isAndroidDevice()) {
        pushNotification.register(function (result) {
            console.log('Status: ' + result);
        }, function (result) {
            alert('Error handler ' + result);
        }, {
            "senderID": "686223110686", /* Google developers project number */
            "ecb": "onNotificationGCM" /* Function name to handle notifications */
        });
    } else {
        alert('La plataforma de tu dispositivo no es android!!!');
    }
}

function onNotificationGCM(e) {
    switch (e.event) {
        case 'registered':
            alert("FELICIDADES ... SE REGISTRÓ.");
            if (e.regid.length > 0) {
                var registrationId = e.regid; //GCM Registration ID
                alert(e.regid);z
            }
            break;
        case 'message':
            alert("DEVOLVIO UN MENSAJE ...");
            // handle notification message
            break;
        case 'error':
            alert("ENDALE ... HUBO UN PROBLEMA.");
            // handle error
            break;
        default:
            alert("DEFECTO ...");
            // handle default
            break;
    }
}