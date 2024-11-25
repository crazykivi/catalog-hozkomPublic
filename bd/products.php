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

$categoryArticle = isset($_GET['categoryArticle']) ? $mysqli->real_escape_string($_GET['categoryArticle']) : '';
$searchInput = isset($_GET['searchInput']) ? $mysqli->real_escape_string($_GET['searchInput']) : '';
$searchType = isset($_GET['searchType']) ? $mysqli->real_escape_string($_GET['searchType']) : 'all';

$searchWords = explode(' ', $searchInput);
$searchConditions = [];

foreach ($searchWords as $word) {
    $escapedWord = $mysqli->real_escape_string($word);

    if ($searchType === 'code') {
        $searchConditions[] = "codeArticle LIKE '%$escapedWord%'";
    } elseif ($searchType === 'name') {
        $searchConditions[] = "nameArticle LIKE '%$escapedWord%'";
    } else {
        $searchConditions[] = "(codeArticle LIKE '%$escapedWord%' OR nameArticle LIKE '%$escapedWord%')";
    }
}

$searchQuery = implode(' AND ', $searchConditions);
$allowedSortFields = ['nameArticle', 'priceArticle'];
$allowedSortOrders = ['asc', 'desc'];
$sortField = isset($_GET['sortField']) ? $_GET['sortField'] : 'nameArticle';
$sortOrder = isset($_GET['sortOrder']) ? $_GET['sortOrder'] : 'asc';
$profitably = isset($_GET['profitably']) ? $mysqli->real_escape_string($_GET['profitably']) : '0';

$sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'nameArticle';
$sortOrder = in_array($sortOrder, $allowedSortOrders) ? $sortOrder : 'asc';

$query = '';

if ($categoryArticle) {
    $query = "WITH RECURSIVE CategoryTree AS (
        SELECT idCategory, CategoryArticle, SubCategoryArticle FROM category
        WHERE CategoryArticle = '$categoryArticle'
        UNION ALL
            SELECT c.idCategory, c.CategoryArticle, c.SubCategoryArticle FROM category c
            INNER JOIN CategoryTree ct ON c.SubCategoryArticle = ct.CategoryArticle)
        SELECT a.* FROM article a
        INNER JOIN CategoryTree ct ON a.CategoryArticle = ct.CategoryArticle
        WHERE a.availabilityArticle = 'true'
        AND a.profitably = '$profitably' AND ($searchQuery) 
        ORDER BY $sortField $sortOrder";
} else {
    $query = "SELECT * FROM article 
    WHERE availabilityArticle='true' 
    AND profitably = '$profitably' AND ($searchQuery)
    ORDER BY $sortField $sortOrder";
}

error_log($query);

$result = $mysqli->query($query);

if (!$result) {
    echo json_encode(["error" => $mysqli->error]);
    exit();
}

$articles = [];

while ($row = $result->fetch_assoc()) {
    $articles[] = $row;
}

echo json_encode($articles);
?>
