// Control del modal de términos y condiciones
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. OBTENER TODOS LOS ELEMENTOS ---
    const splashScreen = document.getElementById('splashScreen');
    const introVideo = document.getElementById('introVideo');
    const termsModal = document.getElementById('termsModal');
    const mainContent = document.getElementById('mainContent');
    
    const acceptCheckbox = document.getElementById('acceptTerms');
    const acceptBtn = document.getElementById('acceptBtn');
    const showTermsLink = document.getElementById('showTermsLink');
    const showPrivacyLink = document.getElementById('showPrivacyLink');
    const showTermsFooter = document.getElementById('showTermsFooter');

    // --- 2. LÓGICA DE CARGA (¡MODIFICADA!) ---
    
    // Escuchamos a que el video de introducción termine
    introVideo.addEventListener('ended', function() {
        // 1. Ocultar el video
        splashScreen.style.display = 'none';

        // 2. Revisar si ya aceptó los términos
        const termsAccepted = localStorage.getItem('termsAccepted');
    
        if (termsAccepted) {
            // Si ya aceptó, mostrar contenido principal
            termsModal.style.display = 'none';
            mainContent.classList.remove('hidden');
        } else {
            // Si no ha aceptado, mostrar modal
            termsModal.style.display = 'flex';
            mainContent.classList.add('hidden');
        }
    });

    // (Opcional) Por si el video falla al cargar
    introVideo.addEventListener('error', function() {
        // Si el video falla, simplemente sáltalo
        splashScreen.style.display = 'none';
        
        const termsAccepted = localStorage.getItem('termsAccepted');
        if (termsAccepted) {
            mainContent.classList.remove('hidden');
        } else {
            termsModal.style.display = 'flex';
        }
    });


    // --- 3. LÓGICA DEL MODAL (Sin cambios) ---
    
    // Habilitar botón de aceptar cuando se marca el checkbox
    acceptCheckbox.addEventListener('change', function() {
        acceptBtn.disabled = !this.checked;
    });
    
    // Manejar clic en el botón aceptar
    acceptBtn.addEventListener('click', function() {
        if (acceptCheckbox.checked) {
            // Guardar aceptación en localStorage
            localStorage.setItem('termsAccepted', 'true');
            
            // Ocultar modal y mostrar contenido principal
            termsModal.style.display = 'none';
            mainContent.classList.remove('hidden');
        }
    });
    
    // Mostrar términos nuevamente desde el footer
    showTermsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'flex';
    });
    
    // Mostrar política de privacidad desde el footer
    showPrivacyLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'flex';
    });
    
    // Mostrar términos desde el menú de navegación
    showTermsFooter.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'flex';
    });
    
    // --- 4. RESTO DEL SCRIPT ---

    /* --- CÓDIGO DEL FORMULARIO DE AYUDA DESACTIVADO (COMENTADO) ---
       Se desactiva para permitir el envío HTML tradicional y evitar el bloqueo del antivirus.

    document.getElementById('helpForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Evitamos que la página se recargue
        // ... (código del fetch) ...
    });
    */
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });
        
    // Animación para las tarjetas de características al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animación a las tarjetas de características
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Simulación de actualización de ubicación en tiempo real
    function updateLocation() {
        const locations = ['Parque Central', 'Escuela', 'Casa de la Abuela', 'Centro Comercial', 'Clase de Natación', 'Biblioteca']; // Array completado y con más opciones
        
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        
        // (Opcional) Mostrar en la pulsera:
        const locationDisplay = document.getElementById('location-display');
        if (locationDisplay) {
            locationDisplay.textContent = randomLocation;
        }
    }
    
    // Ejecutar la simulación de ubicación cada 5 segundos
    setInterval(updateLocation, 5000);
    
    
    /* ============================================== */
    /* ===== CÓDIGO PARA EL ACORDEÓN DE PREGUNTAS ===== */
    /* ============================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Cierra todas las demás respuestas
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.parentElement.classList.remove('active');
                }
            });
            
            // Abre o cierra la pregunta actual
            const item = question.parentElement;
            item.classList.toggle('active');
        });
    });
    /* ============================================== */
    /* ===== FIN DEL CÓDIGO DEL ACORDEÓN ===== */
    /* ============================================== */

    
}); // Cierre del addEventListener 'DOMContentLoaded'