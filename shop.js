document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            popup.style.display = 'block';
        });
    });

    closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateStatistics();
    animateContactInfo();
});

document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector('.search-container');
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const body = document.body;

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!searchContainer.classList.contains('active')) {
            // Expand search box
            searchContainer.classList.add('active');
            searchInput.focus();

            // Create and add overlay
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            body.appendChild(overlay);

            // Show overlay
            setTimeout(() => {
                overlay.classList.add('active');
            }, 10);

            // Close search box when clicking outside
            overlay.addEventListener('click', closeSearchBox);
        } else {
            // Perform search
            performSearch();
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function closeSearchBox() {
        searchContainer.classList.remove('active');
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Perform search action here
            console.log('Searching for:', query);
            // You can replace this with your actual search functionality
        }
        closeSearchBox();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        searchButton.classList.toggle('active');
        
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
        }
    });

   document.addEventListener('click', (event) => {
    if (!searchButton.contains(event.target) && !searchInput.contains(event.target)) {
        searchInput.classList.remove('active');
        searchButton.classList.remove('active');
        searchInput.value = '';
    }
});
});