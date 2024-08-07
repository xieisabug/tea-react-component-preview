// pages/preview/[component].js
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
	// 读取 components 目录下的所有文件生成路径
	const componentsDir = path.join(process.cwd(), 'pages/components');
	const componentFiles = fs.readdirSync(componentsDir);
	const paths = componentFiles.map((file) => ({
		params: { component: file.replace(/\.js$/, '') },
	}));

	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const { component } = params;
	const filePath = path.join(process.cwd(), 'pages/components', `${component}.js`);
	const componentString = fs.readFileSync(filePath, 'utf8');

	return {
		props: {
			componentString,
			componentName: component,
		},
	};
}

export default function PreviewPage({ componentString, componentName }) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const Component = dynamic(() => import(`../components/${componentName}.js`));

	return (
		<div>
			<Component />
		</div>
	);
}
