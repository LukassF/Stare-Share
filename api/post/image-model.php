<?php

class ImageModel extends DBH
{
    public function insertPost(string $image, string $desc, int $user_id)
    {
        try {
            $sql = "INSERT INTO posts (image,description,user_id) VALUES (:image,:desc,:user_id);";
            $stmt = parent::connect()->prepare($sql);
            $stmt->bindParam(":image", $image);
            $stmt->bindParam(":desc", $desc);
            $stmt->bindParam(":user_id", $user_id);
            $stmt->execute();
        } catch (PDOException $e) {
            return $e;
        }
    }
}
