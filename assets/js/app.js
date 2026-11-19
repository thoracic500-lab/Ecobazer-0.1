$(document).ready(function(){
  $('.heroSlider').slick({
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow:'#banner .leftArrow',
    nextArrow:'#banner .rightArrow',
    dots:true,

  });

   $('.timer').countdown($('.timer').attr('data-date'), function(event) {
    $('.timer .days').html (event.strftime('%d'));
     $('.timer .hours').html (event.strftime('%H'));
     $('.timer .mins').html (event.strftime('%M'));
     $('.timer .secs').html (event.strftime('%S'));

  });

  $('.clientSlider').slick({
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow:'#client .leftArrow',
    nextArrow:'#client .rightArrow',
    slidesToShow: 3,  
    dots:true,
    autoplay: true,
});

  $('.featurSlider').slick({
    autoplay: true,
    autoplaySpeed: 1000,
    prevArrow:'#featurs .leftArrow',
    nextArrow:'#featurs .rightArrow',
    slidesToShow: 5,  
    dots:true,
    autoplay: true,
});
});




$(document).ready(function () {

  $('.main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.thumbnail-slider'
  });

  $('.thumbnail-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: true,
    focusOnSelect: true,
    asNavFor: '.main-slider',
  });

});


const incrementBtn = document.querySelector('.quantity .plus');
const decrementBtn = document.querySelector('.quantity .minus');
const counter = document.querySelector('.qty');

function incrementNumber() {
    counter.textContent = Number(counter.textContent) + 1;
}

function decrementNumber() {
    const currentNumber = Number(counter.textContent);

    if (currentNumber > 1) {
        counter.textContent = currentNumber - 1;
    }
}

incrementBtn.addEventListener('click', incrementNumber);
decrementBtn.addEventListener('click', decrementNumber);








$(document).ready(function () {

    // 1. Product data
    const products = [
        {
            id: 1,
            name: "Green Capsicum",
            image: "./assets/img/capsicum.png",
            price: 14.99,
            oldPrice: 20.99,
            inStock: true
        },
        {
            id: 2,
            name: "Chinese Cabbage",
            image: "./assets/img/cabbage.png",
            price: 45.00,
            oldPrice: null,
            inStock: true
        },
        {
            id: 3,
            name: "Fresh Sujapuri Mango",
            image: "./assets/img/mango.png",
            price: 9.00,
            oldPrice: null,
            inStock: false
        }
    ];

    // Wishlist state
    let wishlist = [...products];

    // Demo cart state
    const cart = [];

    // 2. Render wishlist products
    function renderWishlist() {

        const $wishlistItems = $("#wishlistItems");
        $wishlistItems.empty();

        $("#emptyWishlist").prop("hidden", wishlist.length !== 0);

        wishlist.forEach(function (product) {

            const price = "$" + product.price.toFixed(2);

            const oldPrice = product.oldPrice !== null
                ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>`
                : "";

            const stockClass = product.inStock
                ? "in-stock"
                : "out-stock";

            const stockText = product.inStock
                ? "In Stock"
                : "Out of Stock";

            const buttonDisabled = product.inStock ? "" : "disabled";

            const row = `
                <div class="wishlist-item" data-id="${product.id}">

                    <div class="product-info">
                        <img src="${product.image}" alt="${product.name}">

                        <span class="product-name">
                            ${product.name}
                        </span>
                    </div>

                    <div class="product-price">
                        ${price} ${oldPrice}
                    </div>

                    <div>
                        <span class="stock-badge ${stockClass}">
                            ${stockText}
                        </span>
                    </div>

                    <div class="product-actions">
                        <button
                            type="button"
                            class="add-cart"
                            data-id="${product.id}"
                            ${buttonDisabled}>
                            Add to Cart
                        </button>

                        <button
                            type="button"
                            class="remove-item"
                            data-id="${product.id}"
                            aria-label="Remove ${product.name}">
                            &times;
                        </button>
                    </div>

                </div>
            `;

            $wishlistItems.append(row);
        });
    }

    // 3. Remove a product from wishlist
    $("#wishlistItems").on("click", ".remove-item", function () {

        const productId = Number($(this).attr("data-id"));

        wishlist = wishlist.filter(function (product) {
            return product.id !== productId;
        });

        renderWishlist();
    });

    // 4. Add a product to cart
    $("#wishlistItems").on("click", ".add-cart", function () {

        const productId = Number($(this).attr("data-id"));

        const product = wishlist.find(function (item) {
            return item.id === productId;
        });

        if (!product || !product.inStock) {
            return;
        }

        const alreadyInCart = cart.some(function (item) {
            return item.id === productId;
        });

        if (alreadyInCart) {
            $("#cartMessage").text(
                product.name + " is already in your demo cart."
            );
            return;
        }

        cart.push(product);

        $("#cartMessage").text(
            product.name + " added to your demo cart!"
        );

        console.log("Cart:", cart);
    });

    // Initial render
    renderWishlist();

});
