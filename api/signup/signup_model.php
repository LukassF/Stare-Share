<?php

declare(strict_types=1);

class UserModel extends DBH
{
    public function insertUser(string $username, string $password, string $email)
    {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username,password,email) VALUES (:username,:password,:email);";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $hashedPassword);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
    }

    public function getEmail(string $email)
    {
        $sql = "SELECT username FROM users WHERE email = :email;";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getUsername(string $username)
    {
        $sql = "SELECT username FROM users WHERE username = :username;";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }
}
