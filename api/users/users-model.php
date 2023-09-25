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

    public function fetchUserInfo(int $user_id)
    {
        try {
            $sql = "SELECT u.id,u.username,u.email,u.liked, u.register_date FROM users u WHERE u.id=:user_id;";
            $stmt = parent::connect()->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            return false;
        }
    }
}
