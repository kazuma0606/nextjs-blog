import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import MDXComponents from '../components/MDXComponents';

async function loadMDXContent() {
  // MDX ファイルのパス
  const filePath = path.join(process.cwd(), 'app', 'mdx-page', 'welcome.mdx');
  console.log('Resolved file path:', filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at ${filePath}`);
  }

  // MDX ファイルを文字列として読み込み
  const mdxSource = fs.readFileSync(filePath, 'utf-8');

  // MDX をコンパイルして React コンポーネント化
  const { content } = await compileMDX({
    source: mdxSource,
    components: MDXComponents,
    options: {
      // 必要に応じて MDX オプションを追加
    },
  });

  return content;
}

export default async function BlogPage() {
  const mdxContent = await loadMDXContent();

  return (
    <div>
      <h1>Blog Home</h1>
      {mdxContent}
    </div>
  );
}
