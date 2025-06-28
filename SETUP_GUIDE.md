# 🚀 Complete Setup Guide - Edward Balbares Portfolio

## ⚠️ IMPORTANT: You MUST use XAMPP (or similar web server)

**The website will NOT work properly if opened directly from file explorer!**

## 🔧 Step-by-Step Setup Instructions

### 1. **Start XAMPP**
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Both should show green status

### 2. **Place Files in Correct Location**
1. Copy all files to: `C:\xampp\htdocs\Portfolio_By_BalbaresE-main\`
2. Ensure the folder structure is:
   ```
   C:\xampp\htdocs\Portfolio_By_BalbaresE-main\
   ├── index.html
   ├── style.css
   ├── sctipt.js
   ├── config.php
   ├── submit_message.php
   ├── get_messages.php
   ├── setup_database.php
   ├── test_connection.php
   ├── message_board_db.sql
   ├── README.md
   └── images\
       ├── Edward.png
       ├── Ed.jpg
       └── Award.jpg
   ```

### 3. **Setup Database**
1. Open browser and go to: `http://localhost/Portfolio_By_BalbaresE-main/setup_database.php`
2. This will automatically create the database and table
3. You should see: "✅ Database setup completed successfully!"

### 4. **Test Database Connection**
1. Go to: `http://localhost/Portfolio_By_BalbaresE-main/test_connection.php`
2. Verify you see the table structure and sample data

### 5. **Access Your Portfolio**
1. Open: `http://localhost/Portfolio_By_BalbaresE-main/`
2. The website should load completely with working message board

## ❌ Common Issues & Solutions

### **Issue: CORS Error / "Failed to fetch"**
**Cause**: Opening files directly from file explorer instead of web server
**Solution**: Always use `http://localhost/Portfolio_By_BalbaresE-main/`

### **Issue: "Undefined array key Full_Name"**
**Cause**: Database table not created or wrong structure
**Solution**: Run `setup_database.php` first

### **Issue: "Cannot read properties of null"**
**Cause**: JavaScript trying to access elements that don't exist
**Solution**: Fixed in updated code - now has proper error handling

### **Issue: Favicon 404 Error**
**Cause**: Missing favicon file
**Solution**: Removed favicon reference - no longer needed

### **Issue: XAMPP Services Won't Start**
**Solutions**:
- Check if ports 80/443 are in use (close other web servers)
- Run XAMPP as Administrator
- Check Windows Firewall settings

## ✅ What Should Work After Setup

1. **Portfolio Sections**: Home, About, Skills, Projects, Resume
2. **Message Board**: Contact form with real-time message display
3. **Database**: Messages stored and retrieved from MySQL
4. **Responsive Design**: Works on mobile and desktop
5. **Dark/Light Mode**: Theme toggle functionality
6. **Smooth Scrolling**: Navigation between sections

## 🔍 Testing Checklist

- [ ] XAMPP Apache and MySQL running (green status)
- [ ] Database setup completed successfully
- [ ] Website loads at `http://localhost/Portfolio_By_BalbaresE-main/`
- [ ] No console errors in browser developer tools
- [ ] Contact form submits messages
- [ ] Message board displays messages
- [ ] All portfolio sections display correctly
- [ ] Responsive design works on mobile

## 📞 If You Still Have Issues

1. **Check XAMPP Logs**: Look in XAMPP Control Panel → Logs
2. **Browser Console**: Press F12 → Console tab for JavaScript errors
3. **Database**: Use phpMyAdmin to verify table exists
4. **File Permissions**: Ensure PHP files are readable

## 🎯 Quick Test URLs

- **Main Site**: `http://localhost/Portfolio_By_BalbaresE-main/`
- **Database Setup**: `http://localhost/Portfolio_By_BalbaresE-main/setup_database.php`
- **Connection Test**: `http://localhost/Portfolio_By_BalbaresE-main/test_connection.php`
- **phpMyAdmin**: `http://localhost/phpmyadmin/`

---

**Remember**: Always access via `http://localhost/` NOT `file:///` protocol! 