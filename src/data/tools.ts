export interface Tool {
  id: string;
  name: string;
  categories: string[];
  painPoint: string;
  description: string;
  link: string;
}

export const tools: Tool[] = [
  {
    id: 'nodup',
    name: 'NoDup',
    categories: ['效率工具', '浏览器扩展', '标签页管理'],
    painPoint: '每次在对话或文档里点开链接都会新开一个标签，而不是去原来Chrome的位置找，导致Tab越来越多堆积如山，无法管理并陷入恶性循环。',
    description: '直接跳转到已经打开的同名标签页而不是新开一个，有效防止标签页重复堆积，也方便快速回到Tab所在的项目上下文。',
    link: 'https://chromewebstore.google.com/detail/nodup/jakomjnpemmaphhfialgbehagbcmaagh?'
  },
  {
    id: 'homebrew',
    name: 'Homebrew',
    categories: ['开发工具', '包管理器', '系统环境'],
    painPoint: 'macOS 原生缺少统一的软件和依赖包管理工具，开发环境中手动下载、解压、配置环境变量非常繁琐且难以更新维护。',
    description: 'macOS（或 Linux）缺失的包管理器。通过简单的命令行即可安装、更新和管理各种常用软件包，让环境配置变得无比轻松。',
    link: 'https://brew.sh/'
  }
];