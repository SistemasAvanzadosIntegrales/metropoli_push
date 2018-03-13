/**
 * @author:   Roberto Ramirez
 * @contact:  roberto_ramirez@avansys.com.mx
 * @creation: 09/02/2017
 * @function: finalizarPartidaForzada
 * @version:  1
 * @descripcion: 
 **/
function finalizarPartidaForzada() {
    swal({
        title: '¿Estas seguro?',
        text: "Tu partida finalizara y ya no podras modificar tus resultados",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value) {
            var partida = JSON.parse(localStorage.getItem('partida'));
            var mode    = '';

            if ( partida['mode'] == 1 ) {
                mode = 9;
            }
            else {
                mode = 18;
            }
            
            //Recorrer todos los input vacios
            for ( var i = 1; i <= mode; i++ ) {

                var row  = $('.hoyo'+i);
                var acum = 0;

                row.each(function( index, element ) {
                    if ( !this.value ) {
                        var eventSave = $(element).attr('onchange');
                        eventSave = eventSave.slice(0, -1);
                        eventSave = eventSave+', 1)';
                        
                        //Cambiar el evento
                        $(element).attr('onchange', eventSave)
                        
                        //Ejecutar el evento
                        $(element).trigger( "onchange" );
                    }
                });
            }
              
            //Finalizar partida
            finalizarPartida();
        }
    })
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: crear_nickname
 * @version:  1
 * @descripcion: 
 **/
function disabledInput() {
    
    var scorecard = JSON.parse(localStorage.getItem('scorecard'));
    
    $('.input_tamano').attr('disabled', 'disabled');
    
    var partida = JSON.parse(localStorage.getItem('partida'));
    var mode    = '';
    
    if ( partida['mode'] == 1 ) {
        mode = 9;
    }
    else {
        mode = 18;
    }
    
    for ( var i = 1; i <= mode; i++ ) {
        
        var row  = $('.hoyo'+i);
        var acum = 0;
        
        row.each(function( index, element ) {
            if ( this.value ) {
                acum++;
                $(element).removeAttr('disabled');
            }
        });
        
        if ( acum == row.length ) {
            
            var temp = i + 1;
            
            $('.hoyo'+temp).each(function( index1, element1 ) {
                $(element1).removeAttr('disabled');
            });
        }
        else {
            break;
        }
    }
    
    if( scorecard.length == 0 ) {
        //Desactivar las casillas excepto la primera
        $('.hoyo1').removeAttr('disabled');
    }
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: finalizarPartida
 * @version:  1
 * @descripcion: 
 **/
function finalizarPartida() {
	
	var partida = JSON.parse(localStorage.getItem('partida')); 
	partida['estado'] = 3;
	
	//Validar que todos los campos tengan un valor
	var jugadores = JSON.parse(localStorage.getItem('jugadores')); 
	var vacio     = false;
    var mode    = '';
    
    if ( partida['mode'] == 1 ) {
        mode = 9;
    }
    else {
        mode = 18;
    }
    
    //C = recorre las filas de score card, va de 1 a 9 que es la cantidad de hoyos.
	for( var c = 1; c <= mode; c++ ) 
		for(var f = 0; f < jugadores.length ; f++) // f = recorre las columnas de cada jugador, va de 0 hasta n que es el total de jugadores.
			if($("#"+jugadores[f]['id']+c).val() == "" || $("#"+jugadores[f]['id']+c).val() % 1 != 0 )
				vacio = true;
	
	if(vacio == false) {
		
        var folio = localStorage.getItem('codigo');
        
		$.ajax({
			url: ruta_generica+'finalizar_partida',
			type: 'POST',
			dataType: "JSON",
			data: {
				folio: folio
			},
			success:function(data) {
                localStorage.setItem("puntajeGanadores", JSON.stringify(data));
                
                swal({
                title: 'Partida finalizada',
                text: 'Guardando datos',
                timer: 2000,
                onOpen: () => {
                    swal.showLoading()
                }
                }).then((result1) => {
                    location.href = 'resultado.html';
                })
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Function: finalizarPartida()");
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
	}
    else {
		$("#alerta-message").html('<i class="fa fa-warning fa-lg"></i>&nbsp; Debes ingresar el total de tiros de todos los hoyos y solo números enteros');
        $("#alerta").show();
	}
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: dibujarScoreCard
 * @version:  1
 * @descripcion: 
 **/
function dibujarScoreCard() {
	
	var jugadores = JSON.parse(localStorage.getItem('jugadores')); 
	var scorecard = JSON.parse(localStorage.getItem('scorecard'));
	var partida = JSON.parse(localStorage.getItem('partida'));		
	
	var espaciosBlancos = '';
	var total = '';
	var nombreJugador = '';
	var numeroJugador = '';  
	var style = ''; 
	var readOnly = '';
    var modo = '';
    var totalPar = 0;
    
	var totalJugadores = jugadores.length;	
	
	if(partida['estado'] == 3){
		readOnly = ' readonly="readonly" ';
	}
    
    if(partida['mode'] == 1){
		modo = 9;
	}
    else {
        modo = 18;    
    }
    
	//Definir tamaño de celdas
	if(totalJugadores == 1) style += '35';
	else if(totalJugadores == 2) style += '25';
	else if(totalJugadores == 3) style += '18';
	else if(totalJugadores == 4) style += '18';
	else style += '14'; 
	
	// Crear las celdas por default como: numero de jugadores, nombre de jugadores y los cuadros donde se almacena la score card
	for(var f = 0; f < totalJugadores ; f++){
		
		total += '<td id="total_'+jugadores[f]['id']+'"></td>';
		nombreJugador += '<td>'+jugadores[f]['nickname']+'</td>';
		numeroJugador += '<td><div class="circulo_jugador"><div class="texto_chico" >'+ parseInt(f+1)+'</div></div></td>';
		
	}
	
	//Agregar a la cabeza de la tabla
	$("#total").append(total).show();
	$("#numeroJugadores").append(numeroJugador).show();
	$("#nombreJugadores").append(nombreJugador).show();
	
	//C = recorre las filas de score card, va de 1 a 9 que es la cantidad de hoyos.
	for( var c = 1; c <= modo; c++ ) {
		
		espaciosBlancos += '<tr>'; 
		espaciosBlancos += '<td class="hoyo_par"><div>'+c+'</div></td>';
        
        if(partida['mode'] == 1){
            espaciosBlancos += (c == 2 || c == 4 || c == 9 ) ? '<td class="hoyo_par"><div>3</div></td>' : '<td class="hoyo_par"><div>2</div></td>';
            
            totalPar += 3;
        }
        else {
            espaciosBlancos += (c == 2 || c == 4 || c == 9 || c == 11 || c == 13 || c == 18) ? '<td class="hoyo_par"><div>3</div></td>' : '<td class="hoyo_par"><div>2</div></td>';
            
            totalPar += 2;
        }
        
		espaciosBlancos += '<td class="invisible"></td>';
		
		// f = recorre las columnas de cada jugador, va de 0 hasta n que es el total de jugadores.
		for(var f = 0; f < totalJugadores ; f++){

			if(scorecard != "" && scorecard[c]) {
				
				//En caso de que la score card tenga datos ya guardados.
				if(scorecard[c][ jugadores[f]['id'] ]) {
		
					espaciosBlancos += '<td style="width: '+style+'%;"><input '+readOnly+' data-log="'+scorecard[c][ jugadores[f]['id'] ]['idLog']+'" id="'+jugadores[f]['id']+c+'" name="'+jugadores[f]['id']+c+'" class="input_tamano hoyo'+c+'" type="number" value="'+scorecard[c][ jugadores[f]['id'] ]['puntos']+'" maxlength="1" min="1" max="9" onchange="modificarScoreCard('+jQuery.trim(jugadores[f]['id'])+', '+c+')"></td>';
				} 
                else {  // si hay datos en blanco
				
					espaciosBlancos += '<td style="width: '+style+'%;"><input data-log="0" id="'+jugadores[f]['id']+c+'" name="'+jugadores[f]['id']+c+'" class="input_tamano hoyo'+c+'" type="number" value="" maxlength="1" min="1" max="9" onchange="modificarScoreCard('+jQuery.trim(jugadores[f]['id'])+', '+c+')"></td>';
				}
			}
            else { // en caso de que esten vacios todos los datos.
				
				espaciosBlancos += '<td style="width: '+style+'%;"><input data-log="0" id="'+jugadores[f]['id']+c+'" name="'+jugadores[f]['id']+c+'" class="input_tamano hoyo'+c+'" type="number" value="" maxlength="1" min="1" max="9" onchange="modificarScoreCard('+jQuery.trim(jugadores[f]['id'])+', '+c+')"></td>';
			}
		}
 
		espaciosBlancos += '</tr>';
	}
    
    //Total de tiros par
    $('#totalTiros').html(totalPar);
	
    //Pintar score card
	$("#cuerpo").html(espaciosBlancos).show();
	
	//Calcular puntos de cada jugador.
	for(var f = 0; f < totalJugadores ; f++) {
		
		var total = 0;
		
		for(var t = 1; t <= modo; t++)
			if(!$("#"+jugadores[f]['id']+t).val() == "")
				total += parseInt( $("#"+jugadores[f]['id']+t).val() );
        
		$("#total_"+jugadores[f]['id']).html(total).show();
	}
    
    //disabledInput();
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: peticionScoreCard
 * @version:  1
 * @descripcion: Obtener datos de la score card.
 **/
function peticionScoreCard() {
	$.ajax({
		
		url: ruta_generica+"obtener_partida",
		type: 'POST',
		dataType: "JSON",
		data: {
			folio : localStorage.getItem('codigo')
		},
		success:function(data){ 
			
			localStorage.removeItem("scorecard");
			localStorage.setItem("scorecard", JSON.stringify(data['scorecard']));
			localStorage.removeItem("partida");
			localStorage.setItem("partida", JSON.stringify(data['partida']));
			
			dibujarScoreCard();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			console.log("XMLHttpRequest: "+XMLHttpRequest);
			console.log("textStatus: "+textStatus);
			console.log("errorThrown: "+errorThrown);
		}
		
	});
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: modificarScoreCard
 * @version:  1
 * @descripcion: Agrega o modifica los campos de la score card
 **/
function modificarScoreCard(id, NumeroHoyo, force = 0) {
    
    $( "#alerta" ).hide();
    
    var valor   = $("#"+id+NumeroHoyo).val().toString().charAt(0);
	var partida = JSON.parse(localStorage.getItem('partida'));
    
    //Si el valor es 0 incrustar el valor de 1 por default
    if ( !force ) {
        if ( (valor % 1) != 0 || valor < 1 || valor == '' ) {
            valor = 1;
        }  
    }
    else {
        valor = 0;
    }
    
	var _log = {
        "id"            : $("#"+id+NumeroHoyo).attr( 'data-log' ).toString(),
        "idCliente"     : id.toString(),
        "idPartida"     : partida['id'].toString(),
        "hoyo"          : NumeroHoyo.toString(),
        "cantidadTiros" : valor
    };
    
    $("#"+id+NumeroHoyo).val(valor);
    
	$.ajax({
        url: ruta_generica+'guardar_log',
        type: 'POST',
        //dataType: "JSON",
        data: {
			log: _log
        },
        success:function(data){
			
			$("#"+id+NumeroHoyo).attr('data-log', JSON.parse(data)['idLog']);
			
			var total = 0;
            var mode  = '';

            if ( partida['mode'] == 1 ) {
                mode = 9;
            }
            else {
                mode = 18;
            }
            
			// Actualizacion de la suma total de puntos.
			for(var t = 1; t <= mode; t++)
				if(!$("#"+id+t).val() == "")
					total += parseInt( $("#"+id+t).val() );
			
			$("#total_"+id).html(total);
			
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("Function: modificarScoreCard()"); 
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        }
    });
    
    //disabledInput();
}
