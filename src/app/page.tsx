'use client';

import { useState, useMemo } from 'react';
import { tools } from '@/data/tools';
import { LayoutGrid, Folder, ExternalLink, Sparkles, Target, Zap, Search, ChevronRight, X } from 'lucide-react';

export default function Home() {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 提取分类树数据
  const treeData = useMemo(() => {
    const tree: any = {};
    tools.forEach(tool => {
      let current = tree;
      tool.categories.forEach(cat => {
        if (!current[cat]) {
          current[cat] = { name: cat, children: {} };
        }
        current = current[cat].children;
      });
    });
    return tree;
  }, []);

  // 过滤工具
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      // 分类路径匹配
      const matchPath = selectedPath.every((p, i) => tool.categories[i] === p);
      // 搜索匹配
      const matchSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchPath && matchSearch;
    });
  }, [selectedPath, searchQuery]);

  // 渲染分类树（递归）
  const renderTree = (nodes: any, path: string[] = []) => {
    return Object.keys(nodes).map(key => {
      const node = nodes[key];
      const currentPath = [...path, key];
      const isSelected = selectedPath.length >= currentPath.length && 
                         currentPath.every((p, i) => selectedPath[i] === p);
      
      return (
        <div key={key} className="ml-4 mt-1">
          <button
            onClick={() => setSelectedPath(isSelected && selectedPath.length === currentPath.length ? path : currentPath)}
            className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
              isSelected 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Folder className={`w-4 h-4 mr-2 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className="truncate">{key}</span>
          </button>
          
          {/* 如果被选中或者是其祖先，则展开子节点 */}
          {isSelected && Object.keys(node.children).length > 0 && (
            <div className="border-l border-gray-100 ml-2 mt-1">
              {renderTree(node.children, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 侧边栏 */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">精选工具</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <button
            onClick={() => setSelectedPath([])}
            className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors mb-2 ${
              selectedPath.length === 0 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <LayoutGrid className={`w-4 h-4 mr-2 ${selectedPath.length === 0 ? 'text-blue-500' : 'text-gray-400'}`} />
            所有工具
          </button>
          
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-3">
            工具分类
          </div>
          <div className="-ml-4">
            {renderTree(treeData)}
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* 顶部搜索与导航 */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <span className="cursor-pointer hover:text-gray-900 transition-colors" onClick={() => setSelectedPath([])}>
              所有工具
            </span>
            {selectedPath.map((path, index) => (
              <div key={path} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                <span 
                  className={`cursor-pointer hover:text-gray-900 transition-colors ${index === selectedPath.length - 1 ? 'text-gray-900 font-semibold' : ''}`}
                  onClick={() => setSelectedPath(selectedPath.slice(0, index + 1))}
                >
                  {path}
                </span>
              </div>
            ))}
          </div>

          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
              placeholder="搜索工具或描述..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </header>

        {/* 卡片列表区 */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedPath.length > 0 ? selectedPath[selectedPath.length - 1] : '发现好工具'}
                </h2>
                <p className="text-gray-500 mt-1">
                  找到 {filteredTools.length} 个结果
                </p>
              </div>
            </div>

            {filteredTools.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">没有找到相关工具</h3>
                <p className="text-gray-500 mt-1">尝试更换分类或调整搜索关键词</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredTools.map((tool) => (
                  <div key={tool.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col group">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <a 
                        href={tool.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 hover:bg-blue-50 rounded-lg"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.categories.map((cat, i) => (
                        <span key={cat} className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                          i === 0 ? 'bg-blue-50 text-blue-600' :
                          i === 1 ? 'bg-indigo-50 text-indigo-600' :
                          'bg-emerald-50 text-emerald-600'
                        }`}>
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className="mb-5 flex-1">
                      <div className="flex items-center text-sm font-semibold text-rose-500 mb-2">
                        <Target className="w-4 h-4 mr-1.5" />
                        痛点
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {tool.painPoint}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-gray-100">
                      <div className="flex items-center text-sm font-semibold text-emerald-600 mb-2">
                        <Zap className="w-4 h-4 mr-1.5" />
                        解决与介绍
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}