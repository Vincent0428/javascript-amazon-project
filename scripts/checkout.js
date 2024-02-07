import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { cart } from './data/cart.js';

export function updateItems() {
	document.querySelector('.js-checkout-header-middle-section').innerHTML = `
  Checkout (<a class="return-to-home-link" href="amazon.html">${cart.length} items</a
					>)
  `;
}

updateItems();

renderOrderSummary();
renderPaymentSummary();
