<?php
$code = $_GET['code'];

header('Content-Type: application/json');
$servername = getenv('DB_SERVERNAME2');
$username = getenv('DB_USERNAME2');
$password = getenv('DB_PASSWORD2');
$dbname = getenv('DB_NAME2');

$mysqli = new mysqli($servername, $username, $password, $dbname);

if ($mysqli->connect_errno) {
    echo json_encode(["error" => $mysqli->connect_error]);
    exit();
}

$query = $mysqli->prepare('SELECT codeArticle, nameArticle, CategoryArticle, priceArticle FROM article WHERE codeArticle = ? AND availabilityArticle="true" ORDER BY nameArticle DESC');

if (!$query) {
    echo json_encode(["error" => $mysqli->error]); // Выводим ошибку
    exit();
}

$query->bind_param('i', $code); // Передаём $code как параметр (тип - integer)
$query->execute();

$result = $query->get_result();
$article = $result->fetch_assoc();

echo json_encode($article);

$query->close();
$mysqli->close();
