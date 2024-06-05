document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Funcionamiento del Cohete en la Pagina
document.addEventListener("DOMContentLoaded", function() {
    var scrollToTopButton = document.getElementById('scrollToTop');

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollToTopButton.addEventListener('click', scrollToTop);
});
