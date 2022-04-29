<?php

//funcion para traer todos los registro guardados del usuario
function obtener_todos_registros()
{
    include("conexion.php");

    $stmp =  $mbd->prepare("SELECT * FROM bienes  ");
    $stmp->execute();
    $resultado = $stmp->fetchAll();

    return $resultado;
}

//Conversion para obtener el valor del tipo segun el numero
function conversion_tipo($tipo)
{

    switch ($tipo) {
        case 2:
            $tipo = "Apartamento";
            break;
        case 1:
            $tipo = 'Casa';
            break;
        case 3:
            $tipo = 'Casa de Campo';
            break;
        default:
            $tipo = 'Desconocido';
            break;
    }
    return $tipo;
}
//Conversion para obtener el valor de la ciudad segun el numero
function conversion_ciudad($ciudad)
{

    switch ($ciudad) {
        case 3:

            $ciudad = 'New York';
            break;

        case 4:

            $ciudad = 'Orlando';
            break;
        case 5:

            $ciudad = 'Los Angeles';
            break;
        case 6:

            $ciudad = 'Houston';
            break;

        case 7:

            $ciudad = 'Washington';
            break;
        case 8:
            $ciudad = 8;
            $ciudad = 'Miami';
            break;
        default:
            $ciudad = 'No identificado';
            break;
    }
    return $ciudad;
}
