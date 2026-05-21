/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');

const source = fs.readFileSync('src/config/tenants.ts', 'utf8');
const tenantsBlock = source.match(/export const TENANTS:[\s\S]*?= \{([\s\S]*?)\n\};/);

if (!tenantsBlock) {
  process.exit(0);
}

const slugs = [];
const keyPattern = /^\s+'([^']+)':\s*\{/gm;
let match;

while ((match = keyPattern.exec(tenantsBlock[1])) !== null) {
  slugs.push(match[1]);
}

console.log(slugs.join('\n'));
