/**
 * TechSolutions - Contact Form Validation
 * Comprehensive form validation with real-time feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const servizioSelect = document.getElementById('servizio');
    const messaggioTextarea = document.getElementById('messaggio');
    const privacyCheckbox = document.getElementById('privacy');
    const charCountSpan = document.getElementById('charCount');
    const successMessage = document.getElementById('successMessage');

    // Character counter for message textarea
    if (messaggioTextarea && charCountSpan) {
        messaggioTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCountSpan.textContent = currentLength;
            
            // Visual feedback for character limit
            if (currentLength > 900) {
                charCountSpan.style.color = 'var(--error-color)';
            } else if (currentLength > 800) {
                charCountSpan.style.color = 'orange';
            } else {
                charCountSpan.style.color = 'var(--text-color)';
            }
        });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone validation regex (Italian format and international)
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

    // Real-time validation functions
    function validateNome() {
        const value = nomeInput.value.trim();
        
        if (value.length === 0) {
            setInvalid(nomeInput, 'Il nome è obbligatorio.');
            return false;
        }
        
        if (value.length < 2) {
            setInvalid(nomeInput, 'Il nome deve contenere almeno 2 caratteri.');
            return false;
        }
        
        if (value.length > 50) {
            setInvalid(nomeInput, 'Il nome non può superare i 50 caratteri.');
            return false;
        }
        
        setValid(nomeInput);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        
        if (value.length === 0) {
            setInvalid(emailInput, 'L\'email è obbligatoria.');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            setInvalid(emailInput, 'Inserisci un indirizzo email valido (es. nome@esempio.it).');
            return false;
        }
        
        setValid(emailInput);
        return true;
    }

    function validateTelefono() {
        const value = telefonoInput.value.trim();
        
        // Phone is optional
        if (value.length === 0) {
            resetValidation(telefonoInput);
            return true;
        }
        
        if (value.length < 8) {
            setInvalid(telefonoInput, 'Il numero di telefono deve contenere almeno 8 cifre.');
            return false;
        }
        
        if (!phoneRegex.test(value)) {
            setInvalid(telefonoInput, 'Inserisci un numero di telefono valido.');
            return false;
        }
        
        setValid(telefonoInput);
        return true;
    }

    function validateServizio() {
        const value = servizioSelect.value;
        
        if (!value || value === '') {
            setInvalid(servizioSelect, 'Seleziona un servizio.');
            return false;
        }
        
        setValid(servizioSelect);
        return true;
    }

    function validateMessaggio() {
        const value = messaggioTextarea.value.trim();
        
        if (value.length === 0) {
            setInvalid(messaggioTextarea, 'Il messaggio è obbligatorio.');
            return false;
        }
        
        if (value.length < 10) {
            setInvalid(messaggioTextarea, 'Il messaggio deve contenere almeno 10 caratteri.');
            return false;
        }
        
        if (value.length > 1000) {
            setInvalid(messaggioTextarea, 'Il messaggio non può superare i 1000 caratteri.');
            return false;
        }
        
        setValid(messaggioTextarea);
        return true;
    }

    function validatePrivacy() {
        if (!privacyCheckbox.checked) {
            setInvalid(privacyCheckbox, 'Devi accettare la privacy policy per procedere.');
            return false;
        }
        
        setValid(privacyCheckbox);
        return true;
    }

    // Helper functions for validation feedback
    function setInvalid(element, message) {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        
        const feedback = element.parentElement.querySelector('.invalid-feedback');
        if (feedback && message) {
            feedback.textContent = message;
        }
    }

    function setValid(element) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    }

    function resetValidation(element) {
        element.classList.remove('is-valid', 'is-invalid');
    }

    // Attach real-time validation to inputs
    if (nomeInput) {
        nomeInput.addEventListener('blur', validateNome);
        nomeInput.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                validateNome();
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                validateEmail();
            }
        });
    }

    if (telefonoInput) {
        telefonoInput.addEventListener('blur', validateTelefono);
        telefonoInput.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                validateTelefono();
            }
        });
    }

    if (servizioSelect) {
        servizioSelect.addEventListener('change', validateServizio);
        servizioSelect.addEventListener('blur', validateServizio);
    }

    if (messaggioTextarea) {
        messaggioTextarea.addEventListener('blur', validateMessaggio);
        messaggioTextarea.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
                validateMessaggio();
            }
        });
    }

    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', validatePrivacy);
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous success message
        if (successMessage) {
            successMessage.style.display = 'none';
        }

        // Validate all fields
        const isNomeValid = validateNome();
        const isEmailValid = validateEmail();
        const isTelefonoValid = validateTelefono();
        const isServizioValid = validateServizio();
        const isMessaggioValid = validateMessaggio();
        const isPrivacyValid = validatePrivacy();

        // Check if all validations passed
        const isFormValid = isNomeValid && isEmailValid && isTelefonoValid && 
                           isServizioValid && isMessaggioValid && isPrivacyValid;

        if (isFormValid) {
            // Form is valid - simulate submission
            console.log('Form is valid. Submitting...');
            
            // In a real application, you would send this data to a server
            const formData = {
                nome: nomeInput.value.trim(),
                email: emailInput.value.trim(),
                telefono: telefonoInput.value.trim(),
                servizio: servizioSelect.value,
                messaggio: messaggioTextarea.value.trim(),
                privacy: privacyCheckbox.checked
            };
            
            console.log('Form Data:', formData);
            
            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                
                // Remove validation classes
                const elements = [nomeInput, emailInput, telefonoInput, servizioSelect, messaggioTextarea, privacyCheckbox];
                elements.forEach(el => {
                    if (el) {
                        el.classList.remove('is-valid', 'is-invalid');
                    }
                });
                
                // Reset character count
                if (charCountSpan) {
                    charCountSpan.textContent = '0';
                    charCountSpan.style.color = 'var(--text-color)';
                }
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                }, 5000);
            }, 1000);
            
        } else {
            // Form is invalid - scroll to first invalid field
            const firstInvalid = contactForm.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            console.log('Form validation failed. Please correct the errors.');
        }
    });

    // Prevent form submission on Enter key (except in textarea)
    contactForm.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});
