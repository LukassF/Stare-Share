<?php

class DBH
{

    private $host = "your_db_host";
    private $dbname = "your_db_name";
    private $dbusername = 'your_db_username';
    private $dbpassword = 'your_db_password';

    protected function connect()
    {
        try {
            $pdo = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $pdo;
        } catch (PDOException $e) {
            die('Connection failed: ' . $e->getMessage());
        }
    }
}
