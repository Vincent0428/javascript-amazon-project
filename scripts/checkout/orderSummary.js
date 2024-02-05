import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import {
	deliveryOptions,
	getDeliveryOption,
} from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
	let cartSummaryHTML = '';

	cart.forEach((cartItem) => {
		const productId = cartItem.productId;
		const matchingProduct = getProduct(productId);

		const deliverOptionId = cartItem.deliveryOptionId;
		const deliveryOption = getDeliveryOption(deliverOptionId);

		const today = dayjs();
		const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
		const dateString = deliveryDate.format('dddd, MMMM D');

		cartSummaryHTML += `
  <div class="cart-item-container ja-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${formatCurrency(matchingProduct.priceCents)}            
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${
							matchingProduct.id
						}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
	});

	function deliveryOptionsHTML(matchingProduct, cartItem) {
		let html = '';

		deliveryOptions.forEach((deliveryOption) => {
			const today = dayjs();
			const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
			const dateString = deliveryDate.format('dddd, MMMM D');

			const priceString =
				deliveryOption.priceCents === 0
					? 'FREE'
					: `$${(deliveryOption.priceCents / 100).toFixed(2)} -`;

			const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

			html += `
      <div class="delivery-option js-delivery-option" 
       data-delivery-option-id="${deliveryOption.id}"
			 data-product-id="${matchingProduct.id}">

        <input type="radio" ${
					isChecked ? 'checked' : ''
				} class="delivery-option-input" name="delivery-option-${
				matchingProduct.id
			}
		    ">

        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>    
    `;
		});

		return html;
	}

	document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

	document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
		link.addEventListener('click', () => {
			const productId = link.dataset.productId;
			removeFromCart(productId);
			const container = document.querySelector(
				`.ja-cart-item-container-${productId}`
			);
			container.remove();
			renderPaymentSummary();
		});
	});

	document.querySelectorAll('.js-delivery-option').forEach((option) => {
		option.addEventListener('click', () => {
			const { productId, deliveryOptionId } = option.dataset;
			updateDeliveryOption(productId, deliveryOptionId);
			renderOrderSummary();
			renderPaymentSummary();
		});
	});
}
