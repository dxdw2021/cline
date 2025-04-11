import { Anthropic } from "@anthropic-ai/sdk"
import * as diff from "diff"
import * as path from "path"
import { ClineIgnoreController, LOCK_TEXT_SYMBOL } from "../ignore/ClineIgnoreController"

export const formatResponse = {
	duplicateFileReadNotice: () =>
		`[[NOTE] 此文件已读取已删除以在上下文窗口中保存空间。有关此文件的最新版本，请参阅最新文件。]`,

	contextTruncationNotice: () =>
		`[NOTE] 与用户的一些以前的对话历史记录已被删除，以保持最佳上下文窗口长度。最初的用户任务和最新的交流已保留以进行连续性，而中间对话历史记录已被删除。在继续协助用户时，请记住这一点。`,

	toolDenied: () => `用户拒绝了此操作。`,

	toolError: (error?: string) => `工具执行失败，但有以下错误：\n<error>\n${error}\n</error>`,

	clineIgnoreError: (path: string) =>
		`访问 ${path} 由.clineignore文件设置阻止。您必须尝试在不使用此文件的情况下继续执行任务，或要求用户更新.clineignore文件。`,

	noToolsUsed: () =>
		`[错误] 您没有在先前的回复中使用工具！请用工具使用重试。

${toolUseInstructionsReminder}

# Next Steps

如果您已经完成了用户的任务，请使用over_completion工具。
如果您需要用户的其他信息，请使用ask_followup_question工具。
否则，如果您尚未完成任务并且不需要其他信息，请继续执行任务的下一步。
(这是一个自动消息，因此请勿在对话中对其进行响应。)`,

	tooManyMistakes: (feedback?: string) =>
		`您似乎在继续前进。用户提供了以下反馈，以帮助您指导您：\n<feedback>\n${feedback}\n</feedback>`,

	missingToolParameterError: (paramName: string) =>
		`所需参数的缺少值'${paramName}'. 请完全回复.\n\n${toolUseInstructionsReminder}`,

	invalidMcpToolArgumentError: (serverName: string, toolName: string) =>
		`使用无效的JSON参数${serverName} for ${toolName}. 请以适当格式的JSON论证重试.`,

	toolResult: (text: string, images?: string[]): string | Array<Anthropic.TextBlockParam | Anthropic.ImageBlockParam> => {
		if (images && images.length > 0) {
			const textBlock: Anthropic.TextBlockParam = { type: "text", text }
			const imageBlocks: Anthropic.ImageBlockParam[] = formatImagesIntoBlocks(images)
			// Placing images after text leads to better results
			return [textBlock, ...imageBlocks]
		} else {
			return text
		}
	},

	imageBlocks: (images?: string[]): Anthropic.ImageBlockParam[] => {
		return formatImagesIntoBlocks(images)
	},

	formatFilesList: (
		absolutePath: string,
		files: string[],
		didHitLimit: boolean,
		clineIgnoreController?: ClineIgnoreController,
	): string => {
		const sorted = files
			.map((file) => {
				// 将绝对路径转换为相对路径
				const relativePath = path.relative(absolutePath, file).toPosix()
				return file.endsWith("/") ? relativePath + "/" : relativePath
			})
			// 排序以便在其各自目录下列出文件，以清楚哪些目录的孩子是哪些文件。由于我们可以自上而下地构建文件列表，即使文件列表被截断，它也会显示Cline可以进一步探索的目录。
			.sort((a, b) => {
				const aParts = a.split("/") //仅当我们首先使用toposix时才有效
				const bParts = b.split("/")
				for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
					if (aParts[i] !== bParts[i]) {
						// 如果一个是目录，另一个不是该级别，请先对目录进行排序
						if (i + 1 === aParts.length && i + 1 < bParts.length) {
							return -1
						}
						if (i + 1 === bParts.length && i + 1 < aParts.length) {
							return 1
						}
						// 否则，按字母顺序排序
						return aParts[i].localeCompare(bParts[i], undefined, {
							numeric: true,
							sensitivity: "base",
						})
					}
				}
				//如果所有零件都相同，直到较短路径的长度，
				//较短的一个
				return aParts.length - bParts.length
			})

		const clineIgnoreParsed = clineIgnoreController
			? sorted.map((filePath) => {
				// 路径相对于绝对路径，而不是CWD
				// valataccess期望相对于CWD或绝对路径的路径
				// 否则，为了验证忽略诸如“资产/图标”之类的模式，我们最终将以“图标”为例，这将导致路径不被忽略。
				const absoluteFilePath = path.resolve(absolutePath, filePath)
				const isIgnored = !clineIgnoreController.validateAccess(absoluteFilePath)
				if (isIgnored) {
					return LOCK_TEXT_SYMBOL + " " + filePath
				}

				return filePath
			})
			: sorted

		if (didHitLimit) {
			return `${clineIgnoreParsed.join(
				"\n",
			)}\n\n(文件列表被截断。如果需要进一步探索，请在特定子目录上使用List_files.)`
		} else if (clineIgnoreParsed.length === 0 || (clineIgnoreParsed.length === 1 && clineIgnoreParsed[0] === "")) {
			return "No files found."
		} else {
			return clineIgnoreParsed.join("\n")
		}
	},

	createPrettyPatch: (filename = "file", oldStr?: string, newStr?: string) => {
		// strings cannot be undefined or diff throws exception
		const patch = diff.createPatch(filename.toPosix(), oldStr || "", newStr || "")
		const lines = patch.split("\n")
		const prettyPatchLines = lines.slice(4)
		return prettyPatchLines.join("\n")
	},

	taskResumption: (
		mode: "plan" | "act",
		agoText: string,
		cwd: string,
		wasRecent: boolean | 0 | undefined,
		responseText?: string,
	): [string, string] => {
		const taskResumptionMessage = `[TASK RESUMPTION] ${mode === "plan"
			? `这个任务被打断了 ${agoText}。对话可能是不完整的。请注意，从那时起，项目状态可能已经改变。当前的工作目录现在为'$ {cwd.toposix（）}'.\n\n注意：如果您以前尝试使用用户没有提供结果的工具，则应假设工具使用不成功。但是，您处于计划模式，因此您不必继续任务，而必须响应用户的消息。`
			: `这个任务被打断了 ${agoText}。它可能完成也可能不完整，因此请重新评估任务上下文。请注意，从那时起，项目状态可能已经改变。当前的工作目录现在是'${cwd.toPosix()}'。如果任务尚未完成，请在中断之前重试最后一步，然后继续完成任务。\n\n注意：如果您以前尝试使用用户没有提供结果的工具使用，则应假定工具使用不成功，并评估是否应该重试。如果最后一个工具是浏览器_action，则浏览器已关闭，并且必须在需要时启动新浏览器。`
			}${wasRecent
				? "\n\n重要的是：如果最后一个工具使用是中断的替换_in_file或write_to_file，则文件在中断编辑之前将文件恢复回原始状态，并且您无需重新阅读该文件，因为您已经拥有其最新内容。"
				: ""
			}`

		const userResponseMessage = `${responseText
			? `${mode === "plan" ? "使用Plan_mode_respond工具响应的新消息（请确保在<响应>参数中提供您的响应）" : "任务继续的新说明"}:\n<user_message>\n${responseText}\n</user_message>`
			: mode === "plan"
				? "(用户没有提供新的消息。考虑询问他们希望您如何进行，或者切换到ACT模式以继续执行任务。)"
				: ""
			}`

		return [taskResumptionMessage, userResponseMessage]
	},

	planModeInstructions: () => {
		return `在这种模式下，您应该专注于信息收集，提出问题和构建解决方案。有了计划后，请使用plan_mode_respond工具与用户来回进行对话。在收集所有需要的信息之前，请勿使用plan_mode_respond工具，例如使用read_file或ask_followup_question。
(
请记住：如果用户似乎希望您仅在ACT模式下使用工具，则应要求用户“切换到ACT模式”（使用这些单词） -他们将不得不使用下面的计划/ACT切换按钮手动执行此操作。您没有能力自己切换到ACT模式，并且必须等待用户对计划感到满意后自己进行操作。您也不能提供切换以进行ACT模式的选项，因为这将是您指导用户手动执行自己的操作。）`
	},

	fileEditWithUserChanges: (
		relPath: string,
		userEdits: string,
		autoFormattingEdits: string | undefined,
		finalContent: string | undefined,
		newProblemsMessage: string | undefined,
	) =>
		`用户对您的内容进行了以下更新：\n\n${userEdits}\n\n` +
		(autoFormattingEdits
			? `用户的编辑器还将以下自动形式应用于您的内容：\n\n${autoFormattingEdits}\n\n(注意：请密切注意更改，例如将单引号转换为双引号，被删除或添加的分号，分为多行分为多行，调整凹痕样式，添加/删除尾随逗号等。这将有助于您确保您的未来搜索/更换此文件的搜索/替换操作是准确的。)\n\n`
			: "") +
		`更新的内容包括您的原始修改和其他编辑，已成功保存到 ${relPath.toPosix()}。这是已保存的文件的完整，更新的内容：\n\n` +
		`<final_file_content path="${relPath.toPosix()}">\n${finalContent}\n</final_file_content>\n\n` +
		`请注意：\n` +
		`1. 您不需要通过已应用这些更改来重写文件。\n` +
		`2. 使用此更新的文件内容作为新的基线继续执行任务。\n` +
		`3. 如果用户的编辑已经解决了任务的一部分或更改了要求，请相应地调整您的方法。` +
		`4.重要的是：对于此文件的任何将来更改，请使用上面显示的Final_file_content作为您的参考。该内容反映了文件的当前状态，包括用户编辑和任何自动形式的词（例如，如果您使用了单个引号，但格式化了它们将其转换为双引号）。始终基于此最终版本的搜索/替换操作，以确保准确性。\n` +
		`${newProblemsMessage}`,

	fileEditWithoutUserChanges: (
		relPath: string,
		autoFormattingEdits: string | undefined,
		finalContent: string | undefined,
		newProblemsMessage: string | undefined,
	) =>
		`内容成功保存到 ${relPath.toPosix()}.\n\n` +
		(autoFormattingEdits
			? `与您的编辑一起，用户的编辑器将以下自动形式应用于您的内容：\n\n${autoFormattingEdits}\n\n(注意：请密切注意更改，例如将单引号转换为双引号，被删除或添加的半句号，将长行分为多行，调整凹痕样式，添加/删除尾随的逗号等。这将帮助您确保您的未来搜索/更换此文件的未来搜索/替换操作是准确的。）\n\n`
			: "") +
		`这是已保存的文件的完整，更新的内容：\n\n` +
		`<final_file_content path="${relPath.toPosix()}">\n${finalContent}\n</final_file_content>\n\n` +
		`重要的是：对于此文件的任何将来更改，请使用上面显示的Final_file_content作为您的参考。该内容反映了文件的当前状态，包括任何自动形式的词（例如，如果您使用了单个引号，但格式化器将其转换为双引号）。始终基于此最终版本的搜索/替换操作，以确保准确性。\n\n` +
		`${newProblemsMessage}`,

	diffError: (relPath: string, originalContent: string | undefined) =>
		`这可能是因为搜索块内容与文件中的内容不完全匹配，或者如果您使用了多个搜索/替换块，则可能没有按照它们显示在文件中的顺序。\n\n` +
		`The file was reverted to its original state:\n\n` +
		`<file_content path="${relPath.toPosix()}">\n${originalContent}\n</file_content>\n\n` +
		`现在您已经有了文件的最新状态，可以使用更少/更精确的搜索块再次尝试操作。尽可能有效地更换_in_file）`,

	toolAlreadyUsed: (toolName: string) =>
		`工具 [${toolName}] 之所以没有执行，是因为在此消息中已经使用了工具。每个消息只能使用一个工具。在继续使用下一个工具之前，您必须评估第一个工具的结果。`,

	clineIgnoreInstructions: (content: string) =>
		`# .Clineignore\n\n(以下内容由root级.clineignore文件提供，其中用户指定了不应访问的文件和目录。使用list_files时，您会注意到${LOCK_TEXT_SYMBOL}在被阻止的文件旁边。尝试访问文件的内容，例如通过read_file将导致错误。）\n\n${content}\n.Clineignore`,

	clineRulesDirectoryInstructions: (cwd: string, content: string) =>
		`# .临床/\n\n以下由用户指定此工作目录指定说明的根级别.clinerules/目录提供了以下内容 (${cwd.toPosix()})\n\n${content}`,

	clineRulesFileInstructions: (cwd: string, content: string) =>
		`# .临床\n\n以下由root级.clinerules文件提供(${cwd.toPosix()})\n\n${content}`,
}

// to avoid circular dependency
const formatImagesIntoBlocks = (images?: string[]): Anthropic.ImageBlockParam[] => {
	return images
		? images.map((dataUrl) => {
			// data:image/png;base64,base64string
			const [rest, base64] = dataUrl.split(",")
			const mimeType = rest.split(":")[1].split(";")[0]
			return {
				type: "image",
				source: {
					type: "base64",
					media_type: mimeType,
					data: base64,
				},
			} as Anthropic.ImageBlockParam
		})
		: []
}

const toolUseInstructionsReminder = `# 提醒：工具使用说明

使用XML风格的标签格式化工具使用。该工具名称封闭在打开和关闭标签中，每个参数类似地包含在其自己的标签集中。这是结构:

<tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</tool_name>

For example:

<attempt_completion>
<result>
I have completed the task...
</result>
</attempt_completion>

始终遵守所有工具用途的格式，以确保正确解析和执行。`
