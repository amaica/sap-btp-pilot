# 5. Fluxo completo de release

## Passo a passo (release normal)

### 1. Desenvolvimento em `develop`

- Desenvolvedores trabalham em feature branches e fazem merge em `develop`.
- A cada push/merge em `develop`, o pipeline CI faz build e deploy em **DEV** (BTP dev).
- `develop` permanece estável para abrir a release quando o produto estiver pronto.

### 2. Criação da branch `release/x.y.z`

- Decisão: “Versão 1.2.0 está pronta para homologação.”
- A partir de `develop`:
  ```bash
  git checkout develop && git pull origin develop
  git checkout -b release/1.2.0
  git push -u origin release/1.2.0
  ```
- A branch `release/1.2.0` passa a existir; o pipeline CD (se configurado) pode fazer o primeiro deploy em **HOM**.

### 3. Deploy em HOM

- O pipeline é acionado pelo push da branch `release/1.2.0` (ou por job manual “Deploy HOM” com ref `release/1.2.0`).
- Build é feito a partir de `release/1.2.0`; deploy na subaccount HOM/QAS do BTP.
- Não há promoção de artefato de DEV para HOM; o build é sempre a partir da branch.

### 4. Validação em HOM

- Testes de aceitação / homologação na subaccount HOM.
- Se houver bugs, correções são commitadas em `release/1.2.0` (e, se necessário, merge de volta em `develop` para não perder a correção).
- Quando HOM está aprovado, segue para merge em `main`.

### 5. Merge em `main`

- Abre-se Pull Request: `release/1.2.0` → `main`.
- Após revisão e aprovação, o merge é feito (squash ou merge commit, conforme convenção).
- `main` agora contém o código da versão 1.2.0.

### 6. Criação da tag

- No repositório local (após pull de `main`):
  ```bash
  git checkout main && git pull origin main
  git tag v1.2.0
  git push origin v1.2.0
  ```
- A tag `v1.2.0` aponta para o commit de merge em `main` (ou para o commit correto acordado).

### 7. Deploy em PROD

- O pipeline CD é acionado pela criação (ou push) da tag `v1.2.0`.
- O job faz build a partir de `refs/tags/v1.2.0` e deploy na subaccount **PROD** do BTP.
- PROD fica na versão 1.2.0; rastreável pela tag.

### 8. Atualizar `develop` e encerrar a release

- Se houve commits em `release/1.2.0` (correções), fazer merge de `release/1.2.0` em `develop`:
  ```bash
  git checkout develop && git pull origin develop
  git merge release/1.2.0
  git push origin develop
  ```
- Opcional: remover a branch remota `release/1.2.0` após o merge em `main` e em `develop`.

---

## Fluxo de hotfix (resumido)

1. Criar `hotfix/1.2.1` a partir de `main`.
2. Corrigir o bug na branch `hotfix/1.2.1`.
3. Deploy em HOM (opcional) para validar.
4. Pull Request `hotfix/1.2.1` → `main`; aprovar e fazer merge.
5. Tag `v1.2.1` em `main`; push da tag.
6. Pipeline deploya a tag em PROD.
7. Merge de `hotfix/1.2.1` em `develop` para manter alinhamento.
8. Remover branch `hotfix/1.2.1` (opcional).
