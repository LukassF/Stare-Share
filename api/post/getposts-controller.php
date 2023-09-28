<?php

class GetPostsContr
{
    private $postsModel;

    public function __construct()
    {
        $this->postsModel = new GetPostsModel();
    }

    public function getAllPosts()
    {

        $arr = $this->postsModel->fetchAll();
        if ($arr)
            $resultArr = $this->getBase64($arr);
        else $resultArr = [];

        return $resultArr;
    }

    public function getUsersPosts(int $user_id)
    {
        $arr = $this->postsModel->fetchUserPosts($user_id);
        if ($arr)
            $userPosts = $this->getBase64($arr);
        else $userPosts = [];
        return $userPosts;
    }

    public function getLikedPosts(int $user_id)
    {

        $arr = $this->postsModel->fetchLikedPosts($user_id);
        if ($arr)
            $likedPosts = $this->getBase64($arr);
        else $likedPosts = [];

        return $likedPosts;
    }

    public function getPostsSegmented(int $start, int $offset)
    {

        $arr = $this->postsModel->fetchSegmentedPosts($start, $offset);
        if ($arr)
            $segmentedPosts = $this->getBase64($arr);
        else $segmentedPosts = [];

        return $segmentedPosts;
    }

    private function getBase64(array $array)
    {
        $resultArr = [];
        foreach ($array as $item) {
            $extension = explode('.', $item['image'])[1];
            $base64Img = 'data:image/' . $extension . ';base64,' . base64_encode(file_get_contents($item['image']));
            $result = array(...$item, 'base64' => $base64Img);
            array_push($resultArr, $result);
        }

        return $resultArr;
    }
}
