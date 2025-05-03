const apiNewArrivals = "https://681632b532debfe95dbdba15.mockapi.io/items";
const apiTopSellings = "https://681632b532debfe95dbdba15.mockapi.io/items";

const productSections = document.querySelectorAll(".product-section");
const newArrivalsContainer = document.querySelector(
  ".new-arrivals .product-list"
);
const topSellingsContainer = document.querySelector(
  ".top-sellings .product-list"
);

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}" />
    </div>
    <div class="product-details">
      <h4 class="product-name">${product.title}</h4>
      <div class="product-rating">
        <span class="stars">
          ${renderStars(product.rating)}
        </span>
        <span class="rating-value">${product.rating}/<span>5</span></span>
      </div>
      <div class="product-price">
        <span class="current-price">$${product.price}</span>
      </div>
    </div>
  `;

  return card;
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return `
    ${"<i class='fa-solid fa-star'></i>".repeat(fullStars)}
    ${halfStar ? "<i class='fa-regular fa-star-half-stroke'></i>" : ""}
    ${"<i class='fa-regular fa-star'></i>".repeat(emptyStars)}
  `;
}

function fetchProducts(apiUrl, container) {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((products) => {
      container.innerHTML = "";
      products.forEach((product) => {
        const card = createProductCard(product);
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Failed to load products:", err);
      container.innerHTML = "<p>Error loading products.</p>";
    });
}

fetchProducts(apiNewArrivals, newArrivalsContainer);
fetchProducts(apiTopSellings, topSellingsContainer);
