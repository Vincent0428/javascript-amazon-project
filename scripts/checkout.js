import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { cart } from './data/cart.js';

export function updateItemNumber() {
	if (cart.length > 1) {
		document.querySelector('.js-checkout-header-middle-section').innerHTML = `
  Checkout (<a class="return-to-home-link" href="amazon.html">${cart.length} items</a
					>)
  `;
	} else {
		document.querySelector('.js-checkout-header-middle-section').innerHTML = `
  Checkout (<a class="return-to-home-link" href="amazon.html">${cart.length} item</a
					>)
  `;
	}
}

updateItemNumber();
renderOrderSummary();
renderPaymentSummary();
