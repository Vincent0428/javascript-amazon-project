export const cart = [];

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
