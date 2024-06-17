import fs from "fs";
import path from "path";
import prettier from "prettier";
import pluginSQL from "prettier-plugin-sql-cst";

// DBeaver "C:\Program Files\nodejs\node" ПУТЬ ДО ФАЙЛА\index.mjs ${file}

if (process.argv.length < 3) {
  console.error("Usage: node index.mjs <file>");
  process.exit(1);
}

const filePath = process.argv[2];
const absolutePath = path.resolve(filePath);

fs.readFile(absolutePath, "utf8", async (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    process.exit(1);
  }

  const prettierConfig = {
    plugins: [pluginSQL],
    parser: "postgresql",
  };

  try {
    const formatted = await prettier.format(data, {
      ...prettierConfig,
      filepath: absolutePath + ".sql",
    });
    console.log(formatted.trim());
  } catch (formatError) {
    console.log(data.trim());
  }
});
