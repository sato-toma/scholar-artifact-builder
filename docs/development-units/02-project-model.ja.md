# 開発単位 02: Project Model

この文書は、英語の [Development Unit 02](./02-project-model.md) を理解するための
日本語の非規範的な派生ドキュメントです。

## 要点

- 英語の計画書が正本です。
- この文書は背景理解のための要約です。
- 実装仕様や新しい決定を追加する文書ではありません。

## 直接の参考資料

- `DEVELOPMENT_PLAN.md`
  - Research Model
  - Project Configuration
  - Artifact Definition
- [ADR 0001](../adr/0001-poc-boundaries.md)
  - local-first
  - CLI-first
  - renderer 非依存モデル
- [ADR 0002](../adr/0002-minimal-markdown-poc.md)
  - POC 出力を Markdown に限定
- [英語の Development Unit 02](./02-project-model.md)

## 設計の背景

- `project.yaml` は人間が編集する入力形式。
- renderer が YAML を直接読むと、入力形式に強く依存する。
- そのため、次の変換境界を置く。

```text
project.yaml
    ↓
parse
    ↓
validate and normalize
    ↓
ResearchProject
    ↓
renderer
```

- YAML を将来 TOML や JSON に変更しても、renderer の責務を保ちやすい。
- `ResearchProject` は YAML、Markdown、LaTeX、PDF のいずれでもない。

## 現在の POC モデル

```text
ResearchProject
├── name
├── version
├── language (optional)
├── rootDirectory
└── artifacts
    └── PaperArtifact
        ├── id
        ├── type: paper
        └── sections[]
            ├── id
            └── path
```

### ResearchProject

- プロジェクト全体を表す。
- `name` と `version` を持つ。
- `language` は任意。
- `rootDirectory` はパス境界の検証に使う。

### PaperArtifact

- POC の生成対象。
- `type: paper` のみ対応。
- `sections` の順序を保持。
- presentation、textbook などは未対応。

### ResearchSection

- paper に含める Markdown ファイルを表す。
- `id` と相対 `path` を持つ。
- YAML の配列順を保持する。

### ProjectConfigError

- 設定エラーを構造化して返す。
- 診断コードを持つ。
- 設定上の path を持つ。
- CLI の利用者向けエラー表示に利用できる。

## `load-project.ts` の検証内容

- `project.yaml` を読み込む。
- YAML を parse する。
- `name` と `version` の必須チェック。
- `artifacts` の mapping チェック。
- artifact type が `paper` か確認。
- section が 1 件以上あるか確認。
- section path が空でない相対パスか確認。
- `../outside.md` などのプロジェクト外 path を拒否。
- 正常な入力を `ResearchProject` に normalize。

## 何を参考にしたか

### プロジェクト固有の設計

- `ResearchProject`、`PaperArtifact`、`ResearchSection` は本プロジェクト用に定義。
- CMS、文書管理システム、論文 DB のモデルをコピーしたものではない。

### 一般的な設計パターン

- compiler front-end や設定 loader の考え方を参考にした。
- 処理の流れは次のとおり。

```text
raw input → parse → validate → normalized model
```

- renderer から YAML 特有の表現と不正値を隔離する。
- 入力形式と内部モデルを分離する。

### パス境界

- section は project root 内に限定する。
- 意図しない外部ファイル参照を防ぐ。
- ファイル入力を扱うための基本的な境界検証である。

## POC で扱わないもの

- Claim
- Evidence
- Reference / bibliography
- Figure
- Table
- Equation
- Experiment
- Git provenance
- Dependency graph
- AI-generated content metadata

理由:

- 最初の検証対象を小さく保つため。
- `project.yaml + Markdown → ResearchProject` に集中するため。
- 後続機能は別の development unit として追加するため。

## 現在できること

- 最小の `project.yaml` を内部モデルへ変換する。
- paper の section 順序を保持する。
- 不正な artifact type を拒否する。
- project root 外の path を拒否する。
- renderer 非依存のモデルを作る。

## まだできないこと

- `sab validate` からモデルを読み込む。
- section ファイルの存在を確認する。
- `build/paper.md` を生成する。
- PDF や LaTeX を生成する。
- claim と evidence を検証する。

## 今後の判断

- YAML、TOML、JSON の最終選択は未確定。
- 入力形式を変更しても `ResearchProject` 境界は維持する。
- POC 用の型であり、公開 API や長期 schema versioning は保証しない。
- POC の結果を見て、必要な項目と schema を決める。
