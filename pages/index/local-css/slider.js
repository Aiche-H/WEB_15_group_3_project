let slideIndex = 0;
const slides = document.getElementsByClassName("mySlide");
const tabs = document.getElementsByClassName("tab");

// Näytetään seuraava slaidi 5 sekunnin välein

function showSlides() {
    // Piilotetaan kaikki slaidit
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Näytetään nykyinen slaidi ja asetetaan siihen aktiivinen tila
    slides[slideIndex - 1].style.display = "block";
    updateTabs(slideIndex - 1);
    
    // Asetetaan 5 sekunnin aikaviive
    setTimeout(showSlides, 9000);
}

// Funktio tabien päivittämiseksi
function updateTabs(activeIndex) {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    tabs[activeIndex].className += " active";
}

// Lisätään tapahtumankuuntelijat tab-painikkeille
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function() {
        // Kun käyttäjä klikkaa tab-painiketta, näytetään siihen liittyvä slaidi
        for (let j = 0; j < slides.length; j++) {
            slides[j].style.display = "none";
        }
        slides[i].style.display = "block";
        slideIndex = i + 1; // Päivitetään slideIndex klikatun tabin mukaan
        updateTabs(i); // Päivitetään tabien ulkoasu
    });
}

// Aloitetaan ensimmäisellä slaidilla
showSlides();

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);
});

