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
        $resultArr = $this->getBase64($arr);

        return $resultArr;
    }

    public function getUsersPosts(int $user_id)
    {
        $arr = $this->postsModel->fetchUserPosts($user_id);
        $userPosts = $this->getBase64($arr);
        return $userPosts;
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
