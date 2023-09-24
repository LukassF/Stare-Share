<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


require_once '../dbhandler.php';
require_once './getposts-model.php';
require_once './getposts-controller.php';

$postsContr = new GetPostsContr();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postdata = json_decode(file_get_contents("php://input"));

    if ($postdata->user_id)
        $result = $postsContr->getUsersPosts($postdata->user_id);
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $postsContr->getAllPosts();
}

echo json_encode($result);
