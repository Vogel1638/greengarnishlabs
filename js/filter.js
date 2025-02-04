document.addEventListener('DOMContentLoaded', function () {
    function initFilterPopup() {
        const filterBtn = document.getElementById('filterBtn');
        if (!filterBtn) {
            console.error("Button mit ID 'filterBtn' nicht gefunden.");
            return;
        }

        fetch('filter.html')
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML('beforeend', data);

                const filterPopup = document.getElementById('filterPopup');
                const closePopup = document.getElementById('closePopup');
                if (!filterPopup || !closePopup) {
                    console.error("Popup oder Close-Button nicht gefunden.");
                    return;
                }

                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                document.body.appendChild(overlay);

                filterBtn.addEventListener('click', function () {
                    console.log("Button 'filterBtn' wurde geklickt, Popup wird geöffnet.");
                    filterPopup.classList.add('active');
                    overlay.classList.add('active');
                });

                closePopup.addEventListener('click', function () {
                    filterPopup.classList.remove('active');
                    overlay.classList.remove('active');
                });

                overlay.addEventListener('click', function () {
                    filterPopup.classList.remove('active');
                    overlay.classList.remove('active');
                });

                let selectedCount = 0;
                const anzahlZutatenElement = document.getElementById('anzahl-zutaten');
                const zutaten = document.querySelectorAll('.zutat');

                zutaten.forEach((zutat) => {
                    zutat.addEventListener('click', function () {
                        const zutatBild = this.querySelector('.zutatbild');
                        const zutatName = this.querySelector('zutatname')

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

    setTimeout(function () {
        initFilterPopup();
    }, 500);
});
