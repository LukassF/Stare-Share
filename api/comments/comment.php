<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once '../dbhandler.php';
require_once './comment-model.php';
require_once './comment-controller.php';

$comment = json_decode(file_get_contents('php://input'));
$commentContr = new CommentContr($comment->comment, $comment->user_id, $comment->post_id);

if ($comment->send)
    $result = $commentContr->sendComment();
else
    $result = $commentContr->getComments();


echo json_encode($result);
