<?php
$servername = getenv('DB_SERVERNAME2');
$username = getenv('DB_USERNAME2');
$password = getenv('DB_PASSWORD2');
$dbname = getenv('DB_NAME2');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT nameManagers, emailManagers FROM managers";
$result = $conn->query($sql);

$managers = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $managers[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');

echo json_encode($managers);
?>
