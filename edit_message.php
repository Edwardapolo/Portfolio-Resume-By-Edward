<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $message_id = isset($_POST['message_id']) ? (int)$_POST['message_id'] : 0;
    $full_name = isset($_POST['full_name']) ? trim($_POST['full_name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message_content = isset($_POST['message_content']) ? trim($_POST['message_content']) : '';
    
    // Validate inputs
    if ($message_id <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid message ID']);
        exit;
    }
    
    if (empty($full_name) || empty($email) || empty($message_content)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
        exit;
    }
    
    try {
        $sql = "UPDATE message_tbl SET Full_Name = ?, Email = ?, Message_Content = ? WHERE Message_ID = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$full_name, $email, $message_content, $message_id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Message updated successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Message not found or no changes made']);
        }
    } catch(PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error updating message: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?> 