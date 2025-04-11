import { VSCodeButton, VSCodeCheckbox, VSCodeDropdown, VSCodeOption } from "@vscode/webview-ui-toolkit/react"
import React, { useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use"
import styled from "styled-components"
import { BROWSER_VIEWPORT_PRESETS, BrowserSettings } from "@shared/BrowserSettings"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { vscode } from "@/utils/vscode"
import { CODE_BLOCK_BG_COLOR } from "../common/CodeBlock"

interface ConnectionInfo {
	isConnected: boolean
	isRemote: boolean
	host?: string
}

const SettingsMenu = styled.div<{ maxWidth?: number }>`
	position: absolute;
	top: 100%;
	right: 0;
	background: ${CODE_BLOCK_BG_COLOR};
	border: 1px solid var(--vscode-widget-border);
	border-radius: 2px;
	padding: 8px;
	z-index: 100;
	max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : "none")};
`

const SettingsGroup = styled.div`
	margin-bottom: 16px;
	&:last-child {
		margin-bottom: 0;
	}
`

const SettingsDescription = styled.div`
	font-size: 12px;
	color: var(--vscode-descriptionForeground);
	margin-top: 4px;
`

const ConnectionInfoPopover = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	background: ${CODE_BLOCK_BG_COLOR};
	border: 1px solid var(--vscode-widget-border);
	border-radius: 2px;
	padding: 12px;
	z-index: 100;
	min-width: 200px;
`

const ConnectionInfoRow = styled.div`
	display: flex;
	margin-bottom: 8px;
	&:last-child {
		margin-bottom: 0;
	}
`

const ConnectionInfoLabel = styled.span`
	color: var(--vscode-descriptionForeground);
	margin-right: 8px;
`

const ConnectionInfoValue = styled.span`
	color: var(--vscode-foreground);
`

export const BrowserSettingsMenu = () => {
	const { browserSettings } = useExtensionState()
	const containerRef = useRef<HTMLDivElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)
	const [showMenu, setShowMenu] = useState(false)
	const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined)

	const handleMouseEnter = () => setShowMenu(true)
	const handleMouseLeave = () => setShowMenu(false)

	const [showInfoPopover, setShowInfoPopover] = useState(false)
	const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
		isConnected: false,
		isRemote: !!browserSettings.remoteBrowserEnabled,
		host: browserSettings.remoteBrowserHost,
	})
	const popoverRef = useRef<HTMLDivElement>(null)

	// Get actual connection info from the browser session
	useEffect(() => {
		// Request connection info when component mounts
		vscode.postMessage({
			type: "getBrowserConnectionInfo",
		})

		// Listen for connection info updates
		const handleMessage = (event: MessageEvent) => {
			const message = event.data
			if (message.type === "browserConnectionInfo") {
				setConnectionInfo({
					isConnected: message.isConnected,
					isRemote: message.isRemote,
					host: message.host,
				})
			}
		}

		window.addEventListener("message", handleMessage)
		return () => {
			window.removeEventListener("message", handleMessage)
		}
	}, [browserSettings.remoteBrowserHost, browserSettings.remoteBrowserEnabled])

	// Close popover when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node) &&
				!event.composedPath().some((el) => (el as HTMLElement).classList?.contains("browser-info-icon"))
			) {
				setShowInfoPopover(false)
			}
		}

		if (showInfoPopover) {
			document.addEventListener("mousedown", handleClickOutside)
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [showInfoPopover])

	const openBrowserSettings = () => {
		// First open the settings panel
		vscode.postMessage({
			type: "openSettings",
		})

		// After a short delay, send a message to scroll to browser settings
		setTimeout(() => {
			vscode.postMessage({
				type: "scrollToSettings",
				text: "browser-settings-section",
			})
		}, 300) // Give the settings panel time to open
	}

	const toggleInfoPopover = () => {
		setShowInfoPopover(!showInfoPopover)

		// Request updated connection info when opening the popover
		if (!showInfoPopover) {
			vscode.postMessage({
				type: "getBrowserConnectionInfo",
			})
		}
	}

	// Determine icon based on connection state
	const getIconClass = () => {
		if (connectionInfo.isRemote) {
			return "codicon-remote"
		} else {
			return connectionInfo.isConnected ? "codicon-vm-running" : "codicon-info"
		}
	}

	// Determine icon color based on connection state
	const getIconColor = () => {
		if (connectionInfo.isRemote) {
			return connectionInfo.isConnected ? "var(--vscode-charts-blue)" : "var(--vscode-foreground)"
		} else if (connectionInfo.isConnected) {
			return "var(--vscode-charts-green)"
		} else {
			return "var(--vscode-foreground)"
		}
	}

	// Check connection status every second to keep icon in sync
	useEffect(() => {
		// Request connection info immediately
		vscode.postMessage({
			type: "getBrowserConnectionInfo",
		})

		// Set up interval to refresh every second
		const intervalId = setInterval(() => {
			vscode.postMessage({
				type: "getBrowserConnectionInfo",
			})
		}, 1000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<div ref={containerRef} style={{ position: "relative", marginTop: "-1px", display: "flex" }}>
			<VSCodeButton
				appearance="icon"
				className="browser-info-icon"
				onClick={toggleInfoPopover}
				title="Browser connection info"
				style={{ marginRight: "4px" }}>
				<i
					className={`codicon ${getIconClass()}`}
					style={{
						fontSize: "14.5px",
						color: getIconColor(),
					}}
				/>
			</VSCodeButton>

			{showInfoPopover && (
				<InfoPopover ref={popoverRef}>
					<h4 style={{ margin: "0 0 8px 0" }}>Browser Connection</h4>
					<InfoRow>
						<InfoLabel>Status:</InfoLabel>
						<InfoValue
							style={{
								color: connectionInfo.isConnected
									? "var(--vscode-charts-green)"
									: "var(--vscode-errorForeground)",
							}}>
							{connectionInfo.isConnected ? "Connected" : "Disconnected"}
						</InfoValue>
					</InfoRow>
					{connectionInfo.isConnected && (
						<InfoRow>
							<InfoLabel>Type:</InfoLabel>
							<InfoValue>{connectionInfo.isRemote ? "Remote" : "Local"}</InfoValue>
						</InfoRow>
					)}
					{connectionInfo.isConnected && connectionInfo.isRemote && connectionInfo.host && (
						<InfoRow>
							<InfoLabel>Remote Host:</InfoLabel>
							<InfoValue>{connectionInfo.host}</InfoValue>
						</InfoRow>
					)}
				</InfoPopover>
			)}

			<VSCodeButton appearance="icon" onClick={openBrowserSettings}>
				<i className="codicon codicon-settings-gear" style={{ fontSize: "14.5px" }} />
			</VSCodeButton>
			{showMenu && (
				<SettingsMenu ref={menuRef} maxWidth={maxWidth} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					{/* <SettingsGroup>
						<SettingsHeader>Chrome Executable</SettingsHeader>
						<VSCodeDropdown
							style={{ width: "100%", marginBottom: "8px" }}
							value={browserSettings.chromeType}
							onChange={(e) =>
								updateChromeType((e.target as HTMLSelectElement).value as BrowserSettings["chromeType"])
							}>
							<VSCodeOption value="chromium">Chromium (Auto-downloaded)</VSCodeOption>
							<VSCodeOption value="system">System Chrome</VSCodeOption>
						</VSCodeDropdown>
						<SettingsDescription>
							{browserSettings.chromeType === "system" ? (
								<>
									Cline will use your personal browser. You must{" "}
									<VSCodeLink
										href="#"
										style={{ fontSize: "inherit" }}
										onClick={(e: React.MouseEvent) => {
											e.preventDefault()
											relaunchChromeDebugMode()
										}}>
										relaunch Chrome in debug mode
									</VSCodeLink>{" "}
									to use this setting.
								</>
							) : (
								"Cline will use a Chromium browser bundled with the extension."
							)}
						</SettingsDescription>
					</SettingsGroup> */}

					<SettingsGroup>
						<SettingsHeader>视口大小</SettingsHeader>
						<VSCodeDropdown
							style={{ width: "100%" }}
							value={
								Object.entries(BROWSER_VIEWPORT_PRESETS).find(
									([_, size]) =>
										size.width === browserSettings.viewport.width &&
										size.height === browserSettings.viewport.height,
								)?.[0]
							}
							onChange={(event) => handleViewportChange(event as Event)}>
							{Object.entries(BROWSER_VIEWPORT_PRESETS).map(([name]) => (
								<VSCodeOption key={name} value={name}>
									{name}
								</VSCodeOption>
							))}
						</VSCodeDropdown>
					</SettingsGroup>
				</SettingsMenu>
			)}
		</div>
	)
}

const InfoPopover = styled.div`
	position: absolute;
	top: 30px;
	right: 0;
	background-color: var(--vscode-editorWidget-background);
	border: 1px solid var(--vscode-widget-border);
	border-radius: 4px;
	padding: 10px;
	z-index: 100;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	width: 60dvw;
	max-width: 250px;
`

const InfoRow = styled.div`
	display: flex;
	margin-bottom: 4px;
	flex-wrap: wrap;
	white-space: nowrap;
`

const InfoLabel = styled.div`
	flex: 0 0 90px;
	font-weight: 500;
`

const InfoValue = styled.div`
	flex: 1;
	word-break: break-word;
`

const SettingsHeader = styled.h4`
	margin: 0 0 8px 0;
	font-size: 13px;
	font-weight: 600;
`

const handleViewportChange = (event: Event) => {
	const target = event.target as HTMLSelectElement
	const selectedPreset = BROWSER_VIEWPORT_PRESETS[target.value as keyof typeof BROWSER_VIEWPORT_PRESETS]
	vscode.postMessage({
		type: "browserSettings",
		browserSettings: { viewport: selectedPreset },
	})
}

export default BrowserSettingsMenu
