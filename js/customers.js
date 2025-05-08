const API_URL = "https://681632b532debfe95dbdba15.mockapi.io/feedbacks";

const container = document.querySelector(".feedback-container");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    container.innerHTML = "";

    data.forEach((review) => {
      const card = document.createElement("div");
      card.className = "feedback-card";

      const stars = Array.from({ length: 5 }, (_, i) =>
        i < review.rating
          ? '<i class="fa-solid fa-star"></i>'
          : '<i class="fa-regular fa-star"></i>'
      ).join("");

      card.innerHTML = `
        <div class="rating-stars">${stars}</div>
        <h4 class="person-name">
          ${review.name}
          ${
            review.verified
              ? '<img src="./assets/images/verified.svg" alt="verified icon">'
              : ""
          }
        </h4>
        <p class="text">"${review.comment}"</p>
      `;

      container.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching reviews:", error);
    container.innerHTML =
      "<p>Failed to load customer reviews. Please try again later.</p>";
  });

rightArrow.addEventListener("click", () => {
  container.scrollBy({
    left: 320,
    behavior: "smooth",
  });
});

leftArrow.addEventListener("click", () => {
  container.scrollBy({
    left: -320,
    behavior: "smooth",
  });
});
