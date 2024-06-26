import type { ClassValue } from "clsx";

import { cn } from "../utils/utilities";

type LoaderProps = {
	className?: ClassValue;
};
export default function Loader({ className }: LoaderProps) {
	return (
		// eslint-disable-next-line tailwindcss/enforces-shorthand
		<div className={cn("m-auto h-12 w-12 animate-spin rounded-full border-[2.5px] border-solid border-[#181A1B] border-t-gray-700", className)}></div>
	);
}
