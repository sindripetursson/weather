/* Get local time based on timezone */
export function getLocalTimeForTimezone(timeZoneOffsetInSeconds) {
	const now = new Date();
	const localTimeOffset = now.getTimezoneOffset() * 60;
	const utcTime = now.getTime() + localTimeOffset * 1000;
	const targetTime = new Date(utcTime + timeZoneOffsetInSeconds * 1000);

	// HH:MM Format
	return targetTime.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
}
