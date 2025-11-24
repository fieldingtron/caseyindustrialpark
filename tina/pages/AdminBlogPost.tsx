import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { BlogQuery, BlogQueryVariables } from '../__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx';


type Props = {
	variables: BlogQueryVariables;
	data: BlogQuery;
	query: string;
}

export default function AdminBlogPost(props: Props) {
	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const blog = data.blog;

	const [modalSrc, setModalSrc] = React.useState("");
	const [modalAlt, setModalAlt] = React.useState("");
	const modalRef = React.useRef<HTMLDivElement>(null);
	const bsModalRef = React.useRef<any>(null);

	React.useEffect(() => {
		if (typeof window !== 'undefined' && (window as any).bootstrap && modalRef.current) {
			bsModalRef.current = new (window as any).bootstrap.Modal(modalRef.current);
		}
	}, []);

	const handleImageClick = (src: string, alt: string) => {
		setModalSrc(src);
		setModalAlt(alt);
		if (bsModalRef.current) {
			bsModalRef.current.show();
		}
	};

	const handleArticleClick = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLElement;
		if (target.tagName === 'IMG') {
			e.preventDefault();
			const img = target as HTMLImageElement;
			handleImageClick(img.src, img.alt);
		}
	};

	return (
		<article onClick={handleArticleClick}>
			<style>{`
				article img {
					cursor: pointer;
					transition: transform 0.2s;
				}
				article img:hover {
					transform: scale(1.02);
				}
			`}</style>
			<h1 data-tina-field={tinaField(blog, "title")} >{blog.title}</h1>
			<div data-tina-field={tinaField(blog, "body")}>
				<TinaMarkdown content={blog.body} />
			</div>
			{blog.blocks &&
				blog.blocks.map((block, i) => {
					switch (block?.__typename) {
						case "BlogBlocksContent":
							return (
								<div data-tina-field={tinaField(block)} key={i + block.__typename}>
									<TinaMarkdown content={block.body} />
								</div>
							);
						case "BlogBlocksImage":
							return (
								<div data-tina-field={tinaField(block)} key={i + block.__typename}>
									<img src={block.src || ""} alt={block.alt || ""} />
								</div>
							);
						case "BlogBlocksHeading":
							return (
								<div data-tina-field={tinaField(block)} key={i + block.__typename}>
									<h1>{block.title}</h1>
								</div>
							);
						case "BlogBlocksHtml":
							return (
								<div
									data-tina-field={tinaField(block)}
									key={i + block.__typename}
									dangerouslySetInnerHTML={{ __html: block.code || "" }}
								/>
							);
						default:
							return null;
					}
				})}

			{/* Bootstrap Modal */}
			<div className="modal fade" ref={modalRef} tabIndex={-1} aria-hidden="true">
				<div className="modal-dialog modal-lg modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-body text-center">
							{modalSrc && (
								<>
									<img src={modalSrc} className="img-fluid" alt={modalAlt} />
									{modalAlt && <p className="mt-2 text-muted">{modalAlt}</p>}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}
