declare const vscode: {
	postMessage: (message: { type: string }) => void
}

const McpSubmitCard = () => {
	const handleSubmit = () => {
		vscode.postMessage({ type: "mcpSubmit" })
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "12px",
				padding: "15px",
				margin: "20px",
				backgroundColor: "var(--vscode-textBlockQuote-background)",
				borderRadius: "6px",
			}}>
			{/* Icon */}
			<i className="codicon codicon-add" style={{ fontSize: "18px" }} />

			{/* Content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "4px",
					textAlign: "center",
					maxWidth: "480px",
				}}>
				<h3
					style={{
						margin: 0,
						fontSize: "14px",
						fontWeight: 600,
						color: "var(--vscode-foreground)",
					}}>
					提交MCP服务器
				</h3>
				<p style={{ fontSize: "13px", margin: 0, color: "var(--vscode-descriptionForeground)" }}>
					通过将问题提交给其他人 <a href="https://github.com/cline/mcp-marketplace">github.com/cline/mcp-marketplace</a>
				</p>
				<button
					onClick={handleSubmit}
					style={{
						marginTop: "12px",
						padding: "6px 12px",
						backgroundColor: "var(--vscode-button-background)",
						color: "var(--vscode-button-foreground)",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}>
					提交
				</button>
			</div>
		</div>
	)
}

export default McpSubmitCard
