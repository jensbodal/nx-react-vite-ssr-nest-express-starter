import React from 'react';
import { usePageContext } from "./usePageContext";

export const Link = (props: {
	href?: string;
	className?: string;
	children: React.ReactNode;
}) => {
	const href = props.href === '/' ? '/ssr' : `/ssr${props.href}`;
	const pageContext = usePageContext();
	const className = [
		props.className,
		pageContext.urlPathname === props.href && "is-active",
	]
		.filter(Boolean)
		.join(" ");
	return <a {...props} href={href} className={className} />;
}
