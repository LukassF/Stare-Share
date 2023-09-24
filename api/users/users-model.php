<?php

class UserModel extends DBH
{

    public function fetchAllUsers()
    {
        try {
            $sql = "SELECT id, username, email FROM users;";
            $stmt = parent::connect()->prepare($sql);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            return false;
        }
    }
}
