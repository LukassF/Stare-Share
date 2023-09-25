<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// echo json_encode($_GET['user_id']);

require_once '../dbhandler.php';
require_once './users-model.php';
require_once './users-controller.php';

$usersCont = new UsersCont();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = json_decode(file_get_contents("php://input"));
    $result = $usersCont->getUserInfo($postdata->user_id);
} else {
    $result = $usersCont->getAllUsers();
}




echo json_encode($result);
