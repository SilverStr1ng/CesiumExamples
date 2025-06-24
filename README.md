# Cesium Examples

![Cesium](https://img.shields.io/badge/Cesium-3D%20地理可视化-blue) ![Vue3](https://img.shields.io/badge/Vue3-渐进式框架-green)  

基于 Cesium 与 Vue3 构建的现代数字地球应用, 分享收集的示例代码和资源

## 核心特性 🚀
- **地理分析模块**
  - [ ] 地形剖面生成与分析
  - [ ] 实时动态缓冲区计算
  - [ ] 空间量测工具（距离/面积）
- **GLSL 高级材质**
  - [ ] 可编程着色器材质系统
  - [ ] 动态热力图/等高线材质
  - [ ] 自定义光照与特效（如夜光效果）
- **离屏渲染优化**
  - [ ] 多图层异步渲染管线
  - [ ] 后处理特效（景深、Bloom）
  - [ ] Web Worker 辅助计算

## 技术栈 ⚙️
| 组件          | 描述                          |
|---------------|-------------------------------|
| **Cesium 1.130** | 地理空间可视化引擎            |
| **Vue 3.5.13**      | 组件化前端框架                |
| **Vite 6.2.4**     | 极速开发/构建工具             |
| **GLSL 300 ES**  | 着色器编程语言                |
| **Pinia**        | 状态管理                      |
| **Cesium-Vite**  | Cesium/Vite 集成插件          |

---

## 快速开始

### 环境要求
- Node.js ≥18.0
- Cesium ion 账户（[注册](https://cesium.com/platform/cesium-ion/)）

### 安装步骤
```bash
# 克隆项目
git clone git@github.com:SilverStr1ng/CesiumExamples.git
cd cesium-vue3-globe

# 安装依赖
npm install

# 配置环境变量 (创建 .env.local 文件)
VITE_CESIUM_ION_ACCESS_TOKEN=your_cesium_ion_token

# 启动开发服务器
npm run dev
```

## 项目结构 🗂️ -待修改
```text
src/
├── assets/                 # 静态资源
│   └── shaders/            # GLSL代码 (.glsl)
├── components/
│   ├── GlobeViewer.vue     # 地球主容器
│   ├── AnalysisTools/      # 地理分析工具集
│   └── MaterialLab/        # 材质实验组件
├── composables/            # Vue组合式API
│   ├── useOffscreen.js     # 离屏渲染逻辑
│   └── useTerrainSampler.js 
├── stores/                 # Pinia状态管理
│   └── globeStore.js       
├── workers/                # Web Workers
│   └── demProcessor.js     # 地形数据处理线程
└── main.ts                 # 应用入口
```

## 贡献指南 🤝
1. Fork 项目仓库
2. 创建特性分支 (git checkout -b feature/new-analysis-tool)
3. 提交更改 (git commit -m 'Add terrain profile generator')
4. 推送分支 (git push origin feature/new-analysis-tool)
5. 提交 Pull Request

## 许可证 📄
[MIT License](https://opensource.org/license/MIT)

© 2025 CesiumExample Project

