import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { vscode } from "@/utils/vscode"
import { useExtensionState } from "@/context/ExtensionStateContext"
import ServersToggleList from "./ServersToggleList"
const InstalledServersView = () => {
	const { mcpServers: servers } = useExtensionState()

	return (
		<div style={{ padding: "16px 20px" }}>
			<div
				style={{
					color: "var(--vscode-foreground)",
					fontSize: "13px",
					marginBottom: "16px",
					marginTop: "5px",
				}}>
				通过{" "}
				<VSCodeLink href="https://github.com/modelcontextprotocol" style={{ display: "inline" }}>
					Model Context Protocol
				</VSCodeLink>{" "}
				可以与本地运行的MCP服务器进行通信，这些服务器提供额外的工具和资源来扩展Cline的功能。您可以使用{" "}
				<VSCodeLink href="https://github.com/modelcontextprotocol/servers" style={{ display: "inline" }}>
					社区制作的服务器
				</VSCodeLink>{" "}
				或者让Cline创建适合您工作流程的新工具（例如，"添加一个获取最新npm文档的工具"）。{" "}
				<VSCodeLink href="https://x.com/sdrzn/status/1867271665086074969" style={{ display: "inline" }}>
					查看演示
				</VSCodeLink>
			</div>

			<ServersToggleList servers={servers} isExpandable={true} hasTrashIcon={false} />

			{/* Settings Section */}
			<div style={{ marginBottom: "20px", marginTop: 10 }}>
				<VSCodeButton
					appearance="secondary"
					style={{ width: "100%", marginBottom: "5px" }}
					onClick={() => {
						vscode.postMessage({ type: "openMcpSettings" })
					}}>
					<span className="codicon codicon-server" style={{ marginRight: "6px" }}></span>
					配置MCP服务器
				</VSCodeButton>

				<div style={{ textAlign: "center" }}>
					<VSCodeLink
						onClick={() => {
							vscode.postMessage({
								type: "openExtensionSettings",
								text: "cline.mcp",
							})
						}}
						style={{ fontSize: "12px" }}>
						MCP高级设置
					</VSCodeLink>
				</div>
			</div>
		</div>
	)
}

export default InstalledServersView
