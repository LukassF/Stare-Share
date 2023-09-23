<?php

class ImageUpload
{
    private $folderpath;
    private $postdata;
    private $imageModel;

    public function __construct(string $folderpath, $postdata)
    {
        $this->folderpath = $folderpath;
        $this->postdata = $postdata;
        $this->imageModel = new ImageModel();
    }

    public function uploadImage()
    {
        if (!empty($this->postdata)) {
            $image_parts = explode(";base64,", $this->postdata->image);
            $image_type = explode('/', $image_parts[0])[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $this->folderpath . uniqid() . ".$image_type";

            //checking if the image already exist in the uploads folder
            $uploads = array_diff(scandir('uploads'), array('.', '..'));
            foreach ($uploads as $uploaded) {
                if (file_get_contents("uploads/$uploaded") === $image_base64) {
                    $result['file'] = "uploads/$uploaded";
                    $this->imageModel->insertPost("uploads/$uploaded", $this->postdata->desc, $this->postdata->user_id);
                    $result['success'] = 'Image uploaded successfully!';

                    return $result;
                }
            }

            if (file_put_contents($file, $image_base64)) {
                $this->imageModel->insertPost($file, $this->postdata->desc, $this->postdata->user_id);
                $result['success'] = 'Image uploaded successfully!';
            } else $result['error'] = 'Failed to upload image. Try again!';

            $result['file'] = $file;
        } else {
            $result['error'] = 'File not selected';
        }

        return $result;
    }
}
