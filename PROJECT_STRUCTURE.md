# 项目目录结构与说明

以下按目录树（tree）方式列出项目主要目录与文件，并对每个目录的使用范围和作用做简要说明（中文）。

```
vue3-vant-mobile/                      # 项目根目录
├─ .github/                            # GitHub 配置（工作流、CODE_OF_CONDUCT）
│  └─ workflows/                       # CI/CD 工作流配置
├─ .vscode/                            # VS Code 推荐设置与扩展列表
├─ build/                              # 构建相关脚本（vite 打包/优化配置）
│  └─ vite/
├─ mock/                               # 本地 & 开发环境的 mock 数据和模块
│  ├─ modules/                          # 各个 mock 模块（user, prose 等）
│  ├─ data.ts
│  └─ index.ts
├─ public/                             # 公共静态资源（favicon、PWA 图标等）
├─ src/                                # 源码主目录（业务代码）
│  ├─ api/                             # 与后端通信的接口封装
│  │  ├─ index.ts
│  │  └─ user.ts
│  ├─ assets/                          # 静态资源（images、icons）
│  ├─ components/                      # 可复用组件（UI 组件）
│  │  └─ Chart/                        # 图表相关组件及主题（dark.ts）
│  ├─ composables/                     # 组合式 API（可复用逻辑，如 dark 模式）
│  ├─ config/                          # 路由与其它配置（routes.ts）
│  ├─ constants/                       # 常量定义
│  ├─ locales/                         # 多语言资源（zh-CN, en-US）
│  ├─ pages/                           # 路由页面（每个页面是一个视图）
│  │  ├─ charts/
│  │  ├─ counter/
│  │  ├─ login/
│  │  ├─ register/
│  │  ├─ profile/
│  │  ├─ settings/
│  │  ├─ mock/                          # 页面级 mock 示例
│  │  └─ scroll-cache/                  # 页面缓存示例与说明
│  ├─ router/                          # 路由配置与类型
│  ├─ stores/                          # 全局状态管理（pinia? / store modules）
│  │  └─ modules/                       # 模块化 store（user、counter、routeCache）
│  ├─ styles/                          # 全局样式（LESS / 变量）
│  ├─ types/                           # 全局类型声明（.d.ts）
│  └─ utils/                           # 工具函数（auth、request、i18n 等）
├─ index.html                          # SPA 入口 HTML
├─ package.json                        # 项目依赖与脚本
├─ pnpm-lock.yaml                      # pnpm 锁文件
├─ tsconfig.json                       # TypeScript 配置
├─ vite.config.ts                      # Vite 构建配置
├─ postcss.config.ts                   # PostCSS 配置
├─ uno.config.ts                       # UnoCSS 配置
├─ README.md / README.zh-CN.md         # 项目说明（中/英）
└─ 其它配置文件（.env、.gitignore、.npmrc 等）
```

---

## 目录用途说明（逐项简短说明）

- `.github/`：包含 GitHub 相关的设置，例如持续集成（github actions）工作流与行为准则。
- `.vscode/`：推荐的 VS Code 设置与扩展，方便团队统一开发体验。
- `build/`：定制的构建脚本或 Vite 的二次封装，用于打包、构建优化或接入打点工具（如 vconsole）。
- `mock/`：开发时使用的模拟数据和接口，帮助在无后端或后端不稳定时调试页面与逻辑。
- `public/`：放置不经过构建处理直接作为静态资源的文件（favicon、PWA 图标、静态 HTML 等）。
- `src/`：主代码目录，包含应用逻辑、UI 组件、路由、状态管理、样式与工具函数。
  - `src/api/`：封装网络请求与后端接口，便于统一错误处理与拦截。
  - `src/assets/`：存放图片、图标等前端静态资源，供各组件或页面引用。
  - `src/components/`：可复用的 Vue 组件，按功能组织（Chart、NavBar、TabBar 等）。
  - `src/composables/`：组合式 API（composition functions），如 dark 模式或可复用的逻辑。
  - `src/config/`：放置路由表、第三方服务配置等应用级配置项。
  - `src/constants/`：全局常量、枚举或配置项。
  - `src/locales/`：多语言文案文件，支持国际化（i18n）。
  - `src/pages/`：页面级组件，通常对应路由视图，每个子文件夹代表一个页面或页面组。
  - `src/router/`：路由定义与路由守卫的实现（types.ts 提供类型定义）。
  - `src/stores/`：状态管理（store）实现，模块化分文件维护不同业务状态。
  - `src/styles/`：全局样式与变量（less），集中管理主题变量。
  - `src/types/`：TypeScript 全局类型声明，改进类型推断与编辑器提示。
  - `src/utils/`：通用工具函数（请求封装、授权、页面标题设置等）。
- 项目根配置文件（`package.json`、`vite.config.ts`、`tsconfig.json` 等）：用于定义构建/运行/开发脚本，及 TypeScript 与构建工具行为。

---

## 使用建议（简短）

- 日常开发：主要查看并修改 `src/` 下的 `pages`、`components`、`stores` 与 `api`。
- 新增页面：在 `src/pages/` 下建新目录并添加路由（`src/config/routes.ts`）。
- 引入静态资源：将图片放入 `src/assets/` 或 `public/`（public 下资源路径不经过构建处理）。

---

> 如果你需要，我可以把上述目录树展开为更细粒度的每个子目录与文件的逐项说明（例如 `src/pages/login/` 中的每个文件作用），或者把说明翻译成英文。 ✅
