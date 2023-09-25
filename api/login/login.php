<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$loginData = json_decode(file_get_contents('php://input'));
if (!empty($loginData)) {
    $username = $loginData->username;
    $password = $loginData->password;
}

session_start();
unset($_SESSION['login_log']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    require_once '../dbhandler.php';
    require_once 'login_controller.php';

    $echos = [];
    $login = new LogIn($username, $password);
    $result = $login->logInUser();

    if (!empty($_SESSION['login_log']))
        $echos['session_logs'] = $_SESSION['login_log'];

    if ($result) {
        $echos['username'] = $username;
        $echos['email'] = $result['EMAIL'];
        $echos['id'] = $result['ID'];
        $echos['liked'] = $result['LIKED'];
        $echos['register_date'] = $result['REGISTER_DATE'];
    }

    echo json_encode($echos);
} else {
    die();
}
