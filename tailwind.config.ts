import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"
import { boxShadow, fontFamily } from "tailwindcss/defaultTheme"
import plugin from "tailwindcss/plugin"

const reverseBoxShadowDirection = (str: string) => {
  const negateY = (str: string) => {
    const [x, y, ...rest] = str.trim().split(" ")

    if (y.split("").includes("-")) {
      return `${x} ${y.replace("-", "")} ${rest.join(" ")}`
    } else {
      return `${x} -${y} ${rest.join(" ")}`
    }
  }

  return str.split(",").map(negateY).join(",")
}

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./.ladle/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "desktop-header-width": "1280px",
        "tablet-header-width": "960px",
      },
      fontFamily: {
        sans: ["easyJet Rounded", ...fontFamily.sans],
        display: ["easyJet Generation CY", ...fontFamily.sans],
      },
      maxWidth: {
        prose: "70ch",
      },
      colors: {
        gray: colors.gray,
        orange: {
          lighter: "#FFAA00",
          light: "#FF8E00",
          DEFAULT: "#FF6600",
          dark: "#FF4600",
          darker: "#E64100",
        },
        primary: {
          DEFAULT: colors.gray[950],
        },
        secondary: {
          DEFAULT: colors.gray[600],
        },
        tertiary: {
          DEFAULT: colors.gray[400],
        },
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 7px 15px 1px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
        "sm-up": reverseBoxShadowDirection(boxShadow.sm),
        up: reverseBoxShadowDirection(boxShadow.DEFAULT),
        "md-up": reverseBoxShadowDirection(boxShadow.md),
        "lg-up": reverseBoxShadowDirection(boxShadow.lg),
        "xl-up": reverseBoxShadowDirection(boxShadow.xl),
        "2xl-up": reverseBoxShadowDirection(boxShadow["2xl"]),
      },
      borderColor: {
        DEFAULT: colors.gray[300],
      },
      borderWidth: {
        lg: "8px",
        md: "3px",
        sm: "1px",
        DEFAULT: "1.25px",
      },
      borderRadius: {
        md: "8px",
        DEFAULT: "3.5px",
      },
      transitionTimingFunction: {
        "dev-test-transition": "cubic-bezier(1.000,0.000,0.995,-0.050)",
        "arrow-in-out": "cubic-bezier(0.215,0.61,0.355,1)",
        DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
        standard: "cubic-bezier(0.4,0,0.2,1)",
        accelerate: "cubic-bezier(0.4,0,1,1)",
        decelerate: "cubic-bezier(0,0,0.2,1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    plugin(({ addVariant }) => {
      addVariant("screen", "@media screen")
      addVariant("print", "@media print")
      addVariant("print", ":is(.print &)")
    }),
  ],
} satisfies Config
