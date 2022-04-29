$(function(){
    cargarBienes();
    Ciudades_Tipo();
    var Datos=[];
})

function cargarBienes(){
    $.ajax({
        method:"GET",
        url:'data-1.json',
        success:function(res)
        {
            ordernarBienes(res)
            Datos=res;
        }

    })
}

function ordernarBienes(res=null){
    var $div = $(".bienes");
    $div.empty();
    if(res!=null){
        res.forEach(bien => {
        $div.append("<div class='bien'><div class='image'><img src='img/home.jpg' width='250px' /></div><ul class='data'><li> <b>Identificacion : </b>"
        +bien['Id']+"</li><li><b>Direccion : </b>"
        +bien['Direccion']+"</li><li><b>Ciudad : </b>"
        +bien["Ciudad"]+"</li><li><b>Codigo Postal : </b>"
        +bien["Codigo_Postal"]+"</li><li><b>Precio : </b>"
        +bien["Precio"]+"</li><li><b>Telefono : </b>"
        +bien["Telefono"]+"</li><li><b>Tipo : </b>"
        +bien["Tipo"]+"</li><li><button onClick='guardarBien("+bien['Id']+")' class='botonGuardar'>Guardar</button></li>"+
        "</ul></div>")
    });}
}

function Ciudades_Tipo(){
    $.ajax({
        method:"GET",
        url:'data-1.json',
        success:function(res)
        {
           var arrciudades=[];
           var arrtipo=[];
           i=0
           while (i!=res.length){
                arrciudades.push(res[i]["Ciudad"]);
                arrtipo.push(res[i]["Tipo"]);
                i+=1;
           }
            
            const ciudad = new Set(arrciudades);
            const tipo = new Set(arrtipo);

            let ciudades = [...ciudad];
            let tipos = [...tipo];
           
            var $select = $("#selectCiudad");
            ciudades.forEach(ciudad => {
                $select.append("<option value='"+ciudad+"' >"+ciudad+"</option>")
            });

            var $select = $("#selectTipo");
            tipos.forEach(tipo => {
                $select.append("<option value='"+tipo+"' >"+tipo+"</option>")
            });
            
        }

    })
}

function BuscarBienes(){
    var ciudad = $("#selectCiudad").val();
    var tipo = $("#selectTipo").val();
    console.log( typeof(tipo));
    CiudadTipoSelecionado= []

    for (let index = 0; index < Datos.length; index++) {
        
        if(Datos[index]["Ciudad"] === ciudad && Datos[index]["Tipo"] === tipo){
            CiudadTipoSelecionado.push(Datos[index]);
           continue;
            
        }else if(Datos[index]["Ciudad"] === ciudad && tipo ===""){
            CiudadTipoSelecionado.push(Datos[index]);
          
        }else if(Datos[index]["Tipo"] === tipo && ciudad ===""){
            CiudadTipoSelecionado.push(Datos[index]);
        }else if ( tipo=== "" && ciudad ==="") {
            CiudadTipoSelecionado=Datos;
        }
        
    } 
    
    ordernarBienes(CiudadTipoSelecionado);

   
}
function guardarBien(id){
    var datosGuardar=[];
    for (let index = 0; index < Datos.length; index++) {
        
        
        if(Datos[index]["Id"] === id){
            datosGuardar.push(Datos[index]);
        }
    }
    var datosEnviar = JSON.stringify(datosGuardar);
    
    $.ajax({
        type:"POST", 
        // dataType: "json",
        url:'datos.php',        
        data:{datos:datosEnviar}, 
        success:function(datos){ 
             
            
         },
         error: function(e){
            console.log(e);
        }
        
    })
}
