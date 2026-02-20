# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Mixer AI** — 프로젝트 아이디어를 자연어로 입력하면 최적의 AI 테크스택 조합을 추천해주는 싱글 페이지 웹앱.
GitHub: https://github.com/fresm06/MixerAI

## Development

빌드 도구, 패키지 매니저, 테스트 프레임워크 없음. 브라우저에서 직접 열면 됩니다.

```bash
# 로컬 실행 (Python 내장 서버 활용)
python -m http.server 8080
# 또는 VS Code Live Server 확장으로 index.html 열기
```

## Architecture

**모든 코드는 `index.html` 단일 파일에 있습니다** (HTML + CSS + JS 인라인).

### CSS 구조 (`:root` 디자인 토큰 기반)

CSS 변수는 파일 상단 `:root` 블록에 집중 관리됩니다. 색상·폰트 변경은 반드시 여기서만 수정합니다.

| 변수 그룹 | 주요 변수 |
|-----------|-----------|
| 배경 | `--bg-root`, `--bg-card` |
| 색상 | `--primary-a` (보라 `#6C63FF`), `--primary-b` (시안), `--accent` (민트 `#00F5D4`) |
| 폰트 | `--font-display` (Syne), `--font-body` (DM Sans), `--font-mono` (JetBrains Mono) |

CSS 섹션은 `/* ===== SECTION NAME ===== */` 주석으로 구분됩니다.

### JS 동작 흐름 (현재: 프론트엔드 Mock)

```
사용자 입력 → #btn-submit 클릭
  → runLoading(query)          // 3단계 텍스트 전환 + 스피너 (약 2.7초)
  → showResults()              // #results 섹션 display:block + scrollIntoView
  → 하드코딩된 카드 5개 표시   // 실제 AI 호출 없음
```

필터 상태(예산·기술수준·플랫폼)는 DOM의 `.active` 클래스로만 추적되며, 현재 결과에 반영되지 않습니다 (Phase 2 기능).

### 주요 DOM ID

| ID | 역할 |
|----|------|
| `#project-input` | 사용자 텍스트 입력 |
| `#loading` | 로딩 오버레이 (fixed, `show` 클래스로 표시) |
| `#results` | 결과 섹션 (`show` 클래스로 표시) |
| `#result-query-text` | 결과 상단에 표시되는 입력 쿼리 |
| `#stack-grid` | 추천 카드 컨테이너 |

### 현재 상태 (MVP Demo)

- 추천 결과는 **하드코딩된 정적 데이터** (Claude API, AWS Rekognition, Supabase, Vercel+FastAPI, Next.js)
- 실제 AI 연동을 위해서는 `runLoading()` 내 `showResults()`를 AI API 호출로 교체 필요
- PRD Phase 2: 필터 로직 실제 적용, 아키텍처 다이어그램 동적 생성

## Git & 배포 규칙

**모든 작업 완료 후 반드시 main 브랜치에 푸시합니다.**

```bash
git add -p                          # 변경 파일 확인 후 스테이징
git commit -m "커밋 메시지"
git push origin main
```

- 커밋 메시지는 변경 내용을 명확히 기술합니다 (예: `fix: 입력창 중앙 정렬`, `feat: 결과 카드 hover 효과 추가`)
- 작업 단위가 크면 논리적으로 분리해 여러 커밋으로 나눠도 되지만, **마지막 커밋 후 push는 필수**입니다.
- remote: `https://github.com/fresm06/MixerAI` (branch: `main`)

## PRD 참고

전체 기능 요구사항 및 로드맵은 `docs/PRD.md` 참고.
