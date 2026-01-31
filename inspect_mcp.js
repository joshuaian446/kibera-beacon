import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
    const transport = new StdioClientTransport({
        command: "node",
        args: ["node_modules/@testsprite/testsprite-mcp/dist/index.js"]
    });

    const client = new Client({
        name: "test-client",
        version: "1.0.0"
    }, {
        capabilities: {}
    });

    await client.connect(transport);

    console.log("Connected. Listing tools...");
    const result = await client.listTools();
    console.log(JSON.stringify(result, null, 2));

    await client.close();
}

main().catch(console.error);
