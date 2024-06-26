import Settings from "@/src/components/Settings/Settings";
import { NotificationsProvider } from "@/src/hooks/useNotifications/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function Options(): JSX.Element {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchInterval: 75,
				refetchOnWindowFocus: true,
				staleTime: 250
			}
		}
	});
	return (
		<NotificationsProvider>
			<QueryClientProvider client={client}>
				<Settings />
			</QueryClientProvider>
		</NotificationsProvider>
	);
}
