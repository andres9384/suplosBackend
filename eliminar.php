<?php
include("conexion.php");

if(isset($_POST["identificacion"])){
    $stmt = $mbd->prepare("DELETE FROM bienes WHERE id=:id");
    $stmt->bindParam(':id', $_POST["identificacion"]);
    $resultado = $stmt->execute();

    header("location: index.php");
}

        
 

    