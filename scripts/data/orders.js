import { v4 as uuid } from 'https://cdn.skypack.dev/uuid';
import { cart, reSetCart } from '../data/cart.js';
import { addToOrderItems } from '../data/ordersItems.js';
import { getDateStringfromDateObject, today } from '../utils/Date_time.js';



// import uuid from '../utils/UUID.js';

export let orders = ordersLoadFromStorage();

function ordersLoadFromStorage() {
	let orders = JSON.parse(localStorage.getItem('orders'));

	// 这里是说如果cart不存在，但[]即空的cart是存在的
	if (!orders) {
		orders = [
			{
				orderId: '5c37d3c8-1a8c-d605-2f8b-3164e2318ed5',
				orderDate: '2024-02-05',
			},
			{
				orderId: 'ccd441e0-da17-ae81-c039-fb66f2f98277',
				orderDate: '2024-02-06',
			},
		];
	}
	return orders;
}

function orderSaveToStorage() {
	localStorage.setItem('orders', JSON.stringify(orders));
}

export function placeOrder() {
	if (cart.length === 0 || cart === null) {
		return; // 如果 cart 为空，则直接返回，不执行后续操作
	}
	orders.push({
		orderId: uuid(),
		orderDate: getDateStringfromDateObject(today),
	});
	orderSaveToStorage();
	addToOrderItems(orders[orders.length - 1].orderId, cart);
	reSetCart([]);
}
