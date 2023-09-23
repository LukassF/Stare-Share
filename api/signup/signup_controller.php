<?php


declare(strict_types=1);
require_once './signup_model.php';

class SignUp
{
    private $username;
    private $password;
    private $email;
    private $signupLog;
    private $userModel;

    public function __construct(string $username, string $password, string $email)
    {
        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        $this->userModel = new UserModel();
    }

    public function signUpUser()
    {
        $log = '';
        if ($this->are_fields_empty()) {
            $log = "Fields can't be empty!";
        } elseif ($this->email_invalid()) {
            $log = "Email is invalid or taken!";
        } elseif ($this->username_taken()) {
            $log = "Username is taken!";
        } else {
            $log = 'Signup successfull!';
        }
        $_SESSION['signup_log'] = $log;

        if (!empty($log) && $log !== 'Signup successfull!') {
            return;
        }

        $this->userModel->insertUser(
            $this->username,
            $this->password,
            $this->email
        );
    }

    private function are_fields_empty()
    {
        if (empty($this->username) || empty($this->email) || empty($this->password)) {
            return true;
        } else {
            return false;
        }
    }

    private function email_invalid()
    {
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL) || $this->userModel->getEmail($this->email)) {
            return true;
        } else {
            return false;
        }
    }

    private function username_taken()
    {
        if ($this->userModel->getUsername($this->username)) {
            return true;
        } else {
            return false;
        }
    }
}
