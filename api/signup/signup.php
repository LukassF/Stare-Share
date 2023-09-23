<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$loginData = json_decode(file_get_contents('php://input'));
if (!empty($loginData)) {
    $username = $loginData->username;
    $email = $loginData->email;
    $password = $loginData->password;
}


session_start();
unset($_SESSION['signup_log']);

if ($_SERVER["REQUEST_METHOD"] === "POST") {


    require_once '../dbhandler.php';
    require_once 'signup_controller.php';

    $user = new SignUp($username, $password, $email);

    $user->signUpUser();
    if (!empty($_SESSION['signup_log']))
        echo json_encode($_SESSION['signup_log']);
} else {
    die();
}
