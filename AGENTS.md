# Management Screen App — エージェント向けメモ

## 学習で質問した内容に関して
実装に関する疑問や質問は都度、下記例のQAの形式で`README.md`の`質問と回答（Q&A）`の項目に追加してください。
実装を依頼する内容と、AIのその回答する内容は追加しなくていいです。
例)
### Q: `export default function Home()` は自動で実行される関数ですか？
A: はい。Next.js (App Router) では、`app/page.tsx` で `export default` された関数は、そのパス（ルートURL `/`）へユーザーがアクセスした際、Next.jsによって自動的に呼び出され、UIとして描画（レンダリング）されます。

## GitHub Pages デプロイに関する注意事項

このプロジェクトは `https://itakurayuta1122.github.io/management-screen-app/` にデプロイされています。
GitHub Pages はサブパス（`/management-screen-app/`）でホスティングされるため、以下の設定が必須です。

---

### 1. `next.config.ts` の `basePath` / `assetPrefix` 設定

CSS・JS・フォントなどの静的アセットのパスを正しく解決するため、必ず設定すること。

```ts
const repo = "management-screen-app";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: { unoptimized: true },
};
```

---

### 2. `next/image` の画像パスには `basePath` を手動で付ける

`next/image` コンポーネントは **`basePath` を自動適用しない**（Next.js の仕様）。
`public/` 配下の画像を使う場合は、環境変数 `NEXT_PUBLIC_BASE_PATH` を使って明示的にプレフィックスを付けること。

**`.env.production`**
```
NEXT_PUBLIC_BASE_PATH=/management-screen-app
```

**コード例**
```tsx
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

<Image src={`${basePath}/example.png`} ... />
```

> ⚠️ ローカル開発時は `NEXT_PUBLIC_BASE_PATH` が未定義なので `""` になり、正常に動作する。

---

### 3. GitHub Pages の Jekyll 問題（最重要）

GitHub Pages はデフォルトで **Jekyll** が有効になっており、
**アンダースコア（`_`）で始まるフォルダ・ファイルをすべて無視する。**

Next.js の CSS・JS は `_next/` フォルダに出力されるため、**何も対策しないと CSS・JS が一切読み込まれない。**

**対策:** `gh-pages` の `--nojekyll` オプションを使う。

```json
// package.json
"deploy": "gh-pages -d out --nojekyll -f"
```

| オプション | 効果 |
|---|---|
| `--nojekyll` | `.nojekyll` ファイルを自動生成し、Jekyll を無効化する |
| `-f` | gh-pages ブランチの履歴を削除してクリーンにデプロイ（キャッシュ問題の回避） |

---

### デプロイ手順

```bash
npm run build    # .env.production が自動で読み込まれる
npm run deploy   # gh-pages -d out --nojekyll -f
```

> デプロイ後、GitHub Pages のキャッシュ更新に数分かかる場合がある。
> ブラウザキャッシュも `Ctrl+Shift+R` でクリアすること。
