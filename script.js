document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.menu-list');
    const searchContainer = document.querySelector('.search-container');
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    const body = document.body;

    let currentIndex = 0;

    function goToSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        slider.style.transform = `translateX(-${index * 33.33}%)`;
        currentIndex = index;
    }

    prevBtn?.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextBtn?.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    menuToggle.addEventListener('click', () => {
        menuList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Add this for a subtle parallax effect on the About Us image
    window.addEventListener('scroll', () => {
        const aboutImage = document.querySelector('.about-image img');
        const scrollPosition = window.pageYOffset;
        aboutImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => observer.observe(card));

    function animateStats(card) {
        const statValues = card.querySelectorAll('.stat-value');
        statValues.forEach(statValue => {
            const finalValue = parseInt(statValue.getAttribute('data-value'));
            animateValue(statValue, 0, finalValue, 2000);
        });
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function animateStatistics() {
        const stats = document.querySelectorAll('.stat-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    animateNumber(entry.target.querySelector('.stat-number'));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 16ms is roughly 1 frame at 60fps
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.round(current);
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(updateNumber);
    }

    // Call this function when the DOM is loaded
    animateStatistics();

    function animateContactInfo() {
        const infoItems = document.querySelectorAll('.info-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        infoItems.forEach(item => observer.observe(item));
    }

    // Call this function when the DOM is loaded
    animateContactInfo();

    searchButton.addEventListener('click', (e) => {
        console.log("expand search")
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

    const searchButtonAlt = document.getElementById('searchButton');
    const searchInputAlt = document.getElementById('searchInput');

    searchButtonAlt.addEventListener('click', () => {
        searchInputAlt.classList.toggle('active');
        searchButtonAlt.classList.toggle('active');
        
        if (searchInputAlt.classList.contains('active')) {
            searchInputAlt.focus();
        } else {
            searchInputAlt.value = '';
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchButtonAlt.contains(event.target) && !searchInputAlt.contains(event.target)) {
            searchInputAlt.classList.remove('active');
            searchButtonAlt.classList.remove('active');
            searchInputAlt.value = '';
        }
    });
});

function submit_message() {
    var name = document.getElementById('C_name').value;
    var email = document.getElementById('C_email').value;
    var message = document.getElementById('C_message').value;

    if (name && email && message) {
        alert("Message sent successfully");
    }
}
