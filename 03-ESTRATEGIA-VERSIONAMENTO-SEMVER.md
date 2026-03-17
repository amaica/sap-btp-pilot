# 3. Estratégia de versionamento (SemVer)

## Padrão

**MAJOR.MINOR.PATCH** (ex.: `1.2.3`)

- **MAJOR:** Versão principal; mudanças incompatíveis com versões anteriores (API, contrato, comportamento que quebra compatibilidade).
- **MINOR:** Nova funcionalidade compatível com versões anteriores.
- **PATCH:** Correção de bugs; compatível com versões anteriores.

---

## Exemplos reais

| Versão | Uso |
|--------|-----|
| `0.1.0` | Primeira versão do piloto; ainda instável (0 = pré-produção). |
| `0.2.0` | Nova funcionalidade no piloto. |
| `1.0.0` | Primeira versão considerada estável para produção. |
| `1.1.0` | Nova feature (ex.: nova tela, novo serviço) em produção. |
| `1.1.1` | Bugfix em produção (hotfix ou release normal). |
| `2.0.0` | Breaking change (ex.: mudança de API, migração de modelo de dados). |

---

## Quando incrementar o quê

| Situação | Incremento | Exemplo |
|----------|------------|---------|
| Nova funcionalidade (feature) | **MINOR** | 1.2.0 → 1.3.0 |
| Correção de bug (release ou hotfix) | **PATCH** | 1.2.0 → 1.2.1 |
| Mudança incompatível (breaking) | **MAJOR** | 1.2.0 → 2.0.0 |
| Piloto / pré-produção | **MINOR** dentro de 0.x.y | 0.1.0 → 0.2.0 |

---

## Regras no contexto SAP BTP / pipeline

- **Release normal:** A versão da release é definida ao criar `release/x.y.z` (ex.: `release/1.2.0`). O PATCH pode ser 0 na abertura da release e só ser incrementado se houver correções na branch de release.
- **Hotfix:** Sempre incrementa PATCH em relação à versão atual em `main` (ex.: main em 1.2.0 → hotfix 1.2.1).
- **Tag:** A tag reflete a versão deployada em PROD: `v1.2.0`, `v1.2.1`, etc. O formato da tag é fixo: `v` + MAJOR.MINOR.PATCH.
