import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  plugins: [daisyui],
  daisyui: {
    themes: ["business", "winter","light"],
  },
};

export default config;