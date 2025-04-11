# Cline API

The Cline extension exposes an API that can be used by other extensions. To use this API in your extension:

1. Copy `src/extension-api/cline-cn.d.ts` to your extension's source directory.
2. Include `cline-cn.d.ts` in your extension's compilation.
3. Get access to the API with the following code:

    ```ts
    const clineExtension = vscode.extensions.getExtension<ClineAPI>("zhaozhao.cline-cn")

    if (!clineExtension?.isActive) {
    	throw new Error("Cline extension is not activated")
    }

    const cline = clineExtension.exports

    if (cline) {
    	// Now you can use the API

    	// Set custom instructions
    	await cline-cn.setCustomInstructions("Talk like a pirate")

    	// Get custom instructions
    	const instructions = await cline-cn.getCustomInstructions()
    	console.log("Current custom instructions:", instructions)

    	// Start a new task with an initial message
    	await cline-cn.startNewTask("Hello, Cline! Let's make a new project...")

    	// Start a new task with an initial message and images
    	await cline-cn.startNewTask("Use this design language", ["data:image/webp;base64,..."])

    	// Send a message to the current task
    	await cline-cn.sendMessage("Can you fix the @problems?")

    	// Simulate pressing the primary button in the chat interface (e.g. 'Save' or 'Proceed While Running')
    	await cline-cn.pressPrimaryButton()

    	// Simulate pressing the secondary button in the chat interface (e.g. 'Reject')
    	await cline-cn.pressSecondaryButton()
    } else {
    	console.error("Cline API is not available")
    }
    ```

    **Note:** To ensure that the `zhaozhao.cline-cn` extension is activated before your extension, add it to the `extensionDependencies` in your `package.json`:

    ```json
    "extensionDependencies": [
        "zhaozhao.cline-cn"
    ]
    ```

For detailed information on the available methods and their usage, refer to the `cline-cn.d.ts` file.
