document.addEventListener("DOMContentLoaded", async () => {
    const cardContainer = document.querySelector('.rezepte');

    async function loadRecipes() {
        try {
            const response = await fetch('./ressources/data/recipes.json');
            const recipes = await response.json();
            console.log("Rezepte geladen:", recipes);

            if (!cardContainer) return;
            Object.values(recipes).forEach(e => {
                const card = document.createElement('article');
                card.classList.add('recipe-card');

                const image = document.createElement('img');
                image.src = `ressources/img/${e.image}.png`;
                image.alt = `${e.name}`;
                card.appendChild(image);

                const cardTitle = document.createElement('h3');
                cardTitle.textContent = e.name;
                card.appendChild(cardTitle);

                if (e.vegan) {
                    const veganSymbol = document.createElement('img');
                    veganSymbol.src = "ressources/img/icons/vegan-symbol.svg";
                    veganSymbol.alt = "Vegan Symbol";
                    veganSymbol.classList.add('vegan-symbol');
                    cardTitle.appendChild(veganSymbol);
                }

                const subtitle = document.createElement('p');
                subtitle.classList.add('extra');
                subtitle.textContent = e.subtitle;
                card.appendChild(subtitle);

                const time = document.createElement('p');
                time.innerHTML = `Zubereitungszeit: ${e.totalTime}<br>Schwierigkeit: ${e.difficulty}`;
                card.appendChild(time);

                const detailBtn = document.createElement('button');
                detailBtn.classList.add('btn');
                detailBtn.textContent = "Zum Rezept";
                detailBtn.onclick = () => showDetail(e);
                card.appendChild(detailBtn);

                cardContainer.appendChild(card);
            });
        } catch (error) {
            console.error("Fehler beim Laden der Rezepte:", error);
        }
    }

    function showDetail(e) {
        console.log("Speichere Rezept in localStorage:", e);
        localStorage.setItem('selectedRecipe', JSON.stringify(e));
        window.location.href = "rezepte-detail.html";
    }

    async function loadRecipeDetail() {
        const content = document.querySelector('.rezept-content');

        if (!content) {
            console.log("Detailseite nicht erkannt, breche ab.");
            return;
        }

        const storedRecipe = localStorage.getItem('selectedRecipe');
        if (!storedRecipe) {
            console.error("Kein Rezept in localStorage gefunden!");
            return;
        }

        const e = JSON.parse(storedRecipe);
        console.log("Lade Rezept aus localStorage:", e);

        content.innerHTML = `
            <section class="intro" aria-labelledby="rezept-titel">
                <div class="back" onclick="history.back()" role="button" tabindex="0" aria-label="Zurück zur vorherigen Seite">
                    <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
                    <p>Zurück</p>
                </div>
                <div class="infos">
                    <img src="ressources/img/detail/${e.image}-detail.png" alt="${e.name}" role="img">
                    <div class="rezept-text">
                        <div>
                            <h2 id="rezept-titel">${e.name} ${e.vegan ? '<img src="ressources/img/icons/vegan-symbol.svg" alt="Vegan Symbol" class="vegan-symbol" role="img">' : ''}</h2>
                            <h3>${e.subtitle}</h3>
                        </div>
                        <div>
                            <p>Zubereitungszeit: ${e.cookingTime} min<br>Gesamtzeit: ${e.totalTime} min</p>
                            <p>Schwierigkeit: ${e.difficulty}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="zubereitung-details" aria-labelledby="zutaten-anleitung-titel">
                <div class="left-details">
                    <article class="zutaten" aria-labelledby="zutaten-titel">
                        <p id="zutaten-titel" class="zutaten-titel">Zutaten</p>
                        <div class="zutaten-detail">
                            <ul id="zutaten-liste">
                                ${e.ingredients.map(ing => `
                                    <li>
                                        ${ing.amount !== null ? ing.amount : ''} 
                                        ${ing.unit !== null ? ing.unit : ''} 
                                        ${ing.ingredient} 
                                        ${ing.preparation ? `(${ing.preparation})` : ''}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </article>
                    <article class="servier-tipp" aria-labelledby="servier-tipp-titel">
                        <p id="servier-tipp-titel" class="servier-titel">Serviertipp</p>
                        <div class="servier-detail">
                            <p>${e.servingTip}</p>
                        </div>
                    </article>
                </div>
                <article class="anleitung" aria-labelledby="anleitung-titel">
                    <p id="anleitung-titel" class="anleitung-titel">Zubereitung</p>
                    <div class="anleitung-detail">
                        <p>${e.preparation}</p>
                    </div>
                </article>
            </section>
        `;
    }

    await loadRecipes();
    await loadRecipeDetail();
});
