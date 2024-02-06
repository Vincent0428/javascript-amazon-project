import { formatCurrency } from '../../scripts/utils/money.js';

// console.log('test suite: formatCurrency')
// console.log('converts cents into dollars')
// if (formatCurrency(2095) === '$20.95') {
//   console.log('passed');
// } else {
//   console.log('failed');
// }
// console.log('work with 0');
// if (formatCurrency(0) === '$0.00') {
// 	console.log('passed');
// } else {
// 	console.log('failed');
// }
// console.log('work with 2000.5');
// if (formatCurrency(2000.5) === '$20.01') {
// 	console.log('passed');
// } else {
// 	console.log('failed');
// }
// console.log('work with 2000.4');
// if (formatCurrency(2000.4) === '$20.00') {
// 	console.log('passed');
// } else {
// 	console.log('failed');
// }

describe('test suite: formatCurrency',() => {
	it('converts cents into dollars', () => {
		expect(formatCurrency(2095)).toBe('$20.95');
	})
	it('work with 0', () => {
		expect(formatCurrency(0)).toBe('$0.00');
	})
	it('rounds up to the nearest cent work with 2000.5', () => {
		expect(formatCurrency(2000.5)).toBe('$20.01');
	})
	it('rounds up to the nearest cent work with 2000.4', () => {
		expect(formatCurrency(2000.4)).toBe('$20.00');
	});
})