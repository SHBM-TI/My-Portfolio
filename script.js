/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

});


document.querySelectorAll("#nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElement =
    document.getElementById("typing");


const roles = [

    "Web Developer",

    "Python Developer",

    "Software Developer",

    "Data Enthusiast",

    "Problem Solver"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        characterIndex++;

    } else {

        characterIndex--;

    }


    typingElement.textContent =
        currentRole.substring(
            0,
            characterIndex
        );


    let speed =
        deleting ? 45 : 90;


    if (!deleting &&
        characterIndex === currentRole.length) {

        speed = 1800;

        deleting = true;

    }


    else if (
        deleting &&
        characterIndex === 0
    ) {

        deleting = false;

        roleIndex =
            (roleIndex + 1) %
            roles.length;

        speed = 400;

    }


    setTimeout(typeEffect, speed);

}


typeEffect();


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor =
    document.querySelector(".cursor");

const follower =
    document.querySelector(".cursor-follower");


let mouseX = 0;

let mouseY = 0;

let followerX = 0;

let followerY = 0;


document.addEventListener("mousemove", event => {

    mouseX = event.clientX;

    mouseY = event.clientY;

    cursor.style.left =
        mouseX + "px";

    cursor.style.top =
        mouseY + "px";

});


function animateFollower() {

    followerX +=
        (mouseX - followerX) * 0.12;

    followerY +=
        (mouseY - followerY) * 0.12;


    follower.style.left =
        followerX + "px";

    follower.style.top =
        followerY + "px";


    requestAnimationFrame(
        animateFollower
    );

}


animateFollower();


/* Cursor hover effect */

document
    .querySelectorAll("a, button, .project-card, .tech-card")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                follower.style.width = "60px";

                follower.style.height = "60px";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                follower.style.width = "35px";

                follower.style.height = "35px";

            }
        );

    });


/* =====================================================
   MAGNETIC BUTTONS
===================================================== */

document
    .querySelectorAll(".magnetic")
    .forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(${x * .15}px,
                               ${y * .15}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "translate(0,0)";

            }
        );

    });


/* =====================================================
   PARTICLE SYSTEM
===================================================== */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];

let particleCount =
    window.innerWidth < 700
        ? 35
        : 75;


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

    }
);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 1.5 + .4;

        this.speedX =
            (Math.random() - .5) * .25;

        this.speedY =
            (Math.random() - .5) * .25;

        this.opacity =
            Math.random() * .5;

    }


    update() {

        this.x +=
            this.speedX;

        this.y +=
            this.speedY;


        if (this.x < 0)
            this.x = canvas.width;


        if (this.x > canvas.width)
            this.x = 0;


        if (this.y < 0)
            this.y = canvas.height;


        if (this.y > canvas.height)
            this.y = 0;

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(150,130,255,
            ${this.opacity})`;

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    connectParticles();

    requestAnimationFrame(
        animateParticles
    );

}


function connectParticles() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;


            const dy =
                particles[i].y -
                particles[j].y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                const opacity =
                    (1 - distance / 120) *
                    .08;


                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(133,92,255,
                    ${opacity})`;

                ctx.lineWidth = .5;

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();

            }

        }

    }

}


animateParticles();


/* =====================================================
   3D PROJECT CARD TILT
===================================================== */

document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y - rect.height / 2) /
                    rect.height) * -5;


                const rotateY =
                    ((x - rect.width / 2) /
                    rect.width) * 5;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


/* =====================================================
   PARALLAX HERO
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;


        const heroVisual =
            document.querySelector(
                ".hero-visual"
            );


        if (
            heroVisual &&
            window.innerWidth > 800
        ) {

            heroVisual.style.transform =
                `translateY(${scroll * .08}px)`;

        }

    }
);


/* =====================================================
   CONTACT YEAR
===================================================== */

const currentYear =
    new Date().getFullYear();


/* =====================================================
   SMOOTH INTERNAL LINKS
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    targetId === "#" ||
                    !targetId
                ) return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });