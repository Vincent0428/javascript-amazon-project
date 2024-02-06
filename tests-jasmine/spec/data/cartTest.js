import {
	addToCart,
	cart,
	loadFromStorage,
} from '../../../scripts/data/cart.js';

describe('test suite: addToCart', () => {
	it('adds an existing product to the cart', () => {
		spyOn(localStorage, 'setItem');

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([
				{
					productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
					quantity: 1,
					deliveryOptionId: '1',
				},
			]);
		});

		loadFromStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);
	});

	it('adds a new product to the cart', () => {
		//防止测试数据覆盖原有数据
		spyOn(localStorage, 'setItem');

		//仿一个localStrage.getItem() 返回一个空数组
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([]);
		});
		console.log(localStorage.getItem('cart'));
		loadFromStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(1);
		console.log(cart);
	});
});
