# Edward Balbares Portfolio with Message Board

A clean, modern portfolio website with an integrated message board system.

## Features

- **Portfolio Sections**: Home, About, Skills, Projects, Resume
- **Message Board**: Contact form with real-time message display
- **Database Integration**: MySQL database for storing messages
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes

## Quick Setup

### Prerequisites
- XAMPP (or similar local server with PHP and MySQL)
- Web browser

### Installation Steps

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start Apache and MySQL services

2. **Setup Database**
   - Go to: `http://localhost/Portfolio_By_BalbaresE-main/fix_database.php`
   - This will create the database and table automatically

3. **Access Website**
   - Open: `http://localhost/Portfolio_By_BalbaresE-main/`
   - The message board will work immediately

## File Structure

```
Portfolio_By_BalbaresE-main/
├── index.html              # Main portfolio page
├── style.css               # Stylesheet
├── sctipt.js              # JavaScript functionality
├── config.php             # Database configuration
├── submit_message.php     # Handle message submission
├── get_messages.php       # Fetch messages from database
├── fix_database.php       # Database setup script
├── message_board_db.sql   # Database structure
├── README.md              # This file
└── images/                # Portfolio images
    ├── Edward.png
    ├── Ed.jpg
    └── Award.jpg
```

## Database Schema

### Table: message_tbl
- **Message_ID** (INT, Auto Increment, Primary Key)
- **Full_Name** (VARCHAR 100)
- **Email** (VARCHAR 50)
- **Message_Content** (TEXT)
- **Date_posted** (DATE)

## Message Board Features

- **Real-time Updates**: Messages appear immediately after submission
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Works on all screen sizes
- **Error Handling**: User-friendly error messages
- **Security**: SQL injection prevention with prepared statements

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running in XAMPP
   - Check database credentials in `config.php`

2. **Messages Not Loading**
   - Run `fix_database.php` to setup the database
   - Check browser console for errors

3. **Form Not Submitting**
   - Ensure all required fields are filled
   - Check for valid email format

### Important Notes

- **Always access via**: `http://localhost/Portfolio_By_BalbaresE-main/`
- **Never open files directly** from file explorer
- **Use XAMPP** for proper functionality

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+
- **Libraries**: ScrollReveal.js, Boxicons

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational purposes. All rights reserved. 