import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import CustomComponent from '../../components/CustomComponent';
import MDXComponents from '@/app/components/MDXComponents';

type PageProps = {
    params: {
        slug: string;
    };
};

// 動的パスの生成
export async function generateStaticParams() {
    try {
        const mdxDirectory = path.join(process.cwd(), 'app', 'mdx-page');
        // readdirを非同期版に変更
        const files = await fs.promises.readdir(mdxDirectory);
        return files
            .filter((file) => file.endsWith('.mdx'))
            .map((file) => ({
                slug: file.replace(/\.mdx$/, ''),
            }));
    } catch (error) {
        console.error('Failed to generate static params:', error);
        return [];
    }
}
// MDX ファイルの読み込み
async function loadMDXContent(slug: string) {
    try {
        const filePath = path.join(process.cwd(), 'app', 'mdx-page', `${slug}.mdx`);

        // ファイルの存在確認を非同期で行う
        try {
            await fs.promises.access(filePath);
        } catch {
            throw new Error(`File not found at ${filePath}`);
        }

        // ファイル読み込みも非同期で行う
        const mdxSource = await fs.promises.readFile(filePath, 'utf-8');

        const { content } = await compileMDX({
            source: mdxSource,
            components: MDXComponents,
        });

        return content;
    } catch (error) {
        console.error('Error loading MDX content:', error);
        throw error;
    }
}


export default async function Page({ params }: PageProps) {
    try {
        // paramsをawaitして取得
        const resolvedParams = await params;
        if (!resolvedParams?.slug) {
            throw new Error('Slug is required');
        }

        const mdxContent = await loadMDXContent(resolvedParams.slug);

        return (
            <div>
                <h1>Dynamic Page for {resolvedParams.slug}</h1>
                {mdxContent}
            </div>
        );
    } catch (error) {
        console.error(error);
        return (
            <div>
                <h1>Error</h1>
                <p>Failed to load content</p>
            </div>
        );
    }
}