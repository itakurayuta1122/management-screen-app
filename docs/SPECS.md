# 管理画面アプリ設計書

-   **プロジェクト名**：Admin Dashboard
-   **バージョン**：1.0.0
-   **作成日**：2026-08-07
-   **開発環境**：React + TypeScript + Next.js (App Router)

## 1. 概要

ユーザー情報を管理するシンプルな管理画面を作成する。

Todoアプリ・家計簿アプリで学習した内容を応用し、実務でよく使われる管理画面の基本構成を学習する。

### 学習内容

-   CRUD（追加・一覧・更新・削除）
-   フォーム入力
-   検索機能
-   ソート機能
-   useMemo
-   複数コンポーネント構成
-   LocalStorage
-   TypeScriptによる型設計

## 2. 画面一覧

  画面ID    画面名
  --------- ------------------
  SCR-001   ユーザー管理画面

## 3. 機能一覧

  No      機能
  ------- ------------------
  F-001   一覧表示
  F-002   ユーザー追加
  F-003   ユーザー編集
  F-004   ユーザー削除
  F-005   検索
  F-006   並び替え
  F-007   登録件数表示
  F-008   LocalStorage保存
  F-009   LocalStorage読込

## 4. データ設計

``` ts
export interface User {
  id: number;
  name: string;
  age: number;
  department: string;
}
```

## 5. 状態管理

``` ts
const [users, setUsers] = useState<User[]>([]);
const [name, setName] = useState("");
const [age, setAge] = useState(20);
const [department, setDepartment] = useState("");
const [keyword, setKeyword] = useState("");
const [editingId, setEditingId] = useState<number | null>(null);
const [sortAsc, setSortAsc] = useState(true);
```

## 6. コンポーネント設計

``` text
app/
└── page.tsx

components/
├── SearchBar.tsx
├── UserForm.tsx
├── UserTable.tsx
├── UserRow.tsx
└── Summary.tsx

types/
└── user.ts
```

## 7. 実装順序

1.  プロジェクト作成
2.  画面レイアウト作成
3.  User型作成
4.  ダミーデータ表示
5.  mapで一覧表示
6.  Propsで受け渡し
7.  useState導入
8.  ユーザー追加
9.  編集機能
10. 削除機能
11. 検索機能
12. 並び替え機能
13. useMemo導入
14. useEffect導入
15. LocalStorage保存
16. LocalStorage読込
17. Component整理
18. リファクタリング

## 8. 学習目標

-   CRUDとは何か
-   useMemoを使う理由
-   検索機能の実装方法
-   sort()を使った並び替え
-   編集機能の考え方
-   LocalStorageでデータを永続化する方法
-   コンポーネントの責務分割
-   Reactで管理画面を設計する考え方
