$(function () {
  // Elemento que se cargan al cargar la pagina
  cargarBienes();
  Ciudades_Tipo();
  var Datos = [];
});

//obtiene todos los datos del Json "data-1.json"
function cargarBienes() {
  $.ajax({
    method: "GET",
    url: "data-1.json",
    success: function (res) {
      ordernarBienes(res);
      Datos = res;
    },
  });
}

//Muestra los datos enviado segun el parametro y los muestra en el html en "Bienes Disponible"
function ordernarBienes(res = null) {
  var $div = $(".bienes");
  $div.empty();
  if (res != null) {
    res.forEach((bien) => {
      $div.append(
        "<div class='bien'><div class='image'><img src='img/home.jpg' width='250px' /></div><ul class='data'><li> <b>Identificacion : </b>" +
          bien["Id"] +
          "</li><li><b>Direccion : </b>" +
          bien["Direccion"] +
          "</li><li><b>Ciudad : </b>" +
          bien["Ciudad"] +
          "</li><li><b>Codigo Postal : </b>" +
          bien["Codigo_Postal"] +
          "</li><li><b>Precio : </b>" +
          bien["Precio"] +
          "</li><li><b>Telefono : </b>" +
          bien["Telefono"] +
          "</li><li><b>Tipo : </b>" +
          bien["Tipo"] +
          "</li><li><button onClick='guardarBien(" +
          bien["Id"] +
          ")' class='botonGuardar'>Guardar</button></li>" +
          "</ul></div>"
      );
    });
  }
}

// Esta funcion se encargar de examinar todo las ciudades y tipo del archivo json y crea un nuevo
// array con ciudades y tipo s que nose repitan
function Ciudades_Tipo() {
  $.ajax({
    method: "GET",
    url: "data-1.json",
    success: function (res) {
      var arrciudades = [];
      var arrtipo = [];
      i = 0;
      while (i != res.length) {
        arrciudades.push(res[i]["Ciudad"]);
        arrtipo.push(res[i]["Tipo"]);
        i += 1;
      }

      const ciudad = new Set(arrciudades);
      const tipo = new Set(arrtipo);

      let ciudades = [...ciudad];
      let tipos = [...tipo];

      // En las siguiente lineas de codigo se encargar de pasar las ciudades y tipos unico a
      // las selecciones

      var $select = $("#selectCiudad");
      var $select1 = $("#reportCiudad");
      ciudades.forEach((ciudad) => {
        $select.append(
          "<option value='" + ciudad + "' >" + ciudad + "</option>"
        );
        $select1.append(
          "<option value='" + ciudad + "' >" + ciudad + "</option>"
        );
      });

      var $select = $("#selectTipo");
      var $select1 = $("#reportTipo");
      tipos.forEach((tipo) => {
        $select.append("<option value='" + tipo + "' >" + tipo + "</option>");
        $select1.append("<option value='" + tipo + "' >" + tipo + "</option>");
      });
    },
  });
}

// En esta funcion obtenemos la ciudad y el tipo que le usuario filtro
// y lo mandamos a la funcion de "ordenarBienes" para que nosmuestre e pantalla 
// todos los datos filtrados

function BuscarBienes() {
  var ciudad = $("#selectCiudad").val();
  var tipo = $("#selectTipo").val();
  console.log(typeof tipo);
  CiudadTipoSelecionado = [];

  for (let index = 0; index < Datos.length; index++) {
    if (Datos[index]["Ciudad"] === ciudad && Datos[index]["Tipo"] === tipo) {
      CiudadTipoSelecionado.push(Datos[index]);
      continue;
    } else if (Datos[index]["Ciudad"] === ciudad && tipo === "") {
      CiudadTipoSelecionado.push(Datos[index]);
    } else if (Datos[index]["Tipo"] === tipo && ciudad === "") {
      CiudadTipoSelecionado.push(Datos[index]);
    } else if (tipo === "" && ciudad === "") {
      CiudadTipoSelecionado = Datos;
    }
  }

  ordernarBienes(CiudadTipoSelecionado);
}

// En esta funcion recojemos el datos que el usuario quiere guardar todo por el id y 
// se lo pasamos al archivo datos.php para almacenarlo en la base de datos
function guardarBien(id) {
  var datosGuardar = [];
  for (let index = 0; index < Datos.length; index++) {
    if (Datos[index]["Id"] === id) {
      datosGuardar.push(Datos[index]);
    }
  }
  var datosEnviar = JSON.stringify(datosGuardar);

  $.ajax({
    type: "POST",
    url: "datos.php",
    data: { datos: datosEnviar },
    success: function (datos) {},
    error: function (e) {
      console.log(e);
    },
  });
}
