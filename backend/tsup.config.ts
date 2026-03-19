import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/worker.ts"],
  format: ["esm"],
  dts: false, // Disable .d.ts generation to avoid NodeNext import issues
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "node20",
  external: [
    // Don't bundle these (they're in node_modules)
    "@prisma/client",
    "playwright",
  ],
  esbuildOptions(options) {
    options.platform = "node";
  },
});
