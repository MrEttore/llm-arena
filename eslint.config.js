import pluginPrettier from "eslint-plugin-prettier";
import tailwind from "eslint-plugin-tailwindcss";

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        languageOptions: { globals: globals.browser },
        plugins: {
            react: pluginReact,
            "react-hooks": pluginReactHooks,
            prettier: pluginPrettier,
            tailwindcss: tailwind,
        },
        rules: {
            ...pluginReact.configs.recommended.rules,
            ...pluginReactHooks.configs.recommended.rules,
            ...tailwind.configs.recommended.rules,
            "prettier/prettier": "warn",
            "react/react-in-jsx-scope": "off",
        },
    },
];
