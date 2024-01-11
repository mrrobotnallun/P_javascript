document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon nicht gefunden');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            alert(error.message);
        });
});

function displayPokemon(data) {
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `# ${data.id}`;
    document.getElementById('weight').textContent = `Gewicht: ${data.weight}`;
    document.getElementById('height').textContent = `Größe: ${data.height}`;
    document.getElementById('types').textContent = `Typ(en): ${data.types.map(type => type.type.name).join(', ')}`;
    document.getElementById('hp').textContent = `HP: ${data.stats[0].base_stat}`;
    document.getElementById('attack').textContent = `Angriff: ${data.stats[1].base_stat}`;
    document.getElementById('defense').textContent = `Verteidigung: ${data.stats[2].base_stat}`;
    document.getElementById('special-attack').textContent = `Spezial-Angriff: ${data.stats[3].base_stat}`;
    document.getElementById('special-defense').textContent = `Spezial-Verteidigung: ${data.stats[4].base_stat}`;
    document.getElementById('speed').textContent = `Geschwindigkeit: ${data.stats[5].base_stat}`;

    const sprite = document.getElementById('sprite');
    sprite.src = data.sprites.front_default;
    sprite.hidden = false;
}

document.getElementById('search-input').addEventListener('input', function(e) {
    const input = e.target.value;
    if (input.length > 2) { // Vorschläge generieren, wenn mehr als 2 Zeichen eingegeben wurden
        fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`)
            .then(response => response.json())
            .then(data => {
                // Vorschlagsliste leeren
                const suggestions = document.getElementById('suggestions');
                suggestions.innerHTML = '';
                suggestions.hidden = false;

                // Vorschlag hinzufügen
                const option = document.createElement('option');
                option.value = data.name;
                suggestions.appendChild(option);
            })
            .catch(error => {
                // Fehlerbehandlung, falls keine Übereinstimmungen gefunden wurden
                document.getElementById('suggestions').hidden = true;
            });
    }
});
