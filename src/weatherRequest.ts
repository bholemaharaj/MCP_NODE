import { AlertFeature } from "./weatherContracts.js";

// Helper function for making NWS API requests
export async function makeNWSRequest<T>(url: string, userAgent: string): Promise<T | null> {
	if (!userAgent) {
		console.error("Missing required parameter: userAgent");
		return null;
	}

	console.log("Making NWS request to:", url);
	const headers = {
		"User-Agent": userAgent,
		Accept: "application/geo+json",
	};

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return (await response.json()) as T;
	} catch (error) {
		console.error("Error making NWS request:", error);
		return null;
	}
}

// Format alert data
export function formatAlert(feature: AlertFeature): string {
	const props = feature.properties;
	return [
		`Event: ${props.event || "Unknown"}`,
		`Area: ${props.areaDesc || "Unknown"}`,
		`Severity: ${props.severity || "Unknown"}`,
		`Status: ${props.status || "Unknown"}`,
		`Headline: ${props.headline || "No headline"}`,
		"---",
	].join("\n");
}
