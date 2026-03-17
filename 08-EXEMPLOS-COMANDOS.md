# 8. Exemplos de comandos

## Criar branch de desenvolvimento (uma vez no projeto)

```bash
git checkout main
git pull origin main
git checkout -b develop
git push -u origin develop
```

---

## Criar branch de release

```bash
# Versão 1.2.0
git checkout develop
git pull origin develop
git checkout -b release/1.2.0
git push -u origin release/1.2.0
```

---

## Corrigir bug na release (antes do merge em main)

```bash
git checkout release/1.2.0
git pull origin release/1.2.0
# ... alterações ...
git add .
git commit -m "fix: corrige validação do campo X"
git push origin release/1.2.0
```

---

## Criar branch de hotfix

```bash
# Produção está em 1.2.0; hotfix será 1.2.1
git checkout main
git pull origin main
git checkout -b hotfix/1.2.1
# ... correção ...
git add .
git commit -m "fix: corrige falha crítica no login"
git push -u origin hotfix/1.2.1
```

---

## Após merge em main: criar e enviar tag

```bash
git checkout main
git pull origin main
git tag v1.2.0
git push origin v1.2.0
```

---

## Tag anotada (recomendado para releases oficiais)

```bash
git checkout main
git pull origin main
git tag -a v1.2.0 -m "Release 1.2.0 - Descrição breve"
git push origin v1.2.0
```

---

## Trazer correções da release de volta para develop

```bash
git checkout develop
git pull origin develop
git merge release/1.2.0
git push origin develop
```

---

## Trazer hotfix de volta para develop

```bash
git checkout develop
git pull origin develop
git merge hotfix/1.2.1
git push origin develop
```

---

## Listar tags

```bash
git tag -l 'v*'
git tag -l 'v1.*'
```

---

## Deploy PROD via pipeline (conceitual)

- O pipeline (Jenkins, GitHub Actions, Azure DevOps, etc.) escuta o evento **push da tag** (ex.: `refs/tags/v*`).
- Job “Deploy PROD”:
  - Checkout do ref da tag (ex.: `v1.2.0`).
  - Build (ex.: `npm run build` ou build MTA/CF).
  - Deploy no BTP prod (ex.: `cf push` na org/space de prod).
- Nenhum comando Git adicional no deploy; a tag já existe no remoto.
