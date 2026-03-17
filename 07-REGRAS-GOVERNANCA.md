# 7. Regras de governança

## Proteção da branch `main`

- **Proibir commit direto em `main`.**  
  Configurar no GitHub/GitLab: “Branch protection” em `main` com “Do not allow bypassing the above settings” para todos.
- **Exigir Pull Request** para qualquer alteração em `main`.  
  Nenhum push direto; todo código entra via merge de `release/*` ou `hotfix/*`.

---

## Pull Request e revisão

- **Todo merge em `main`** deve ser via Pull Request (ou Merge Request).
- **Revisão obrigatória:** Mínimo de 1 aprovação (ou conforme política do time) antes do merge.
- **Merge em `develop`:** Pode ser opcional exigir PR para `develop`; recomendado para manter qualidade.

---

## Controle de merge

- **Quem pode fazer merge em `main`:** Apenas maintainers/release managers (ou lista definida).  
  Configurar “Restrict who can push to matching branches” / “Allowed to merge” apenas para esse grupo.
- **Estratégia de merge:** Preferir “Squash and merge” ou “Merge commit” de forma consistente; documentar a escolha (ex.: “Squash para main, merge commit para develop”).

---

## Controle de releases

- **Criação de tag:** Restringir criação de tags ao mesmo grupo que pode fazer merge em `main`, ou usar pipeline que cria a tag após aprovação (ex.: job “Release” que faz merge + tag).
- **Branch `release/*`:** Pode ser criada por desenvolvedores; o merge de `release/*` em `main` segue as mesmas regras de PR e aprovação.
- **Branch `hotfix/*`:** Idem; merge em `main` somente via PR aprovado.

---

## Resumo de regras

| Regra | Implementação |
|-------|----------------|
| Nenhum push direto em `main` | Branch protection: “Require a pull request before merging”. |
| Revisão obrigatória | “Require approvals” (mín. 1). |
| Quem faz merge em `main` | “Restrict who can push/merge” → release managers. |
| Tag apenas em `main` | Política + pipeline que dispara PROD apenas para tags. |
| Release sempre via branch | Não fazer release a partir de `develop`; sempre `release/x.y.z` → `main` → tag. |
