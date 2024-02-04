export let cart = [
	{
		productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
		quantity: 3,
	},
	{
		productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
		quantity: 2,
	},
];

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
		});
	}
}


export function removeFromCart(productId) {
	cart = cart.filter((product) => product.productId !== productId);
}
