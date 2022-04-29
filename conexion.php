<?php
 try {$mbd = new PDO('mysql:host=localhost;dbname=intelcost_bienes', "root", "");
    
 } catch (PDOException $e) {
     echo"error:" .$e -> getMessage();
     
 }

?>

