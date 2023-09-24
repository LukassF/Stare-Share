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

        if ($result)
            return $result;
        else return false;
    }
}
