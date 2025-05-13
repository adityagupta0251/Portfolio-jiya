import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Disable specific rules
      "@next/next/no-img-element": "off", // Allows <img> tags
      "react-hooks/exhaustive-deps": "warn", // Changes exhaustive-deps to a warning
      "react-hooks/rules-of-hooks": "warn", // Changes hook rules to a warning
      "jsx-a11y/alt-text": "warn", // Changes alt text to a warning
      "react/no-unescaped-entities": "warn", // Warns about unescaped entities
      
      // Optional: Add more specific rule disabling
      "no-unused-vars": "warn", // Warns about unused variables instead of erroring
      "react/prop-types": "off", // Disables prop-types checking
    },
    
    // Optional: Ignore specific files or patterns
    ignores: [
      // Example ignore patterns
      "**/node_modules/**",
      ".next/**",
      "public/**",
      "out/**"
    ]
  }
];

export default eslintConfig;