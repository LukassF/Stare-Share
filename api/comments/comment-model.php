<?php

declare(strict_types=1);

class CommentModel extends DBH
{

    public function insertComment(string $content, int $user_id, int $post_id)
    {

        try {
            $sql = "INSERT INTO comments (content,post_id,user_id) VALUES (:content,:post_id,:user_id);
            UPDATE posts SET posts.COMMENTS = posts.COMMENTS + 1 WHERE posts.ID=:post_id";
            $stmt = parent::connect()->prepare($sql);
            $stmt->bindParam(":content", $content);
            $stmt->bindParam(":post_id", $post_id);
            $stmt->bindParam(":user_id", $user_id);
            $stmt->execute();

            $insertedRow = $this->fetchInsertedComment($content);
            return $insertedRow;
        } catch (PDOException $e) {
            return $e;
        }
    }

    public function fetchPostComments(int $post_id)
    {
        try {
            $sql = "SELECT c.id as id,c.content,c.comment_date,u.username,u.email,u.id as user_id FROM comments c JOIN users u ON u.ID=c.USER_ID WHERE c.POST_ID=:post_id";
            $stmt = parent::connect()->prepare($sql);
            $stmt->bindParam(':post_id', $post_id);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function fetchInsertedComment(string $content)
    {
        try {
            $sql = "SELECT c.id as id,c.content,c.comment_date,u.username,u.email,u.id as user_id FROM comments c JOIN users u ON u.ID=c.USER_ID WHERE c.content=:content";
            $stmt = parent::connect()->prepare($sql);
            $stmt->bindParam(':content', $content);
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return array_pop($result);
        } catch (PDOException $e) {
            return $e;
        }
    }
}
