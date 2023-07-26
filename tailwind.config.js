const { boxShadow, fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

const reverseBoxShadowDirection = (str) => {
  const negateY = (str) => {
    const [x, y, ...rest] = str.trim().split(" ")
    if (y.split("").includes("-")) {
      return `${x} ${y.replace("-", "")} ${rest.join(" ")}`
    } else {
      return `${x} -${y} ${rest.join(" ")}`
    }
  }
  return str.split(",").map(negateY).join(",")
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "config/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "var(--page-inset)",
    },
    extend: {
      screens: {
        "desktop-header-width": "1280px",
        "tablet-header-width": "960px",
      },
      fontFamily: {
        sans: ["easyJet Rounded", ...fontFamily.sans],
        display: ["easyJet Generation CY", ...fontFamily.sans],
      },
      colors: {
        gray: colors.neutral,
        orange: {
          light: "#FE8C00",
          DEFAULT: "#FF6600",
          dark: "#FF4500",
          darker: "#E64100",
        },
        primary: {
          DEFAULT: colors.neutral[950],
        },
        secondary: {
          DEFAULT: colors.neutral[500],
        },
        tertiary: {
          DEFAULT: colors.neutral[400],
        },
      },
      boxShadow: {
        "sm-up": reverseBoxShadowDirection(boxShadow.sm),
        up: reverseBoxShadowDirection(boxShadow.DEFAULT),
        "md-up": reverseBoxShadowDirection(boxShadow.md),
        "lg-up": reverseBoxShadowDirection(boxShadow.lg),
        "xl-up": reverseBoxShadowDirection(boxShadow.xl),
        "2xl-up": reverseBoxShadowDirection(boxShadow["2xl"]),
      },
      borderColor: (theme) => ({
        DEFAULT: theme("colors.gray.200"),
      }),
      borderRadius: {
        DEFAULT: "3px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
        test: "cubic-bezier(1.000, 0.000, 0.995, -0.050)",
        standard: "cubic-bezier(0.4,0,0.2,1)",
        accelerate: "cubic-bezier(0.4,0,1,1)",
        decelerate: "cubic-bezier(0,0,0.2,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
