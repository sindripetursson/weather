/* 
Used to display dates on an user-friendly format
Example: SUNDAY, 19. NOVEMBER 2023 / Shortform: SUN, 19. NOV
 */
export const formatDate = (dateInput, shortForm = false) => {
	const days = [
		"SUNDAY",
		"MONDAY",
		"TUESDAY",
		"WEDNESDAY",
		"THURSDAY",
		"FRIDAY",
		"SATURDAY",
	];
	const months = [
		"JANUARY",
		"FEBRUARY",
		"MARCH",
		"APRIL",
		"MAY",
		"JUNE",
		"JULY",
		"AUGUST",
		"SEPTEMBER",
		"OCTOBER",
		"NOVEMBER",
		"DECEMBER",
	];

	const date =
		typeof dateInput === "number" ? new Date(dateInput * 1000) : dateInput;

	const dayOfWeek = shortForm
		? days[date.getDay()].slice(0, 3)
		: days[date.getDay()];
	const month = shortForm
		? months[date.getMonth()].slice(0, 3)
		: months[date.getMonth()];
	const dayOfMonth = date.getDate();
	const year = date.getFullYear();

	return shortForm
		? `${dayOfWeek}, ${dayOfMonth}. ${month}`
		: `${dayOfWeek}, ${dayOfMonth}. ${month} ${year}`;
};
