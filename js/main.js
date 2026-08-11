let myButton = document.querySelectorAll(".add-to-cart");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartCount = document.getElementById("cart-count");
let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let theInput = document.querySelector(".search");
let searchButton = document.getElementById("search");
// let viewProduct = document.getElementById("view-button");
let cards = document.querySelectorAll(".card");
let NotFound = document.getElementById("search-message");
// Modal Variables
const modal = document.getElementById("product-modal");
const closeModal = document.getElementById("close-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalSpecifications = document.getElementById("modal-specifications");
const modalAddToCart = document.getElementById("modal-add-to-cart");

// New Arrival View Product
const viewButton = document.getElementById("view-button");

if (viewButton) {
  viewButton.addEventListener("click", function () {
    // Product information
    const productImage = document.querySelector(".new-arrival .my-img");

    // Put information inside Modal
    modalImage.src = productImage.src;
    modalImage.alt = "New Arrival";

    modalTitle.textContent = "New Arrival";

    modalDescription.textContent =
      "Discover our latest product with premium design and high performance.";

    modalPrice.textContent = "Iphone 17 Promax";

    modalSpecifications.innerHTML = `
      ⭐ Premium Product<br>
      ⚡ High Performance<br>
      🎨 Modern Design<br>
      🔋 Long Battery Life
    `;

    // Show Modal
    modal.style.display = "block";
  });
}

const comingSoonButton = document.getElementById("coming-soon-button");

if (comingSoonButton) {
  comingSoonButton.addEventListener("click", function () {
    // Product information
    const productImage = document.querySelector(".coming-soon .my-img");

    // Put information inside Modal
    modalImage.src = productImage.src;
    modalImage.alt = "ComingSoon";

    modalTitle.textContent = "ComingSoon";

    modalDescription.textContent =
      "Discover our latest product with premium design and high performance.";

    modalPrice.textContent = "Coming Soon";

    modalSpecifications.innerHTML = `
      ⭐ Premium Product<br>
      ⚡ High Performance<br>
      🎨 Modern Design<br>
      🔋 Long Battery Life
    `;

    // Show Modal
    modal.style.display = "block";
  });
}

// const comingSoonButton = document.getElementById("coming-soon-button");
// if (comingSoonButton) {
//   comingSoonButton.addEventListener("click", function () {
//     modalImage.src = productImage.src;
//     modalImage.alt = "Coming Soon";

//     modalTitle.textContent = "Coming Soon";
//     modalDescription.textContent =
//       "Discover our latest product with premium design and high performance.";

//     modalSpecifications.innerHTML = `
//       ⭐ Premium Product<br>
//       ⚡ High Performance<br>
//       🎨 Modern Design<br>
//       🔋 Long Battery Life
//     `;

//     modal.style.display = "block";
//   });
// }

// Start Cart Dropdown
let cartButton = document.getElementById("cart-button");
let cartDropdown = document.getElementById("cart-dropdown");
cartButton.addEventListener("click", function (e) {
  e.preventDefault();

  cartDropdown.classList.toggle("show");
});
// End Cart Dropdown
myButton.forEach(function (button) {
  button.addEventListener("click", function () {
    let card = button.closest(".card");

    let title = card.querySelector("h3");
    let productTitle = title.textContent;

    let productImage = card.querySelector("img");
    let productImageSrc = productImage.src;

    let productPrice = card.querySelector(".price");
    let productPriceText = productPrice.textContent;

    let product = {
      title: productTitle,
      image: productImageSrc,
      price: productPriceText,
      quantity: 1,
    };

    let existingProduct = cart.find(function (item) {
      return item.title === productTitle;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(product);
    }

    updateCartCount();
    updateCartTotal();
    render();
    savecart();
  });
});

function render() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.style.display = "none";
    cartTotal.style.display = "none";
    cartDropdown.classList.remove("show");
    return;
  }
  cartItems.style.display = "block";
  cartTotal.style.display = "block";

  cart.forEach(function (item) {
    let div = document.createElement("div");

    div.innerHTML = `<img src="${item.image}">
      <h2>${item.title}</h2>
      <span>${item.price}</span>
      <button class="minus">[-]</button>
      <span class="quantity">${item.quantity}</span>
      <button class="plus">[+]</button>
      <button class="delete">Delete</button>`;

    let deleteButton = div.querySelector(".delete");
    let plusButton = div.querySelector(".plus");
    let minusButton = div.querySelector(".minus");

    plusButton.addEventListener("click", function () {
      item.quantity += 1;
      render();
      updateCartCount();
      updateCartTotal();
      savecart();
    });

    minusButton.addEventListener("click", function () {
      if (item.quantity === 1) {
        return false;
      }
      item.quantity -= 1;
      render();
      updateCartCount();
      updateCartTotal();
      savecart();
    });

    deleteButton.addEventListener("click", function () {
      let index = cart.findIndex(function (product) {
        return product.title === item.title;
      });

      cart.splice(index, 1);

      updateCartCount();
      updateCartTotal();
      render();
      savecart();
    });

    cartItems.appendChild(div);
  });
}

function updateCartCount() {
  let totalQuantity = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  if (totalQuantity === 0) {
    cartCount.textContent = 0;
  } else {
    cartCount.textContent = totalQuantity;
  }
}

function updateCartTotal() {
  let totalPrice = cart.reduce(function (total, item) {
    let price = Number(item.price.replace(" EGP", ""));

    return total + price * item.quantity;
  }, 0);

  cartTotal.textContent = totalPrice + " EGP";
}

function savecart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

render();
updateCartCount();
updateCartTotal();

searchButton.addEventListener("click", function (e) {
  e.preventDefault();

  let found = false;
  let searchValue = theInput.value.toLowerCase().trim();
  if (searchValue === "") {
    return false;
  }
  cards.forEach(function (card) {
    let title = card.querySelector("h3");
    let productTitle = title.textContent;
    let titleValue = productTitle.toLowerCase();

    if (titleValue.includes(searchValue)) {
      card.scrollIntoView(true);
      found = true;
      NotFound.innerHTML = "";
    }
  });

  if (found === false) {
    NotFound.innerHTML = "Product Not Found";
  }

  theInput.value = "";
});

cards.forEach(function (card) {
  card.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
      return;
    }

    const image = card.querySelector(".card-img-top");
    const title = card.querySelector(".card-title");
    const description = card.querySelector(".card-text");
    const price = card.querySelector(".price");

    modalImage.src = image.src;
    modalImage.alt = title.textContent;
    modalTitle.textContent = title.textContent;
    modalDescription.textContent = description.textContent;
    modalPrice.textContent = price.textContent;

    // Specifications
    let specifications = "";

    const productName = title.textContent.toLowerCase();

    if (productName.includes("iphone")) {
      specifications = `
        📱 Display: Super Retina XDR<br>
        ⚡ Performance: High Performance<br>
        📸 Camera: Advanced Camera System<br>
        🔋 Battery: All-Day Battery Life<br>
        💾 Storage: Available in Multiple Options
      `;
    } else if (productName.includes("airpods")) {
      specifications = `
        🎧 Type: Wireless Earbuds / Headphones<br>
        🔊 Audio: High-Quality Audio<br>
        🔇 Noise Control: Active Noise Cancellation<br>
        🔋 Battery: Long Battery Life<br>
        📡 Connection: Bluetooth
      `;
    } else if (productName.includes("watch")) {
      specifications = `
        ⌚ Display: Retina Display<br>
        ❤️ Health: Health & Fitness Tracking<br>
        🔋 Battery: Long-Lasting Battery<br>
        📱 Connection: Bluetooth<br>
        💧 Water Resistance: Yes
      `;
    } else {
      specifications = `
        ⭐ Premium Product<br>
        ⚡ High Performance<br>
        🔋 Long Battery Life<br>
        🎨 Modern Design
      `;
    }

    modalSpecifications.innerHTML = specifications;

    // Show Modal
    modal.style.display = "block";
  });
});

// 👇 حط الكود ده هنا بالظبط 👇

// Close Modal
if (closeModal && modal) {
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

// Close Modal when clicking outside
if (modal) {
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Close Modal
if (modalAddToCart) {
  modalAddToCart.addEventListener("click", function () {
    const product = {
      title: modalTitle.textContent,
      image: modalImage.src,
      price: modalPrice.textContent,
      quantity: 1,
    };
    const existingProduct = cart.find(function (item) {
      return item.title === product.title;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(product);
    }

    savecart();
    updateCartCount();
    updateCartTotal();
    render();

    modal.style.display = "none";

    alert(`${product.title} added to cart 🛒`);
  });
}

render();
updateCartCount();
updateCartTotal();

window.addEventListener("pageshow", function () {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  render();
  updateCartCount();
  updateCartTotal();
});
