import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "app/**/_components/**/!(index).{ts,tsx,js,jsx}": "PASCAL_CASE",
          "app/**/_guard/**/!(index).{ts,tsx,js,jsx}": "PASCAL_CASE",
          "app/**/page.{ts,tsx,js,jsx}": "KEBAB_CASE",
          "app/**/layout.{ts,tsx,js,jsx}": "KEBAB_CASE",
          "app/**/route.{ts,tsx,js,jsx}": "KEBAB_CASE",
          "app/**/loading.{ts,tsx,js,jsx}": "KEBAB_CASE",
          "app/**/not-found.{ts,tsx,js,jsx}": "KEBAB_CASE",
          "app/**/error.{ts,tsx,js,jsx}": "KEBAB_CASE",
          "app/**/template.{ts,tsx,js,jsx}": "KEBAB_CASE",
          "app/**/default.{ts,tsx,js,jsx}": "KEBAB_CASE",

          "features/**/components/**/!(index).{ts,tsx,js,jsx}": "PASCAL_CASE",
          "features/**/hooks/**/!(index).{ts,tsx,js,jsx}": "CAMEL_CASE",

          "features/**/services/usecases/**/!(index).{ts,tsx,js,jsx}": "CAMEL_CASE",
          "features/**/services/data/BestSellerItem.{ts,tsx,js,jsx}": "PASCAL_CASE",
          "features/**/services/data/**/!(index|BestSellerItem).{ts,tsx,js,jsx}": "KEBAB_CASE",

          "features/**/types/**/!(index).{ts,tsx,js,jsx}": "PASCAL_CASE",
          "features/**/utils/FormatIDR.{ts,tsx,js,jsx}": "PASCAL_CASE",
          "features/**/utils/**/!(index|FormatIDR).{ts,tsx,js,jsx}": "CAMEL_CASE",

          "shared/components/ui/**/!(index).{ts,tsx,js,jsx}": "KEBAB_CASE",
          "shared/components/**/!(index).{ts,tsx,js,jsx}": "KEBAB_CASE",

          "**/index.{ts,tsx,js,jsx}": "FLAT_CASE",
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "features/**/": "KEBAB_CASE",
          "shared/**/": "KEBAB_CASE",
        },
      ],
    },
  },
]);

export default eslintConfig;
