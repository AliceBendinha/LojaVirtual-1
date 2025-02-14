<?php
include 'config.php';

$sql = "SELECT id, nome, descricao, preco, imagem FROM produtos_pagos";
$result = $conn->query($sql);

$produtos = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
} 

echo json_encode($produtos);

$conn->close();
?>
