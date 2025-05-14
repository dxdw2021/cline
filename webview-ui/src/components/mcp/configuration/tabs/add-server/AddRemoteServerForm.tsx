import { useRef, useState } from "react"
import { vscode } from "@/utils/vscode"
import { VSCodeButton, VSCodeLink, VSCodeTextField } from "@vscode/webview-ui-toolkit/react"
import { LINKS } from "@/constants"
import { McpServiceClient } from "@/services/grpc-client"
import { convertProtoMcpServersToMcpServers } from "@shared/proto-conversions/mcp/mcp-server-conversion"
import { useExtensionState } from "@/context/ExtensionStateContext"

const AddRemoteServerForm = ({ onServerAdded }: { onServerAdded: () => void }) => {
	const [serverName, setServerName] = useState("")
	const [serverUrl, setServerUrl] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState("")
	const [showConnectingMessage, setShowConnectingMessage] = useState(false)
	const { setMcpServers } = useExtensionState()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!serverName.trim()) {
			setError("服务器名称不能为空")
			return
		}

		if (!serverUrl.trim()) {
			setError("服务器URL不能为空")
			return
		}

		try {
			new URL(serverUrl)
		} catch (err) {
			setError("URL格式无效")
			return
		}

		setError("")
		setIsSubmitting(true)
		setShowConnectingMessage(true)

		try {
			const servers = await McpServiceClient.addRemoteMcpServer({
				serverName: serverName.trim(),
				serverUrl: serverUrl.trim(),
			})

			setIsSubmitting(false)

			const mcpServers = convertProtoMcpServersToMcpServers(servers)
			setMcpServers(mcpServers)

			setServerName("")
			setServerUrl("")
			onServerAdded()
			setShowConnectingMessage(false)
		} catch (error) {
			setIsSubmitting(false)
			setError(error instanceof Error ? error.message : "添加服务器失败")
			setShowConnectingMessage(false)
		}
	}

	return (
		<div className="p-4 px-5">
			<div className="text-[var(--vscode-foreground)] mb-2">
				通过提供名称和URL端点添加远程MCP服务器。了解更多{" "}
				<VSCodeLink href={LINKS.DOCUMENTATION.REMOTE_MCP_SERVER_DOCS} style={{ display: "inline" }}>
					详情
				</VSCodeLink>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="mb-2">
					<VSCodeTextField
						value={serverName}
						onChange={(e) => {
							setServerName((e.target as HTMLInputElement).value)
							setError("")
						}}
						disabled={isSubmitting}
						className="w-full"
						placeholder="mcp-server">
						服务器名称
					</VSCodeTextField>
				</div>

				<div className="mb-2">
					<VSCodeTextField
						value={serverUrl}
						onChange={(e) => {
							setServerUrl((e.target as HTMLInputElement).value)
							setError("")
						}}
						disabled={isSubmitting}
						placeholder="https://example.com/mcp-server"
						className="w-full mr-4">
						服务器URL
					</VSCodeTextField>
				</div>

				{error && <div className="mb-3 text-[var(--vscode-errorForeground)]">{error}</div>}

				<div className="flex items-center mt-3 w-full">
					<VSCodeButton type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? "添加中..." : "添加服务器"}
					</VSCodeButton>

					{showConnectingMessage && (
						<div className="ml-3 text-[var(--vscode-notificationsInfoIcon-foreground)] text-sm">
							正在连接服务器... 这可能需要几秒钟。
						</div>
					)}
				</div>

				<VSCodeButton
					appearance="secondary"
					style={{ width: "100%", marginBottom: "5px", marginTop: 15 }}
					onClick={() => {
						vscode.postMessage({ type: "openMcpSettings" })
					}}>
					编辑配置
				</VSCodeButton>
			</form>
		</div>
	)
}

export default AddRemoteServerForm
