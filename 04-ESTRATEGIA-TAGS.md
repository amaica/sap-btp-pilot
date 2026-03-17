# 4. Estratégia de tags

## Padrão de tags

- **Formato:** `v` + MAJOR.MINOR.PATCH  
- **Exemplos:** `v0.1.0`, `v1.0.0`, `v1.2.3`, `v2.0.0`

---

## Quando criar tag

- **Release normal:** Após o merge de `release/x.y.z` em `main`. A tag é criada **em `main`** no commit do merge (ex.: `v1.2.0`).
- **Hotfix:** Após o merge de `hotfix/x.y.z` em `main`. A tag é criada **em `main`** no commit do merge (ex.: `v1.2.1`).

Nunca criar tag em `develop` nem em `release/*` antes do merge em `main`. A tag sempre aponta para um commit em `main`.

---

## Em qual branch criar a tag

- **Sempre em `main`.**  
- A tag é criada após o merge que leva a release ou o hotfix para `main`. O commit alvo da tag é esse merge commit (ou o commit de merge, conforme convenção do time).

---

## Relação da tag com deploy em PROD

- **Gatilho de deploy PROD:** Criação (ou push) da tag no remoto (ex.: `v1.2.0`).  
- **Pipeline:** O job de deploy PROD deve ser acionado pelo evento “tag criada” e fazer build/deploy a partir do ref da tag (ex.: `refs/tags/v1.2.0`).  
- **Rastreabilidade:** Cada deploy em PROD fica associado a uma tag; rollback = redeploy da tag anterior.

---

## Fluxo completo: develop → release → main → tag → PROD

1. **develop:** Desenvolvimento contínuo; deploy em DEV.  
2. **release/x.y.z:** Criada a partir de `develop`; deploy em HOM/QAS; validação.  
3. **Merge em main:** `release/x.y.z` → `main` (via PR aprovado).  
4. **Tag em main:** `git tag vx.y.z` no commit de merge em `main`; `git push origin vx.y.z`.  
5. **PROD:** Pipeline detecta a nova tag e executa deploy na subaccount PROD.

Hotfix: `main` → `hotfix/x.y.z` → correção → merge em `main` → tag `vx.y.z` (PATCH incrementado) → deploy PROD.
