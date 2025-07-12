import { config } from "dotenv";

// Load environment variables at application startup
config();

// Check for required environment variables
const NWS_API_BASE = process.env.NWS_API_BASE;
console.log("NWS_API_BASE:", NWS_API_BASE);

if (!NWS_API_BASE) {
	console.error("Missing required environment variable: NWS_API_BASE");
	process.exit(1);
}

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerWeatherTools } from "./server.js";

const server = new McpServer({
  name: "weather",
  version: "1.0.0",
  capabilities: {
	resources:{},
	tools:{}
  }
});

// Register weather tools
registerWeatherTools(server, NWS_API_BASE);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});