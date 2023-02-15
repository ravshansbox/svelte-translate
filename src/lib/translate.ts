export const translate = <Language extends string, Key extends string>(
	translations: Record<Language, Record<Key, string>>,
	language: Language,
	key: Key,
	vars: Record<string, string>
) => {
	let text = translations[language][key];

	if (!text) throw new Error(`no translation found for ${language}.${key}`);

	Object.keys(vars).forEach((varKey) => {
		const regex = new RegExp(`{{${varKey}}}`, 'g');
		text = text.replace(regex, vars[varKey]);
	});

	return text;
};
