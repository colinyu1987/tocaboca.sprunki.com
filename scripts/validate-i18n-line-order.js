#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// 定义语言文件目录
const I18N_DIR = path.join(__dirname, "..", "i18n");

// 获取所有语言文件
const languages = [
  "en",
  "zh",
  "ar",
  "de",
  "es",
  "fr",
  "id",
  "it",
  "ja",
  "ms",
  "nl",
  "pl",
  "pt",
  "th",
  "tr",
  "vi",
];

// 需要检查的目录配置（自动扫描已存在的目录）
const directories = [
  { name: "messages", path: path.join(I18N_DIR, "messages") },
  { name: "pages/landing", path: path.join(I18N_DIR, "pages", "landing") }
].filter(dir => fs.existsSync(dir.path));

// 树节点
class Node {
  constructor() {
    this.order = []; // 对象的 key 顺序
    this.children = new Map(); // key -> Node
    this.arrayItems = null; // 如果是数组 → 存数组值
  }
}

// buildTree 改造
function buildTree(obj) {
  const node = new Node();

  if (Array.isArray(obj)) {
    if (obj.every((item) => typeof item !== "object" || item === null)) {
      // 基础类型数组 → 只存长度
      node.arrayItems = { type: "primitive", length: obj.length };
    } else {
      // 对象数组 → 递归
      node.arrayItems = { type: "object", length: obj.length };
      node.order = obj.map((_, i) => `[${i}]`);
      obj.forEach((item, i) => {
        node.children.set(`[${i}]`, buildTree(item));
      });
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (const key of Object.keys(obj)) {
      node.order.push(key);
      node.children.set(key, buildTree(obj[key]));
    }
  }

  return node;
}

// bfsCompareTrees 改造
function bfsCompareTrees(lang1, tree1, lang2, tree2) {
  const issues = [];
  const queue = [{ path: "", node1: tree1, node2: tree2 }];

  while (queue.length > 0) {
    const { path, node1, node2 } = queue.shift();

    // 如果是数组
    if (node1.arrayItems && node2.arrayItems) {
      // 基础类型数组 → 只比较长度
      if (
        node1.arrayItems.type === "primitive" &&
        node2.arrayItems.type === "primitive"
      ) {
        if (node1.arrayItems.length !== node2.arrayItems.length) {
          issues.push({
            type: "array_length_mismatch",
            path,
            lang1,
            lang2,
            len1: node1.arrayItems.length,
            len2: node2.arrayItems.length,
          });
        }
      }

      // 对象数组 → 比较长度 + 递归 key 顺序
      if (
        node1.arrayItems.type === "object" &&
        node2.arrayItems.type === "object"
      ) {
        if (node1.arrayItems.length !== node2.arrayItems.length) {
          issues.push({
            type: "array_length_mismatch",
            path,
            lang1,
            lang2,
            len1: node1.arrayItems.length,
            len2: node2.arrayItems.length,
          });
        } else {
          for (const key of node1.order) {
            const child1 = node1.children.get(key);
            const child2 = node2.children.get(key);
            if (child1 && child2) {
              queue.push({
                path: path ? `${path}${key}` : key,
                node1: child1,
                node2: child2,
              });
            }
          }
        }
      }
      continue;
    }

    // 如果一边是数组另一边不是
    if (
      (node1.arrayItems && !node2.arrayItems) ||
      (!node1.arrayItems && node2.arrayItems)
    ) {
      issues.push({
        type: "type_mismatch",
        path,
        lang1,
        lang2,
      });
      continue;
    }

    // 对象比较
    if (
      node1.order.length !== node2.order.length ||
      !node1.order.every((k, i) => k === node2.order[i])
    ) {
      issues.push({
        type: "order_mismatch",
        path,
        lang1,
        lang2,
        lang1Keys: node1.order,
        lang2Keys: node2.order,
      });
      continue;
    }

    // 顺序一致 → 深入子层
    for (const key of node1.order) {
      const child1 = node1.children.get(key);
      const child2 = node2.children.get(key);
      if (child1 && child2) {
        queue.push({
          path: path ? `${path}.${key}` : key,
          node1: child1,
          node2: child2,
        });
      } else if (child1 && !child2) {
        issues.push({
          type: "missing_in_second",
          path: path ? `${path}.${key}` : key,
          lang1,
          lang2,
        });
      } else if (!child1 && child2) {
        issues.push({
          type: "missing_in_first",
          path: path ? `${path}.${key}` : key,
          lang1,
          lang2,
        });
      }
    }
  }

  return issues;
}

// 验证指定目录的多语言文件
function validateDirectory(dirPath, dirName) {
  console.log(`\n📁 检查目录: ${dirName}`);
  console.log("=".repeat(50));

  const languageTrees = {};

  // 解析每个语言文件
  for (const lang of languages) {
    const filePath = path.join(dirPath, `${lang}.json`);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(content);
      const tree = buildTree(data);
      languageTrees[lang] = tree;
      console.log(`✅ 已加载 ${dirName}/${lang}.json`);
    } catch (err) {
      console.error(`❌ 无法加载 ${dirName}/${lang}.json: ${err.message}`);
      return false;
    }
  }

  console.log(`\n📊 开始比较 ${dirName} 目录...\n`);

  const baseLang = "en";
  const baseTree = languageTrees[baseLang];
  let hasIssues = false;

  for (const lang of languages) {
    if (lang === baseLang) continue;

    const issues = bfsCompareTrees(
      baseLang,
      baseTree,
      lang,
      languageTrees[lang]
    );

    if (issues.length > 0) {
      hasIssues = true;
      console.log(
        `⚠️  ${baseLang} vs ${lang} 发现不一致: 共 ${issues.length} 处`
      );

      // 显示所有不一致
      for (const issue of issues) {
        if (issue.type === "order_mismatch") {
          console.log(`  [顺序不一致] 路径: "${issue.path || "(root)"}"`);
          console.log(`    ${issue.lang1}: [${issue.lang1Keys.slice(0, 10).join(", ")}${issue.lang1Keys.length > 10 ? "..." : ""}]`);
          console.log(`    ${issue.lang2}: [${issue.lang2Keys.slice(0, 10).join(", ")}${issue.lang2Keys.length > 10 ? "..." : ""}]`);

          // 找出顺序差异
          const diff = [];
          for (let i = 0; i < Math.max(issue.lang1Keys.length, issue.lang2Keys.length); i++) {
            if (issue.lang1Keys[i] !== issue.lang2Keys[i]) {
              diff.push(`位置${i}: "${issue.lang1Keys[i] || '(无)'}" vs "${issue.lang2Keys[i] || '(无)'}"`);
              if (diff.length >= 3) break;
            }
          }
          if (diff.length > 0) {
            console.log(`    差异: ${diff.join(", ")}`);
          }

        } else if (issue.type === "missing_in_first") {
          console.log(`  [缺失键] ${issue.lang1}.json 缺少路径: "${issue.path}"`);

        } else if (issue.type === "missing_in_second") {
          console.log(`  [缺失键] ${issue.lang2}.json 缺少路径: "${issue.path}"`);

        } else if (issue.type === "array_length_mismatch") {
          console.log(`  [数组长度不一致] 路径: "${issue.path}"`);
          console.log(`    ${issue.lang1}.json: 长度 ${issue.len1}`);
          console.log(`    ${issue.lang2}.json: 长度 ${issue.len2}`);
          console.log(`    差异: ${Math.abs(issue.len1 - issue.len2)} 个元素`);

        } else if (issue.type === "type_mismatch") {
          console.log(`  [类型不一致] 路径: "${issue.path}"`);
          console.log(`    ${issue.lang1}.json 和 ${issue.lang2}.json 的数据结构不同（对象 vs 数组）`);

        } else {
          console.log(`  [${issue.type}] 路径: "${issue.path}"`);
          console.log(`    详情:`, JSON.stringify(issue, null, 2));
        }
      }
      console.log();
    } else {
      console.log(`✅ ${baseLang} 和 ${lang} 完全一致`);
    }
  }

  return !hasIssues;
}

// 主函数
function validateI18nLineOrder() {
  console.log("🔍 验证多语言文件的层级顺序一致性（支持数组）...\n");
  console.log(`📋 将检查 ${directories.length} 个目录，每个目录包含 ${languages.length} 种语言\n`);

  let allConsistent = true;

  // 验证所有配置的目录
  for (const dirConfig of directories) {
    const isConsistent = validateDirectory(dirConfig.path, dirConfig.name);
    allConsistent = allConsistent && isConsistent;
  }

  console.log("\n" + "=".repeat(60));
  console.log("最终结果");
  console.log("=".repeat(60));

  if (!allConsistent) {
    console.log("\n⚠️ 存在不一致，请用 en.json 的顺序作为基准修复");
    process.exit(1);
  } else {
    console.log("\n✅ 所有目录的语言文件完全一致！");
    console.log(`   检查了 ${directories.length} 个目录 × ${languages.length} 种语言 = ${directories.length * languages.length} 个文件`);
    process.exit(0);
  }
}

console.clear();
// 运行
validateI18nLineOrder();
