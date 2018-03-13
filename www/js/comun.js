var ruta_generica = "http://www.metropoligolfcenter.com/api/";

//-----------------------------------------------METROPOLI----------------------------------------------

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: iniciarPartida
 * @version:  1
 * @descripcion: Accion para obtener descripcion de partida
 **/
function iniciarPartida() {
    
    var codigo = $( "#codigo" ).val();
    
	localStorage.setItem("codigo", codigo);
    
	if( codigo == '' ) {
        $("#alerta").html('<i class="fa fa-warning fa-lg"></i>&nbsp;Debes ingresar un código').show();
	}
	else if( !$("#avisoprivacidad").prop('checked') ) {
		$("#alerta").html('<i class="fa fa-warning fa-lg"></i>&nbsp;Debes aceptar el aviso de privacidad').show();
	}
	else {
		//Enviar codigo para verificar que es correcto.
		$.ajax({
			url: ruta_generica+"obtener_partida",
			type: 'POST',
			dataType: "JSON",
			data: {
				folio : codigo
			},
			success:function(data) {
                
                console.log(data);
                
				if(data.error) {
					$("#alerta").html('<i class="fa fa-warning fa-lg"></i>&nbsp; Ingresa un código valido').show();
				}
				else if( data['partida']['id'] ) {

					localStorage.setItem("partida", JSON.stringify(data['partida']));
					localStorage.setItem("jugadores", JSON.stringify(data['jugadores']));
					localStorage.removeItem("clientes");
					localStorage.setItem("clientes", JSON.stringify(data['jugadores']));
 
					if( data.partida.estado == 2 && data.jugadores != null ) {
						location.href = 'scoreCard.html';
					}
					else {
                        location.href = 'registroJugador.html';
                    }
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Function: iniciarPartida()");
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
	}
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: continuar
 * @version:  1
 * @descripcion: 
 **/
function continuar() {
    location.href = 'resultado2.html';
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: ayuda
 * @version:  1
 * @descripcion: 
 **/
function ayuda() {
	localStorage['posicion'] = localStorage['actual'];
	location.href = 'ayuda.html';
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: atras
 * @version:  1
 * @descripcion: 
 **/
function atras() {
	
	var posicion = localStorage['posicion'];
	
	if(posicion == 1) { location.href='index.html';  }
	else if(posicion == 2) { location.href='registroJugador.html'; }
	else if(posicion == 3) { location.href='scoreCard.html'; }
	else if(posicion == 4) { location.href='resultado.html'; }
	else if(posicion == 5) { location.href='resultado2.html'; }	
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: link
 * @version:  1
 * @descripcion: 
 **/
function link(ruta) {
	cordova.InAppBrowser.open(ruta);
}