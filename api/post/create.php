<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once '../dbhandler.php';
require_once './create-model.php';
require_once './create-controller.php';


if ($_SERVER['REQUEST_METHOD'] !== 'POST') die();


$folderPath = 'uploads/';
$postdata = json_decode(file_get_contents("php://input"));


$imageContr = new CreatePost($folderPath, $postdata);

if (!empty($postdata->image))
    $result = $imageContr->uploadImage();
elseif (!empty($postdata->post_id))
    $result = 'hi';

echo json_encode($result);
