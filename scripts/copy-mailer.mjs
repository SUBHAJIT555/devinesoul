import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const from = path.join(root, "mailer");
const to = path.join(root, "out", "mailer");

rmSync(to, { recursive: true, force: true });
mkdirSync(to, { recursive: true });

for (const name of ["send.php", "config.php", "config.example.php", ".htaccess"]) {
  cpSync(path.join(from, name), path.join(to, name));
}

cpSync(path.join(from, "lib"), path.join(to, "lib"), { recursive: true });
