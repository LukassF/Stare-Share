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
            // SELECT u.id,u.username,u.email,u.register_date,u.liked,COUNT(p.id) as posts FROM users u JOIN posts p ON p.USER_ID = u.ID GROUP BY u.id HAVING u.ID = 98;
            $sql = "SELECT u.id,u.username,u.email,u.register_date,u.liked, COUNT(p.id) as posts FROM users u JOIN posts p ON p.USER_ID = u.ID GROUP BY u.id HAVING u.ID = :user_id;";
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
