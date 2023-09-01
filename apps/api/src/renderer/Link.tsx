import React from 'react';
import { usePageContext } from "./usePageContext";

const parseHref = (href?: string) => {
	if (href?.startsWith('/spa')) {
		return '/';
	}
	return href === '/' ? '/ssr' : `/ssr${href}`;
}

export const Link = (props: {
	href?: string;
	className?: string;
	children: React.ReactNode;
}) => {
	const href = parseHref(props.href);
	const pageContext = usePageContext();
	const className = [
		props.className,
		pageContext.urlPathname === props.href && "is-active",
	]
		.filter(Boolean)
		.join(" ");
	return <a {...props} href={href} className={className} />;
}
