document.addEventListener('DOMContentLoaded', function () {
    // Warte, bis der header.html-Inhalt geladen wurde
    function initFilterPopup() {
        // Überprüfen, ob der Button existiert
        const filterBtn = document.getElementById('filterBtn');
        if (!filterBtn) {
            console.error("Button mit ID 'filterBtn' nicht gefunden.");
            return;
        }

        // Popup dynamisch aus filter.html laden
        fetch('filter.html')
            .then(response => response.text())
            .then(data => {
                // Füge den HTML-Inhalt von filter.html in die Seite ein
                document.body.insertAdjacentHTML('beforeend', data);

                // Überprüfe, ob das Popup-Element existiert
                const filterPopup = document.getElementById('filterPopup');
                const closePopup = document.getElementById('closePopup');
                if (!filterPopup || !closePopup) {
                    console.error("Popup oder Close-Button nicht gefunden.");
                    return;
                }

                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                document.body.appendChild(overlay);

                // Öffne Popup bei Klick auf Filter-Button
                filterBtn.addEventListener('click', function () {
                    console.log("Button 'filterBtn' wurde geklickt, Popup wird geöffnet.");
                    filterPopup.classList.add('active');
                    overlay.classList.add('active');
                });

                // Schließe Popup bei Klick auf das Schließen-Icon oder die Überlagerung
                closePopup.addEventListener('click', function () {
                    filterPopup.classList.remove('active');
                    overlay.classList.remove('active');
                });

                overlay.addEventListener('click', function () {
                    filterPopup.classList.remove('active');
                    overlay.classList.remove('active');
                });

                // Zutatenauswahl und Suchfunktion nach dem Laden des Popups hinzufügen
                let selectedCount = 0;
                const anzahlZutatenElement = document.getElementById('anzahl-zutaten');
                const zutaten = document.querySelectorAll('.zutat');

                zutaten.forEach((zutat) => {
                    zutat.addEventListener('click', function () {
                        const zutatBild = this.querySelector('.zutatbild');
                        const zutatName = this.querySelector('zutatname')

                        // Überprüfen, ob bereits ausgewählt
                        if (zutatBild.classList.contains('selected')) {
                            zutatBild.classList.remove('selected');
                            zutatBild.style.border = 'none';
                            zutatName.style.color = 'white';
                            selectedCount--;
                        } else {
                            zutatBild.classList.add('selected');
                            zutatBild.style.border = '5px solid green';
                            zutatName.style.color = 'green';
                            selectedCount++;
                        }

                        // Aktualisiere den Zähler
                        anzahlZutatenElement.textContent = selectedCount;
                    });
                });

                const searchInput = document.querySelector('.searchbar input');
                searchInput.addEventListener('input', function () {
                    const searchText = this.value.toLowerCase();

                    zutaten.forEach((zutat) => {
                        const zutatName = zutat.querySelector('p').textContent.toLowerCase();

                        if (zutatName.includes(searchText)) {
                            zutat.style.display = 'flex';
                        } else {
                            zutat.style.display = 'none';
                        }
                    });
                });
            })
            .catch(error => console.error('Error loading filter.html:', error));
    }

    // Warten bis der Header geladen ist
    setTimeout(function () {
        initFilterPopup();  // Funktion zum Initialisieren des Popups aufrufen
    }, 500);  // Gib dem Laden etwas Zeit, du kannst diesen Wert anpassen
});
