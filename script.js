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

            preloader.style.opacity = "0";

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
       3. HEADER SCROLL EFFECT
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
            "UI Designer",
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
       7. PROJECT FILTER
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

                if (
                    filter === "all" ||
                    filter === category
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    /* =====================================================
       8. SKILL BAR ANIMATION
    ===================================================== */

    const skillSection =
        document.querySelector(".skills");

    const skillProgress =
        document.querySelectorAll(".skill-progress");

    let skillsAnimated = false;

    function animateSkills() {

        if (!skillSection || skillsAnimated) {
            return;
        }

        const sectionTop =
            skillSection.getBoundingClientRect().top;

        const screenPosition =
            window.innerHeight * 0.8;

        if (sectionTop < screenPosition) {

            skillProgress.forEach(function (progress) {

                progress.style.transition =
                    "width 1.5s ease";

            });

            skillsAnimated = true;

        }

    }

    window.addEventListener("scroll", animateSkills);

    animateSkills();


    /* =====================================================
       9. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-card, " +
        ".about-content, " +
        ".skill-item, " +
        ".tool-card, " +
        ".project-card, " +
        ".service-card, " +
        ".contact-info, " +
        ".contact-form"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show-element"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.15
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
       10. SCROLL TO TOP BUTTON
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
       11. CONTACT FORM - FORMSPREE
    ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


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
       12. SMOOTH SCROLL
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
       13. CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("current-year");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       14. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Hassan's Portfolio is working successfully!"
    );


});
