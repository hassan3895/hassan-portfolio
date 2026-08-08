/* =====================================================
   HASSAN PORTFOLIO - FINAL SCRIPT.JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. PRELOADER
    ===================================================== */

    const preloader = document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", function () {

            preloader.classList.add("loaded");

            setTimeout(function () {
                preloader.style.display = "none";
            }, 500);

        });

    }


    /* =====================================================
       2. MOBILE NAVIGATION
    ===================================================== */

    const navMenu = document.querySelector(".nav-menu");
    const navToggle = document.querySelector(".nav-toggle");
    const navClose = document.querySelector(".nav-close");

    if (navToggle && navMenu) {

        navToggle.addEventListener("click", function () {
            navMenu.classList.add("show-menu");
        });

    }

    if (navClose && navMenu) {

        navClose.addEventListener("click", function () {
            navMenu.classList.remove("show-menu");
        });

    }

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navMenu) {
                navMenu.classList.remove("show-menu");
            }

        });

    });


    /* =====================================================
       3. HEADER SCROLL EFFECT (STICKY NAVBAR)
    ===================================================== */

    const header = document.querySelector(".header");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });

    }


    /* =====================================================
       4. DARK / LIGHT THEME
    ===================================================== */

    const themeToggle = document.querySelector(".theme-toggle");

    const themeIcon = themeToggle
        ? themeToggle.querySelector("i")
        : null;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        if (themeIcon) {

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

        }

    }

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("light-theme");

            const lightMode =
                document.body.classList.contains("light-theme");

            if (lightMode) {

                localStorage.setItem("theme", "light");

                if (themeIcon) {

                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");

                }

            } else {

                localStorage.setItem("theme", "dark");

                if (themeIcon) {

                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");

                }

            }

        });

    }


    /* =====================================================
       5. TYPING EFFECT
    ===================================================== */

    const typingText = document.querySelector(".typing-text");

    if (typingText) {

        const words = [
            "Web Developer",
            "Frontend Developer",
            "AI Virtual Assistant",
            "Shopify Assistant",
            "Freelancer"
        ];

        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (isDeleting) {
                letterIndex--;
            } else {
                letterIndex++;
            }

            typingText.textContent =
                currentWord.substring(0, letterIndex);

            let speed = isDeleting ? 60 : 120;

            if (
                !isDeleting &&
                letterIndex === currentWord.length
            ) {

                isDeleting = true;
                speed = 1800;

            }

            if (
                isDeleting &&
                letterIndex === 0
            ) {

                isDeleting = false;
                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }

                speed = 500;

            }

            setTimeout(typeEffect, speed);

        }

        typeEffect();

    }


    /* =====================================================
       6. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {

        const scrollPosition = window.scrollY + 200;

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            const navLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (!navLink) {
                return;
            }

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLink.classList.add("active-link");

            } else {

                navLink.classList.remove("active-link");

            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* =====================================================
       7. PROJECT FILTER (WITH FADE ANIMATION)
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active-filter");

            });

            button.classList.add("active-filter");

            const filter =
                button.getAttribute("data-filter");

            projectCards.forEach(function (card) {

                const category =
                    card.getAttribute("data-category");

                const matches =
                    filter === "all" || filter === category;

                if (matches) {

                    card.classList.remove("hide-project");
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";

                    requestAnimationFrame(function () {

                        card.style.transition =
                            "opacity 0.5s ease, transform 0.5s ease";

                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";

                    });

                } else {

                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";

                    setTimeout(function () {

                        card.classList.add("hide-project");

                    }, 400);

                }

            });

        });

    });


    /* =====================================================
       8. SKILL BAR ANIMATION (ANIMATE ONLY WHEN VISIBLE)
       Works reliably on laptop, desktop, tablet and mobile:
       each bar is observed individually instead of the whole
       section, so it still triggers even on small/tall screens
       where the full skills section never fits the old 30%
       visibility threshold.
    ===================================================== */

    function runSkillBarWidth(bar) {

        const targetWidth =
            bar.getAttribute("data-width") || "0";

        bar.style.width = targetWidth + "%";

    }

    const skillBars =
        document.querySelectorAll(".skill-progress");

    if (skillBars.length) {

        if ("IntersectionObserver" in window) {

            const skillBarObserver = new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            runSkillBarWidth(entry.target);
                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -10% 0px"
                }
            );

            skillBars.forEach(function (bar) {

                skillBarObserver.observe(bar);

            });

            // Safety net: on some mobile browsers the observer can
            // miss bars that are already on-screen at load time
            // (e.g. short viewport, zoomed pages). Do one manual
            // check right after load as a backup.
            window.addEventListener("load", function () {

                skillBars.forEach(function (bar) {

                    const rect = bar.getBoundingClientRect();

                    const isVisible =
                        rect.top < window.innerHeight &&
                        rect.bottom > 0;

                    if (isVisible) {

                        runSkillBarWidth(bar);

                    }

                });

            });

        } else {

            // Fallback for very old browsers without IntersectionObserver
            skillBars.forEach(runSkillBarWidth);

        }

    }


    /* =====================================================
       9. COUNTER ANIMATION (ACHIEVEMENTS / STATS)
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target =
            parseInt(counter.getAttribute("data-target"), 10) || 0;

        const duration = 1500;
        const frameRate = 16;
        const totalFrames = Math.round(duration / frameRate);

        let frame = 0;

        const countUp = setInterval(function () {

            frame++;

            const progress = frame / totalFrames;

            const currentValue =
                Math.round(target * Math.min(progress, 1));

            counter.textContent = currentValue;

            if (progress >= 1) {

                counter.textContent = target;
                clearInterval(countUp);

            }

        }, frameRate);

    }

    if (counters.length && "IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);
                        observer.unobserve(entry.target);

                    }

                });

            },
            { threshold: 0.5 }
        );

        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(animateCounter);

    }


    /* =====================================================
       10. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-visual, " +
        ".about-content, " +
        ".timeline-item, " +
        ".certificate-card, " +
        ".experience-card, " +
        ".skill-item, " +
        ".tool-card, " +
        ".soft-skill-card, " +
        ".project-card, " +
        ".service-card, " +
        ".achievement-card, " +
        ".contact-info, " +
        ".contact-form"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry, index) {

                        if (entry.isIntersecting) {

                            // Small stagger for grouped cards
                            setTimeout(function () {

                                entry.target.classList.add(
                                    "show-element"
                                );

                            }, (index % 4) * 90);

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );

        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("show-element");

        });

    }


    /* =====================================================
       11. SCROLL TO TOP BUTTON
    ===================================================== */

    const scrollTopButton =
        document.querySelector(".scroll-top");

    if (scrollTopButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                scrollTopButton.classList.add(
                    "show-scroll"
                );

            } else {

                scrollTopButton.classList.remove(
                    "show-scroll"
                );

            }

        });

        scrollTopButton.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,
                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       12. CONTACT FORM - VALIDATION + FORMSPREE
    ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    function showFieldError(input, errorId, message) {

        const errorEl = document.getElementById(errorId);

        if (errorEl) {
            errorEl.textContent = message;
        }

        if (input) {
            input.classList.add("input-error");
        }

    }

    function clearFieldError(input, errorId) {

        const errorEl = document.getElementById(errorId);

        if (errorEl) {
            errorEl.textContent = "";
        }

        if (input) {
            input.classList.remove("input-error");
        }

    }

    function validateContactForm() {

        let isValid = true;

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        // Name
        if (!nameInput.value.trim()) {

            showFieldError(nameInput, "name-error", "Please enter your name.");
            isValid = false;

        } else {

            clearFieldError(nameInput, "name-error");

        }

        // Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailInput.value.trim()) {

            showFieldError(emailInput, "email-error", "Please enter your email.");
            isValid = false;

        } else if (!emailPattern.test(emailInput.value.trim())) {

            showFieldError(emailInput, "email-error", "Please enter a valid email address.");
            isValid = false;

        } else {

            clearFieldError(emailInput, "email-error");

        }

        // Phone
        const phonePattern = /^[0-9+\-\s()]{7,}$/;

        if (!phoneInput.value.trim()) {

            showFieldError(phoneInput, "phone-error", "Please enter your phone number.");
            isValid = false;

        } else if (!phonePattern.test(phoneInput.value.trim())) {

            showFieldError(phoneInput, "phone-error", "Please enter a valid phone number.");
            isValid = false;

        } else {

            clearFieldError(phoneInput, "phone-error");

        }

        // Subject
        if (!subjectInput.value.trim()) {

            showFieldError(subjectInput, "subject-error", "Please enter a subject.");
            isValid = false;

        } else {

            clearFieldError(subjectInput, "subject-error");

        }

        // Message
        if (!messageInput.value.trim()) {

            showFieldError(messageInput, "message-error", "Please write a message.");
            isValid = false;

        } else if (messageInput.value.trim().length < 10) {

            showFieldError(messageInput, "message-error", "Message should be at least 10 characters.");
            isValid = false;

        } else {

            clearFieldError(messageInput, "message-error");

        }

        return isValid;

    }

    if (contactForm) {

        // Clear individual field errors as the user types
        ["name", "email", "phone", "subject", "message"].forEach(function (fieldId) {

            const field = document.getElementById(fieldId);

            if (field) {

                field.addEventListener("input", function () {

                    clearFieldError(field, fieldId + "-error");

                });

            }

        });

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                if (!validateContactForm()) {
                    return;
                }

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                const originalButtonText =
                    submitButton.innerHTML;

                // Button ko Sending par change karna
                submitButton.innerHTML =
                    'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

                submitButton.disabled = true;

                try {

                    const response =
                        await fetch(
                            "https://formspree.io/f/mkodpdbj",
                            {

                                method: "POST",

                                body: new FormData(
                                    contactForm
                                ),

                                headers: {

                                    "Accept":
                                        "application/json"

                                }

                            }
                        );

                    if (response.ok) {

                        alert(
                            "Thank you! Your message has been sent successfully."
                        );

                        // Form clear karna
                        contactForm.reset();

                    } else {

                        alert(
                            "Oops! Something went wrong. Please try again."
                        );

                    }

                } catch (error) {

                    alert(
                        "There was a problem sending your message."
                    );

                }

                // Button ko normal karna
                submitButton.innerHTML =
                    originalButtonText;

                submitButton.disabled = false;

            }

        );

    }


    /* =====================================================
       13. SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({

                        behavior: "smooth",
                        block: "start"

                    });

                }

            }

        );

    });


    /* =====================================================
       14. CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       15. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Hassan's Portfolio is working successfully!"
    );


    /* =====================================================
       16. DOWNLOAD CV LINK HANDLER

       This script intercepts clicks on the "Download CV" link
       and forces a download of the CV file that lives in the
       repository. It uses the raw.githubusercontent.com URL so
       the browser can download the file directly.
    ===================================================== */

    try {
        // Find likely download link by href or link text
        const links = Array.from(document.querySelectorAll('a'));

        links.forEach(function (a) {
            const href = a.getAttribute('href') || '';
            const text = (a.textContent || '').trim();

            if (href.includes('Hassan-CV.pdf.pdf') || /^Download CV/i.test(text)) {
                a.addEventListener('click', function (e) {
                    // Prevent default navigation
                    e.preventDefault();

                    // Raw file URL for the repository (adjust owner/repo/branch if needed)
                    const rawUrl = 'https://raw.githubusercontent.com/hassan3895/hassan-portfolio/main/Hassan-CV.pdf.pdf';

                    // Create temporary anchor to trigger download
                    const tmp = document.createElement('a');
                    tmp.href = rawUrl;
                    tmp.setAttribute('download', 'Hassan-CV.pdf');
                    // For some browsers, setting target helps
                    tmp.target = '_blank';

                    document.body.appendChild(tmp);
                    tmp.click();
                    tmp.remove();
                });
            }
        });
    } catch (err) {
        // Fail silently - this feature is non-critical
        console.warn('Download CV handler failed', err);
    }

});
