export type GetDefaultLanguageParams<Language extends string> = {
	fallbackLanguage: Language;
	savedLanguageKey: string;
	supportedLanguages: Language[];
};

export const getDefaultLanguage = <Language extends string>({
	fallbackLanguage,
	savedLanguageKey,
	supportedLanguages
}: GetDefaultLanguageParams<Language>): Language => {
	const savedLanguage = window.localStorage.getItem(savedLanguageKey) as Language;
	if (supportedLanguages.includes(savedLanguage)) {
		return savedLanguage;
	} else {
		window.localStorage.removeItem(savedLanguageKey);
	}
	const systemLanguages = window.navigator.languages as Language[];
	const supportedSystemLanguage = systemLanguages.find((language) =>
		supportedLanguages.includes(language)
	);
	if (supportedSystemLanguage) {
		return supportedSystemLanguage;
	}
	return fallbackLanguage;
};
