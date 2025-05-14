import { VSCodeCheckbox, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { useCallback, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { AutoApprovalSettings } from "@shared/AutoApprovalSettings"
import { CODE_BLOCK_BG_COLOR } from "@/components/common/CodeBlock"
import { vscode } from "@/utils/vscode"
import { getAsVar, VSC_FOREGROUND, VSC_TITLEBAR_INACTIVE_FOREGROUND, VSC_DESCRIPTION_FOREGROUND } from "@/utils/vscStyles"
import { useClickAway } from "react-use"

interface AutoApproveMenuProps {
	style?: React.CSSProperties
}

const SubOptionAnimateIn = styled.div<{ show: boolean }>`
	max-height: ${(props) => (props.show ? "100px" : "0")};
	opacity: ${(props) => (props.show ? "1" : "0")};
	overflow: hidden;
	transition:
		max-height 0.2s ease-in-out,
		opacity 0.2s ease-in-out;
`

const ACTION_METADATA: {
	id: keyof AutoApprovalSettings["actions"]
	label: string
	shortName: string
	description: string
}[] = [
	{
		id: "readFiles",
		label: "读取文件和目录",
		shortName: "读取",
		description: "允许访问读取您电脑上的任何文件。",
	},
	{
		id: "editFiles",
		label: "编辑文件",
		shortName: "编辑",
		description: "允许修改您电脑上的任何文件。",
	},
	{
		id: "executeSafeCommands",
		label: "执行安全命令",
		shortName: "安全的命令",
		description: "允许执行安全的终端命令。如果模型认为命令可能具有破坏性，仍需要批准。",
	},
	{
		id: "executeAllCommands",
		label: "执行所有命令",
		shortName: "所有命令",
		description: "允许执行所有终端命令。自行使用。",
	},
	{
		id: "useBrowser",
		label: "使用浏览器",
		shortName: "浏览器",
		description: "允许在无头浏览器中启动并与任何网站交互。",
	},
	{
		id: "useMcp",
		label: "使用MCP服务器",
		shortName: "MCP服务器",
		description: "允许使用配置的MCP服务器，这些服务器可能会修改文件系统或与API交互。",
	},
]

const AutoApproveMenu = ({ style }: AutoApproveMenuProps) => {
	const { autoApprovalSettings } = useExtensionState()
	const [isExpanded, setIsExpanded] = useState(false)
	const [isHoveringCollapsibleSection, setIsHoveringCollapsibleSection] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	// Careful not to use partials to mutate since spread operator only does shallow copy

	const enabledActions = ACTION_METADATA.filter((action) => autoApprovalSettings.actions[action.id])
	const enabledActionsList = useMemo(() => {
		// When nested auto-approve options are used, display the more permissive one (file reads, edits, and commands)
		const readFilesEnabled = enabledActions.some((action) => action.id === "readFiles")
		const readFilesExternallyEnabled = enabledActions.some((action) => action.id === "readFilesExternally")

		const editFilesEnabled = enabledActions.some((action) => action.id === "editFiles")
		const editFilesExternallyEnabled = enabledActions.some((action) => action.id === "editFilesExternally") ?? false

		const safeCommandsEnabled = enabledActions.some((action) => action.id === "executeSafeCommands")
		const allCommandsEnabled = enabledActions.some((action) => action.id === "executeAllCommands") ?? false
		// Filter out the potentially nested options so we don't display them twice
		const otherActions = enabledActions
			.filter(
				(action) =>
					action.id !== "readFiles" &&
					action.id !== "readFilesExternally" &&
					action.id !== "editFiles" &&
					action.id !== "editFilesExternally" &&
					action.id !== "executeSafeCommands" &&
					action.id !== "executeAllCommands",
			)
			.map((action) => action.shortName)

		const labels = []

		// Handle read editing labels
		if ((readFilesExternallyEnabled ?? false) && readFilesEnabled) {
			labels.push("阅读（全部）")
		} else if (readFilesEnabled) {
			labels.push("读")
		}

		// Handle file editing labels
		if ((editFilesExternallyEnabled ?? false) && editFilesEnabled) {
			labels.push("编辑（全部）")
		} else if (editFilesEnabled) {
			labels.push("编辑")
		}

		// Handle command execution labels
		if ((allCommandsEnabled ?? false) && safeCommandsEnabled) {
			labels.push("所有命令")
		} else if (safeCommandsEnabled) {
			labels.push("安全命令")
		}

		// Add remaining actions
		return [...labels, ...otherActions].join(", ")
	}, [enabledActions])

	// This value is used to determine if the auto-approve menu should show 'Auto-approve: None'
	// Note: we should use better logic to determine the state where no auto approve actions are in effect, regardless of the state of sub-auto-approve options
	const hasEnabledActions = useMemo(() => {
		let enabledActionsCount = enabledActions.length

		if (!autoApprovalSettings.actions.readFiles && autoApprovalSettings.actions.readFilesExternally) {
			enabledActionsCount--
		}

		if (!autoApprovalSettings.actions.editFiles && autoApprovalSettings.actions.editFilesExternally) {
			enabledActionsCount--
		}

		if (!autoApprovalSettings.actions.executeSafeCommands && autoApprovalSettings.actions.executeAllCommands) {
			enabledActionsCount--
		}

		return enabledActionsCount > 0
	}, [enabledActions, autoApprovalSettings.actions])

	// Get the full extension state to ensure we have the most up-to-date settings
	const extensionState = useExtensionState()

	const updateEnabled = useCallback(
		(enabled: boolean) => {
			const currentSettings = extensionState.autoApprovalSettings
			vscode.postMessage({
				type: "autoApprovalSettings",
				autoApprovalSettings: {
					...currentSettings,
					version: (currentSettings.version ?? 1) + 1,
					enabled,
				},
			})
		},
		[extensionState.autoApprovalSettings],
	)

	const updateAction = useCallback(
		(actionId: keyof AutoApprovalSettings["actions"], value: boolean) => {
			const currentSettings = extensionState.autoApprovalSettings
			// Calculate what the new actions state will be
			const newActions = {
				...currentSettings.actions,
				[actionId]: value,
			}

			// Check if this will result in any enabled actions
			const willHaveEnabledActions = Object.values(newActions).some(Boolean)

			vscode.postMessage({
				type: "autoApprovalSettings",
				autoApprovalSettings: {
					...currentSettings,
					version: (currentSettings.version ?? 1) + 1,
					actions: newActions,
					// If no actions will be enabled, ensure the main toggle is off
					enabled: willHaveEnabledActions ? currentSettings.enabled : false,
				},
			})
		},
		[extensionState.autoApprovalSettings],
	)

	const updateMaxRequests = useCallback(
		(maxRequests: number) => {
			const currentSettings = extensionState.autoApprovalSettings
			vscode.postMessage({
				type: "autoApprovalSettings",
				autoApprovalSettings: {
					...currentSettings,
					version: (currentSettings.version ?? 1) + 1,
					maxRequests,
				},
			})
		},
		[extensionState.autoApprovalSettings],
	)

	const updateNotifications = useCallback(
		(enableNotifications: boolean) => {
			const currentSettings = extensionState.autoApprovalSettings
			vscode.postMessage({
				type: "autoApprovalSettings",
				autoApprovalSettings: {
					...currentSettings,
					version: (currentSettings.version ?? 1) + 1,
					enableNotifications,
				},
			})
		},
		[extensionState.autoApprovalSettings],
	)

	// Handle clicks outside the menu to close it
	useClickAway(menuRef, () => {
		if (isExpanded) {
			setIsExpanded(false)
		}
	})

	return (
		<div
			ref={menuRef}
			style={{
				padding: "0 15px",
				userSelect: "none",
				borderTop: isExpanded
					? `0.5px solid color-mix(in srgb, ${getAsVar(VSC_TITLEBAR_INACTIVE_FOREGROUND)} 20%, transparent)`
					: "none",
				overflowY: "auto",
				backgroundColor: isExpanded ? CODE_BLOCK_BG_COLOR : "transparent",
				...style,
			}}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px",
					padding: isExpanded ? "8px 0" : "8px 0 0 0",
					cursor: !hasEnabledActions ? "pointer" : "default",
				}}
				onMouseEnter={() => {
					if (!hasEnabledActions) {
						setIsHoveringCollapsibleSection(true)
					}
				}}
				onMouseLeave={() => {
					if (!hasEnabledActions) {
						setIsHoveringCollapsibleSection(false)
					}
				}}
				onClick={() => {
					if (!hasEnabledActions) {
						setIsExpanded((prev) => !prev)
					}
				}}>
				<VSCodeCheckbox
					style={{
						pointerEvents: hasEnabledActions ? "auto" : "none",
					}}
					checked={hasEnabledActions && autoApprovalSettings.enabled}
					disabled={!hasEnabledActions}
					// onChange={(e) => {
					// 	const checked = (e.target as HTMLInputElement).checked
					// 	updateEnabled(checked)
					// }}
					onClick={(e) => {
						/*
						vscode web toolkit bug: when changing the value of a vscodecheckbox programmatically, it will call its onChange with stale state. This led to updateEnabled being called with an old version of autoApprovalSettings, effectively undoing the state change that was triggered by the last action being unchecked. A simple workaround is to just not use onChange and instead use onClick. We are lucky this is a checkbox and the newvalue is simply opposite of current state.
						*/
						if (!hasEnabledActions) return
						e.stopPropagation() // stops click from bubbling up to the parent, in this case stopping the expanding/collapsing
						updateEnabled(!autoApprovalSettings.enabled)
					}}
				/>
				<CollapsibleSection
					isHovered={isHoveringCollapsibleSection}
					style={{ cursor: "pointer" }}
					onClick={() => {
						// to prevent this from counteracting parent
						if (hasEnabledActions) {
							setIsExpanded((prev) => !prev)
						}
					}}>
					<span
						style={{
							color: getAsVar(VSC_FOREGROUND),
							whiteSpace: "nowrap",
						}}>
						自动批准：
					</span>
					<span
						style={{
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}>
						{!hasEnabledActions ? "没有任何" : enabledActionsList}
					</span>
					<span
						className={`codicon codicon-chevron-${isExpanded ? "down" : "right"}`}
						style={{
							flexShrink: 0,
							marginLeft: isExpanded ? "2px" : "-2px",
						}}
					/>
				</CollapsibleSection>
			</div>
			{isExpanded && (
				<div style={{ padding: "0" }}>
					<div
						style={{
							marginBottom: "10px",
							color: getAsVar(VSC_DESCRIPTION_FOREGROUND),
							fontSize: "12px",
						}}>
						自动批准功能允许Cline在无需请求许可的情况下执行以下操作。请谨慎使用，仅在您了解其中风险时启用。
					</div>
					{ACTION_METADATA.map((action) => {
						// Handle readFilesExternally, editFilesExternally, and executeAllCommands as animated sub-options
						if (
							action.id === "executeAllCommands" ||
							action.id === "editFilesExternally" ||
							action.id === "readFilesExternally"
						) {
							const parentAction =
								action.id === "executeAllCommands"
									? "executeSafeCommands"
									: action.id === "readFilesExternally"
										? "readFiles"
										: "editFiles"
							return (
								<SubOptionAnimateIn key={action.id} show={autoApprovalSettings.actions[parentAction] ?? false}>
									<div
										style={{
											margin: "3px 0",
											marginLeft: "28px",
										}}>
										<VSCodeCheckbox
											checked={autoApprovalSettings.actions[action.id]}
											onChange={(e) => {
												const checked = (e.target as HTMLInputElement).checked
												updateAction(action.id, checked)
											}}>
											{action.label}
										</VSCodeCheckbox>
										<div
											style={{
												marginLeft: "28px",
												color: getAsVar(VSC_DESCRIPTION_FOREGROUND),
												fontSize: "12px",
											}}>
											{action.description}
										</div>
									</div>
								</SubOptionAnimateIn>
							)
						}
						return (
							<div
								key={action.id}
								style={{
									margin: "6px 0",
								}}>
								<VSCodeCheckbox
									checked={autoApprovalSettings.actions[action.id]}
									onChange={(e) => {
										const checked = (e.target as HTMLInputElement).checked
										updateAction(action.id, checked)
									}}>
									{action.label}
								</VSCodeCheckbox>
								<div
									style={{
										marginLeft: "28px",
										color: getAsVar(VSC_DESCRIPTION_FOREGROUND),
										fontSize: "12px",
									}}>
									{action.description}
								</div>
							</div>
						)
					})}
					<div
						style={{
							height: "0.5px",
							background: getAsVar(VSC_TITLEBAR_INACTIVE_FOREGROUND),
							margin: "15px 0",
							opacity: 0.2,
						}}
					/>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
							marginTop: "10px",
							marginBottom: "8px",
							color: getAsVar(VSC_FOREGROUND),
						}}>
						<span style={{ flexShrink: 1, minWidth: 0 }}>最大请求：</span>
						<VSCodeTextField
							// placeholder={DEFAULT_AUTO_APPROVAL_SETTINGS.maxRequests.toString()}
							value={autoApprovalSettings.maxRequests.toString()}
							onInput={(e) => {
								const input = e.target as HTMLInputElement
								// Remove any non-numeric characters
								input.value = input.value.replace(/[^0-9]/g, "")
								const value = parseInt(input.value)
								if (!isNaN(value) && value > 0) {
									updateMaxRequests(value)
								}
							}}
							onKeyDown={(e) => {
								// Prevent non-numeric keys (except for backspace, delete, arrows)
								if (!/^\d$/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)) {
									e.preventDefault()
								}
							}}
							style={{ flex: 1 }}
						/>
					</div>
					<div
						style={{
							color: getAsVar(VSC_DESCRIPTION_FOREGROUND),
							fontSize: "12px",
							marginBottom: "10px",
						}}>
						在要求批准继续执行任务之前，Cline将自动提出许多API请求。
					</div>
					<div style={{ margin: "6px 0" }}>
						<VSCodeCheckbox
							checked={autoApprovalSettings.enableNotifications}
							onChange={(e) => {
								const checked = (e.target as HTMLInputElement).checked
								updateNotifications(checked)
							}}>
							启用通知
						</VSCodeCheckbox>
						<div
							style={{
								marginLeft: "28px",
								color: getAsVar(VSC_DESCRIPTION_FOREGROUND),
								fontSize: "12px",
							}}>
							当Cline需要批准或完成任务时，接收系统通知。
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

const CollapsibleSection = styled.div<{ isHovered?: boolean }>`
	display: flex;
	align-items: center;
	gap: 4px;
	color: ${(props) => (props.isHovered ? getAsVar(VSC_FOREGROUND) : getAsVar(VSC_DESCRIPTION_FOREGROUND))};
	flex: 1;
	min-width: 0;

	&:hover {
		color: ${getAsVar(VSC_FOREGROUND)};
	}
`

export default AutoApproveMenu
