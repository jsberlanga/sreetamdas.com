import React, { PropsWithoutRef, Ref } from "react";
import Link, { LinkProps } from "next/link";
import styled, { StyledComponentPropsWithRef } from "styled-components";
import { TextGradient, PaddingListItems } from "styles/layouts";

export const BlogPostPreview = ({ post }: { post: TBlogPost }) => (
	<Link href="/blog/[slug]" as={`/blog/${post.slug}`} scroll={false}>
		<StyledLink href={`/blog/${post.slug}`}>
			<Card>
				<BlogPostPreviewTitle>
					<TextGradient>{post.title}</TextGradient>
				</BlogPostPreviewTitle>
				<Datestamp>
					{new Date(post.publishedAt).toLocaleDateString("en-US", {
						month: "long",
						year: "numeric",
						day: "numeric",
					})}
					{!post.published && <PostNotPublishedWarning />}
				</Datestamp>
				<SmallText>{post.summary}</SmallText>
			</Card>
		</StyledLink>
	</Link>
);

export const BlogPostTitle = styled.h1`
	/* color: var(--color-primary-accent); */
	font-size: 3rem;
	margin: 0;
	padding-top: 30px;
	padding-bottom: 15px;
`;

export const BlogPostPreviewTitle = styled.h2`
	/* color: var(--color-primary-accent); */
	margin: 0;
	padding-bottom: 5px;
	font-size: 2rem;
`;

export const BlogPostMDXContent = styled(PaddingListItems)`
	padding: 30px 0;
	line-height: 1.6;
`;

export const Card = styled.div`
	padding: 10px 0;
	cursor: pointer;
`;

export const Datestamp = styled.p`
	color: var(--color-primary-accent);
	font-size: 12px;
	padding: 10px 0;
	margin: 0; /* thanks @mxstbr! */
	/* opacity: 0.6; */
`;

export const Title = styled.h1`
	padding: 20px 0;
	font-size: 2.5rem;
`;

export const Text = styled.p<{ paddingTop?: boolean | number }>`
	line-height: 1.6;
	margin: 0; /* thanks @mxstbr! */
	padding: 15px 0;
	padding-top: ${({ paddingTop }) =>
		paddingTop
			? typeof paddingTop === "number"
				? `${paddingTop}px`
				: "150px"
			: null};
`;

export const SmallText = styled.p`
	font-size: 14px;
	margin: 0; /* thanks @mxstbr! */
	padding-bottom: 10px;
`;

export const StyledLink = styled.a`
	text-decoration: none;
	cursor: pointer;
	color: var(--color-primary);

	&:visited {
		text-decoration: none;
	}
	&:hover {
		text-decoration: none;
	}
`;

type TStyledLinkProps = PropsWithoutRef<
	StyledComponentPropsWithRef<typeof StyledLink>
>;
export const StyledAccentLink = React.forwardRef(
	(
		{ style, href, onClick, children, ...props }: TStyledLinkProps,
		ref: Ref<HTMLAnchorElement>
	) => (
		<StyledLink
			{...{ href, onClick, ref, ...props }}
			style={
				Object.keys(style ?? {}).length
					? style
					: { color: "var(--color-primary-accent)" }
			}
		>
			{children}
		</StyledLink>
	)
);

export const WarningSpan = styled.span`
	padding: 5px 10px;
	margin: 0 15px;
	background-color: red;
	color: white;
	border-radius: 5px;
`;

export const PostNotPublishedWarning = () => {
	return <WarningSpan>UNPUBLISHED</WarningSpan>;
};

export const ProgressBar = styled.div<{ scroll: number }>`
	position: fixed;
	left: 0;
	background: linear-gradient(
		90deg,
		var(--color-primary-accent) 0%,
		var(--color-secondary-accent) 100%
	);
	width: ${({ scroll }) => scroll}%;
	height: 5px;
	transition: 0.2s ease;
	z-index: 3;
`;

export const LinkTo = ({
	children,
	href,
	as,
	replace,
	style = {},
	...props
}: PropsWithoutRef<LinkProps & React.HTMLProps<HTMLAnchorElement>>) => {
	return (
		<Link {...{ href }} passHref>
			<StyledAccentLink {...{ style, ...props }}>
				{children}
			</StyledAccentLink>
		</Link>
	);
};

export const PostMetaDataGrid = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-gap: 0.5rem;
	justify-content: start;
	align-items: center;
`;

export const RoundedImageSmall = styled.img`
	height: 25px;
	border-radius: 50%;
`;

export const StyledPre = styled.pre`
	background-color: var(--color-inlineCode-bg);
	color: var(--color-inlineCode-fg);
	margin: 0;
	padding: 15px;
	border-radius: 5px;
	font-size: 14px;
`;
