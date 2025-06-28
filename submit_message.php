<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $message_content = trim($_POST['message_content']);
    
    // Basic validation
    if (empty($full_name) || empty($email) || empty($message_content)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address']);
        exit;
    }
    
    try {
        $sql = "INSERT INTO message_tbl (Full_Name, Email, Message_Content, Date_posted) VALUES (?, ?, ?, CURDATE())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$full_name, $email, $message_content]);
        
        echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
    } catch(PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error saving message: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?> 