<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $descricao = $_POST["descricao"];
    $preco = $_POST["preco"];
    $imagem = $_POST["imagem"];

    $sql = "INSERT INTO produtos_pagos (nome, descricao, preco, imagem)
            VALUES ('$nome', '$descricao', '$preco', '$imagem')";

    if ($conn->query($sql) === TRUE) {
        echo "Novo produto inserido com sucesso!";
    } else {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
