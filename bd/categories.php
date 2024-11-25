<?php
header('Content-Type: application/json');

$servername = getenv('DB_SERVERNAME2');
$username = getenv('DB_USERNAME2');
$password = getenv('DB_PASSWORD2');
$dbname = getenv('DB_NAME2');

$mysqli = new mysqli($servername, $username, $password, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$mysqli->set_charset("utf8mb4");

$profitably = isset($_GET['profitably']) ? (int)$_GET['profitably'] : 0;

if ($profitably === 1) {
    $query = "SELECT * FROM category WHERE profitably = 1"; 
} else {
    $query = "SELECT * FROM category";
}

$stmt = $mysqli->prepare($query);

if ($stmt === false) {
    echo json_encode(["error" => "Ошибка подготовки запроса: " . $mysqli->error]);
    exit();
}

$stmt->execute();

$result = $stmt->get_result();

$categories = [];

while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

$stmt->close();

$mysqli->close();

echo json_encode($categories);
?>
