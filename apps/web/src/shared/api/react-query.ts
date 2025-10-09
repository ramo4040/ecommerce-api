import { isServer, QueryClient } from "@tanstack/react-query";

const makeQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 60,
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
				refetchOnMount: false,
			},
		},
	});
};

let BrowserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
	if (isServer) {
		return makeQueryClient();
	}
	if (!BrowserQueryClient) BrowserQueryClient = makeQueryClient();
	return BrowserQueryClient;
};
