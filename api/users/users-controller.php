<?php

class UsersCont
{
    private $usersModel;

    public function __construct()
    {
        $this->usersModel = new UserModel();
    }

    public function getAllUsers()
    {
        $result = $this->usersModel->fetchAllUsers();
        return $result;
    }

    public function getUserInfo(int $user_id)
    {
        $result = $this->usersModel->fetchUserInfo($user_id);
        return $result;
    }
}
