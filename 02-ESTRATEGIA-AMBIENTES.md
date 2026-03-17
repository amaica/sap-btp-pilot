# 2. Estratégia de ambientes

## Mapeamento branch ↔ ambiente

| Branch | Ambiente | Subaccount BTP (exemplo) | Uso |
|--------|----------|---------------------------|-----|
| `develop` | **DEV** | `<org>-dev` / `pilot-dev` | Desenvolvimento e integração contínua. |
| `release/x.y.z` | **HOM / QAS** | `<org>-hom` / `pilot-staging` | Testes de aceitação e homologação antes de PROD. |
| `main` (após tag) | **PROD** | `<org>-prod` / `pilot-prod` | Produção. Deploy apenas via release ou hotfix + tag. |

---

## Promoção entre ambientes

A promoção é **sempre** via Git: não se “promove artefato” manualmente entre contas; o pipeline deploya a partir da branch/tag correta.

1. **DEV**  
   - **Fonte:** branch `develop`.  
   - **Gatilho:** push ou merge em `develop`.  
   - **Ação:** Pipeline (CI) faz build e deploy na subaccount DEV.  
   - **Promoção para HOM:** Não existe “promoção de DEV para HOM”. Cria-se `release/x.y.z` a partir de `develop` e o pipeline deploya essa branch em HOM.

2. **HOM/QAS**  
   - **Fonte:** branch `release/x.y.z`.  
   - **Gatilho:** Criação da branch `release/x.y.z` ou push nela.  
   - **Ação:** Pipeline (CD) faz build e deploy na subaccount HOM/QAS.  
   - **Promoção para PROD:** Merge de `release/x.y.z` em `main` + criação da tag `vx.y.z` → pipeline deploya a tag em PROD.

3. **PROD**  
   - **Fonte:** tag `vx.y.z` (que aponta para um commit em `main`).  
   - **Gatilho:** Criação da tag (ex.: `v1.2.0`) ou push da tag.  
   - **Ação:** Pipeline (CD) faz build a partir da tag e deploy na subaccount PROD.  
   - **Hotfix:** Branch `hotfix/x.y.z` a partir de `main` → merge em `main` → tag `vx.y.z` (patch) → deploy em PROD.

---

## Fluxo de promoção (sem hotfix)

```
develop (DEV)  ──►  release/x.y.z (HOM)  ──►  main + tag vx.y.z (PROD)
     │                      │                            │
   [CI]                  [CD]                         [CD]
  deploy DEV           deploy HOM                   deploy PROD
```

---

## Regras de promoção

- **DEV → HOM:** Não há “promoção de build”. Cria-se `release/x.y.z` a partir de `develop`; o pipeline deploya essa branch em HOM.
- **HOM → PROD:** Somente após aprovação (ex.: PR de `release/x.y.z` para `main` aprovado, testes em HOM ok). Merge em `main` + tag = gatilho de deploy em PROD.
- **Rollback em PROD:** Deploy da tag anterior (ex.: voltar para `v1.1.0` se `v1.2.0` falhar). O pipeline deve permitir deploy de uma tag já existente.
