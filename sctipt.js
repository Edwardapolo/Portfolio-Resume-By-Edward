/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    /*========== sticky navbar ==========*/
    let header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
    if (menuIcon) {
        menuIcon.classList.remove('bx-x');
    }
    if (navbar) {
        navbar.classList.remove('active');
    }
};

/*========== swiper ==========*/
if (typeof Swiper !== 'undefined') {
    try {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    } catch (error) {
        console.warn('Swiper initialization failed:', error);
    }
}

/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector('#darkMode-icon');

if (darkModeIcon) {
    darkModeIcon.onclick = () => {
        darkModeIcon.classList.toggle('bx-sun');
        document.body.classList.toggle('dark-mode');
    };
}

/*========== Message Board Functionality ==========*/
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're running on a web server (not file:// protocol)
    if (window.location.protocol === 'file:') {
        console.warn('⚠️ This website needs to run on a web server (like XAMPP) for the message board to work properly.');
        console.warn('Please access via: http://localhost/Portfolio_By_BalbaresE-main/');
        
        // Show warning message to user
        const warningDiv = document.createElement('div');
        warningDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff6b6b;
            color: white;
            padding: 10px;
            text-align: center;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        warningDiv.innerHTML = `
            ⚠️ <strong>Important:</strong> This website needs to run on a web server for full functionality. 
            Please access via: <a href="http://localhost/Portfolio_By_BalbaresE-main/" style="color: white; text-decoration: underline;">http://localhost/Portfolio_By_BalbaresE-main/</a>
        `;
        document.body.appendChild(warningDiv);
        
        return; // Don't load messages if not on web server
    }
    
    // Load messages when page loads
    loadMessages();
    
    // Handle form submission
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitMessage();
        });
    }
});

function loadMessages() {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    fetch('get_messages.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                displayMessages(data.messages);
            } else {
                messagesContainer.innerHTML = '<div class="no-messages">Error loading messages: ' + (data.message || 'Unknown error') + '</div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messagesContainer.innerHTML = '<div class="no-messages">Error loading messages. Please check your server setup.</div>';
        });
}

function displayMessages(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    if (!messagesContainer) return;
    
    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div class="no-messages">No messages yet. Be the first to leave a message!</div>';
        return;
    }
    
    let html = '';
    messages.forEach(message => {
        html += `
            <div class="message-item" data-message-id="${message.Message_ID}">
                <div class="message-header">
                    <div class="message-info">
                        <span class="message-author">${escapeHtml(message.Full_Name)}</span>
                        <span class="message-date">${formatDate(message.Date_posted)}</span>
                    </div>
                    <div class="message-actions">
                        <button class="edit-btn" onclick="editMessage(${message.Message_ID}, '${escapeHtml(message.Full_Name)}', '${escapeHtml(message.Email)}', '${escapeHtml(message.Message_Content)}')" title="Edit message">
                            <i class='bx bx-edit-alt'></i>
                        </button>
                        <button class="delete-btn" onclick="deleteMessage(${message.Message_ID})" title="Delete message">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
                <div class="message-content">${escapeHtml(message.Message_Content)}</div>
            </div>
        `;
    });
    
    messagesContainer.innerHTML = html;
}

function deleteMessage(messageId) {
    if (confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
        const formData = new FormData();
        formData.append('message_id', messageId);
        
        fetch('delete_message.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                // Remove the message from DOM
                const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
                if (messageElement) {
                    messageElement.style.opacity = '0';
                    messageElement.style.transform = 'translateX(-100%)';
                    setTimeout(() => {
                        messageElement.remove();
                        // Reload messages to update the list
                        loadMessages();
                    }, 300);
                }
                
                // Show success message
                showNotification(data.message, 'success');
            } else {
                showNotification(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Error deleting message. Please try again.', 'error');
        });
    }
}

function editMessage(messageId, fullName, email, messageContent) {
    // Create modal HTML
    const modalHTML = `
        <div class="edit-modal" id="editModal">
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h3>Edit Message</h3>
                    <button class="close-btn" onclick="closeEditModal()">
                        <i class='bx bx-x'></i>
                    </button>
                </div>
                <form id="editMessageForm">
                    <input type="hidden" name="message_id" value="${messageId}">
                    <div class="input-box">
                        <input type="text" name="full_name" placeholder="Full Name" value="${fullName}" required>
                        <input type="email" name="email" placeholder="Email Address" value="${email}" required>
                    </div>
                    <textarea name="message_content" cols="30" rows="10" placeholder="Your Message" required>${messageContent}</textarea>
                    <div class="edit-form-actions">
                        <button type="button" class="btn cancel-btn" onclick="closeEditModal()">Cancel</button>
                        <button type="submit" class="btn">Update Message</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listener to form
    document.getElementById('editMessageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateMessage();
    });
    
    // Focus on first input
    setTimeout(() => {
        document.querySelector('#editModal input[name="full_name"]').focus();
    }, 100);
}

function updateMessage() {
    const form = document.getElementById('editMessageForm');
    const formData = new FormData(form);
    
    fetch('edit_message.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            showNotification(data.message, 'success');
            closeEditModal();
            loadMessages(); // Reload messages to show updated content
        } else {
            showNotification(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Error updating message. Please try again.', 'error');
    });
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.remove();
    }
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class='bx bx-x'></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function submitMessage() {
    const form = document.getElementById('messageForm');
    const formData = new FormData(form);
    
    fetch('submit_message.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            showNotification(data.message, 'success');
            form.reset();
            loadMessages();
        } else {
            showNotification(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Error sending message. Please try again.', 'error');
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/*========== scroll reveal ==========*/
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
}

/*========== Modern alternative to deprecated events ==========*/
// Use Intersection Observer for scroll-based animations (modern approach)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.addEventListener('DOMContentLoaded', () => {
        const animateElements = document.querySelectorAll('.home-content, .heading, .home-img img, .services-container, .portfolio-box, .contact form');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    });
}
