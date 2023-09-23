<?php

declare(strict_types=1);
require_once './login_model.php';

class LogIn
{
    private $username;
    private $password;
    private $userModel;

    public function __construct(string $username, string $password)
    {
        $this->username = $username;
        $this->password = $password;
        $this->userModel = new LogInModel();
    }

    public function logInUser()
    {
        $result = $this->userModel->get_user_by_username($this->username);
        $log = '';

        if ($this->are_fields_empty()) {
            $log = 'Fields cannot be empty!';
        } elseif ($this->is_username_wrong($result)) {
            $log = 'No username found!';
        } elseif ($this->is_password_wrong($result)) {
            $log = 'Password is incorrect!';
        } else {
            $log = 'Login successfull!';
        }

        $_SESSION['login_log'] = $log;

        if (!empty($log) && $log !== 'Login successfull!') {
            return;
        }

        return $result;
    }

    private function is_password_wrong(array $result)
    {
        if (password_verify($this->password, $result['PASSWORD'])) {
            return false;
        } else {
            return true;
        }
    }

    private function is_username_wrong(bool|array $result)
    {
        if (!$result) {
            return true;
        } else {
            return false;
        }
    }

    private function are_fields_empty()
    {
        if (empty($this->username) || empty($this->password)) {
            return true;
        } else {
            return false;
        }
    }
}
