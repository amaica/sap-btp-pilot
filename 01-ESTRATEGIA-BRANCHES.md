# 1. Estratégia de branches

## Visão geral

| Branch | Ambiente | Uso |
|--------|----------|-----|
| `main` | PROD | Código em produção; somente via merge de release ou hotfix. |
| `develop` | DEV | Integração contínua; desenvolvimento ativo. |
| `release/x.y.z` | HOM/QAS | Preparação da versão x.y.z; testes de aceitação. |
| `hotfix/x.y.z` | — | Correção urgente a partir de main; depois merge em main e develop. |

---

## Branch principal: `main`

- **O que é:** Única fonte de verdade do que está (ou esteve) em PROD.
- **Quando criar:** Já existe; é a branch inicial do repositório.
- **Quem faz merge nela:** Apenas `release/x.y.z` ou `hotfix/x.y.z` (via Pull Request).
- **Ambiente:** Representa o estado deployado em **PROD** (SAP BTP prod).
- **Regra:** Nenhum commit direto; nenhum merge de `develop` em `main`.

---

## Branch de desenvolvimento: `develop`

- **O que é:** Branch de integração onde as features são integradas antes de release.
- **Quando criar:** No início do projeto, a partir de `main` (ex.: primeiro commit em main, depois `git checkout -b develop`).
- **Quem faz merge nela:** Feature branches (`feature/*`), `release/*` (apenas correções de release) e `hotfix/*` (para trazer o hotfix de volta).
- **Ambiente:** Representa o estado deployado em **DEV** (BTP dev subaccount).
- **Regra:** Deploy contínuo (CI) em DEV a cada push/merge em `develop`.

---

## Branches de release: `release/x.y.z`

- **O que é:** Branch de preparação da versão `x.y.z` para HOM e depois PROD.
- **Quando criar:** Quando `develop` está pronta para uma nova versão (ex.: `release/1.2.0`).
- **Como criar:** A partir de `develop`:  
  `git checkout develop && git pull && git checkout -b release/1.2.0`
- **Quem faz merge nela:** Apenas correções de bugs/ajustes de release (commits ou merges de `develop` se necessário, com critério).
- **Merge de saída:**
  - **Em `main`:** Quando HOM/QAS está aprovado → merge de `release/x.y.z` em `main` (via PR).
  - **Em `develop`:** Sempre que `release/x.y.z` receber commits (para não perder correções).
- **Ambiente:** Representa o deploy em **HOM/QAS** (BTP staging subaccount).
- **Regra:** Após merge em `main`, a branch `release/x.y.z` pode ser removida.

---

## Branches de hotfix: `hotfix/x.y.z`

- **O que é:** Correção urgente de produção, sem passar por todo o ciclo de release.
- **Quando criar:** Quando há bug crítico em PROD e não dá para esperar a próxima release.
- **Como criar:** Sempre a partir de `main`:  
  `git checkout main && git pull && git checkout -b hotfix/1.2.1`
- **Quem faz merge nela:** Apenas commits de correção do bug.
- **Merge de saída:**
  - **Em `main`:** Quando o hotfix está validado → merge em `main` (via PR), tag, deploy PROD.
  - **Em `develop`:** Obrigatório, para que a correção não se perca no próximo release.
- **Ambiente:** Não tem branch “fixa”; o deploy do hotfix é feito em PROD após merge em `main` e tag.
- **Versionamento:** Hotfix incrementa **PATCH** (ex.: 1.2.0 → 1.2.1).

---

## Resumo de fluxo de merge

```
feature/* ──► develop
                    │
                    ▼
              release/x.y.z ──► main
                    │                │
                    └────────────────┼──► develop (correções de release)
                                     │
hotfix/x.y.z ───────────────────────► main
        │
        └────────────────────────────► develop
```

---

## Qual branch representa qual ambiente

| Branch | Ambiente SAP BTP | Pipeline |
|--------|-------------------|----------|
| `develop` | DEV (subaccount dev) | CI: build + deploy em DEV a cada push/merge |
| `release/x.y.z` | HOM/QAS (subaccount staging) | CD: build + deploy em HOM ao criar/atualizar release |
| `main` | PROD (subaccount prod) | CD: deploy em PROD apenas após tag (ex.: v1.2.0) |
