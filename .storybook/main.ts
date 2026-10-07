import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  // 컴포넌트 옆에 둔 *.stories.tsx 파일을 모두 읽어 옴
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs", // props 표와 설명 문서를 자동으로 만들어 줌
    "@storybook/addon-a11y", // 접근성 자동 검사 패널
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // SCSS 안의 @use "@/styles/mixins" 에서 "@/"가 src 폴더를 가리키도록 알려 줌
  viteFinal: (viteConfig) => {
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "@": fileURLToPath(new URL("../src", import.meta.url)),
    };
    return viteConfig;
  },
};

export default config;
