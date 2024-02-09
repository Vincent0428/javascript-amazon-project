import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// import dayjs from 'dayjs';

export function getdeliveryDate(deliveryDays) {
	const today = dayjs();
	const deliveryDate = today.add(deliveryDays, 'day');
	const dateString = deliveryDate.format('dddd, MMMM D');
	return dateString;
}

export function getDateObjectfromString(dateString) {
	return dayjs(dateString);
}

export function getDateStringfromDateObject(dateObject) {
	return dateObject.format('YYYY-MM-DD HH:mm:ss');
}


export const today = dayjs();
