import type { Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/ban-types
export type PageProps = {};
// The `pageContext` that are available in both on the server-side and browser-side
export type PageContext = {
	Page: (pageProps: PageProps) => React.ReactElement;
	pageProps: PageProps;
	urlPathname: string;
	documentProps?: {
		title?: string;
		description?: string;
	};
	req: Request;
	res: Response;
};