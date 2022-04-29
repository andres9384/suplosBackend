<?php



include("conexion.php");
// valida que hallan datos 
if(!empty($_POST["datos"])){  
    // convierte los datos json a array de php
    $data = json_decode($_POST["datos"],TRUE);
   
    foreach ($data as $row) {
        $id= $row["Id"];
        $direccion = $row["Direccion"] ;
        $ciudad =  $row["Ciudad"];
        $telefono = $row["Telefono"];
        $postal =  $row["Codigo_Postal"];
        $tipo = $row["Tipo"] ;
        $precio =  $row["Precio"];
        echo $tipo;
        switch ($tipo) {
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
        switch ($ciudad) {
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
        //sentencia para guardar los datos en la base de datos
        $stmt = $mbd->prepare("INSERT INTO bienes(id,telefono,postal,precio,direccion,ciudad_id,tipo_id)VALUES (:id,:telefono,:postal,:precio,:direccion,:ciudad_id,:tipo_id)");
        $stmt->bindParam(':id',$id);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':ciudad_id', $ciudad);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':precio', $precio);
        $stmt->bindParam(':postal', $postal);
        $stmt->bindParam(':tipo_id', $tipo);
        $resultado = $stmt->execute();
        
        // redireccionamiento al index
        header("location:index.php");
    }}
    
  
 
   
   
  
    
		
	




