<?php

class DBH
{

    private $host = "localhost";
    private $dbname = "testdb";
    private $dbusername = 'root';
    private $dbpassword = '';
    // private $host = "sql101.infinityfree.com";
    // private $dbname = "if0_35132336_sociallyawkward";
    // private $dbusername = '	if0_35132336';
    // private $dbpassword = 't4OWRy8h4L8y9Rl';

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
