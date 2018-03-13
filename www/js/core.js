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

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: crearRegistro
 * @version:  1
 * @descripcion: Muestra el registro de clientes (nombre, apellido, correo).
 **/
function crearRegistro() {
    
	var clientes = JSON.parse(localStorage.getItem('clientes'));
    var partida  = JSON.parse(localStorage.getItem('partida'));
	var campo    = '';
    
	// Si existen clientes, muestra los registros ingresados anteriormente de caso contrario muestra los campos vacios
	for(var i = 0, x = 1; i < partida['numeroPersonas']; i++, x++) {
		
		if(clientes === null) {
			campo += '<div class="col-12 mt-4"><img class="img-responsive margin_jugador" src="img/icono_registro_jugador.png" alt="icono_jugador" width="35px"><label class="col-12 texto enlinea ">Jugador '+x+'</label><div class="row justify-content-around mt-2"><input id="nombre'+x+'" name="nombre'+x+'" class="form-control" type="text" placeholder="Nombre" maxlength="100" onkeyup="crear_nickname('+x+')"></div><div class="row justify-content-around mt-2"><input id="apellido_paterno'+x+'" name="apellido_paterno'+x+'" class="form-control col-6" type="text" placeholder="Paterno" maxlength="100" onkeyup="crear_nickname('+x+')"><input id="apellido_materno'+x+'" name="apellido_materno'+x+'" class="form-control col-6" type="text" placeholder="Materno" maxlength="100"></div><div class="row justify-content-around mt-2"><input id="nickname'+x+'" name="nickname'+x+'" class="form-control col-4" type="text" placeholder="Nick" maxlength="3" /><input id="correo'+x+'" name="correo'+x+'" class="form-control col-8" type="email" placeholder="Correo" maxlength="100" /></div></div>';
		}	
		else {
			campo += '<div class="col-12 mt-4"><img class="img-responsive margin_jugador" src="img/icono_registro_jugador.png" alt="icono_jugador" width="35px"><label class="col-12 texto enlinea ">Jugador '+x+'</label><div class="row justify-content-around mt-2"><input id="nombre'+x+'" name="nombre'+x+'" class="form-control" type="text" placeholder="Nombre" value="'+clientes[i]['nombre']+'" maxlength="100" readonly="readonly" /></div><div class="row justify-content-around mt-2"><input id="apellido_paterno'+x+'" name="apellido_paterno'+x+'" class="form-control col-6" type="text" placeholder="Paterno" value="'+clientes[i]['apellido_paterno']+'" maxlength="100" readonly="readonly" /><input id="apellido_materno'+x+'" name="apellido_materno'+x+'" class="form-control col-6" type="text" placeholder="Materno" value="'+clientes[i]['apellido_materno']+'" maxlength="100" readonly="readonly" /></div><div class="row justify-content-around mt-2"><input id="nickname'+x+'" name="nickname'+x+'" class="form-control col-4" type="text" placeholder="Nick" value="'+clientes[i]['nickname']+'" maxlength="4" readonly="readonly" /><input id="correo'+x+'" name="correo'+x+'" class="form-control col-8" type="email" placeholder="Correo" value="'+clientes[i]['correo']+'" maxlength="100" readonly="readonly" /></div></div>';
		}
	}
    
	$("#jugadores").html(campo);
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: crear_nickname
 * @version:  1
 * @descripcion:
 **/
function crear_nickname(jugador) {
    
	if( $("#nombre"+jugador).val() !== "" && 
        $( "#apellido_paterno"+jugador ).val().length > 1 && 
        $( "#nickname"+jugador ).val() === '' )
    {
        $( "#nickname"+jugador ).val( $("#nombre"+jugador).val().substr(0, 1) + $( "#apellido_paterno"+jugador ).val().substr(0,2));
	}
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: iniciarJuego
 * @version:  1
 * @descripcion: 
 **/
function iniciarJuego() {
	
    $('#alerta').hide();
    
    //Revidar que los campos no esten vacios
	var partida  = JSON.parse(localStorage.getItem('partida')); 
	var clientes = JSON.parse(localStorage.getItem('clientes'));
	
	var registro_jugadores = new Array();
	var vacio = false;
    //var correo = false;
	
	//Ciclo para revisar que no haya campos vacios y llenar el arreglo con los nombres ingresdos para enviarlo a guardar.
	for(var i = 1; i < parseInt(partida['numeroPersonas']) + 1; i++) {
		
		var nombre     = $( "#nombre"+i ).val();
		var apellido_p = $( "#apellido_paterno"+i ).val();
		var apellido_m = $( "#apellido_materno"+i ).val();
		var correo     = $( "#correo"+i ).val();
		var nickname   = $( "#nickname"+i ).val();
		
		if(nombre == '' || apellido_p == '' || nickname == ''){
			$("#alerta").html('<i class="fa fa-warning fa-lg"></i>&nbsp; Campos vacíos').show();
			vacio = true;
		}
		
		registro_jugadores[i-1] = {
            nombre: nombre, 
            apellido_paterno: apellido_p, 
            apellido_materno: apellido_m, 
            correo: correo, 
            nickname: nickname
        };
    }
    
    //Validar correo y que al menos sea uno registrado
    var correos = $( "input[id*='correo']");
    var acum    = 0
    
    correos.each(function( index, element ) {
        if ( this.value ) {
            acum++;
            $(element).removeAttr('disabled');
        }
    });
    
    if ( acum >= 1 ) {
        
        correos.each(function( index, element ) {
            if ( this.value ) {
                var email = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                if (!email.test(this.value)) {
                    $("#alerta").html('<i class="fa fa-warning fa-lg"></i>&nbsp; Correo Invalido').show();
                    correo = false;
                }
                else {
                    correo = true;
                }
            }
        });
    }
    else {
        correo = false;
        $("#alerta").html('<i class="fa fa-warning fa-lg"></i>&nbsp; Correo Invalido o Vacío').show();
    }
    
	if(vacio == false && correo == true) {
        
        if ( acum != correos.length ) {
            swal({
                title: '¿Deseas continuar?',
                text: "Tienes correos sin registrar",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.value) {

                    //Enviar Registros
                    $.ajax({
                        url: ruta_generica+'guardar_jugadores',
                        type: 'POST',
                        dataType: "JSON",
                        data: {
                            folio : localStorage.getItem('codigo'),
                            jugadores : registro_jugadores
                        },
                        success:function(data){
                            localStorage.setItem("jugadores", JSON.stringify(data));
                            localStorage.setItem("clientes", JSON.stringify(registro_jugadores));

                            swal({
                                title: 'Espere un momento...',
                                text: 'Guardando jugadores',
                                timer: 2000,
                                onOpen: () => {
                                    swal.showLoading()
                                }
                            }).then((result1) => {
                                 location.href='scoreCard.html';
                            })
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            console.log("Function: iniciarJuego()");
                            console.log("Status: " + textStatus);
                            console.log("Error: " + errorThrown);
                        }
                    });
                }
            })   
        }
        else {
            //Enviar Registros
            $.ajax({
                url: ruta_generica+'guardar_jugadores',
                type: 'POST',
                dataType: "JSON",
                data: {
                    folio : localStorage.getItem('codigo'),
                    jugadores : registro_jugadores
                },
                success:function(data){
                    localStorage.setItem("jugadores", JSON.stringify(data));
                    localStorage.setItem("clientes", JSON.stringify(registro_jugadores));

                    swal({
                        title: 'Espere un momento...',
                        text: 'Guardando jugadores',
                        timer: 2000,
                        onOpen: () => {
                            swal.showLoading()
                        }
                    }).then((result1) => {
                         location.href='scoreCard.html';
                    })
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Function: iniciarJuego()");
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);
                }
            });
        }
    }
}

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

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: obtenerTop
 * @version:  1
 * @descripcion: 
 **/
function obtenerTop() {
	//Obtener top de ganadores semana, mes y año
	$.ajax({
        url: ruta_generica+'mejores_jugadores',
        type: 'POST',
        dataType: "JSON",
        data: {
        },
        success:function(data){
            
			localStorage.setItem("topGanadores", JSON.stringify(data));
			
			// Mostrar tabla de ganadores de la semana, mes y año
			var top = '';
			var tiempo = ["Semanal", "Mensual", "Anual"];
			var top_jugadores = JSON.parse(localStorage.getItem('topGanadores'));

			for(var x = 0; x < 3; x++){
				if(top_jugadores[x] != null){

					top += '<tr><td class="td_">'+tiempo[x]+'</td><td class="td_">'+top_jugadores[x]['nombre']+'</td><td class="td_">'+top_jugadores[x]['puntos']+'</td></tr>';
				}
			}

			$("#topGanadores").html(top);
			
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("Function: obtenerTop()"); 
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        }
    });
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: obtenerTopJugadores
 * @version:  1
 * @descripcion: 
 **/
function obtenerTopJugadores() {
	
	// Mostrar tabla de primero, segundo y tercer lugar
	var ganadores = '<label class="col-8 texto text-center mt-4 txt_2">Jugadores</label><label class="col-4 texto text-center mt-4 txt_2">Puntos</label>';
	var jugadores = JSON.parse(localStorage.getItem('jugadores')); 
	var ganadores_partida = JSON.parse(localStorage.getItem('puntajeGanadores'));
	
	for(var i = 0; i < jugadores.length ; i++){
		
		if(i < 3) {
			ganadores += '<div class="input-group input-group-sm mt-4"><figure class="col-3"><img class="img-responsive" src="img/'+parseInt(i+1)+'.png" alt="lugar_'+parseInt(i)+1+'" width="50px"></figure><label class="col-6 texto text_start mt-4 txt_2">'+ganadores_partida[i]['nombre']+'</label><label class="col-3 texto text-center mt-4 txt_'+parseInt(i+1)+'">'+ganadores_partida[i]['total']+'</label></div>';
		}
        else {
			ganadores += '<div class="input-group input-group-sm mt-4"><figure class="col-3"></figure><label class="col-6 texto text_start mt-4 txt_2">'+ganadores_partida[i]['nombre']+'</label><label class="col-3 texto text-center mt-4 txt_'+parseInt(i+1)+'">'+ganadores_partida[i]['total']+'</label></div>';
		}
	}
	
	$("#ganadoresPartida").html(ganadores);
    
    //Convertir resultados a imagen
    var oldWidth  = $("#ganadoresPartida").width();
    var oldHeight = $("#ganadoresPartida").height() + (jugadores.length <= 3 ? jugadores.length * 31.5 : jugadores.length * 20) + 35;

    html2canvas(document.getElementById('ganadoresPartida'), {width: oldWidth, height: oldHeight}).then(function(canvas) {
        var imgData = canvas.toDataURL("image/png");
        localStorage.setItem("imgData", imgData);
    });
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: enviarComentarios
 * @version:  1
 * @descripcion: 
 **/
function enviarComentarios() {
	
	var com = $("#comentario").val();
	var fol = localStorage.getItem('codigo');
	
	if(com != "") {
		
		$.ajax({
			url: ruta_generica+'guardar_comentario',
			type: 'POST',
			dataType: "JSON",
			data: {
				folio: fol,
				comentario: com
			},
			success:function(data){
				location.href='index.html';
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				console.log("Function: "+ JSON.stringify(XMLHttpRequest)); 
				console.log("Status: " + textStatus); 
				console.log("Error: " + errorThrown); 
			}
		});
	}
    else {
		location.href='index.html';
	}	
}