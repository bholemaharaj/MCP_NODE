import { config } from "dotenv";
import { resolve } from "path";
// Load environment variables at application startup
const dotenvPath = resolve(process.cwd(), '.env');
console.error("Looking for .env file at:", dotenvPath);
const result = config({ path: dotenvPath });
if (result.error) {
    console.error("Error loading .env file:", result.error);
}
else {
    console.error("Successfully loaded .env file");
    console.error("Loaded variables:", Object.keys(result.parsed || {}));
}
// Check for required environment variables
const NWS_API_BASE = process.env.NWS_API_BASE;
const USER_AGENT = process.env.USER_AGENT;
console.error("NWS_API_BASE:", NWS_API_BASE);
console.error("USER_AGENT:", USER_AGENT);
if (!NWS_API_BASE) {
    console.error("Missing required environment variable: NWS_API_BASE");
    process.exit(1);
}
if (!USER_AGENT) {
    console.error("Missing required environment variable: USER_AGENT");
    process.exit(1);
}
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerWeatherTools } from "./server.js";
const server = new McpServer({
    name: "weather",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {}
    }
});
// Register weather tools
registerWeatherTools(server, NWS_API_BASE, USER_AGENT);
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
