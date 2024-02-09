export let ordersItems = orderItemsLoadFromStorage();

function orderItemsLoadFromStorage() {
	let ordersItems = JSON.parse(localStorage.getItem('orderItems'));

	// 这里是说如果cart不存在，但[]即空的cart是存在的
	if (!ordersItems) {
		ordersItems = [
			{
				orderId: '5c37d3c8-1a8c-d605-2f8b-3164e2318ed5',
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptionId: '2',
			},
			{
				orderId: '5c37d3c8-1a8c-d605-2f8b-3164e2318ed5',
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptionId: '1',
			},
			{
				orderId: 'ccd441e0-da17-ae81-c039-fb66f2f98277',
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptionId: '2',
			},
			{
				orderId: 'ccd441e0-da17-ae81-c039-fb66f2f98277',
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptionId: '1',
			},
		];
	}
	return ordersItems;
}

function orderItemsSaveToStorage() {
	localStorage.setItem('orderItems', JSON.stringify(ordersItems));
}

export function addToOrderItems(orderId, cart) {
	cart.forEach((cartItem) => {
		ordersItems.push({
			orderId: orderId,
			productId: cartItem.productId,
			quantity: cartItem.quantity,
			deliveryOptionId: cartItem.deliveryOptionId,
		});
	});
	orderItemsSaveToStorage();
	cart = [];
}
