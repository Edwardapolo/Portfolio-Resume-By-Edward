<?php
require_once 'config.php';

echo "<h2>Database Fix - Recreating Table with Correct Structure</h2>";

try {
    // Test connection
    echo "<p>✅ Database connection successful!</p>";
    
    // Drop existing table if it exists
    $sql = "DROP TABLE IF EXISTS message_tbl";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    echo "<p>✅ Dropped existing table (if any)</p>";
    
    // Create table with correct structure
    $sql = "CREATE TABLE message_tbl (
        Message_ID INT AUTO_INCREMENT PRIMARY KEY,
        Full_Name VARCHAR(100) NOT NULL,
        Email VARCHAR(50) NOT NULL,
        Message_Content TEXT NOT NULL,
        Date_posted DATE NOT NULL
    )";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    echo "<p>✅ Created table 'message_tbl' with correct structure</p>";
    
    // Insert sample data
    $sampleData = [
        ['John Doe', 'john.doe@example.com', 'Great portfolio! I really like your web development skills.', '2025-01-15'],
        ['Jane Smith', 'jane.smith@example.com', 'Your technical writing skills are impressive. Keep up the good work!', '2025-01-16'],
        ['Mike Johnson', 'mike.johnson@example.com', 'The penalty monitoring system project looks interesting. Would love to know more about it.', '2025-01-17']
    ];
    
    $sql = "INSERT INTO message_tbl (Full_Name, Email, Message_Content, Date_posted) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    
    foreach ($sampleData as $data) {
        $stmt->execute($data);
    }
    
    echo "<p>✅ Sample data inserted successfully!</p>";
    
    // Verify the structure
    $sql = "DESCRIBE message_tbl";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<h3>✅ Verified Table Structure:</h3>";
    echo "<table border='1' style='border-collapse: collapse;'>";
    echo "<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>";
    
    foreach ($columns as $column) {
        echo "<tr>";
        echo "<td>" . $column['Field'] . "</td>";
        echo "<td>" . $column['Type'] . "</td>";
        echo "<td>" . $column['Null'] . "</td>";
        echo "<td>" . $column['Key'] . "</td>";
        echo "<td>" . $column['Default'] . "</td>";
        echo "<td>" . $column['Extra'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
    // Test inserting a message
    $testSql = "INSERT INTO message_tbl (Full_Name, Email, Message_Content, Date_posted) VALUES (?, ?, ?, CURDATE())";
    $testStmt = $pdo->prepare($testSql);
    $testStmt->execute(['Test User', 'test@example.com', 'This is a test message to verify the table works correctly.']);
    
    echo "<p>✅ Test message inserted successfully!</p>";
    
    // Show all messages
    $sql = "SELECT * FROM message_tbl ORDER BY Message_ID DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<h3>✅ All Messages in Database:</h3>";
    echo "<table border='1' style='border-collapse: collapse;'>";
    echo "<tr><th>ID</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>";
    
    foreach ($messages as $message) {
        echo "<tr>";
        echo "<td>" . $message['Message_ID'] . "</td>";
        echo "<td>" . htmlspecialchars($message['Full_Name']) . "</td>";
        echo "<td>" . htmlspecialchars($message['Email']) . "</td>";
        echo "<td>" . htmlspecialchars(substr($message['Message_Content'], 0, 50)) . "...</td>";
        echo "<td>" . $message['Date_posted'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
    echo "<p><strong>✅ Database fix completed successfully!</strong></p>";
    echo "<p>The table now has the correct column names and should work with your message board.</p>";
    echo "<p><a href='index.html'>Go to Portfolio</a> | <a href='test_connection.php'>Test Connection</a></p>";
    
} catch(PDOException $e) {
    echo "<p>❌ Error: " . $e->getMessage() . "</p>";
}
?>

<style>
body { font-family: Arial, sans-serif; margin: 20px; }
table { margin: 10px 0; }
th, td { padding: 8px; text-align: left; }
th { background-color: #f2f2f2; }
a { color: #754ef9; text-decoration: none; }
a:hover { text-decoration: underline; }
</style> 