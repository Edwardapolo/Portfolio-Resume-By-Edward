<?php
require_once 'config.php';

try {
    $sql = "SELECT * FROM message_tbl ORDER BY Date_posted DESC, Message_ID DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(['status' => 'success', 'messages' => $messages]);
} catch(PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error fetching messages: ' . $e->getMessage()]);
}
?> 