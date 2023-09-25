<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once '../dbhandler.php';
require_once './comment-model.php';
require_once './comment-controller.php';
require_once '../vendor/autoload.php';

$options = array(
    'cluster' => 'eu',
    'useTLS' => true
);
$pusher = new Pusher\Pusher(
    '5f08c4ab1ae08966f7f9',
    '28cb7d4ff2032d54b738',
    '1676695',
    $options
);


$comment = json_decode(file_get_contents('php://input'));
$commentContr = new CommentContr($comment->comment, $comment->user_id, $comment->post_id, $pusher);

if ($comment->send)
    $result = $commentContr->sendComment();
else
    $result = $commentContr->getComments();


echo json_encode($result);
