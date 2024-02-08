export let cart = cartLoadFromStorage();

function cartLoadFromStorage() {
	let cart = JSON.parse(localStorage.getItem('cart'));

	// 这里是说如果cart不存在，但[]即空的cart是存在的
	if (!cart) {
		cart = [
			{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptionId: '2',
			},
			{
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptionId: '1',
			},
		];
	}
	return cart;
}

export function getCart() {
	return cart;
}

export function reSetCart(newCart) {
	cart = newCart;
	cartSaveToStorage();
}

function cartSaveToStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
	let productExists = false;

	cart.forEach((cartItem) => {
		if (cartItem.productId === productId) {
			cartItem.quantity++;
			productExists = true;
		}
	});

	if (!productExists) {
		cart.push({
			productId: productId,
			quantity: 1,
			deliveryOptionId: '1',
		});
	}
	cartSaveToStorage();
}

export function removeFromCart(productId) {
	cart = cart.filter((product) => product.productId !== productId);
	cartSaveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
	let matchingItem = cart.find((cartitem) => cartitem.productId === productId);
	matchingItem.deliveryOptionId = deliveryOptionId;

	cartSaveToStorage();
}
