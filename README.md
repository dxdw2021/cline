# Cline-cn 中文版本 (盛世中华版本) 🌏

> 🎉 截止到2025.04.11，Cline-cn 在VS Code插件市场的下载量突破100啦！
2025年4月11日 - 发布 3.10.1
 -修复MCP服务器安装不能跳转到聊天
 -增加硅基流动，豆包模型
<p align="center">

[![Version](https://img.shields.io/visual-studio-marketplace/v/617694668.cline-cn)](https://marketplace.visualstudio.com/items?itemName=617694668.cline-cn)
[![字节Trae扩展安装教程](https://img.shields.io/badge/字节Trae扩展安装-阿里云盘-blue)](https://www.alipan.com/s/TWqXrtFqqRa)
[![离线下载助手](https://img.shields.io/badge/离线下载助手-阿里云盘-orange)](https://www.alipan.com/s/ZeCnNGQrQad)
[![插件离线下载教程](https://img.shields.io/badge/插件离线下载教程-阿里云盘-green)](https://www.alipan.com/s/1aEUaHuyW6P)

</p>

## 项目地址
https://github.com/dxdw2021/cline
欢迎大家star，fork，提出issue，贡献代码，一起完善这个项目。

## 文档地址(包括使用方法，MCP知识，常见问题解答等)
https://hybridtalentcomputing.gitbook.io/cline-chinese-doc/

## 功能展示

<video width="100%" controls src="https://github.com/user-attachments/assets/89b51f15-d368-4af7-983e-816e52b7fdbf" type="video/mp4"></video>
> 演示视频使用 DeepSeek-R1-Distill-Qwen-14B 模型，展示了 Cline 中文汉化版的主要功能和使用效果，视频没有加速，推理速度快到飞起。


## 免费白嫖API入口
> 日常开发时，我使用的是某基某动的白嫖额度的模型API，如果您尚未注册，
1.欢迎通过我的邀请链接： [硅基流动https://cloud.siliconflow.cn/i/HUTeVyQ9](https://cloud.siliconflow.cn/i/HUTeVyQ9)，或者注册的时候填写邀请码：HUTeVyQ9，注册后双方均可获得2000万tokens的免费额度。
2.第2选择:使用国外的AI路由器：[OpenRouter](https://openrouter.ai)，注册后使用free，后缀的API，即可免费使用。如下图:
![OpenRouter免费模型截图](User%20Tutorials/png/OpenRouter.png)
![OpenRouter免费模型截图](https://github.com/user-attachments/assets/52ce142c-925f-4c6c-a523-cdb450e0c619)

## 安装使用
Cline-Chinese已发布到VSCode插件市场，欢迎感兴趣的小伙伴们下载体验。

## 简介

这个项目是基于 [Cline](https://github.com/cline/cline) 的汉化版本。旨在优化由于英文 prompt 导致 Cline 在中文输入下+国产大模型（如：deepseek）表现不佳的问题, 并提供更符合中文用户习惯的UI界面和功能。目前已测试[DeepSeek-R1/DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-R1)工作良好。

日常使用cline等编程助手时发现使用某些模型推理速度较慢（如deepseek-R1, Claude-3.5-Sonnet），这个项目优先尝试在中文输入下，对轻量化LLM进行实验（如Deepseek-R1-Distill-Qwen-7B/14B），优化中文prompt, 以提升推理速度，大大减少等待的时间。

> **🚀 重要提示：经过测试，3.10.1版本下，DeepSeek-R1-Distill-Qwen-14B 模型工作良好，推理速度极快，强烈推荐尝试！**

## 背景

本人是一名AI从业者+爱好者，在使用Cline时，发现Cline的UI界面和提示词均为英文，使用中文输入时，有时会出现奇奇怪怪的输出，影响体验。因此，决定自己动手，汉化Cline。
另外，秉着学习的态度，未来将着手修改Cline的核心代码，增加新的功能，以提升体验。

## 版本说明
## [3.10.1]
 2025年4月11日 - 发布 3.10.1
 -修复MCP服务器安装不能跳转到聊天
 -增加硅基流动，豆包模型
 -添加硅基流动API入口
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

 -为Cline提供商添加推荐的型号
 -添加能够检测用户何时手动编辑文件的能力，以便Cline知道重新阅读，从而减少了diff编辑错误
 -添加改进以提及搜索更快的搜索速度
 -将评分逻辑添加到文件提及以根据相关性进行排序和Exlcude结果
 -添加对BONDEDANCE DOUBAO的支持（谢谢Tunixer！）
 -修复以防止重复BOM（感谢BAMPS53！）


## 2024.03.30 [3.8.4]
-   2025年3月30日 - 发布 中华人民共和国中文版本 3.8.4
-   添加 Sambanova Deepseek-V3-0324
-   为 LiteLLM provider 添加成本计算支持
-   修复 Cline 在没有 response 参数时使用 plan_mode_response 的错误


## 加入社群

感兴趣的可以扫码加入微信社群，一起交流学习AI：

<div align="center">
<table>
<tbody>
<td align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev" target="_blank"><strong>Download on VS Marketplace</strong></a>
</td>
<td align="center">
<a href="https://discord.gg/cline" target="_blank"><strong>Discord</strong></a>
</td>
<td align="center">
<a href="https://www.reddit.com/r/cline/" target="_blank"><strong>r/cline</strong></a>
</td>
<td align="center">
<a href="https://github.com/cline/cline/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop" target="_blank"><strong>Feature Requests</strong></a>
</td>
<td align="center">
<a href="https://docs.cline-cn.bot/getting-started/for-new-coders" target="_blank"><strong>Getting Started</strong></a>
</td>
</tbody>
</table>
</div>

Meet Cline, an AI assistant that can use your **CLI** a**N**d **E**ditor.

Thanks to [Claude 3.7 Sonnet's agentic coding capabilities](https://www.anthropic.com/claude/sonnet), Cline can handle complex software development tasks step-by-step. With tools that let him create & edit files, explore large projects, use the browser, and execute terminal commands (after you grant permission), he can assist you in ways that go beyond code completion or tech support. Cline can even use the Model Context Protocol (MCP) to create new tools and extend his own capabilities. While autonomous AI scripts traditionally run in sandboxed environments, this extension provides a human-in-the-loop GUI to approve every file change and terminal command, providing a safe and accessible way to explore the potential of agentic AI.

1. Enter your task and add images to convert mockups into functional apps or fix bugs with screenshots.
2. Cline starts by analyzing your file structure & source code ASTs, running regex searches, and reading relevant files to get up to speed in existing projects. By carefully managing what information is added to context, Cline can provide valuable assistance even for large, complex projects without overwhelming the context window.
3. Once Cline has the information he needs, he can:
    - Create and edit files + monitor linter/compiler errors along the way, letting him proactively fix issues like missing imports and syntax errors on his own.
    - Execute commands directly in your terminal and monitor their output as he works, letting him e.g., react to dev server issues after editing a file.
    - For web development tasks, Cline can launch the site in a headless browser, click, type, scroll, and capture screenshots + console logs, allowing him to fix runtime errors and visual bugs.
4. When a task is completed, Cline will present the result to you with a terminal command like `open -a "Google Chrome" index.html`, which you run with a click of a button.

> [!TIP]
> Use the `CMD/CTRL + Shift + P` shortcut to open the command palette and type "Cline: Open In New Tab" to open the extension as a tab in your editor. This lets you use Cline side-by-side with your file explorer, and see how he changes your workspace more clearly.

---

<img align="right" width="340" src="https://github.com/user-attachments/assets/3cf21e04-7ce9-4d22-a7b9-ba2c595e88a4">

### Use any API and Model

Cline supports API providers like OpenRouter, Anthropic, OpenAI, Google Gemini, AWS Bedrock, Azure, and GCP Vertex. You can also configure any OpenAI compatible API, or use a local model through LM Studio/Ollama. If you're using OpenRouter, the extension fetches their latest model list, allowing you to use the newest models as soon as they're available.

The extension also keeps track of total tokens and API usage cost for the entire task loop and individual requests, keeping you informed of spend every step of the way.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/81be79a8-1fdb-4028-9129-5fe055e01e76">

### Run Commands in Terminal

Thanks to the new [shell integration updates in VSCode v1.93](https://code.visualstudio.com/updates/v1_93#_terminal-shell-integration-api), Cline can execute commands directly in your terminal and receive the output. This allows him to perform a wide range of tasks, from installing packages and running build scripts to deploying applications, managing databases, and executing tests, all while adapting to your dev environment & toolchain to get the job done right.

For long running processes like dev servers, use the "Proceed While Running" button to let Cline continue in the task while the command runs in the background. As Cline works he’ll be notified of any new terminal output along the way, letting him react to issues that may come up, such as compile-time errors when editing files.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="400" src="https://github.com/user-attachments/assets/c5977833-d9b8-491e-90f9-05f9cd38c588">

### Create and Edit Files

Cline can create and edit files directly in your editor, presenting you a diff view of the changes. You can edit or revert Cline's changes directly in the diff view editor, or provide feedback in chat until you're satisfied with the result. Cline also monitors linter/compiler errors (missing imports, syntax errors, etc.) so he can fix issues that come up along the way on his own.

All changes made by Cline are recorded in your file's Timeline, providing an easy way to track and revert modifications if needed.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="370" src="https://github.com/user-attachments/assets/bc2e85ba-dfeb-4fe6-9942-7cfc4703cbe5">

### Use the Browser

With Claude 3.5 Sonnet's new [Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use) capability, Cline can launch a browser, click elements, type text, and scroll, capturing screenshots and console logs at each step. This allows for interactive debugging, end-to-end testing, and even general web use! This gives him autonomy to fixing visual bugs and runtime issues without you needing to handhold and copy-pasting error logs yourself.

Try asking Cline to "test the app", and watch as he runs a command like `npm run dev`, launches your locally running dev server in a browser, and performs a series of tests to confirm that everything works. [See a demo here.](https://x.com/sdrzn/status/1850880547825823989)

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="350" src="https://github.com/user-attachments/assets/ac0efa14-5c1f-4c26-a42d-9d7c56f5fadd">

### "add a tool that..."

Thanks to the [Model Context Protocol](https://github.com/modelcontextprotocol), Cline can extend his capabilities through custom tools. While you can use [community-made servers](https://github.com/modelcontextprotocol/servers), Cline can instead create and install tools tailored to your specific workflow. Just ask Cline to "add a tool" and he will handle everything, from creating a new MCP server to installing it into the extension. These custom tools then become part of Cline's toolkit, ready to use in future tasks.

-   "add a tool that fetches Jira tickets": Retrieve ticket ACs and put Cline to work
-   "add a tool that manages AWS EC2s": Check server metrics and scale instances up or down
-   "add a tool that pulls the latest PagerDuty incidents": Fetch details and ask Cline to fix bugs

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="left" width="360" src="https://github.com/user-attachments/assets/7fdf41e6-281a-4b4b-ac19-020b838b6970">

### Add Context

**`@url`:** Paste in a URL for the extension to fetch and convert to markdown, useful when you want to give Cline the latest docs

**`@problems`:** Add workspace errors and warnings ('Problems' panel) for Cline to fix

**`@file`:** Adds a file's contents so you don't have to waste API requests approving read file (+ type to search files)

**`@folder`:** Adds folder's files all at once to speed up your workflow even more

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

<img align="right" width="350" src="https://github.com/user-attachments/assets/140c8606-d3bf-41b9-9a1f-4dbf0d4c90cb">

### Checkpoints: Compare and Restore

As Cline works through a task, the extension takes a snapshot of your workspace at each step. You can use the 'Compare' button to see a diff between the snapshot and your current workspace, and the 'Restore' button to roll back to that point.

For example, when working with a local web server, you can use 'Restore Workspace Only' to quickly test different versions of your app, then use 'Restore Task and Workspace' when you find the version you want to continue building from. This lets you safely explore different approaches without losing progress.

<!-- Transparent pixel to create line break after floating image -->

<img width="2000" height="0" src="https://github.com/user-attachments/assets/ee14e6f7-20b8-4391-9091-8e8e25561929"><br>

## Contributing

To contribute to the project, start with our [Contributing Guide](CONTRIBUTING.md) to learn the basics. You can also join our [Discord](https://discord.gg/cline) to chat with other contributors in the `#contributors` channel. If you're looking for full-time work, check out our open positions on our [careers page](https://cline-cn.bot/join-us)!

<details>
<summary>Local Development Instructions</summary>

1. Clone the repository _(Requires [git-lfs](https://git-lfs.com/))_:
    ```bash
    git clone https://github.com/cline/cline-cn.git
    ```
2. Open the project in VSCode:
    ```bash
    code cline
    ```
3. Install the necessary dependencies for the extension and webview-gui:
    ```bash
    npm run install:all
    ```
4. Launch by pressing `F5` (or `Run`->`Start Debugging`) to open a new VSCode window with the extension loaded. (You may need to install the [esbuild problem matchers extension](https://marketplace.visualstudio.com/items?itemName=connor4312.esbuild-problem-matchers) if you run into issues building the project.)

</details>

<details>
<summary>Creating a Pull Request</summary>

1. Before creating a PR, generate a changeset entry:
    ```bash
    npm run changeset
    ```
   This will prompt you for:
   - Type of change (major, minor, patch)
     - `major` → breaking changes (1.0.0 → 2.0.0)
     - `minor` → new features (1.0.0 → 1.1.0)
     - `patch` → bug fixes (1.0.0 → 1.0.1)
   - Description of your changes

2. Commit your changes and the generated `.changeset` file

3. Push your branch and create a PR on GitHub. Our CI will:
   - Run tests and checks
   - Changesetbot will create a comment showing the version impact
   - When merged to main, changesetbot will create a Version Packages PR
   - When the Version Packages PR is merged, a new release will be published

</details>


## License

[Apache 2.0 © 2025 Cline Bot Inc.](./LICENSE)
