import * as path from "path"
import * as fs from "fs"
import execa from "execa"
import { BenchmarkAdapter, Task, VerificationResult } from "./types"

const EVALS_DIR = path.resolve(__dirname, "../../../")

/**
 * Dummy adapter for the SWELancer benchmark
 */
export class SWELancerAdapter implements BenchmarkAdapter {
	name = "swelancer"

	/**
	 * Set up the SWELancer benchmark repository (dummy implementation)
	 */
	async setup(): Promise<void> {
		console.log("SWELancer dummy setup completed")

		// Create repositories directory if it doesn't exist
		const repoDir = path.join(EVALS_DIR, "repositories", "swelancer")
		if (!fs.existsSync(repoDir)) {
			fs.mkdirSync(repoDir, { recursive: true })
			console.log(`Created dummy SWELancer directory at ${repoDir}`)
		}
	}

	/**
	 * List all available tasks in the SWELancer benchmark (dummy implementation)
	 */
	async listTasks(): Promise<Task[]> {
		return [
			{
				id: "swelancer-task-1",
				name: "Create Landing Page",
				description: "使用HTML，CSS和JavaScript为新产品创建响应式着陆页.",
				workspacePath: path.join(EVALS_DIR, "repositories", "swelancer"),
				setupCommands: [],
				verificationCommands: [],
				metadata: {
					client: "TechStartup Inc.",
					difficulty: "medium",
					type: "swelancer",
				},
			},
			{
				id: "swelancer-task-2",
				name: "Build REST API",
				description: "使用node.js为博客应用程序创建一个安息的API并Express.",
				workspacePath: path.join(EVALS_DIR, "repositories", "swelancer"),
				setupCommands: [],
				verificationCommands: [],
				metadata: {
					client: "BlogCo",
					difficulty: "hard",
					type: "swelancer",
				},
			},
			{
				id: "swelancer-task-3",
				name: "Fix CSS Layout Issues",
				description: "在响应迅速的网站上解决不同屏幕尺寸的布局问题.",
				workspacePath: path.join(EVALS_DIR, "repositories", "swelancer"),
				setupCommands: [],
				verificationCommands: [],
				metadata: {
					client: "DesignAgency",
					difficulty: "easy",
					type: "swelancer",
				},
			},
		]
	}

	/**
	 * Prepare a specific task for execution (dummy implementation)
	 * @param taskId The ID of the task to prepare
	 */
	async prepareTask(taskId: string): Promise<Task> {
		const tasks = await this.listTasks()
		const task = tasks.find((t) => t.id === taskId)

		if (!task) {
			throw new Error(`Task ${taskId} not found`)
		}

		// Create a dummy workspace for the task
		const taskDir = path.join(task.workspacePath, taskId)
		if (!fs.existsSync(taskDir)) {
			fs.mkdirSync(taskDir, { recursive: true })

			// Create a dummy file for the task
			fs.writeFileSync(
				path.join(taskDir, "README.md"),
				`# ${task.name}\n\n${task.description}\n\nThis is a dummy task for testing purposes.`,
			)

			// Create additional dummy files based on task type
			if (task.id === "swelancer-task-1") {
				fs.writeFileSync(
					path.join(taskDir, "index.html"),
					`<!DOCTYPE html>\n<html>\n<head>\n  <title>Landing Page</title>\n</head>\n<body>\n  <!-- TODO: Implement landing page -->\n</body>\n</html>`,
				)
			} else if (task.id === "swelancer-task-2") {
				fs.writeFileSync(
					path.join(taskDir, "server.js"),
					`// TODO: Implement REST API\nconsole.log('Server starting...');`,
				)
			} else if (task.id === "swelancer-task-3") {
				fs.writeFileSync(
					path.join(taskDir, "styles.css"),
					`/* TODO: Fix layout issues */\nbody {\n  margin: 0;\n  padding: 0;\n}`,
				)
			}
		}

		// Update the task's workspace path to the task-specific directory
		return {
			...task,
			workspacePath: taskDir,
		}
	}

	/**
	 * Verify the result of a task execution (dummy implementation)
	 * @param task The task that was executed
	 * @param result The result of the task execution
	 */
	async verifyResult(task: Task, result: any): Promise<VerificationResult> {
		// Always return success for dummy implementation
		return {
			success: true,
			metrics: {
				testsPassed: 1,
				testsFailed: 0,
				testsTotal: 1,
				functionalCorrectness: 1.0,
				clientSatisfaction: 0.95, // Dummy metric specific to SWELancer
				timeEfficiency: 0.85, // Dummy metric specific to SWELancer
			},
		}
	}
}
