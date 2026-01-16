# openwork

[![npm][npm-badge]][npm-url] [![License: MIT][license-badge]][license-url]

[npm-badge]: https://img.shields.io/npm/v/openwork.svg
[npm-url]: https://www.npmjs.com/package/openwork
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT

A ~desktop~ web interface for [deepagentsjs](https://github.com/langchain-ai/deepagentsjs) — an opinionated harness for building deep agents with filesystem capabilities planning, and subagent delegation.

![openwork screenshot](docs/screenshot.png)

> [!CAUTION]
> ~openwork gives AI agents direct access to your filesystem and the ability to execute shell commands. Always review tool calls before approving them, and only run in workspaces you trust.~ openwork-web runs isolated in browser with virtual filesystem and shell access.

## Get Started

```bash
# Run directly with webpack
npm run webpack:dev
```

Requires Node.js 18+.

### From Source

```bash
git clone https://github.com/3p3r/openwork-web.git
cd openwork-web
npm install
npm run dev
```

Or configure them in-app via the settings panel.

## Supported Models

| Provider  | Models                                                                                 |
| --------- | -------------------------------------------------------------------------------------- |
| Anthropic | Claude Opus 4.5, Claude Sonnet 4.5, Claude Haiku 4.5, Claude Opus 4.1, Claude Sonnet 4 |
| OpenAI    | GPT-5.2, GPT-5.1, o3, o3 Mini, o4 Mini, o1, GPT-4.1, GPT-4o                            |
| Google    | Gemini 3 Pro Preview, Gemini 2.5 Pro, Gemini 2.5 Flash, Gemini 2.5 Flash Lite          |

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Report bugs via [GitHub Issues](https://github.com/3p3r/openwork-web/issues).

## License

MIT — see [LICENSE](LICENSE) for details.
