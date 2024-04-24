document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.testimonial-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const leftArrow = document.querySelector('.testimonial-arrow-left');
    const rightArrow = document.querySelector('.testimonial-arrow-right');
  
    let currentIndex = 0; // Track the current index
    const visibleCards = 3; // Number of visible cards
    const totalCards = cards.length; // Total number of cards
  
    function updateView() {
      // Hide all cards
      cards.forEach(card => {
        card.style.display = 'none';
      });
  
      // Calculate the range of cards to be shown
      const start = currentIndex;
      const end = start + visibleCards;
  
      // Show the cards in the range
      for (let i = start; i < end; i++) {
        const cardIndex = i % totalCards; // Wrap around if index exceeds the number of cards
        cards[cardIndex].style.display = 'flex'; // Flex to apply the styles you have in CSS
      }
    }
  
    // Initialize the view
    updateView();
  
    // Set up event listeners for arrows
    leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex - visibleCards + totalCards) % totalCards;
      updateView();
    });
  
    rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex + visibleCards) % totalCards;
      updateView();
    });
  });
  
