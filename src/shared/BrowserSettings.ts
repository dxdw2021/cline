export interface BrowserSettings {
	// Viewport size settings
	viewport: {
		width: number
		height: number
	}
	// Chrome installation to use
	// chromeType: "chromium" | "system"
	remoteBrowserHost?: string
	remoteBrowserEnabled?: boolean
}

export const DEFAULT_BROWSER_SETTINGS: BrowserSettings = {
	viewport: {
		width: 900,
		height: 600,
	},
	remoteBrowserEnabled: false,
	remoteBrowserHost: "http://localhost:9222",
	// chromeType: "chromium",
}

export const BROWSER_VIEWPORT_PRESETS = {
	"大桌面 (1280x800)": { width: 1280, height: 800 },
	"小桌面 (900x600)": { width: 900, height: 600 },
	"平板电脑 (768x1024)": { width: 768, height: 1024 },
	"移动电话；移动设备；手机 (360x640)": { width: 360, height: 640 },
} as const
