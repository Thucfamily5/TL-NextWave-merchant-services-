// ===========================
// TL NextWave Merchant Services
// Shared JS
// ===========================

document.addEventListener('DOMContentLoaded', function () {

    /* ---- Mobile Nav Toggle ---- */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a link is clicked (mobile)
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---- Dropdown Menu (Services) ---- */
    const dropdowns = document.querySelectorAll('.has-dropdown');

    dropdowns.forEach(function (dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', function (e) {
            // On mobile, clicking toggles the submenu instead of navigating
            if (window.innerWidth <= 900) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
    });

    /* ---- Scroll Reveal Animation ---- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealEls.length) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        revealEls.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ---- FAQ Accordion ---- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function () {
            const isOpen = item.classList.contains('open');

            // Close all other items (single-open accordion)
            faqItems.forEach(function (other) {
                other.classList.remove('open');
                const q = other.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ---- Contact Form Validation ---- */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            const fields = [
                { id: 'name', check: v => v.trim().length > 1, msg: 'Please enter your name.' },
                { id: 'email', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email.' },
                { id: 'phone', check: v => v.trim().length >= 7, msg: 'Please enter a valid phone number.' },
                { id: 'message', check: v => v.trim().length > 5, msg: 'Please tell us a bit about your business.' }
            ];

            fields.forEach(function (field) {
                const input = document.getElementById(field.id);
                const errorEl = document.getElementById(field.id + '-error');
                if (!input) return;

                if (!field.check(input.value)) {
                    valid = false;
                    if (errorEl) {
                        errorEl.textContent = field.msg;
                        errorEl.style.display = 'block';
                    }
                    input.style.borderColor = '#dc2626';
                } else {
                    if (errorEl) errorEl.style.display = 'none';
                    input.style.borderColor = '';
                }
            });

            const statusEl = document.getElementById('form-status');

            if (valid) {
                // No backend connected yet — show confirmation and open a pre-filled email as fallback.
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const message = document.getElementById('message').value.trim();

                const subject = encodeURIComponent('New consultation request from ' + name);
                const body = encodeURIComponent(
                    'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\nMessage:\n' + message
                );

                if (statusEl) {
                    statusEl.textContent = 'Thanks! Your message is ready to send — please confirm in your email app.';
                    statusEl.classList.add('success');
                }

                window.location.href = 'mailto:letmerchant@gmail.com?subject=' + subject + '&body=' + body;
                contactForm.reset();
            } else if (statusEl) {
                statusEl.textContent = 'Please fix the highlighted fields above.';
                statusEl.classList.remove('success');
                statusEl.style.display = 'block';
                statusEl.style.background = '#fee2e2';
                statusEl.style.color = '#991b1b';
            }
        });
    }

});
