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
				这个扩展允许您管理本地运行的MCP服务器。{" "}
				<VSCodeLink href="https://github.com/modelcontextprotocol" style={{ display: "inline" }}>
					模型上下文协议
				</VSCodeLink>{" "}
				能够与本地运行的MCP服务器进行通信，这些服务器提供额外的工具和资源以扩展Cline的功能。您可以使用{" "}
				<VSCodeLink href="https://github.com/modelcontextprotocol/servers" style={{ display: "inline" }}>
					社区自制服务器
				</VSCodeLink>{" "}
				或者要求Cline创建特定于您工作流程的新工具 (例如，添加一个获取最新npm文档的工具).{" "}
				<VSCodeLink href="https://x.com/sdrzn/status/1867271665086074969" style={{ display: "inline" }}>
					在此处查看演示。
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
					配置MCP服务器Configure MCP Servers
				</VSCodeButton>

				<div style={{ textAlign: "center" }}>
					<VSCodeLink
						onClick={() => {
							vscode.postMessage({
								type: "openExtensionSettings",
								text: "cline-cn.mcp",
							})
						}}
						style={{ fontSize: "12px" }}>
						高级MCP设置
					</VSCodeLink>
				</div>
			</div>
		</div>
	)
}

export default InstalledServersView
