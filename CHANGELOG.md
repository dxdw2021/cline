# Changelog

## [3.14.1]

-  初始化功能标志时禁用自动启动

## [3.14.0]

 -添加对AWS基岩提供商中自定义模型ID的支持，启用应用程序推理配置文件（感谢@clicube！）！
 -为双子座和顶点提供商添加更多强大的缓存和高速缓存跟踪
 -添加支持乳胶渲染
 -添加对自定义API请求超时的支持。超时是15-30，但现在可以通过OpenRouter/Cline＆Ollama设置配置（感谢@WingsDrafterWork！）
 -手动截断时添加截断通知
 -为终端连接添加超时设置，允许用户设置时间等待终端启动
 -将复制按钮添加到代码块
 -将复制按钮添加到Markdown Blocks（谢谢@Weshoke！）
 -将检查点添加到更多消息
 -添加slash命令创建一个新规则文件（/newrule）
 -为打开路由器和Cline提供商添加缓存UI
 -将Amazon Nova Premier模型添加到基岩（谢谢@Watany！）
 -添加对Cursorrules和Windsurfrules的支持
 -添加对批处理历史记录删除的支持（谢谢 @danix800！）
 -改善阻力体验
 -创建新规则时创建Clinerules文件夹（如果需要）
 -启用双子座和顶点提供商的定价计算
 -重构消息处理以不显示服务器模式的MCP视图
 -将AddRemoteserver迁移到Protobus（谢谢@DaveFres！）
 -更新默认情况下要扩展的任务标头
 -将双子座缓存TTL更新为15分钟
 -在终端命令使用中修复种族条件
 -修复以正确处理`import.meta.url`，避免在Windows的路径名中引导斜线（谢谢@davefres！）
 -修复@withretry（）在本地运行扩展时装饰语法错误（谢谢@DaveFres！）
 -修复GIT承诺在没有GIT提交的回购中提及
 -修复成本计算（谢谢@barreirot！）
## [3.13.3]

 -将下载计数添加到MCP市场项目
 -添加`/compact`命令
 -在Cline /OpenRouter提供商的Gemini模型中添加提示缓存
 -将工具提示添加到底部行菜单
## [3.13.2]
 -将Gemini 2.5 Flash模型添加到顶点和双子座提供商（感谢Monotykamary！）
 -将缓存添加到双子座提供商（感谢Arafatkatze！）
 -在双子座模型中添加思维预算支持（感谢Monotykamary！）
 -添加！包括.clineignore的.file指令支持（感谢WATANY-DEV！）
 -提高斜线命令功能
 -改进提示新任务工具
 -固定将传递给Azure API的O1温度（感谢Treeleaves30760！）
 -修复以制作“添加新规则文件”按钮功能
 -修复Ollama提供商超时，允许更大的加载时间（感谢SUVarchal！）
 -修复非UTF-8文件处理：改进编码检测，以防止乱码的文本和二进制错误分类（感谢yt3trees！）
 -修复设置以通过更改提供商而不是重置
 -修复终端输出缺少逗号
 -修复由启动非αNumeric输出引起的终端错误
 -修复自动批准设置变得不设置
 -修复文档中的美人鱼语法错误（感谢tuki0918！）
 -删除SupportScomputeruse限制和支持通过支持图像的任何模型的浏览器使用（感谢Arafatkatze！）！
## [3.13.1]

 -修复错误在思考流期间取消任务的错误将导致错误状态
## [3.13.0]
 -在聊天字段下添加cline规则弹出式弹出窗口，使您可以轻松添加，启用和禁用工作区级别或全局规则文件
 -添加新的slash命令菜单，让您键入“/”进行快速操作，例如创建新任务
 -添加编辑过去消息的能力，并具有将工作空间恢复到该点的选项
 -选择问题或计划工具提供的选项时允许发送消息
 -添加命令跳到Cline的聊天输入
 -添加对OpenAi O3和4o-Mini的支持（感谢@peterdavehello和@arafatkatze！）
 -为Google Gemini提供商添加baseurl选项（感谢@OWENGO和@olivierhub！）
 -增加对Azure DeepSeek模型的支持。 （谢谢 @yt3trees！）
 -为支持其接收MCP服务器的图像响应的模型添加功能（感谢 @rikaaa0928！）
 -改善搜索并替换DIFF编辑，使其通过无法遵循结构化输出指令的模型更灵活。 （谢谢 @chi-cat！）
 -添加终端中CTRL+C终止的检测，以改善输出阅读问题
 -解决问题的问题，其中一些输出大型命令会导致UI冻结
 -修复了Vertex提供商的“解决令牌”跟踪问题（谢谢@mzsima！）
 -解决XAI推理内容没有解析的问题（谢谢@Mrubens！）
## [3.12.3]
 -将复制按钮添加到MermaidBlock组件（谢谢 @cacosub7！）
 -添加从全球式施利规则文件中获取的能力
 -添加图标以指示何时编辑用户工作区外的文件
## [3.12.2]

 -添加GPT-4.1
## [3.12.1]

 -使用视觉检查点指示器在创建检查点时清除
 -向 @samuel871211大喊大叫，以进行大量的代码质量改进，重构贡献和WebView绩效改进！
 -使用改进的上下文管理器
## [3.12.0]

 -使用Cline＆OpenRouter提供商时，为型号添加喜爱的切换
 -添加用于编辑/读取工作空间之外的Auto-Approve选项
 -改进大文件的差异编辑动画
 -添加指示灯显示Cline编辑文件时的差异编辑数量
 -将流支持和推理工作选项添加到Xai的Grok 3 Mini
 -将设置按钮添加到MCP Popover，以轻松修改已安装的服务器
 -修复错误，其中浏览器工具操作将在聊天视图中显示无效的结果
 -解决新检查点的问题弹出式隐藏太快
 -修复重复检查点错误
 -通过重试机制，超时处理和改进的错误处理（感谢SUVarchal！）来改善Ollama提供商。
## [3.11.0]
 -重新设计检查点UI通过使用悬停在悬停的弹出窗口的微妙指示行，并为其创建新的日期指标
 -增加对Xai提供商的Grok 3型号的支持
 -为选择进入遥测的用户添加更多可靠的错误跟踪（感谢您帮助我们使Cline更好！）
## [3.10.1]

 -添加CMD+'键盘快捷键以将选定的文本添加到Cline
 - Cline现在使用“添加到Cline”快捷方式时自动将文本字段聚焦
 -添加新的“创建新任务”工具以使Cline自动启动新任务！
 -修复美人鱼图问题
 -修复双子座提供商的成本计算以考虑新的分层定价结构
## [3.10.0]

 -添加设置以使浏览器工具通过远程调试，启用基于会话的浏览。取代与您的真实浏览器状态相关的无会话铬，解锁调试和生产力工作流程。
 -添加新的auto-approve选项以批准_all_命令（以您自己的风险使用！）
 -在聊天区域中添加模态以更轻松地启用或禁用MCP服务器
 -将文件/文件夹的拖放添加到Cline聊天中（感谢Eljapi！）
 -添加提示缓存for litellm + claude（感谢SAMMCJ！）
 -添加改进的上下文管理
 -修复MCP Auto批准切换问题与设置不同步
## [3.9.2]

 -为Cline提供商添加推荐的型号 -添加能够检测用户何时手动编辑文件的能力，以便Cline知道重新阅读，从而减少了diff编辑错误 -添加改进以提及搜索更快的搜索速度
 -将评分逻辑添加到文件提及以根据相关性进行排序和排除结果
 -添加对BONDEDANCE DOUBAO的支持（谢谢Tunixer！）
 -修复以防止重复BOM（感谢BAMPS53！）
## [3.9.1]

 -将Gemini 2.5 Pro Preview 03-25添加到Google提供商
## [3.9.0]

 -添加对Litellm提供商的扩展思维（感谢@jorgegarciarrey！）
 -添加一个选项卡以配置本地MCP服务器
 -修复DeepSeek API提供商令牌计数 +上下文管理的问题
 -解决某些条件下悬挂检查点的问题

## [3.8.6]

 -添加UI用于添加远程服务器
 -添加提及功能指南和更新相关文档
 -修复错误在侧边栏中打开的菜单并打开选项卡
 -解决cline帐户的问题，未在弹出选项卡中显示用户信息
 -修复错误，其中菜单按钮将无法在边栏中打开视图
## [3.8.5]

-   Add support for remote MCP Servers using SSE
-   Add gemini-2.5-pro-exp-03-25 to Vertex AI (thanks @arri-cc!)
-   Add access to history, mcp, and new task buttons in popout view
-   Add task feedback telemetry (thumbs up/down on task completion)
-   Add toggle disabled for remote servers
-   Move the MCP Restart and Delete buttons and add an auto-approve all toggle
-   Update Requestly UX for model selection (thanks @arafatkatze!)
-   Add escape for html content for gemini when running commands
-   Improve search and replace edit failure behaviors

## [3.8.4]

-   Add Sambanova Deepseek-V3-0324
-   Add cost calculation support for LiteLLM provider
-   Fix bug where Cline would use plan_mode_response bug without response parameter

## [3.8.3]

-   Add support for SambaNova QwQ-32B model
-   Add OpenAI "dynamic" model chatgpt-4o-latest
-   Add Amazon Nova models to AWS Bedrock
-   Improve file handling for NextJS folder naming (fixes issues with parentheses in folder names)
-   Add Gemini 2.5 Pro to Google AI Studio available models
-   Handle "input too large" errors for Anthropic
-   Fix "See more" not showing up for tasks after task un-fold
-   Fix gpt-4.5-preview's supportsPromptCache value to true

## [3.8.2]

-   Fix bug where switching to plan/act would result in VS Code LM/OpenRouter model being reset

## [3.8.0]

-   Add 'Add to Cline' as an option when you right-click in a file or the terminal, making it easier to add context to your current task
-   Add 'Fix with Cline' code action - when you see a lightbulb icon in your editor, you can now select 'Fix with Cline' to send the code and associated errors for Cline to fix. (Cursor users can also use the 'Quick Fix (CMD + .)' menu to see this option)
-   Add Account view to display billing and usage history for Cline account users. You can now keep track of credits used and transaction history right in the extension!
-   Add 'Sort underling provider routing' setting to Cline/OpenRouter allowing you to sort provider used by throughput, price, latency, or the default (combination of price and uptime)
-   Improve rich MCP display with dynamic image loading and support for GIFs
-   Add 'Documentation' menu item to easily access Cline's docs
-   Add OpenRouter's new usage_details feature for more reliable cost reporting
-   Display total space Cline takes on disk next to 'Delete all Tasks' button in History view
-   Fix 'Context Window Exceeded' error for OpenRouter/Cline Accounts (additional support coming soon)
-   Fix bug where OpenRouter model ID would be set to invalid value
-   Add button to delete MCP servers in a failure state

## [3.7.1]

-   Fix issue with 'See more' button in task header not showing when starting new tasks
-   Fix issue with checkpoints using local git commit hooks

## [3.7.0]

-   Cline now displays selectable options when asking questions or presenting a plan, saving you from having to type out responses!
-   Add support for a `.clinerules/` directory to load multiple files at once (thanks @ryo-ma!)
-   Prevent Cline from reading extremely large files into context that would overload context window
-   Improve checkpoints loading performance and display warning for large projects not suited for checkpoints
-   Add SambaNova API provider (thanks @saad-noodleseed!)
-   Add VPC endpoint option for AWS Bedrock profiles (thanks @minorunara!)
-   Add DeepSeek-R1 to AWS Bedrock (thanks @watany-dev!)

## [3.6.5]

-   Add 'Delete all Task History' button to History view
-   Add toggle to disable model switching between Plan/Act modes in Settings (new users default to disabled)
-   Add temperature option to OpenAI Compatible
-   Add Kotlin support to tree-sitter parser (thanks @fumiya-kume!)

## [3.6.3]

-   Improve QwQ support for Alibaba (thanks @meglinge!) and OpenRouter
-   Improve diff edit prompting to prevent immediately reverting to write_to_file when a model uses search patterns that don't match anything in the file
-   Fix bug where new checkpoints system would revert file changes when switching between tasks
-   Fix issue with incorrect token count for some OpenAI compatible providers

## [3.6.0]

-   Add Cline API as a provider option, allowing new users to sign up and get started with Cline for free
-   Optimize checkpoints with branch-per-task strategy, reducing storage required and first task load times
-   Fix problem with Plan/Act toggle keyboard shortcut not working in Windows (thanks @yt3trees!)
-   Add new Gemini models to GCP Vertex (thanks @shohei-ihaya!) and Claude models AskSage (thanks @swhite24!)
-   Improve OpenRouter/Cline error reporting

## [3.5.1]

-   Add timeout option to MCP servers
-   Add Gemini Flash models to Vertex provider (thanks @jpaodev!)
-   Add prompt caching support for AWS Bedrock provider (thanks @buger!)
-   Add AskSage provider (thanks @swhite24!)

## [3.5.0]

-   Add 'Enable extended thinking' option for Claude 3.7 Sonnet, with ability to set different budgets for Plan and Act modes
-   Add support for rich MCP responses with automatic image previews, website thumbnails, and WolframAlpha visualizations
-   Add language preference option in Advanced Settings
-   Add xAI Provider Integration with support for all Grok models (thanks @andrewmonostate!)
-   Fix issue with Linux XDG pointing to incorrect path for Document folder (thanks @jonatkinson!)

## [3.4.10]

-   Add support for GPT-4.5 preview model

## [3.4.9]

-   Add toggle to let users opt-in to anonymous telemetry and error reporting

## [3.4.6]

-   Add support for Claude 3.7 Sonnet

## [3.4.0]

-   Introducing MCP Marketplace! You can now discover and install the best MCP servers right from within the extension, with new servers added regularly
-   Add mermaid diagram support in Plan mode! You can now see visual representations of mermaid code blocks in chat, and click on them to see an expanded view
-   Use more visual checkpoints indicators after editing files & running commands
-   Create a checkpoint at the beginning of each task to easily revert to the initial state
-   Add 'Terminal' context mention to reference the active terminal's contents
-   Add 'Git Commits' context mention to reference current working changes or specific commits (thanks @mrubens!)
-   Send current textfield contents as additional feedback when toggling from Plan to Act Mode, or when hitting 'Approve' button
-   Add advanced configuration options for OpenAI Compatible (context window, max output, pricing, etc.)
-   Add Alibaba Qwen 2.5 coder models, VL models, and DeepSeek-R1/V3 support
-   Improve support for AWS Bedrock Profiles
-   Fix Mistral provider support for non-codestral models
-   Add advanced setting to disable browser tool
-   Add advanced setting to set chromium executable path for browser tool

## [3.3.2]

-   Fix bug where OpenRouter requests would periodically not return cost/token stats, leading to context window limit errors
-   Make checkpoints more visible and keep track of restored checkpoints

## [3.3.0]

-   Add .clineignore to block Cline from accessing specified file patterns
-   Add keyboard shortcut + tooltips for Plan/Act toggle
-   Fix bug where new files won't show up in files dropdown
-   Add automatic retry for rate limited requests (thanks @ViezeVingertjes!)
-   Adding reasoning_effort support for o3-mini in Advanced Settings
-   Added support for AWS provider profiles using the AWS CLI to make the profile, enabling long lived connections to AWS bedrock
-   Adding Requesty API provider
-   Add Together API provider
-   Add Alibaba Qwen API provider (thanks @aicccode!)

## [3.2.13]

-   Add new gemini models gemini-2.0-flash-lite-preview-02-05 and gemini-2.0-flash-001
-   Add all available Mistral API models (thanks @ViezeVingertjes!)
-   Add LiteLLM API provider support (thanks @him0!)

## [3.2.12]

-   Fix command chaining for Windows users
-   Fix reasoning_content error for OpenAI providers

## [3.2.11]

-   Add OpenAI o3-mini model

## [3.2.10]

-   Improve support for DeepSeek-R1 (deepseek-reasoner) model for OpenRouter, OpenAI-compatible, and DeepSeek direct (thanks @Szpadel!)
-   Show Reasoning tokens for models that support it
-   Fix issues with switching models between Plan/Act modes

## [3.2.6]

-   Save last used API/model when switching between Plan and Act, for users that like to use different models for each mode
-   New Context Window progress bar in the task header to understand increased cost/generation degradation as the context increases
-   Localize READMEs and add language selector for English, Spanish, German, Chinese, and Japanese
-   Add Advanced Settings to remove MCP prompts from requests to save tokens, enable/disable checkpoints for users that don't use git (more coming soon!)
-   Add Gemini 2.0 Flash Thinking experimental model
-   Allow new users to subscribe to mailing list to get notified when new Accounts option is available

## [3.2.5]

-   Use yellow textfield outline in Plan mode to better distinguish from Act mode

## [3.2.3]

-   Add DeepSeek-R1 (deepseek-reasoner) model support with proper parameter handling (thanks @slavakurilyak!)

## [3.2.0]

-   Add Plan/Act mode toggle to let you plan tasks with Cline before letting him get to work
-   Easily switch between API providers and models using a new popup menu under the chat field
-   Add VS Code LM API provider to run models provided by other VS Code extensions (e.g. GitHub Copilot). Shoutout to @julesmons, @RaySinner, and @MrUbens for putting this together!
-   Add on/off toggle for MCP servers to disable them when not in use. Thanks @MrUbens!
-   Add Auto-approve option for individual tools in MCP servers. Thanks @MrUbens!

## [3.1.10]

-   New icon!

## [3.1.9]

-   Add Mistral API provider with codestral-latest model

## [3.1.7]

-   Add ability to change viewport size and headless mode when Cline asks to launch the browser

## [3.1.6]

-   Fix bug where filepaths with Chinese characters would not show up in context mention menu (thanks @chi-chat!)
-   Update Anthropic model prices (thanks @timoteostewart!)

## [3.1.5]

-   Fix bug where Cline couldn't read "@/" import path aliases from tool results

## [3.1.4]

-   Fix issue where checkpoints would not work for users with git commit signing enabled globally

## [3.1.2]

-   Fix issue where LFS files would be not be ignored when creating checkpoints

## [3.1.0]

-   Added checkpoints: Snapshots of workspace are automatically created whenever Cline uses a tool
-   Compare changes: Hover over any tool use to see a diff between the snapshot and current workspace state
-   Restore options: Choose to restore just the task state, just the workspace files, or both
-   New 'See new changes' button appears after task completion, providing an overview of all workspace changes
-   Task header now shows disk space usage with a delete button to help manage snapshot storage

## [3.0.12]

-   Fix DeepSeek API cost reporting (input price is 0 since it's all either a cache read or write, different than how Anthropic reports cache usage)

## [3.0.11]

-   Emphasize auto-formatting done by the editor in file edit responses for more reliable diff editing

## [3.0.10]

-   Add DeepSeek provider to API Provider options
-   Fix context window limit errors for DeepSeek v3

## [3.0.9]

-   Fix bug where DeepSeek v3 would incorrectly escape HTML entities in diff edits

## [3.0.8]

-   Mitigate DeepSeek v3 diff edit errors by adding 'auto-formatting considerations' to system prompt, encouraging model to use updated file contents as reference point for SEARCH blocks

## [3.0.7]

-   Revert to using batched file watcher to fix crash when many files would be created at once

## [3.0.6]

-   Fix bug where some files would be missing in the `@` context mention menu
-   Add Bedrock support in additional regions
-   Diff edit improvements
-   Add OpenRouter's middle-out transform for models that don't use prompt caching (prevents context window limit errors, but cannot be applied to models like Claude since it would continuously break the cache)

## [3.0.4]

-   Fix bug where gemini models would add code block artifacts to the end of text content
-   Fix context mention menu visual issues on light themes

## [3.0.2]

-   Adds block anchor matching for more reliable diff edits (if 3+ lines, first and last line are used as anchors to search for)
-   Add instruction to system prompt to use complete lines in diff edits to work properly with fallback strategies
-   Improves diff edit error handling
-   Adds new Gemini models

## [3.0.0]

-   Cline now uses a search & replace diff based approach when editing large files to prevent code deletion issues.
-   Adds support for a more comprehensive auto-approve configuration, allowing you to specify which tools require approval and which don't.
-   Adds ability to enable system notifications for when Cline needs approval or completes a task.
-   Adds support for a root-level `.clinerules` file that can be used to specify custom instructions for the project.

## [2.2.0]

-   Add support for Model Context Protocol (MCP), enabling Cline to use custom tools like web-search tool or GitHub tool
-   Add MCP server management tab accessible via the server icon in the menu bar
-   Add ability for Cline to dynamically create new MCP servers based on user requests (e.g., "add a tool that gets the latest npm docs")

## [2.1.6]

-   Add LM Studio as an API provider option (make sure to start the LM Studio server to use it with the extension!)

## [2.1.5]

-   Add support for prompt caching for new Claude model IDs on OpenRouter (e.g. `anthropic/claude-3.5-sonnet-20240620`)

## [2.1.4]

-   AWS Bedrock fixes (add missing regions, support for cross-region inference, and older Sonnet model for regions where new model is not available)

## [2.1.3]

-   Add support for Claude 3.5 Haiku, 66% cheaper than Sonnet with similar intelligence

## [2.1.2]

-   Misc. bug fixes
-   Update README with new browser feature

## [2.1.1]

-   Add stricter prompt to prevent Cline from editing files during a browser session without first closing the browser

## [2.1.0]

-   Cline now uses Anthropic's new "Computer Use" feature to launch a browser, click, type, and scroll. This gives him more autonomy in runtime debugging, end-to-end testing, and even general web use. Try asking "Look up the weather in Colorado" to see it in action! (Available with Claude 3.5 Sonnet v2)

## [2.0.19]

-   Fix model info for Claude 3.5 Sonnet v1 on OpenRouter

## [2.0.18]

-   Add support for both v1 and v2 of Claude 3.5 Sonnet for GCP Vertex and AWS Bedrock (for cases where the new model is not enabled yet or unavailable in your region)

## [2.0.17]

-   Update Anthropic model IDs

## [2.0.16]

-   Adjustments to system prompt

## [2.0.15]

-   Fix bug where modifying Cline's edits would lead him to try to re-apply the edits
-   Fix bug where weaker models would display file contents before using the write_to_file tool
-   Fix o1-mini and o1-preview errors when using OpenAI native

## [2.0.14]

-   Gracefully cancel requests while stream could be hanging

## [2.0.13]

-   Detect code omission and show warning with troubleshooting link

## [2.0.12]

-   Keep cursor out of the way during file edit streaming animation

## [2.0.11]

-   Adjust prompts around read_file to prevent re-reading files unnecessarily

## [2.0.10]

-   More adjustments to system prompt to prevent lazy coding

## [2.0.9]

-   Update system prompt to try to prevent Cline from lazy coding (`// rest of code here...`)

## [2.0.8]

-   Fix o1-mini and o1-preview for OpenAI
-   Fix diff editor not opening sometimes in slow environments like project idx

## [2.0.7]

-   Misc. bug fixes

## [2.0.6]

-   Update URLs to https://github.com/cline/cline

## [2.0.5]

-   Fixed bug where Cline's edits would stream into the active tab when switching tabs during a write_to_file
-   Added explanation in task continuation prompt that an interrupted write_to_file reverts the file to its original contents, preventing unnecessary re-reads
-   Fixed non-first chunk error handling in case stream fails mid-way through

## [2.0.0]

-   New name! Meet Cline, an AI assistant that can use your CLI and Editor
-   Responses are now streamed with a yellow text decoration animation to keep track of Cline's progress as he edits files
-   New Cancel button to give Cline feedback if he goes off in the wrong direction, giving you more control over tasks
-   Re-imagined tool calling prompt resulting in ~40% fewer requests to accomplish tasks + better performance with other models
-   Search and use any model with OpenRouter

## [1.9.7]

-   Only auto-include error diagnostics after file edits, removed warnings to keep Claude from getting distracted in projects with strict linting rules

## [1.9.6]

-   Added support for new Google Gemini models `gemini-1.5-flash-002` and `gemini-1.5-pro-002`
-   Updated system prompt to be more lenient when terminal output doesn't stream back properly
-   Adjusted system prompt to prevent overuse of the inspect_site tool
-   Increased global line height for improved readability

## [1.9.0]

-   Claude can now use a browser! This update adds a new `inspect_site` tool that captures screenshots and console logs from websites (including localhost), making it easier for Claude to troubleshoot issues on his own.
-   Improved automatic linter/compiler debugging by only sending Claude new errors that result from his edits, rather than reporting all workspace problems.

## [1.8.0]

-   You can now use '@' in the textarea to add context!
-   @url: Paste in a URL for the extension to fetch and convert to markdown, useful when you want to give Claude the latest docs!
-   @problems: Add workspace errors and warnings for Claude to fix, no more back-and-forth about debugging
-   @file: Adds a file's contents so you don't have to waste API requests approving read file (+ type to search files)
-   @folder: Adds folder's files all at once to speed up your workflow even more

## [1.7.0]

-   Adds problems monitoring to keep Claude updated on linter/compiler/build issues, letting him proactively fix errors on his own! (adding missing imports, fixing type errors, etc.)

## [1.6.5]

-   Adds support for OpenAI o1, Azure OpenAI, and Google Gemini (free for up to 15 requests per minute!)
-   Task header can now be collapsed to provide more space for viewing conversations
-   Adds fuzzy search and sorting to Task History, making it easier to find specific tasks

## [1.6.0]

-   Commands now run directly in your terminal thanks to VSCode 1.93's new shell integration updates! Plus a new 'Proceed While Running' button to let Claude continue working while commands run, sending him new output along the way (i.e. letting him react to server errors as he edits files)

## [1.5.27]

-   Claude's changes now appear in your file's Timeline, allowing you to easily view a diff of each edit. This is especially helpful if you want to revert to a previous version. No need for git—everything is tracked by VSCode's local history!
-   Updated system prompt to keep Claude from re-reading files unnecessarily

## [1.5.19]

-   Adds support for OpenAI compatible API providers (e.g. Ollama!)

## [1.5.13]

-   New terminal emulator! When Claude runs commands, you can now type directly in the terminal (+ support for Python environments)
-   Adds search to Task History

## [1.5.6]

-   You can now edit Claude's changes before accepting! When he edits or creates a file, you can modify his changes directly in the right side of the diff view (+ hover over the 'Revert Block' arrow button in the center to undo `// rest of code here` shenanigans)

## [1.5.4]

-   Adds support for reading .pdf and .docx files (try "turn my business_plan.docx into a company website")

## [1.5.0]

-   Adds new `search_files` tool that lets Claude perform regex searches in your project, making it easy for him to refactor code, address TODOs and FIXMEs, remove dead code, and more!

## [1.4.0]

-   Adds "Always allow read-only operations" setting to let Claude read files and view directories without needing approval (off by default)
-   Implement sliding window context management to keep tasks going past 200k tokens
-   Adds Google Cloud Vertex AI support and updates Claude 3.5 Sonnet max output to 8192 tokens for all providers.
-   Improves system prompt to guard against lazy edits (less "//rest of code here")

## [1.3.0]

-   Adds task history

## [1.2.0]

-   Adds support for Prompt Caching to significantly reduce costs and response times (currently only available through Anthropic API for Claude 3.5 Sonnet and Claude 3.0 Haiku)

## [1.1.1]

-   Adds option to choose other Claude models (+ GPT-4o, DeepSeek, and Mistral if you use OpenRouter)
-   Adds option to add custom instructions to the end of the system prompt

## [1.1.0]

-   Paste images in chat to use Claude's vision capabilities and turn mockups into fully functional applications or fix bugs with screenshots

## [1.0.9]

-   Add support for OpenRouter and AWS Bedrock

## [1.0.8]

-   Shows diff view of new or edited files right in the editor

## [1.0.7]

-   Replace `list_files` and `analyze_project` with more explicit `list_files_top_level`, `list_files_recursive`, and `view_source_code_definitions_top_level` to get source code definitions only for files relevant to the task

## [1.0.6]

-   Interact with CLI commands by sending messages to stdin and terminating long-running processes like servers
-   Export tasks to markdown files (useful as context for future tasks)

## [1.0.5]

-   Claude now has context about vscode's visible editors and opened tabs

## [1.0.4]

-   Open in the editor (using menu bar or `Claude Dev: Open In New Tab` in command palette) to see how Claude updates your workspace more clearly
-   New `analyze_project` tool to help Claude get a comprehensive overview of your project's source code definitions and file structure
-   Provide feedback to tool use like terminal commands and file edits
-   Updated max output tokens to 8192 so less lazy coding (`// rest of code here...`)
-   Added ability to retry failed API requests (helpful for rate limits)
-   Quality of life improvements like markdown rendering, memory optimizations, better theme support

## [0.0.6]

-   Initial release
