// Movie and TV Series Data
const moviesData = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&w=400",
        rating: 5,
        embedUrl: "https://www.youtube.com/embed/6hB3S9bIaco"
    },
    {
        id: 2,
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&w=400",
        rating: 5,
        embedUrl: "https://www.youtube.com/embed/sY1S34973zA"
    },
    {
        id: 3,
        title: "Pulp Fiction",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&w=400",
        rating: 4,
        embedUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY"
    },
    {
        id: 4,
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&w=400",
        rating: 5,
        embedUrl: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
        id: 5,
        title: "Inception",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&w=400",
        rating: 4,
        embedUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
        id: 6,
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&w=400",
        rating: 4,
        embedUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
    }
];

const seriesData = [
    {
        id: 7,
        title: "Breaking Bad",
        description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
        poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&w=400",
        rating: 5,
        embedUrl: "https://www.youtube.com/embed/HhesaQXLuRY"
    },
    {
        id: 8,
        title: "Game of Thrones",
        description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=400",
        rating: 4,
        embedUrl: "https://www.youtube.com/embed/rlR4PJn8b8I"
    },
    {
        id: 9,
        title: "Stranger Things",
        description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
        poster: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&w=400",
        rating: 4,
        embedUrl: "https://www.youtube.com/embed/b9EkMc79ZSU"
    },
    {
        id: 10,
        title: "The Crown",
        description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
        poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=400",
        rating: 4,
        embedUrl: "https://www.youtube.com/embed/JWtnJjn6ng0"
    }
];

// User Management
let currentUser = null;
let users = JSON.parse(localStorage.getItem('plsUsers')) || [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    loadSeries();
    checkUserSession();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Login Form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Signup Form
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Load Movies
function loadMovies() {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '';
    
    moviesData.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

// Load TV Series
function loadSeries() {
    const seriesGrid = document.getElementById('seriesGrid');
    seriesGrid.innerHTML = '';
    
    seriesData.forEach(series => {
        const seriesCard = createMovieCard(series);
        seriesGrid.appendChild(seriesCard);
    });
}

// Create Movie Card
function createMovieCard(item) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
    
    card.innerHTML = `
        <img src="${item.poster}" alt="${item.title}" class="movie-poster">
        <div class="movie-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="movie-rating">
                <span class="stars">${stars}</span>
                <span>(${item.rating}/5)</span>
            </div>
            <button class="play-btn" onclick="playMovie(${item.id}, '${item.title}', '${item.description}', '${item.embedUrl}')">
                <i class="fas fa-play"></i> Watch Now
            </button>
        </div>
    `;
    
    return card;
}

// Play Movie
function playMovie(id, title, description, embedUrl) {
    if (!currentUser) {
        alert('Please login to watch movies!');
        openModal('loginModal');
        return;
    }
    
    document.getElementById('currentMovieTitle').textContent = title;
    document.getElementById('currentMovieDesc').textContent = description;
    document.getElementById('moviePlayer').src = embedUrl;
    document.getElementById('playerModal').style.display = 'block';
}

// Close Player
function closePlayer() {
    document.getElementById('playerModal').style.display = 'none';
    document.getElementById('moviePlayer').src = '';
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('plsCurrentUser', JSON.stringify(user));
        updateUserInterface();
        closeModal('loginModal');
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid email or password!', 'error');
    }
}

// Handle Signup
function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already exists!', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };
    
    users.push(newUser);
    localStorage.setItem('plsUsers', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('plsCurrentUser', JSON.stringify(newUser));
    
    updateUserInterface();
    closeModal('signupModal');
    showNotification('Account created successfully!', 'success');
}

// Check User Session
function checkUserSession() {
    const savedUser = localStorage.getItem('plsCurrentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
}

// Update User Interface
function updateUserInterface() {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        userProfile.style.display = 'flex';
        userName.textContent = `Welcome, ${currentUser.name}`;
    } else {
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        userProfile.style.display = 'none';
    }
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('plsCurrentUser');
    updateUserInterface();
    showNotification('Logged out successfully!', 'success');
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchModal(closeModalId, openModalId) {
    closeModal(closeModalId);
    openModal(openModalId);
}

// Utility Functions
function scrollToMovies() {
    document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
