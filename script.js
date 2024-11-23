const aircraftData = [
    { 
        id: 0, 
        category: 'military', 
        name: 'Boeing AH-64', 
        description: 'Attack Helicopter built by Boeing.', 
        image: 'assets/APACHE.png', 
        price: 20000,
        onSale: true
    },
    { 
        id: 1, 
        category: 'commercial', 
        name: 'Airbus A321neo', 
        description: 'Good airliner for medium range jobs.', 
        image: 'assets/A321NEO.png', 
        price: 25000,
        onSale: true
    },
    { 
        id: 2, 
        category: 'commercial', 
        name: 'Embraer E-190', 
        description: 'Description of Commercial Aircraft 1', 
        image: 'assets/E190.png', 
        price: 20000,
        onSale: true
    },
    { 
        id: 3, 
        category: 'commercial', 
        name: 'Boom Overture', 
        description: 'Medium-Price SST.', 
        image: 'assets/BOOM.png', 
        price: 90000,
        onSale: false
    },
    { 
        id: 4, 
        category: 'private', 
        name: 'Bombardier Global 7500', 
        description: 'Small business jet for long-range trips.', 
        image: 'assets/7500.png', 
        price: 21000,
        onSale: true
    },
    { 
        id: 5, 
        category: 'commercial', 
        name: 'Tupolev Tu-144', 
        description: 'Fuel eater.', 
        image: 'assets/TU144.png', 
        price: 120000,
        onSale: false
    },
    { 
        id: 6, 
        category: 'cargo', 
        name: 'Antonov AN-74', 
        description: 'STOL aircraft for cargo.', 
        image: 'assets/AN-74.png', 
        price: 28000,
        onSale: true
    },
    { 
        id: 7, 
        category: 'boats', 
        name: 'LK-60a', 
        description: 'Call me Project 22220.', 
        image: 'assets/LK-60YA.png', 
        price: 700000,
        onSale: true
    },
    { 
        id: 8, 
        category: 'special', 
        name: 'ADF-340 Relay', 
        description: 'ACE COMBAT REFERENCE ?!?!?!/??.', 
        image: 'assets/ADF340.png', 
        price: 2100000,
        onSale: true
    },
    { 
        id: 8, 
        category: 'special', 
        name: 'Kanamori K600', 
        description: 'Korean A350-1000.', 
        image: 'assets/K600.png', 
        price: 1600000,
        onSale: true
    },
    { 
        id: 9, 
        category: 'special', 
        name: 'Kanamori K500', 
        description: 'Korean A350-900.', 
        image: 'assets/K500.png', 
        price: 1400000,
        onSale: false
    },
];

// Function to format price with thousand separators
function formatPrice(price) {
    return price.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

// Function to create a single product card with sale price logic
function createCard(vehicle) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Check if the product is on sale
    const priceHTML = vehicle.onSale ? `
        <h4 class="original-price"><del>${formatPrice(vehicle.price)} WP</del></h4>
        <h4 class="sale-price"><strong>${formatPrice(vehicle.price * 0.88)} WP</strong></h4>
    ` : `
        <h4><strong>${formatPrice(vehicle.price)} WP</strong></h4>
    `;
    
    card.innerHTML = `
        <img src="${vehicle.image}" alt="${vehicle.name}">
        <h3>${vehicle.name}</h3>
        <p>${vehicle.description}</p>
        ${priceHTML}
        <a href="product-detail.html?id=${vehicle.id}" class="btn send-btn">I WANT</a>
    `;
    
    return card;
}


// Function to display products based on the category and onSale status
function displayProducts(category) {
    const onSaleProducts = aircraftData.filter(vehicle => vehicle.onSale && vehicle.category === category);
    const regularProducts = aircraftData.filter(vehicle => !vehicle.onSale && vehicle.category === category);

    const onSaleSection = document.getElementById('onSaleProducts');
    const regularSection = document.getElementById('regularProducts');

    onSaleSection.innerHTML = ''; // Clear previous content
    regularSection.innerHTML = ''; // Clear previous content

    // Display On Sale Products
    onSaleProducts.forEach(vehicle => {
        const card = createCard(vehicle);
        onSaleSection.appendChild(card);
    });

    // Display Regular Products
    regularProducts.forEach(vehicle => {
        const card = createCard(vehicle);
        regularSection.appendChild(card);
    });
}

// When the page loads, filter and display products based on the category
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page's category from the URL or some other method
    const pageCategory = window.location.pathname.split('/').pop().split('.').shift(); // Example: "military", "commercial"

    displayProducts(pageCategory);
});

// Function to handle search across all pages
function searchAircraft(event) {
    event.preventDefault(); // Prevent form submission

    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase(); // Capture and clean search term
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous search results

    if (searchTerm === "") {
        searchResults.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    const filteredAircraft = aircraftData.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm) ||
        vehicle.description.toLowerCase().includes(searchTerm)
    );

    // Display the filtered aircraft or show random recommendations
    if (filteredAircraft.length > 0) {
        filteredAircraft.forEach(vehicle => {
            const card = createCard(vehicle);
            searchResults.appendChild(card);
        });
    } else {
        searchResults.innerHTML = "<p>No aircraft found for your search. Here are some recommendations:</p>";

        // Display random recommendations
        const recommendations = getRandomRecommendations();
        recommendations.forEach(vehicle => {
            const card = createCard(vehicle);
            searchResults.appendChild(card);
        });
    }
}

// Event listener for search form submission
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', searchAircraft);
    }
});

// Function to get random recommendations when no results are found
function getRandomRecommendations() {
    const randomItems = [];
    const shuffled = [...aircraftData].sort(() => 0.5 - Math.random()); // Shuffle the data array
    for (let i = 0; i < 3; i++) { // Show 3 random recommendations
        randomItems.push(shuffled[i]);
    }
    return randomItems;
}

// Function to get products on sale
function getOnSaleProducts() {
    return aircraftData.filter(vehicle => vehicle.onSale);
}

// Function to populate aircraft by category
function populateAircraftByCategory(category) {
    const filteredAircraft = aircraftData.filter(vehicle => vehicle.category === category);

    const listElementId = `${category}List`;
    filteredAircraft.forEach(vehicle => {
        const card = createCard(vehicle);
        document.getElementById(listElementId).appendChild(card);
    });
}
