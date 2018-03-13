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