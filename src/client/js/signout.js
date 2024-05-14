document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('signOutButton');
    
    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            localStorage.removeItem('userEmail');
            window.location.href = 'login.html';
        });
    }
});
