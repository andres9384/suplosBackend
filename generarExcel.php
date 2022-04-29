<?php
include("conexion.php");


// Validamos que el usuario halla oprimido el boton enviar 
if(!empty($_POST["enviar"])){  
   switch ($_POST["tipo"]) {
        case 'Apartamento':
            $tipo=2;
            break;
       case 'Casa':
            $tipo=1;
            break;
        case 'Casa de Campo':
            $tipo=3;
            break;
        default:
            # code...
            break;
    }
    switch ($_POST["ciudad"]) {
        case 'New York':
            $ciudad=3;
            break;

        case 'Orlando':
            $ciudad=4;
            break;
        case 'Los Angeles':
            $ciudad=5;
            break;
        case 'Houston':
            $ciudad=6;
            break;

        case 'Washington':
            $ciudad=7;
            break;
        case 'Miami':
            $ciudad=8;
            break;
        default:
            # code...
            break;
    }
// sentencias para buscar los datos segun el filtro que el usuario decidio
    $stmp = $mbd->prepare("SELECT * FROM bienes WHERE ciudad_id=".$ciudad." AND tipo_id=".$tipo);
    $stmp->execute();
    $resultado = $stmp->fetchAll();

    
}
// comando para generar un archivo excel con los elemento html que le siguen
header('Content-type: application/vnd.ms-excel;charset=iso-8859-15');
header('Content-Disposition: attachment; filename=nombre_archivo.xls');?>


<table border="1" >
    <caption>
        Datos filtro Bienes
    </caption>
    <tr>
        <th>Id</th>
        <th>Direccion</th>
        <th>Ciudad</th>
        <th>Telefono</th>
        <th>Codigo_Postal</th>
        <th>Tipo</th>
        <th>Precio</th>
    </tr>
    <?php foreach($resultado as $row):?>

        <tr>
            <td><?= $row["id"]?></td>
            <td><?= $row["direccion"]?></td>
            <td><?= $row["ciudad"]?></td>
            <td><?= $row["telefono"]?></td>
            <td><?= $row["codigo_Postal"]?></td>
            <td><?= $row["tipo"]?></td>
            <td><?= $row["precio"]?></td>
        </tr>
        <?php endforeach?>
</table>