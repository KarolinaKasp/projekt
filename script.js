// ID
const $form = document.getElementById("form");
const $thanks = document.getElementById("thanks");
const $main = document.getElementById("main");
const $back = document.getElementById("back");
const $submit = document.getElementById("submit");
// PRODUCT 1 ID
const $product1 = document.getElementById("product1");
const $prd1_img = document.getElementById("prd1_img");
const $prd1_name = document.getElementById("prd1_name");
const $prd1_price = document.getElementById("prd1_price");
const $prd1_brand = document.getElementById("prd1_brand");
const $prd1_cat = document.getElementById("prd1_cat");
let colors1 = [];
// PRODUCT 2 ID
const $product2 = document.getElementById("product2");
const $prd2_img = document.getElementById("prd2_img");
const $prd2_name = document.getElementById("prd2_name");
const $prd2_price = document.getElementById("prd2_price");
const $prd2_brand = document.getElementById("prd2_brand");
const $prd2_cat = document.getElementById("prd2_cat");
let colors2 = [];
// PRODUCT 3 ID
const $product3 = document.getElementById("product3");
const $prd3_img = document.getElementById("prd3_img");
const $prd3_name = document.getElementById("prd3_name");
const $prd3_price = document.getElementById("prd3_price");
const $prd3_brand = document.getElementById("prd3_brand");
const $prd3_cat = document.getElementById("prd3_cat");
let colors3 = [];
//PRODUCT 4 ID
const $product4 = document.getElementById("product4");
const $prd4_img = document.getElementById("prd4_img");
const $prd4_name = document.getElementById("prd4_name");
const $prd4_price = document.getElementById("prd4_price");
const $prd4_brand = document.getElementById("prd4_brand");
const $prd4_cat = document.getElementById("prd4_cat");
let colors4 = [];
// PRODUCT 5 ID
const $product5 = document.getElementById("product5");
const $prd5_img = document.getElementById("prd5_img");
const $prd5_name = document.getElementById("prd5_name");
const $prd5_price = document.getElementById("prd5_price");
const $prd5_brand = document.getElementById("prd5_brand");
const $prd5_cat = document.getElementById("prd5_cat");
let colors5 = [];
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
const $error = document.getElementById("error");
const $cash = document.getElementById("cash");
const $card = document.getElementById("card");
const $colors = document.getElementById("colors");
// SUMMARY IDs
const $f_name = document.getElementById("final_name");
const $f_img = document.getElementById("final_img");
const $f_color = document.getElementById("final_color");
const $f_cost = document.getElementById("final_cost");
const $f_method = document.getElementById("final_method");

// FETCHING API

fetch(
  `http://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation`
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    $prd1_img.src = response[7].image_link;
    $prd1_name.innerText = response[7].name;
    $prd1_price.innerText = Number(response[7].price).toFixed(2);
    $prd1_brand.innerText = response[7].brand;
    $prd1_cat.innerText = response[7].category;
    colors1 = response[7].product_colors;
    $prd2_img.src = response[13].image_link;
    $prd2_name.innerText = response[13].name;
    $prd2_price.innerText = Number(response[13].price).toFixed(2);
    $prd2_brand.innerText = response[13].brand;
    $prd2_cat.innerText = response[13].category;
    colors2 = response[13].product_colors;
    $prd3_img.src = response[24].image_link;
    $prd3_name.innerText = response[24].name;
    $prd3_price.innerText = Number(response[24].price).toFixed(2);
    $prd3_brand.innerText = response[24].brand;
    $prd3_cat.innerText = response[24].category;
    colors3 = response[24].product_colors;
    $prd4_img.src = response[119].image_link;
    $prd4_name.innerText = response[119].name;
    $prd4_price.innerText = Number(response[119].price).toFixed(2);
    $prd4_brand.innerText = response[119].brand;
    $prd4_cat.innerText = response[119].category;
    colors4 = response[119].product_colors;
    $prd5_img.src = response[98].image_link;
    $prd5_name.innerText = response[98].name;
    $prd5_price.innerText = Number(response[98].price).toFixed(2);
    $prd5_brand.innerText = response[98].brand;
    $prd5_cat.innerText = response[98].category;
    colors5 = response[98].product_colors;
  });

// DISPLAYING STYLES
$form.style.display = "none";
$thanks.style.display = "none";
$error.style.display = "none";

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

//PRODUCT BUTTONS
let clickedColorName = "";

$product1.addEventListener("click", function () {
  $form.style.display = "flex";
  $main.style.display = "none";
  $prd_img.src = $prd1_img.src;
  $prd_name.innerText = $prd1_name.innerText;
  $prd_price.innerText = $prd1_price.innerText;
  $prd_brand.innerText = $prd1_brand.innerText;
  $prd_cat.innerText = $prd1_cat.innerText;
  $f_price.innerText = $prd_price.innerText;
  colors1.forEach((e) => {
    const btn = document.createElement("button");
    btn.innerText = e.colour_name;
    btn.style.background = e.hex_value;
    btn.addEventListener("click", function () {
      clickedColorName = btn.innerText;
      console.log(clickedColorName);
    });
    $colors.appendChild(btn);
  });
});

$product2.addEventListener("click", function () {
  $form.style.display = "flex";
  $main.style.display = "none";
  $prd_img.src = $prd2_img.src;
  $prd_name.innerText = $prd2_name.innerText;
  $prd_price.innerText = $prd2_price.innerText;
  $prd_brand.innerText = $prd2_brand.innerText;
  $prd_cat.innerText = $prd2_cat.innerText;
  $f_price.innerText = $prd_price.innerText;
  colors2.forEach((e) => {
    const btn = document.createElement("button");
    btn.innerText = e.colour_name;
    btn.style.background = e.hex_value;
    btn.addEventListener("click", function () {
      clickedColorName = btn.innerText;
      console.log(clickedColorName);
    });
    $colors.appendChild(btn);
  });
});

$product3.addEventListener("click", function () {
  $form.style.display = "flex";
  $main.style.display = "none";
  $prd_img.src = $prd3_img.src;
  $prd_name.innerText = $prd3_name.innerText;
  $prd_price.innerText = $prd3_price.innerText;
  $prd_brand.innerText = $prd3_brand.innerText;
  $prd_cat.innerText = $prd3_cat.innerText;
  $f_price.innerText = $prd_price.innerText;
  colors3.forEach((e) => {
    const btn = document.createElement("button");
    btn.innerText = e.colour_name;
    btn.style.background = e.hex_value;
    btn.addEventListener("click", function () {
      clickedColorName = btn.innerText;
      console.log(clickedColorName);
    });
    $colors.appendChild(btn);
  });
});

$product4.addEventListener("click", function () {
  $form.style.display = "flex";
  $main.style.display = "none";
  $prd_img.src = $prd4_img.src;
  $prd_name.innerText = $prd4_name.innerText;
  $prd_price.innerText = $prd4_price.innerText;
  $prd_brand.innerText = $prd4_brand.innerText;
  $prd_cat.innerText = $prd4_cat.innerText;
  $f_price.innerText = $prd_price.innerText;
  colors4.forEach((e) => {
    const btn = document.createElement("button");
    btn.innerText = e.colour_name;
    btn.style.background = e.hex_value;
    btn.addEventListener("click", function () {
      clickedColorName = btn.innerText;
      console.log(clickedColorName);
    });
    $colors.appendChild(btn);
  });
});

$product5.addEventListener("click", function () {
  $form.style.display = "flex";
  $main.style.display = "none";
  $prd_img.src = $prd5_img.src;
  $prd_name.innerText = $prd5_name.innerText;
  $prd_price.innerText = $prd5_price.innerText;
  $prd_brand.innerText = $prd5_brand.innerText;
  $prd_cat.innerText = $prd5_cat.innerText;
  $f_price.innerText = $prd_price.innerText;
  colors5.forEach((e) => {
    const btn = document.createElement("button");
    btn.innerText = e.colour_name;
    btn.style.background = e.hex_value;
    btn.addEventListener("click", function () {
      clickedColorName = btn.innerText;
      console.log(clickedColorName);
    });
    $colors.appendChild(btn);
  });
});

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
  if (
    $pickup_input.value !== null &&
    $pickup_input.value.trim() !== "" &&
    $name_input.value !== null &&
    $name_input.value.trim() !== "" &&
    $pickup_date.value !== null &&
    $pickup_date.value.trim() !== "" &&
    fullName.test($name_input.value) === true &&
    typeof $pickup_input.value == "string" &&
    ($card.checked === true || $cash.checked === true)
  ) {
    $error.style.display = "none";
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
    localStorage.removeItem("userData");
    $name_input.value = null;
    $pickup_input.value = null;
    $pickup_date.value = null;
    $card.checked = false;
    $cash.checked = false;
  } else {
    $error.style.display = "block";
    $main.style.display = "none";
  }
});
