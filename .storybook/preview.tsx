import React from "react";
import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";

import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google";

import "../src/app/globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      // <ThemeProvider attribute="class" defaultTheme="light">
      <div className={montserrat.className}>
        <Story />
      </div>

      // </ThemeProvider>
    ),
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
