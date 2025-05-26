<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    $sql = "SELECT h.*, p.titulo as pelicula_titulo 
            FROM horarios h 
            LEFT JOIN peliculas p ON h.pelicula_id = p.id 
            ORDER BY h.fecha, h.hora";
    
    $stmt = $pdo->query($sql);
    $horarios = $stmt->fetchAll();
    
    echo json_encode($horarios);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener los horarios: ' . $e->getMessage()]);
}
?>
