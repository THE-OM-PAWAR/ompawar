import { build } from "vite";

build()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Build failed:", err);
    process.exit(1);
  });
