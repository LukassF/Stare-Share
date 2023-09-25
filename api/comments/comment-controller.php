<?php

declare(strict_types=1);

class CommentContr
{
    private $content;
    private $post_id;
    private $user_id;
    private $pusher;
    private $commentModel;

    public function __construct(string $content, int $user_id, int $post_id, $pusher)
    {
        $this->content = $content;
        $this->user_id = $user_id;
        $this->post_id = $post_id;
        $this->pusher = $pusher;
        $this->commentModel = new CommentModel();
    }

    public function sendComment()
    {
        if (!empty($this->content)) {
            $insertedRow = $this->commentModel->insertComment($this->content, $this->user_id, $this->post_id);

            $this->pusher->trigger('comment-section', 'new-comment', $insertedRow);

            // return $insertedRow;
        } else return false;
    }

    public function getComments()
    {
        if (!empty($this->post_id))
            return $this->commentModel->fetchPostComments($this->post_id);
        else return false;
    }
}
