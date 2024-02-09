import { addToCart, updateCartQuantity } from './data/cart.js';
import { getDeliveryOption } from './data/deliveryOptions.js';
import { orders } from './data/orders.js';
import { ordersItems } from './data/ordersItems.js';
import { getProduct } from './data/products.js';
import { getdeliveryDate } from './utils/Date_time.js';
import { formatCurrency } from './utils/money.js';

updateCartQuantity();
renderPlacedOrders();

function renderPlacedOrders() {
	let ordersHTML = '';

	orders.forEach((order) => {
		const orderId = order.orderId;
		const orderDate = order.orderDate;
		let orderItems = ordersItems.filter(
			(orderItem) => orderItem.orderId === orderId
		);

		ordersHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${formatCurrency(orderTotal(orderItems))}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">       
            ${orderItemsHTML(orderItems)}
          </div>
        </div>
    `;
	});

	document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

function orderItemsHTML(orderItems) {
	let orderItemsHTML = '';

	orderItems.forEach((orderItem) => {
		const quantity = orderItem.quantity;
		const productId = orderItem.productId;
		const matchingProduct = getProduct(productId);

		const deliverOptionId = orderItem.deliveryOptionId;
		const deliveryOption = getDeliveryOption(deliverOptionId);
		const deliveryDate = getdeliveryDate(deliveryOption.deliveryDays);

		orderItemsHTML += `
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${deliveryDate}
              </div>
              <div class="product-quantity">
                Quantity: ${quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
    `;
	});
	return orderItemsHTML;
}

function orderTotal(orderItems) {
	let productPriceCents = 0;
	let shippingPriceCents = 0;

	orderItems.forEach((orderItem) => {
		const product = getProduct(orderItem.productId);
		productPriceCents += product.priceCents * orderItem.quantity;

		const deliveryOption = getDeliveryOption(orderItem.deliveryOptionId);
		shippingPriceCents += deliveryOption.priceCents;
	});

	const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
	const taxCents = totalBeforeTaxCents * 0.1;
	const totalCents = totalBeforeTaxCents + taxCents;

	return totalCents;
}

const addToCartButtons = document.querySelectorAll('.js-buy-again-button');
addToCartButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const productId = button.dataset.productId;
		addToCart(productId);
		updateCartQuantity();
	});
});
