# 6. Convenção de commits

## Formato

```
<tipo>(<escopo opcional>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

- **Tipo:** obrigatório; define a natureza do commit.  
- **Escopo:** opcional; módulo/área (ex.: `auth`, `api`, `ui`).  
- **Descrição:** obrigatória; imperativo, minúscula, sem ponto no final.  
- **Corpo/rodapé:** opcional; detalhes ou referência a ticket.

---

## Tipos

| Tipo | Uso |
|------|-----|
| `feat` | Nova funcionalidade. |
| `fix` | Correção de bug. |
| `chore` | Tarefas de build, config, dependências; sem impacto em funcionalidade. |
| `docs` | Apenas documentação. |
| `refactor` | Refatoração sem mudança de comportamento observável. |
| `test` | Inclusão ou alteração de testes. |
| `style` | Formatação, espaços, etc.; sem mudança de código. |

---

## Exemplos

```
feat(ui): adiciona tela de listagem de pedidos
fix(auth): corrige expiração do token em BTP
chore(deps): atualiza @sap/cds para 7.x
docs: atualiza README com fluxo de release
refactor(api): extrai validação para serviço compartilhado
```

---

## Integração com pipeline / release

- **Conventional Commits** permite gerar CHANGELOG e determinar bump de versão (MINOR para `feat`, PATCH para `fix`, etc.) em ferramentas como `standard-version` ou `semantic-release`.  
- No piloto, pode ser opcional: a decisão de versão (release/x.y.z) continua manual; a convenção melhora legibilidade e histórico.
