/*jslint sloppy:true, browser:true, devel:true, white:true, vars:true, eqeq:true, plusplus:true */
/*global $:false, intel:false*/
/** 
 * This function runs once the page is loaded, but intel is not yet active 
 */

/**
 * Prevent Default Scrolling 
 */
var onDeviceReady = function() {                        // called when Cordova is ready
   if( window.Cordova && navigator.splashscreen ) {     // Cordova API detected
        navigator.splashscreen.hide() ;                 // hide splash screen
    }
};

document.addEventListener("deviceready", onDeviceReady, false);

//Event listener for camera
document.addEventListener("intel.xdk.camera.picture.add", onSuccess);
document.addEventListener("intel.xdk.camera.picture.busy", onSuccess);
document.addEventListener("intel.xdk.camera.picture.cancel", onSuccess);

var picturecount = 0;

function onSuccess(imageURI) {
	var pic1 = document.getElementById("usr");
	var changebutton = document.getElementById("buttonid");    

	pic1.src = imageURI; 
	localStorage.setItem("imagen", JSON.stringify({'ruta':imageURI}));
	$('nav').animate({
		left: '0'
	});

	contador = 0;
}

/**
 * onSuccess2
 **/
function onSuccess2(imageURI) {
    var pic1 = document.getElementById("usr");
    var changebutton = document.getElementById("buttonid");    
        
    pic1.src = imageURI; 
    localStorage.setItem("imagen", JSON.stringify({'ruta':imageURI}));
    $('nav').animate({
        left: '0'
    });
}

/**
 * onFail
 **/
function onFail(message) {
    console.log("Picture failure: " + message);
}

/**
 * takepicture
 **/
function takepicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50, 
        destinationType: 
        Camera.DestinationType.FILE_URI, 
        saveToPhotoAlbum: true 
    });
}

/**
 * Config de cam
 **/
function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    
    return options;
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: openFilePicker
 * @version:  1
 * @descripcion:
 **/
function openFilePicker() {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    
    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        onSuccess2(imageUri);
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: compartirFacebook
 * @version:  1
 * @descripcion: Funcion compartir en Facebook
 **/
function compartirFacebook() {
    
    swal({
        title: 'Abriendo cámara',
        text: 'Recuerda aceptar los permisos',
        timer: 2000,
        onOpen: () => {
            swal.showLoading()
        }
    }).then((answer) => {
        navigator.camera.getPicture(function(base64EncodedImg) {
            window.plugins.socialsharing.shareViaFacebook(
                null,
                ['http://www.metropoligolfcenter.com/imagenes/logo.png',
                 base64EncodedImg,
                 localStorage.getItem('imgData')],
                null,
                function(result){
                    swal({
                        title: 'Cargando imagen',
                        text: '',
                        timer: 2000,
                        onOpen: () => {
                            swal.showLoading()
                        }
                    }).then((answer1) => {
                        swal(
                            '!Exito¡',
                            'Compartido correctamente',
                            'success'
                        )
                    })
                },
                function(result){
                    if(result != 'OK') {
                        if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
                            cordova.InAppBrowser.open('https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en', 'location=yes');
                        }
                        if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1){
                            cordova.InAppBrowser.open('https://itunes.apple.com/gb/app/facebook/id284882215?mt=8', 'location=yes');
                        }
                    }
                }
            );
        }, 
        onFail, 
        {
            quality: 50,
            destinationType:
            Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true
        });
    })
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: iniciarJuego
 * @version:  1
 * @descripcion: Funcion compartir twitter
 **/
function compartirTwitter(){
	
    var jugadores = JSON.parse(localStorage.getItem('jugadores')); 
    var ganadores_partida = JSON.parse(localStorage.getItem('puntajeGanadores'));
    var cadena = '¡Jugamos en Metrópoli Golf Center! \n\n';

    for(var i = 0; i < jugadores.length ; i++) {
        cadena += ganadores_partida[i]['nombre']+': '+ganadores_partida[i]['total']+'\n\n';
    }

    cadena += 'http://www.metropoligolfcenter.com/';

    swal({
        title: 'Abriendo cámara',
        text: 'Recuerda aceptar los permisos',
        timer: 2000,
        onOpen: () => {
            swal.showLoading()
        }
    }).then((answer) => {
        navigator.camera.getPicture(function(base64EncodedImg) {
            window.plugins.socialsharing.shareViaTwitter(
                cadena,
                base64EncodedImg,
                null,
                function(result){
                    swal({
                        title: 'Cargando imagen',
                        text: 'Recuerda pegar los resultados que se copiaron en tu portapapeles',
                        timer: 2000,
                        onOpen: () => {
                            swal.showLoading()
                        }
                    }).then((answer1) => {
                        swal(
                            '!Exito¡',
                            'Compartido correctamente',
                            'success'
                        )
                    })
                },
                function(result){
                    if(result != 'OK'){
                        if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
                            //window.location.href = 'https://play.google.com/store/apps/details?id=com.twitter.android&hl=en';
                            cordova.InAppBrowser.open('https://play.google.com/store/apps/details?id=com.twitter.android&hl=en', 'location=yes');
                        }
                        if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1){
                            //window.location.href = 'https://itunes.apple.com/gb/app/twitter/id333903271?mt=8';
                            cordova.InAppBrowser.open('https://itunes.apple.com/gb/app/twitter/id333903271?mt=8', 'location=yes');
                        }
                    }
                }
            );
        }, 
        onFail, 
        { 
            quality: 50, 
            destinationType: 
            Camera.DestinationType.FILE_URI, 
            saveToPhotoAlbum: true 
        });
    })
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: iniciarJuego
 * @version:  1
 * @descripcion: Funcion compartir twitter
 **/
function compartirInstagram() {
    
    var jugadores = JSON.parse(localStorage.getItem('jugadores')); 
    var ganadores_partida = JSON.parse(localStorage.getItem('puntajeGanadores'));
    var cadena = '¡Jugamos en Metrópoli Golf Center! \n\n';

    for(var i = 0; i < jugadores.length ; i++) {
        cadena += ganadores_partida[i]['nombre']+': '+ganadores_partida[i]['total']+'\n\n';
    }

    cadena += 'http://www.metropoligolfcenter.com/';
    
    swal({
        title: 'Abriendo cámara',
        text: 'Recuerda pegar los resultados que se copiaron en tu portapeles y aceptar los permisos',
        timer: 3000,
        onOpen: () => {
            swal.showLoading()
        }
    }).then((answer) => {
        navigator.camera.getPicture(function(base64EncodedImg) {
            window.plugins.socialsharing.shareViaInstagram(
                cadena,
                base64EncodedImg,
                function(result){
                    swal({
                        title: 'Cargando imagen',
                        text: '',
                        timer: 2000,
                        onOpen: () => {
                            swal.showLoading()
                        }
                    }).then((answer1) => {
                        swal(
                            '!Exito¡',
                            'Compartido correctamente',
                            'success'
                        )
                    })
                },
                function(result){
                    if(result != 'OK'){
                        if(navigator.userAgent.toLowerCase().indexOf("android") > -1) {
                            cordova.InAppBrowser.open('https://play.google.com/store/apps/details?id=com.instagram.android&hl=e', 'location=yes');
                        }
                        if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
                            cordova.InAppBrowser.open('https://itunes.apple.com/gb/app/instagram/id389801252?mt=8');
                        }
                    }
                }
            );
        }, 
        onFail, 
        {
            quality: 50,
            destinationType:
            Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: true
        });
    })
}
