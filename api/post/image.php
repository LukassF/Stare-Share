<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once '../dbhandler.php';
require_once './image-model.php';
require_once './image-controller.php';


if ($_SERVER['REQUEST_METHOD'] !== 'POST') die();

$result = [];

$folderPath = 'uploads/';
$postdata = json_decode(file_get_contents("php://input"));

$imageContr = new ImageUpload($folderPath, $postdata);
$result = $imageContr->uploadImage();

echo json_encode($result);
