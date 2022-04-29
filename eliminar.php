<?php
include("conexion.php");

// valida que el identificacion este establecido y hace ubna consulta para eliminar el dato que 
// el usuario ordeno
if(isset($_POST["identificacion"])){
    $stmt = $mbd->prepare("DELETE FROM bienes WHERE id=:id");
    $stmt->bindParam(':id', $_POST["identificacion"]);
    $resultado = $stmt->execute();

    header("location: index.php");
}

        
 

    