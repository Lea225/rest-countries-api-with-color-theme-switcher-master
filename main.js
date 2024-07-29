document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const countryList = document.getElementById('country-list');
    const countryDetail = document.getElementById('country-detail');
    const countryInfo = document.getElementById('country-info');
    const themeSwitcher = document.getElementById('theme-switcher');
    const backButton = document.getElementById('back-button');

    // Récupérer les données des pays
    fetch('data.json') // Assurez-vous que le chemin d'accès est correct
        .then(response => response.json())
        .then(countries => {
            // Afficher les pays
            displayCountries(countries);

            // Ajouter des écouteurs d'événements pour le filtrage
            searchInput.addEventListener('input', () => filterCountries(countries));
            regionFilter.addEventListener('change', () => filterCountries(countries));
        })
        .catch(error => console.error('Erreur lors du chargement des données:', error));

    // Fonction pour afficher les pays
    const displayCountries = (countries) => {
        countryList.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            countryCard.innerHTML = `
                <div><img src="${country.flags.svg}" alt="Flag of ${country.name}"></div>
                <div class="infos">
                    <h2>${country.name}</h2>
                    <p>Capital: ${country.capital}</p>
                    <p>Region: ${country.region}</p>
                    <p>Population: ${country.population.toLocaleString()}</p>
                </div>
            `;
            countryCard.addEventListener('click', () => showCountryDetails(country));
            countryList.appendChild(countryCard);
        });
    };

    // Afficher les détails du pays
    const showCountryDetails = (country) => {
        countryList.style.display = 'none';
        countryDetail.style.display = 'block';
        countryInfo.innerHTML = `
            <div><img src="${country.flags.svg}" alt="Flag of ${country.name}"></div>
            <div class="info">
                <h2>${country.name}</h2>
                <div class="info-div">
                    <div>   
                        <p><strong>Native Name:</strong> ${country.nativeName}</p>
                        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Region:</strong> ${country.region}</p>
                        <p><strong>Subregion:</strong> ${country.subregion}</p>
                    </div>
                    <div>
                        <p><strong>Capital:</strong> ${country.capital}</p>
                        <p><strong>Top Level Domain:</strong> ${country.topLevelDomain}</p>
                        <p><strong>Currencies: </strong>${country.currencies.map(cur => cur.name).join(', ')}</p>
                        <p><strong>Languages:</strong> ${country.languages.map(lang => lang.name).join(', ')}</p>
                    </div>
                </div>
                <p><strong>Border Countries:</strong> ${country.borders ? country.borders.join(', ') : 'None'}</p>
            </div>
            
        `;
    };

    // Revenir à la liste des pays
    backButton.addEventListener('click', () => {
        countryList.style.display = 'grid';
        countryDetail.style.display = 'none';
    });

    // Filtrage et recherche
    const filterCountries = (countries) => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedRegion = regionFilter.value;
        const filteredCountries = countries.filter(country => {
            const matchesSearch = country.name.toLowerCase().includes(searchTerm);
            const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
            return matchesSearch && matchesRegion;
        });
        displayCountries(filteredCountries);
    };

    const body = document.body;

    // Charger le thème préféré de l'utilisateur à partir du localStorage
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme) {
        body.classList.add(preferredTheme);
    }

    // Basculer entre les thèmes
    themeSwitcher.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', theme);
    });
});
