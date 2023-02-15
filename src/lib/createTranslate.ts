import { derived, writable } from 'svelte/store';
import { getDefaultLanguage, type GetDefaultLanguageParams } from './getDefaultLanguage';
import { translate } from './translate';

type CreateTranslateParams<
	Language extends string,
	Key extends string
> = GetDefaultLanguageParams<Language> & {
	translations: Record<Language, Record<Key, string>>;
};

export const createTranslate = <Language extends string, Key extends string>({
	fallbackLanguage,
	savedLanguageKey,
	supportedLanguages,
	translations
}: CreateTranslateParams<Language, Key>) => {
	const language = writable<Language>(
		getDefaultLanguage({ fallbackLanguage, savedLanguageKey, supportedLanguages })
	);

	language.subscribe((value) => {
		window.localStorage.setItem(savedLanguageKey, value);
	});

	const t = derived(
		language,
		(language) =>
			(key: Key, vars: Record<string, string> = {}) =>
				translate(translations, language, key, vars)
	);

	return {
		language,
		t
	};
};
