// ID
const $grid = document.getElementById("grid");
const $form = document.getElementById("form");
const $thanks = document.getElementById("thanks");
const $main = document.getElementById("main");
const $back = document.getElementById("back");
const $submit = document.getElementById("submit");
// FORM IDs
const $prd_img = document.getElementById("prd_img");
const $prd_name = document.getElementById("prd_name");
const $prd_price = document.getElementById("prd_price");
const $prd_brand = document.getElementById("prd_brand");
const $prd_cat = document.getElementById("prd_cat");
const $f_price = document.getElementById("f_price");
const $acc1 = document.getElementById("acc1");
const $acc2 = document.getElementById("acc2");
const $name_input = document.getElementById("name_input");
const $pickup_input = document.getElementById("pickup_input");
const $pickup_date = document.getElementById("pickup_date");
const $error_payment = document.getElementById("error_payment");
const $error_name = document.getElementById("error_name");
const $error_pickup = document.getElementById("error_pickup");
const $error_date = document.getElementById("error_date");
const $cash = document.getElementById("cash");
const $card = document.getElementById("card");
const $colors = document.getElementById("colors");
// SUMMARY IDs
const $f_name = document.getElementById("final_name");
const $f_img = document.getElementById("final_img");
const $f_color = document.getElementById("final_color");
const $f_cost = document.getElementById("final_cost");
const $f_method = document.getElementById("final_method");

// DISPLAYING STYLES
$form.style.display = "none";
$thanks.style.display = "none";
$error_payment.style.display = "none";
$error_name.style.display = "none";
$error_pickup.style.display = "none";
$error_date.style.display = "none";

// FETCHING API
fetch(
  "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation"
)
  .then((response) => response.json())
  .then((responseData) => {
    localStorage.setItem("productsData", JSON.stringify(responseData));
    fillProducts();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// PRODUCTS DATABASE
const productsData = JSON.parse(localStorage.getItem("productsData")) || [];

// CREATING PRODUCTS ELEMENTS IN HTML
function createProduct(productData) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");
  const button = document.createElement("button");
  const img = document.createElement("img");
  img.src = productData.image_link;
  button.appendChild(img);
  // FUNCTION FOR BUTTONS
  button.addEventListener("click", () => {
    $colors.innerHTML = "";
    $form.style.display = "flex";
    $main.style.display = "none";
    $prd_img.src = productData.image_link;
    $prd_name.innerText = productData.name;
    $prd_price.innerText = `${Number(productData.price).toFixed(2)}`;
    $prd_brand.innerText = productData.brand;
    $prd_cat.innerText = productData.category;
    $f_price.innerText = `${Number(productData.price).toFixed(2)}`;
    colors = productData.product_colors;
    colors.forEach((color) => {
      const btn = document.createElement("button");
      btn.innerText = color.colour_name;
      btn.style.background = color.hex_value;
      btn.addEventListener("click", function () {
        clickedColorName = btn.innerText;
      });
      $colors.appendChild(btn);
    });
  });
  productElement.appendChild(button);
  const name = document.createElement("h2");
  name.innerText = productData.name;
  productElement.appendChild(name);
  const price = document.createElement("h3");
  price.innerText = `$${Number(productData.price).toFixed(2)}`;
  productElement.appendChild(price);
  const brand = document.createElement("p");
  brand.innerText = `brand: ${productData.brand}`;
  productElement.appendChild(brand);
  const category = document.createElement("p");
  category.innerText = `category: ${productData.category}`;
  productElement.appendChild(category);
  return productElement;
}

function fillProducts() {
  for (let i = 7; i < 39; i++) {
    const productData = productsData[i];
    const productElement = createProduct(productData);
    $grid.appendChild(productElement);
  }
}

// READING FORM VALUES
if (localStorage.getItem("userData") !== null) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  $name_input.value = userData.name;
  $pickup_input.value = userData.location;
  $pickup_date.value = userData.date;
  if (userData.payment === "card") {
    $card.checked = true;
  } else if (userData.payment === "cash") {
    $cash.checked = true;
  }
}

// FORM DATE

const today = new Date();
const twoWeeksForward = new Date();
twoWeeksForward.setDate(today.getDate() + 14);
$pickup_date.setAttribute("max", twoWeeksForward.toISOString().slice(0, 10));
$pickup_date.setAttribute("min", today.toISOString().slice(0, 10));

// REMEMBERING FORM VALUES
window.onbeforeunload = function () {
  const data = {
    name: $name_input.value,
    location: $pickup_input.value,
    date: $pickup_date.value,
    payment: "",
  };
  if ($card.checked === true) {
    data.payment = "card";
  }
  if ($cash.checked === true) {
    data.payment = "cash";
  }
  localStorage.setItem("userData", JSON.stringify(data));
};

// ACCESSORIES
$acc1.addEventListener("click", function (event) {
  event.preventDefault();
});

$acc1.addEventListener("click", function () {
  if ($acc1.innerText === "Remove from Cart") {
    $acc1.innerText = "Add to Cart";
    $f_price.innerText = (Number($f_price.innerText) - 6).toFixed(2);
  } else {
    $f_price.innerText = (Number($f_price.innerText) + 6).toFixed(2);
    $acc1.innerText = "Remove from Cart";
  }
});

$acc2.addEventListener("click", function (event) {
  event.preventDefault();
});

$acc2.addEventListener("click", function () {
  if ($acc2.innerText === "Remove from Cart") {
    $acc2.innerText = "Add to Cart";
    $f_price.innerText = (Number($f_price.innerText) - 7).toFixed(2);
  } else {
    $f_price.innerText = (Number($f_price.innerText) + 7).toFixed(2);
    $acc2.innerText = "Remove from Cart";
  }
});

// BACK TO PRODUCTS

$back.addEventListener("click", function () {
  $form.style.display = "none";
  $main.style.display = "grid";
  $colors.innerText = "";
  $acc2.innerText = "Add to Cart";
  $acc1.innerText = "Add to Cart";
});

// SUBMITTING FORM

$submit.addEventListener("click", function (event) {
  event.preventDefault();
});

$submit.addEventListener("click", function () {
  const fullName = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
  $error_payment.style.display = "none";
  $error_name.style.display = "none";
  $error_pickup.style.display = "none";
  $error_date.style.display = "none";
  if (
    $pickup_input.value !== null &&
    $pickup_input.value.trim() !== "" &&
    $name_input.value !== null &&
    $name_input.value.trim() !== "" &&
    $pickup_date.value !== null &&
    $pickup_date.value.trim() !== "" &&
    fullName.test($name_input.value) === true &&
    typeof $pickup_input.value === "string" &&
    ($card.checked === true || $cash.checked === true)
  ) {
    localStorage.removeItem("userData");
    $form.style.display = "none";
    $thanks.style.display = "block";
    $main.style.display = "none";
    // SUMMARY
    $f_name.innerText = $prd_name.innerText;
    $f_img.src = $prd_img.src;
    $f_cost.innerText = $f_price.innerText;
    if ($card.checked === true) {
      $f_method.innerText = "card";
    }
    if ($cash.checked === true) {
      $f_method.innerText = "cash";
    }
    $f_color.innerText = clickedColorName;
    $name_input.value = null;
    $pickup_input.value = null;
    $pickup_date.value = null;
    $card.checked = false;
    $cash.checked = false;
  } else {
    $main.style.display = "none";
    if ($card.checked === false && $cash.checked === false) {
      $error_payment.style.display = "block";
    } else if (
      $name_input.value === null ||
      $name_input.value.trim() === "" ||
      fullName.test($name_input.value) === false ||
      typeof $pickup_input.value !== "string"
    ) {
      $error_name.style.display = "block";
    } else if (
      $pickup_input.value === null ||
      $pickup_input.value.trim() === ""
    ) {
      $error_pickup.style.display = "block";
    } else if (
      $pickup_date.value === null ||
      $pickup_date.value.trim() === ""
    ) {
      $error_date.style.display = "block";
    }
  }
});
