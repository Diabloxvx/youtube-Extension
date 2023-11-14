import i18next, { type Resource, createInstance } from "i18next";

import { waitForSpecificMessage } from "../utils/utilities";
export const availableLocales = ["en-US"] as const;
export type AvailableLocales = (typeof availableLocales)[number];
export type i18nInstanceType = ReturnType<typeof createInstance>;

export async function i18nService(locale: AvailableLocales) {
	let extensionURL;
	const isYouTube = window.location.hostname === "www.youtube.com";
	if (isYouTube) {
		const extensionURLResponse = await waitForSpecificMessage("extensionURL", "request_data", "content");
		if (!extensionURLResponse) throw new Error("Failed to get extension URL");
		({
			data: { extensionURL }
		} = extensionURLResponse);
	} else {
		extensionURL = chrome.runtime.getURL("");
	}
	if (!availableLocales.includes(locale)) throw new Error(`The locale '${locale}' is not available`);
	const response = await fetch(`${extensionURL}locales/${locale}.json`).catch((err) => console.error(err));
	const translations = (await response?.json()) as typeof import("../../public/locales/en-US.json");
	const i18nextInstance = await new Promise<i18nInstanceType>((resolve, reject) => {
		const resources: {
			[k in AvailableLocales]?: {
				translation: typeof import("../../public/locales/en-US.json");
			};
		} = {
			[locale]: { translation: translations }
		};
		const instance = i18next.createInstance();
		instance.init(
			{
				debug: true,
				fallbackLng: "en-US",
				interpolation: {
					escapeValue: false
				},
				lng: locale,
				resources: resources as unknown as { [key: string]: Resource },
				returnObjects: true
			},
			(err) => {
				if (err) reject(err);
				else resolve(instance);
			}
		);
	});
	return i18nextInstance;
}
