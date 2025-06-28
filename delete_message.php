<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $message_id = isset($_POST['message_id']) ? (int)$_POST['message_id'] : 0;
    
    if ($message_id > 0) {
        try {
            $sql = "DELETE FROM message_tbl WHERE Message_ID = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$message_id]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(['status' => 'success', 'message' => 'Message deleted successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Message not found or already deleted']);
            }
        } catch(PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Error deleting message: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid message ID']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?> 