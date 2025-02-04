// NOTE Funktion zum Laden der Header- und Footer-Dateien
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

// NOTE Lade die Header- und Footer-Dateien, wenn das Dokument fertig geladen ist
document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
});

// NOTE Navbar Underline bei aktueller Seite

document.addEventListener("DOMContentLoaded", function() {
    const includeHTML = async (path, element) => {
        try {
            const response = await fetch(path);
            const html = await response.text();
            element.innerHTML = html;
            // Aktualisiere die aktuelle Seite nach dem Einfügen der Navigation
            const currentLocation = location.href;
            const menuItem = document.querySelectorAll('.nav-link');
            menuItem.forEach(item => {
                if (item.href === currentLocation) {
                    item.classList.add('current');
                }
            });
        } catch (error) {
            console.error('Error including HTML:', error);
        }
    };

    document.querySelectorAll('[include-html]').forEach(el => {
        includeHTML(el.getAttribute('include-html'), el);
    });
});

// NOTE Responsiv Header
function toggleOverlay() {
    const overlay = document.getElementById('mobile-overlay');
    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'block';
    }
}

// NOTE Filterfunktion Rezepte seite
function updateTimeValues() {
    const timeMinSlider = document.getElementById('time-min-slider');
    const timeMaxSlider = document.getElementById('time-max-slider');
    const timeMin = document.getElementById('time-min');
    const timeMax = document.getElementById('time-max');

    if (parseInt(timeMinSlider.value) > parseInt(timeMaxSlider.value)) {
        if (timeMinSlider === document.activeElement) {
            timeMaxSlider.value = timeMinSlider.value;
        } else {
            timeMinSlider.value = timeMaxSlider.value;
        }
    }

    timeMin.innerText = timeMinSlider.value;
    timeMax.innerText = timeMaxSlider.value;
}

function filterRecipes() {
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const timeMin = document.getElementById('time-min-slider').value;
    const timeMax = document.getElementById('time-max-slider').value;
    const diet = document.getElementById('diet').value;

    console.log(`Kategorie: ${category}`);
    console.log(`Schwierigkeitsgrad: ${difficulty}`);
    console.log(`Zeit: ${timeMin} - ${timeMax} Minuten`);
    console.log(`Vegan/Vegetarisch: ${diet}`);
}

// NOTE Botton Navigate
function navigateToRecipeDetailPage() {
    window.location.href = "rezepte-detail.html";
}

function navigateToTippDetailPage() {
    window.location.href = "tipp-detail.html";
}

// NOTE go Back
function goBack() {
    window.history.back();
}

// NOTE Tipps Tabs
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tipp-tab');
    const contents = document.querySelectorAll('.tipps-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');

            const tabId = this.getAttribute('data-tab');
            contents.forEach(content => {
                if (content.id === tabId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    tabs[0].classList.add('active');
    contents[0].classList.add('active');
});


// NOTE Filter BTN
const filterBtn = document.getElementById('filterBtn');
const filterPopup = document.getElementById('filterPopup');
const closePopupBtn = document.getElementById('closePopupBtn');

filterBtn.addEventListener('click', () => {
    filterPopup.classList.remove('hidden');
});

closePopupBtn.addEventListener('click', () => {
    filterPopup.classList.add('hidden');
});

window.addEventListener('click', (event) => {
    if (event.target === filterPopup) {
        filterPopup.classList.add('hidden');
    }
});
