document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const pageNumbers = document.querySelectorAll('.page-number');
    const allClassCards = document.querySelectorAll('.class-card');
    let currentPage = 1;
    const classesPerPage = 4;
    
    function showClasses(page, filter = "") {
      const start = (page - 1) * classesPerPage;
      const end = start + classesPerPage;
      let count = 0;
      
      allClassCards.forEach((card, index) => {
        const matchesFilter = filter === "" || card.dataset.category === filter;
        
        if (matchesFilter && count >= start && count < end) {
          card.classList.remove('hidden');
          count++;
        } else {
          card.classList.add('hidden');
        }
      });
      
      currentPage = page;
      updatePageNumbers();
    }
    
    function updatePageNumbers() {
      pageNumbers.forEach(number => {
        if (parseInt(number.textContent) === currentPage) {
          number.classList.add('active');
        } else {
          number.classList.remove('active');
        }
      });
    }
    
    function filterClasses() {
      const selectedCategory = categorySelect.value;
      currentPage = 1; // Reset to the first page
      showClasses(currentPage, selectedCategory);
    }
    
    categorySelect.addEventListener('change', filterClasses);
  
    pageNumbers.forEach(number => {
      number.addEventListener('click', function() {
        showClasses(parseInt(this.textContent));
      });
    });
    
    showClasses(currentPage);
  });
  


