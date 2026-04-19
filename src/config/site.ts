export const siteConfig = {
  name: "CSS Filter Builder",
  title: "CSS Filter Builder — Visual CSS filter() Generator",
  description: "Build CSS filter() properties visually with live preview. Adjust blur, brightness, contrast, grayscale, hue-rotate, sepia, and more. Copy the generated CSS instantly.",
  url: "https://css-filter-builder.tools.jagodana.com",
  ogImage: "/opengraph-image",

  headerIcon: "Sliders",
  brandAccentColor: "#ec4899",

  keywords: [
    "css filter builder",
    "css filter generator",
    "css filter preview",
    "blur filter css",
    "brightness contrast css",
    "css filter tool",
    "grayscale sepia hue-rotate",
    "visual css editor",
    "web developer tools",
    "free css tools",
  ],
  applicationCategory: "DeveloperApplication",

  themeColor: "#a855f7",

  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/css-filter-builder",
    website: "https://jagodana.com",
  },

  footer: {
    about: "CSS Filter Builder is a free visual tool to create and preview CSS filter() properties — blur, brightness, contrast, hue-rotate, grayscale, sepia, and more — with one-click copy.",
    featuresTitle: "Features",
    features: [
      "9 CSS filter properties",
      "Live preview",
      "One-click copy",
      "Reset all filters",
    ],
  },

  hero: {
    badge: "Free CSS Tool",
    titleLine1: "Build CSS Filters",
    titleGradient: "Visually, Instantly",
    subtitle: "Drag sliders to tune blur, brightness, contrast, grayscale, hue-rotate, sepia and more. See the result live. Copy the CSS and you're done.",
  },

  featureCards: [
    {
      icon: "🎚️",
      title: "9 Filter Controls",
      description: "Blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, sepia — all in one place.",
    },
    {
      icon: "👁️",
      title: "Live Preview",
      description: "See filter changes applied in real time on a sample image as you drag each slider.",
    },
    {
      icon: "📋",
      title: "Copy Instantly",
      description: "The generated filter() CSS updates as you adjust. One click to copy it into your stylesheet.",
    },
  ],

  relatedTools: [
    {
      name: "CSS Box Shadow Generator",
      url: "https://css-box-shadow-generator.tools.jagodana.com",
      icon: "🟦",
      description: "Build layered box shadows visually with live preview.",
    },
    {
      name: "CSS Gradient Generator",
      url: "https://css-gradient-generator.tools.jagodana.com",
      icon: "🌈",
      description: "Create linear, radial, and conic CSS gradients visually.",
    },
    {
      name: "CSS Clamp Calculator",
      url: "https://css-clamp-calculator.tools.jagodana.com",
      icon: "📐",
      description: "Generate fluid clamp() values without the math.",
    },
    {
      name: "Color Format Converter",
      url: "https://color-format-converter.tools.jagodana.com",
      icon: "🎨",
      description: "Convert between HEX, RGB, HSL, HWB and OKLCH.",
    },
    {
      name: "Theme Contrast Checker",
      url: "https://theme-contrast-checker.tools.jagodana.com",
      icon: "⚡",
      description: "Check WCAG contrast ratios for your color palette.",
    },
    {
      name: "Screenshot Beautifier",
      url: "https://screenshot-beautifier.tools.jagodana.com",
      icon: "📸",
      description: "Transform plain screenshots into beautiful share-ready images.",
    },
  ],

  howToSteps: [
    { name: "Adjust filter sliders", text: "Drag any slider — blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, or sepia — to tune the effect.", url: "" },
    { name: "Watch the live preview", text: "The sample image updates instantly as you move sliders, giving you accurate visual feedback before copying.", url: "" },
    { name: "Copy the generated CSS", text: "Click the copy button next to the filter() code. Paste it directly into your CSS stylesheet.", url: "" },
    { name: "Reset if needed", text: "Click Reset All to return every filter to its default value and start fresh.", url: "" },
  ],
  howToTotalTime: "PT1M",

  faq: [
    {
      question: "What CSS filters can I build with this tool?",
      answer: "The tool covers all nine CSS filter functions: blur(), brightness(), contrast(), grayscale(), hue-rotate(), invert(), opacity(), saturate(), and sepia(). Adjust any combination and the filter() shorthand is generated automatically.",
    },
    {
      question: "Can I use multiple CSS filters at once?",
      answer: "Yes. CSS filter() accepts a space-separated list of functions. This tool lets you combine all nine filters simultaneously and generates the correct combined filter() value.",
    },
    {
      question: "Does this tool work in all browsers?",
      answer: "The CSS filter property is supported in all modern browsers including Chrome, Firefox, Safari, and Edge. The generated code requires no vendor prefixes for current browser versions.",
    },
    {
      question: "Is this tool free and does it require an account?",
      answer: "Completely free, no account required. Everything runs in your browser — no data is sent to any server.",
    },
    {
      question: "What is the difference between opacity() filter and the CSS opacity property?",
      answer: "Both reduce transparency, but filter: opacity() is composited differently by some browsers and can have GPU acceleration benefits. The CSS opacity property also affects child elements. For most use cases they are interchangeable.",
    },
  ],

  pages: {
    "/": {
      title: "CSS Filter Builder — Visual CSS filter() Generator",
      description: "Build CSS filter() properties visually with live preview. Adjust blur, brightness, contrast, grayscale, hue-rotate, sepia and more. Copy the generated CSS instantly.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
