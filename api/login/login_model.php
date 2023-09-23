<?php

declare(strict_types=1);

class LogInModel extends DBH
{
    public function get_user_by_username(string $username)
    {
        $sql = "SELECT * FROM users WHERE username = :username OR email = :username;";
        $stmt = parent::connect()->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }
}
