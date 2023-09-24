<?php

class GetPostsModel extends DBH
{

    public function fetchAll()
    {
        try {
            $sql = "SELECT p.id,p.image, p.description, p.upload_date, p.user_id,p.likes,p.comments, u.email, u.username FROM posts p JOIN users u ON u.id = p.USER_ID;";
            $stmt = parent::connect()->prepare($sql);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function fetchUserPosts(int $user_id)
    {
        try {
            $sql = "SELECT p.id,p.image, p.description, p.upload_date, p.user_id,p.likes,p.comments, u.email, u.username FROM posts p JOIN users u ON u.id = p.USER_ID WHERE u.id=:user_id;";
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
