<?php

class CreatePostModel extends DBH
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
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function updateLikeQuantity(int $post_id, int $user_id)
    {
        try {
            //checking if the post is already liked by the user
            $to_insert = "$post_id,";
            $likedAsString = $this->getUserLikedAsString($user_id)[0]['liked'];
            $likedAsArray = explode(',', rtrim($likedAsString, ','));
            if (in_array("$post_id", $likedAsArray))
                $to_insert = '';
            else array_push($likedAsArray, "$post_id");

            $sql = "UPDATE posts SET posts.LIKES = posts.LIKES + 1 WHERE posts.ID=:post_id;
            UPDATE users SET users.LIKED = CONCAT(users.LIKED, '$to_insert') WHERE users.ID=:user_id;";

            $stmt = parent::connect()->prepare($sql);
            $stmt->bindParam(":post_id", $post_id);
            $stmt->bindParam(":user_id", $user_id);
            $stmt->execute();

            return $likedAsArray;
        } catch (PDOException $e) {
            return $e;
        }
    }

    public function reduceLikeQuantity(int $post_id, int $user_id)
    {
        try {
            $likedAsString = $this->getUserLikedAsString($user_id)[0]['liked'];
            $likedAfterReduce = str_replace("$post_id,", "", $likedAsString);
            $likedAfterReduceAsArray = explode(',', rtrim($likedAfterReduce, ','));


            $sql = "UPDATE posts SET posts.LIKES = posts.LIKES - 1 WHERE posts.ID=:post_id;
            UPDATE users SET users.LIKED = '$likedAfterReduce' WHERE users.ID=:user_id;";

            $stmt = parent::connect()->prepare($sql);
            $stmt->bindParam(":post_id", $post_id);
            $stmt->bindParam(":user_id", $user_id);
            $stmt->execute();

            return $likedAfterReduceAsArray;
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function getUserLikedAsString(int $user_id)
    {
        try {

            $sql = "SELECT users.liked FROM users WHERE users.id = :user_id";
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
