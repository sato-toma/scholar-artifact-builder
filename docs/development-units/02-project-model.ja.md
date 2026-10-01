# 開発単位 02: Project Model の説明

この文書は、英語の [Development Unit 02](./02-project-model.md) を理解するための
日本語の派生ドキュメントです。実装仕様を別に定義するものではなく、現在の POC
モデルがどのような背景から作られているかを説明します。

## 1. 直接の参考資料

現在のモデルは、特定の外部フレームワークや既存製品のデータモデルをそのまま
採用したものではありません。主な根拠は次のプロジェクト文書です。

- `DEVELOPMENT_PLAN.md` の「Research Model」
- `DEVELOPMENT_PLAN.md` の「Project Configuration」
- `DEVELOPMENT_PLAN.md` の「Artifact Definition」
- [ADR 0001: PoC Boundaries and Minimal Architecture](../adr/0001-poc-boundaries.md)
- [ADR 0002: Minimal Markdown POC Output](../adr/0002-minimal-markdown-poc.md)
- [Development Unit 02: Project Model](./02-project-model.md)

これらの資料から、次の原則を取り出しています。

1. 研究プロジェクトが情報の source of truth になる。
2. Markdown、LaTeX、PDF などの出力形式を内部モデルにしない。
3. AI やネットワークを使わなくても検証と build ができる。
4. POC では最小のデータだけを扱い、将来の機能を先取りしない。

## 2. なぜ Project Model が必要か

`project.yaml` は人間が編集する入力形式です。一方、renderer が直接 YAML を
読むと、renderer が YAML の構造や設定上の細部に依存します。

そのため、次の境界を置きます。

```text
project.yaml
    |
    v
parse
    |
    v
validate and normalize
    |
    v
ResearchProject
    |
    v
renderer
```

この境界により、将来 YAML を TOML や JSON に変更しても、renderer 側の責務を
なるべく変更せずに済みます。現在の POC では YAML を使っていますが、モデル自体
は YAML の型ではありません。

## 3. 現在のモデル

現在は POC に必要な最小構成だけを定義しています。

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

研究プロジェクト全体を表します。`rootDirectory` は、section の相対パスが
プロジェクトの外へ出ていないかを検査するために使います。

### PaperArtifact

POC で生成対象にする paper artifact です。現段階では `type: paper` だけを受け
付けています。presentation や textbook は将来の開発単位で追加します。

### ResearchSection

paper に含める Markdown ファイルを順番付きで表します。順番は YAML の配列順を
保持します。これにより、後の renderer は section の順番をそのまま利用できます。

### ProjectConfigError

入力エラーを通常の文字列だけで返さず、診断コードと設定上の path を持つ構造化
エラーとして返します。CLI は将来、この情報を利用して利用者に分かりやすい診断を
表示できます。

## 4. 現在の実装が行う検証

`load-project.ts` は、次の処理を行います。

1. `project.yaml` を読む。
2. YAML を parse する。
3. `name` と `version` が空でない文字列か確認する。
4. `artifacts` が mapping か確認する。
5. artifact が `paper` 型か確認する。
6. section が 1 件以上あるか確認する。
7. section path が空でない相対パスか確認する。
8. `../outside.md` のように project root の外へ出る path を拒否する。
9. 問題がなければ `ResearchProject` に正規化する。

これは単なる形式チェックだけではありません。入力ファイルから内部モデルへ変換
する際に、後続処理が信頼できる前提を作っています。

## 5. 何を参考にした設計か

### プロジェクト固有の設計

`ResearchProject`、`PaperArtifact`、`ResearchSection` という名前と関係は、
このプロジェクトの研究成果物 build という目的から定義しています。一般的な
CMS、文書管理システム、論文データベースのモデルをコピーしたものではありません。

### Parse / Validate / Normalize の流れ

入力形式と内部モデルを分離するため、一般的な compiler front-end や設定ファイル
loader に見られる次の流れを参考にしています。

```text
raw input
   |
   v
parse
   |
   v
validate
   |
   v
normalized model
```

この流れを採用すると、renderer は不正な値や YAML 特有の表現を意識せずに済みます。

### Renderer 非依存の中間表現

`ResearchProject` は Markdown、LaTeX、PDF のいずれでもありません。これは元の
開発計画にある「研究プロジェクトを source of truth にする」という原則を、最小
POC のコード境界に反映したものです。

### パス境界の検証

section path を project root 内に限定しているのは、研究資料を読む処理が意図せず
プロジェクト外のファイルを参照しないためです。これは POC で扱うファイル入力に
対する基本的な境界検証です。

## 6. まだモデルに含めないもの

次の要素は開発計画には登場しますが、現在の POC モデルには含めません。

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

これらを先に追加すると、最初の検証対象である「設定と Markdown から artifact を
生成できるか」が不明確になります。POC が通った後、それぞれを別の development
unit として追加します。

## 7. 現在できることと、まだできないこと

### できること

- 最小の `project.yaml` を `ResearchProject` に変換する。
- paper の section 順序を保持する。
- 不正な artifact type を拒否する。
- project root 外の path を拒否する。
- renderer が利用できる安定した内部形式を作る。

### まだできないこと

- `sab validate` から読み込み処理を呼び出す。
- section ファイルが実際に存在するか確認する。
- Markdown を結合して `build/paper.md` を作る。
- PDF や LaTeX を生成する。
- claim と evidence の関係を検証する。

## 8. 今後の判断

YAML を TOML や JSON に変更する可能性は残っています。形式を変更する場合も、
`ResearchProject` という内部モデルとの境界を維持することが重要です。

また、現在の型は POC 用であり、公開 API や長期的な schema versioning を保証する
ものではありません。POC の実装結果を見てから、必要な項目と schema の形を決めます。
