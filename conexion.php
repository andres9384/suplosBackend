<?php
// Conexion a la base de datos en caso de no conectarse nos avisara el error
 try {$mbd = new PDO('mysql:host=localhost;dbname=intelcost_bienes', "root", "");
    
 } catch (PDOException $e) {
     echo"error:" .$e -> getMessage();
     
 }

?>

