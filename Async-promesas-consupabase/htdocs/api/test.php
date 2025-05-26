<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT 1");
    $result = $stmt->fetch();
    echo "<h2>✅ Conexión exitosa a la base de datos</h2>";
    echo "<p>Detalles de la conexión:</p>";
    echo "<ul>";
    echo "<li>Host: localhost</li>";
    echo "<li>Base de datos: cine</li>";
    echo "</ul>";
    echo "<h3>Tablas en la base de datos:</h3>";
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll();
    echo "<ul>";
    foreach($tables as $table) {
        echo "<li>" . $table[0] . "</li>";
    }
    echo "</ul>";
    
} catch(PDOException $e) {
    echo "<h2>❌ Error de conexión</h2>";
    echo "<p>" . $e->getMessage() . "</p>";
}
?>
