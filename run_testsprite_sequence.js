import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";
import path from "path";

const projectPath = process.cwd();
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.error("Error: API_KEY is required in environment variables.");
    process.exit(1);
}

async function startDevServer() {
    console.log("Starting dev server...");
    const devServer = spawn("npm", ["run", "dev"], {
        cwd: projectPath,
        shell: true,
        stdio: "pipe",
        env: { ...process.env, PORT: "5173" }
    });

    // Wait for server to be ready (naive wait)
    console.log("Waiting for server to be ready...");
    await new Promise(resolve => setTimeout(resolve, 10000));
    return devServer;
}

async function runMcpSequence() {
    let devServer;
    try {
        devServer = await startDevServer();

        console.log("Initializing MCP Client...");
        const transport = new StdioClientTransport({
            command: "node",
            args: ["node_modules/@testsprite/testsprite-mcp/dist/index.js"],
            env: { ...process.env, API_KEY: apiKey }
        });

        const client = new Client({
            name: "test-client",
            version: "1.0.0"
        }, {
            capabilities: {}
        });

        await client.connect(transport);
        console.log("Connected to MCP Server.");

        // Step 1: Bootstrap
        console.log("Calling testsprite_bootstrap...");
        const bootstrapResult = await client.callTool({
            name: "testsprite_bootstrap",
            arguments: {
                localPort: 5173,
                pathname: "",
                type: "frontend",
                projectPath: projectPath,
                testScope: "codebase"
            }
        });
        console.log("Bootstrap Result:", JSON.stringify(bootstrapResult, null, 2));

        // Step 2: Generate Test Plan
        console.log("Calling testsprite_generate_frontend_test_plan...");
        const planResult = await client.callTool({
            name: "testsprite_generate_frontend_test_plan",
            arguments: {
                projectPath: projectPath,
                needLogin: false
            }
        });
        console.log("Plan Generation Result:", JSON.stringify(planResult, null, 2));

        // Step 3: Execute Tests
        console.log("Calling testsprite_generate_code_and_execute...");
        const executeResult = await client.callTool({
            name: "testsprite_generate_code_and_execute",
            arguments: {
                projectName: "kibera-beacon",
                projectPath: projectPath,
                testIds: [],
                additionalInstruction: "Focus on verifying visual elements and navigation links."
            }
        });
        console.log("Execution Result:", JSON.stringify(executeResult, null, 2));

        await client.close();
    } catch (error) {
        console.error("Error running MCP sequence:", error);
    } finally {
        if (devServer) {
            console.log("Stopping dev server...");
            // On Windows, killing the npm process might not kill the child node process.
            // Using taskkill might be safer, but tree-kill usage is complex to import.
            // We'll try standard kill.
            devServer.kill();
        }
        process.exit(0);
    }
}

runMcpSequence();
