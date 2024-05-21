export function extractIdFromUrl(url: string): string | null {
	// Regular expression to match the ID in the URL
	const regex = /\/(\d+)\/$/;
	// Use regex.exec() to extract the ID
	const match = regex.exec(url);
	// If a match is found, return the ID as a string
	if (match && match[1]) {
		return String(match[1]);
	} else {
		// If no match is found, return null or handle the error as needed
		return null;
	}
}
