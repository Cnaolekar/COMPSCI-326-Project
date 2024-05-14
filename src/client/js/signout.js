document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('signOutButton');
    const logoutMessage = document.getElementById('logoutMessage');
    
    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            localStorage.removeItem('userEmail');
            if (logoutMessage) {
                logoutMessage.textContent = 'You have been logged out';
                logoutMessage.style.display = 'block';
            }
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000); 
        });
    }
});
