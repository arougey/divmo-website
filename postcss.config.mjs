const config = {
  plugins: {
    '@tailwindcss/postcss': {},   // ← this wires up @import "tailwindcss"
    autoprefixer: {},             // ← still do your vendor prefixes
  },
};

export default config;
