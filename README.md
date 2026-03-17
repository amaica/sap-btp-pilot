# Piloto SAP BTP – Governança Git e Pipeline

Repositório de **governança** para versionamento, branches, tags e promoção entre ambientes (DEV, HOM/QAS, PROD). Sem código de aplicação, CAP ou backend; foco em Git e fluxo de pipeline para SAP BTP / Cloud Foundry.

---

## Documentos

| # | Documento | Conteúdo |
|---|-----------|----------|
| 1 | [01-ESTRATEGIA-BRANCHES.md](01-ESTRATEGIA-BRANCHES.md) | main, develop, release/x.y.z, hotfix/x.y.z; quando criar, merge e ambiente. |
| 2 | [02-ESTRATEGIA-AMBIENTES.md](02-ESTRATEGIA-AMBIENTES.md) | Mapeamento develop→DEV, release→HOM, main→PROD; promoção. |
| 3 | [03-ESTRATEGIA-VERSIONAMENTO-SEMVER.md](03-ESTRATEGIA-VERSIONAMENTO-SEMVER.md) | MAJOR.MINOR.PATCH; quando incrementar; exemplos. |
| 4 | [04-ESTRATEGIA-TAGS.md](04-ESTRATEGIA-TAGS.md) | Padrão vx.y.z; quando e em qual branch criar; relação com deploy PROD. |
| 5 | [05-FLUXO-RELEASE-COMPLETO.md](05-FLUXO-RELEASE-COMPLETO.md) | Passo a passo: develop → release → HOM → main → tag → PROD. |
| 6 | [06-CONVENCAO-COMMITS.md](06-CONVENCAO-COMMITS.md) | feat, fix, chore, docs, refactor (opcional). |
| 7 | [07-REGRAS-GOVERNANCA.md](07-REGRAS-GOVERNANCA.md) | Proteção de main, PR, revisão, controle de merge e releases. |
| 8 | [08-EXEMPLOS-COMANDOS.md](08-EXEMPLOS-COMANDOS.md) | Comandos Git: criar branch, release, tag, push de tag. |

---

## Resumo do fluxo

- **DEV:** branch `develop` → pipeline CI → deploy em subaccount DEV.  
- **HOM/QAS:** branch `release/x.y.z` → pipeline CD → deploy em subaccount HOM.  
- **PROD:** merge de `release/x.y.z` ou `hotfix/x.y.z` em `main` → tag `vx.y.z` → pipeline CD → deploy em subaccount PROD.

---

## Uso em pipeline CI/CD

- **Build/Deploy DEV:** gatilho = push ou merge em `develop`.  
- **Build/Deploy HOM:** gatilho = push em `release/*`.  
- **Build/Deploy PROD:** gatilho = push de tag `v*` (ex.: `v1.2.0`).

Configurar o pipeline (Jenkins, GitHub Actions, Azure DevOps, etc.) para esses refs e executar build + deploy na subaccount BTP correspondente.
