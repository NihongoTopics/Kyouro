# Kyouro / 教育ローマ字

A modern romanization system for Japanese, together with the linguistic theory behind it.

> *In a world full of polyglot AIs, study Japanese to understand how language works.*

**Author:**  ([@awesomenewways](https://x.com/awesomenewways) on X)
**License / use:** Feel free to redistribute any part of these documents, as long as the original source is indicated.

*(日本語は下にあります / Japanese version below.)*

---

## What is Kyouro?

Kyouro (rhymes with *Kyoto*) is a romanization system designed so that learners can **type, read, and understand** Japanese sentences directly from the romanized form, without guessing hidden structure. It has two halves:

- **A theory** — how the meanings, tones, and structures of Japanese interact.
- **A spelling system** — a practical romanization that applies that theory.

Three design principles drive the spelling, in priority order:

1. **Typeability** — you can guess the keystrokes from the spelling (e.g. the moraic nasal is written with as many `n`'s as you press).
2. **Pronounceability** — a small set of rules derives the pronunciation from the spelling.
3. **Parseability** — phonological, syntactic, and semantic structure is reflected in spaces and a few special symbols.

The variety described is **Tokyo Japanese** (the "reference dialect"). Kyouro is meant to sit *alongside* normal Japanese orthography (a bit like *yomigana*), not replace it.

---

## Documents in this repository

These files form one project and are meant to be read together. The dependency runs roughly: **Proposing → Semantics → Version Seven → Concatenation**, with the later documents assuming the earlier ones.

### 1. `Proposing a new romanization system of Japanese (book).pdf`
The core book and the right place to start. It covers everything from purposes and design principles through prosody, lexical forms, word-level syntax, inflection, and the full spelling guidelines. Key ideas introduced here include the **CCGVG syllable theory**, the contour-tone system (**R / Lv / F**, and **nF** for "non-falling"), the **boundary fall**, the prosodic hierarchy (mora → syllable → AP → IP → sentence), the **triangle constraint** on stress, **$-theory**, and the boundary-label system used to describe Japanese syntax. Pages are referenced by alphabetically ordered English keywords instead of numbers (e.g. "»harmonica").

### 2. `Semantics of Tokyo Japanese.pdf`
A companion volume to *Proposing*, covering the semantic component of the grammar. It develops a formal notation for meaning — **contexts and topics** (with the prime notation `X′`, `X′′`), the **vinculum / dot notation**, **moods** (indicative, interrogative, imperative, …), **truth-conditional meaning**, **information structure** and how `$` is assigned, and a **lexicon** chapter on lexical insertion. 

### 3. `Version Seven.pdf`
The announcement of **Kyouro 7.0**. It lists the spelling and theory changes that arrive with version 7, including: deprecating the katakana dot rule; spacing token-internal AP boundaries and marking boundary falls with **ʻOkina** (active) and **ʼApostrophe** (latent); a definition of **stress**; making **$ strictly binary** for tokens, with **$-slots**, **$-spans**, and **$-diacritics**; the syllabicity dot becoming a **dieresis**; and **ch–j alternation** in inflection.

### 4. `Concatenation.pdf`
The newest and most theoretical piece (version 7.1). It proposes **phonosyntax** as part of the phonological component: phonological strings are recursively merged to build the input for prosody. Two operations are given formal definitions — **concatenation** (joining two strings) and **$-propagation** (a reinterpretation of *trimming* from *Proposing* that handles stress assignment). The upshot is that some of what has been called "syntax" may be better understood as phonology, which implies a *smaller* syntax.

---

## Other Kyouro materials & links

Kyouro is maintained by hand by one author, so occasional dead links are expected. The latest version is always in at least one of these places:

- **GitHub:** https://github.com/NihongoTopics/Kyouro/
- **Web (hosted PDFs):** https://nihongotopics.github.io/Kyouro/
- **Blog:** https://spokenjapanese.wordpress.com/
- **X:** https://x.com/awesomenewways

The repository's `data` folder also holds supporting material such as **Praat** recordings and collection files used for the boundary-fall measurements.

---

## Conventions worth knowing before reading

- **Notation contrast:** Japanese examples are often given in both **Hepburn** (italicized) and **Kyouro** (boldfaced); Hepburn examples don't always mark the word boundaries that Kyouro analyzes.
- Documents use **dot-separated three-digit version numbers** (e.g. `6.5.5`). The leftmost digit is the "major" Kyouro version; only statements in the highest version number on a given topic are in force, and older analyses stay valid until explicitly overwritten.
- These documents are works in progress — **errors are expected**, and they are updated at intervals.

---

## If you want to use or support Kyouro

The author is happy to help if you'd like to use Kyouro in a classroom, textbook, video, or blog, and also offers Japanese lessons. Reach out on X: [@awesomenewways](https://x.com/awesomenewways).

---
(Generated by Claude Opus 4.8, edited by hand)
---

# Kyouro / 教育ローマ字（日本語）

日本語のための現代的なローマ字表記システムと、その背後にある言語理論。

> *ポリグロットなAIだらけの世界で、言語のしくみを理解するために日本語を学ぼう。*

**著者:** （X: [@awesomenewways](https://x.com/awesomenewways)）
**ライセンス / 利用:** 出典を明記すれば、これらの文書のどの部分でも自由に再配布してよい。

---

## 教育ローマ字とは

教育ローマ字 (Kyouro) は、学習者がローマ字表記から直接、隠れた構造を推測せずに日本語の文を**打てて、読めて、理解できる**ように設計されたローマ字システム。二つの柱からなる。

- **理論** — 日本語の意味・声調・構造がどう相互作用するか。
- **綴りのシステム** — その理論を応用した実用的なローマ字表記。

綴りは、優先順位の高い順に三つの設計原理に従っている。

1. **タイパビリティ（打ちやすさ）** — 綴りからキーストロークが推測できる（例: 撥音は押す回数だけ `n` を書く）。
2. **発音可能性** — 少数の規則で綴りから発音が導ける。
3. **解析可能性** — 音韻・統語・意味の構造が、スペースと少数の記号で表記に反映される。

記述対象は**東京方言**（「参照方言」）。Kyouro は通常の日本語表記を**置き換える**ものではなく、（読み仮名のように）**併用される**ことを意図している。

---

## このリポジトリの文書

これらは一つのプロジェクトを構成していて、一緒に読まれることを前提にしている。依存関係はおおむね **Proposing → Semantics → Version Seven → Concatenation** で、後の文書ほど前の文書を前提にしている。

### 1. `Proposing a new romanization system of Japanese (book).pdf`
中核となる本で、最初に読むべきもの。目的と設計原理から、韻律、語彙形式、語レベルの統語、屈折、そして綴り規則の全体まで扱う。ここで導入される主な概念は、**CCGVG 音節理論**、曲線声調体系（**R / Lv / F**、および「非下降」を表す **nF**）、**境界下降（boundary fall）**、韻律階層（モーラ → 音節 → AP → IP → 文）、ストレスにかかる**三角制約**、**$理論**、そして日本語統語を記述する境界ラベル体系。ページは数字ではなく、アルファベット順の英単語キーワードで参照される（例:「»harmonica」）。

### 2. `Semantics of Tokyo Japanese.pdf`
*Proposing* の姉妹編で、文法の意味部門を扱う。意味の形式的な記法を展開する — **文脈とトピック**（プライム記法 `X′`, `X′′`）、**罫線（vinculum）/ ドット記法**、**ムード**（叙述・疑問・命令…）、**真理条件的意味**、**情報構造**と `$` の付与、そして語彙挿入を扱う**語彙**章。

### 3. `Version Seven.pdf`
**Kyouro 7.0** の告知 。バージョン7で入る綴りと理論の変更点を列挙する。例えば、カタカナのドット規則の廃止、トークン内部の AP 境界をスペース化し境界下降を **ʻOkina**（活性）と **ʼApostrophe**（潜在）で示すこと、**ストレス**の定義、トークンに対する **$ の厳密な二値化**（**$-slot**, **$-span**, **$-diacritics**）、音節性ドットの**分音記号（dieresis）**化、屈折における **ch–j 交替**など。

### 4. `Concatenation.pdf`
最も新しく、最も理論的な一篇（バージョン7.1）。音韻部門の一部として**音韻統語論（phonosyntax）**を提案する: 音韻列が再帰的にマージされて韻律の入力を組み立てる、という考え方。二つの操作に形式的定義を与える — **連結（concatenation）**（二つの文字列をつなぐ）と、**$伝播（$-propagation）**（*Proposing* の「トリミング」を再解釈し、ストレス付与を扱う）。結論として、「統語」と呼ばれてきたものの一部はむしろ音韻論として理解した方がよく、それは統語論が**より小さく**なることを含意する。

---

## その他の Kyouro 資料・リンク

Kyouro は著者ひとりが手作業で維持しているため、リンク切れが時々起こりうる。最新版は必ず次のいずれかにある。

- **GitHub:** https://github.com/NihongoTopics/Kyouro/
- **ウェブ（ホスト済み PDF）:** https://nihongotopics.github.io/Kyouro/
- **ブログ:** https://spokenjapanese.wordpress.com/
- **X:** https://x.com/awesomenewways

リポジトリの `data` フォルダには、境界下降の測定に使った **Praat** の録音や Collection ファイルなどの補助資料も入っている。

---

## 読む前に知っておくとよい約束ごと

- **表記の対比:** 日本語の例はしばしば **ヘボン式**（斜体）と **Kyouro**（太字）の両方で示される。ヘボン式の例は、Kyouro が分析する語境界を必ずしも示さない。
- 文書は**ドット区切りの三桁バージョン番号**（例: `6.5.5`）を使う。左端の桁が「メジャー」バージョンで、ある話題については最も大きいバージョン番号の記述だけが有効。古い分析は明示的に上書きされるまで有効のまま。
- これらは進行中の文書であり、**誤りがあることが前提**で、随時更新される。

---

## Kyouro を使いたい・支援したい場合

教室・教科書・動画・ブログで Kyouro を使いたい場合、著者は喜んで協力する。また日本語のレッスンも提供している。連絡は X の [@awesomenewways](https://x.com/awesomenewways) まで。

---

(Generated by Claude Opus 4.8, edited by hand)
