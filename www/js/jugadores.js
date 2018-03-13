/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: crear_nickname
 * @version:  1
 * @descripcion:
 **/
/*
function crear_nickname(jugador) {
    
	if( $("#nombre"+jugador).val() !== "" && 
        $( "#apellido_paterno"+jugador ).val().length > 1 && 
        $( "#nickname"+jugador ).val() === '' )
    {
        $( "#nickname"+jugador ).val( $("#nombre"+jugador).val().substr(0, 1) + $( "#apellido_paterno"+jugador ).val().substr(0,2));
	}
}
*/

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
    
    alert('Creando lista de jugadores...');
    alert(clientes === null);
    
	// Si existen clientes, muestra los registros ingresados anteriormente de caso contrario muestra los campos vacios
	for(var i = 0, x = 1; i < partida['numeroPersonas']; i++, x++) {
		
		if(clientes === null) {
			campo += '<div class="col-12 mt-4"><img class="img-responsive margin_jugador" src="img/icono_registro_jugador.png" alt="icono_jugador" width="35px"><label class="col-12 texto enlinea ">Jugador '+x+'</label><div class="row justify-content-around mt-2"><input id="nombre'+x+'" name="nombre'+x+'" class="form-control" type="text" placeholder="Nombre" maxlength="100" onkeyup="crear_nickname('+x+')"></div><div class="row justify-content-around mt-2"><input id="apellido_paterno'+x+'" name="apellido_paterno'+x+'" class="form-control col-6" type="text" placeholder="Paterno" maxlength="100" onkeyup="crear_nickname('+x+')"><input id="apellido_materno'+x+'" name="apellido_materno'+x+'" class="form-control col-6" type="text" placeholder="Materno" maxlength="100"></div><div class="row justify-content-around mt-2"><input id="nickname'+x+'" name="nickname'+x+'" class="form-control col-4" type="text" placeholder="Nick" maxlength="3" /><input id="correo'+x+'" name="correo'+x+'" class="form-control col-8" type="email" placeholder="Correo" maxlength="100" /></div></div>';
		}	
		else {
			campo += '<div class="col-12 mt-4"><img class="img-responsive margin_jugador" src="img/icono_registro_jugador.png" alt="icono_jugador" width="35px"><label class="col-12 texto enlinea ">Jugador '+x+'</label><div class="row justify-content-around mt-2"><input id="nombre'+x+'" name="nombre'+x+'" class="form-control" type="text" placeholder="Nombre" value="'+clientes[i]['nombre']+'" maxlength="100" readonly="readonly" /></div><div class="row justify-content-around mt-2"><input id="apellido_paterno'+x+'" name="apellido_paterno'+x+'" class="form-control col-6" type="text" placeholder="Paterno" value="'+clientes[i]['apellido_paterno']+'" maxlength="100" readonly="readonly" /><input id="apellido_materno'+x+'" name="apellido_materno'+x+'" class="form-control col-6" type="text" placeholder="Materno" value="'+clientes[i]['apellido_materno']+'" maxlength="100" readonly="readonly" /></div><div class="row justify-content-around mt-2"><input id="nickname'+x+'" name="nickname'+x+'" class="form-control col-4" type="text" placeholder="Nick" value="'+clientes[i]['nickname']+'" maxlength="4" readonly="readonly" /><input id="correo'+x+'" name="correo'+x+'" class="form-control col-8" type="email" placeholder="Correo" value="'+clientes[i]['correo']+'" maxlength="100" readonly="readonly" /></div></div>';
		}
	}
	
    alert(campo);
    
	$("#jugadores").html(campo);
    
    alert('Lista de jugadores creada');
}

/**
 * @author:   Andrea Luna
 * @contact:  andrea_luna@avansys.com.mx
 * @creation: 18/12/2017
 * @function: iniciarJuego
 * @version:  1
 * @descripcion: 
 **/
/*
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
*/