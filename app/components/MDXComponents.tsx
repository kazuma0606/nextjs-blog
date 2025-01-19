import React from 'react';
import CustomComponent from './CustomComponent';

// components/MDXComponents.tsx
const MDXComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-3xl font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-2xl font-bold mb-4">{children}</h2>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
        <p className="text-red-500 mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <li className="text-gray-700">{children}</li>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-gray-100 px-2 py-1 rounded">{children}</code>
    ),
    // 必要に応じて他の要素も追加
    // カスタムコンポーネント
    CustomComponent: (props: any) => (
        <div className="my-4">
            <CustomComponent {...props} />
        </div>
    ),
};

export default MDXComponents;