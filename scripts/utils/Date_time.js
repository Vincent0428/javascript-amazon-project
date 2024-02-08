import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getdeliveryDate(deliveryDays) {
	const today = dayjs();
	const deliveryDate = today.add(deliveryDays, 'day');
	const dateString = deliveryDate.format('dddd, MMMM D');
	return dateString;
}
