---
# https://vitepress.dev/reference/default-theme-home-page
title: Início
layout: home
sidebar: false

hero:
  name: "Computação em nuvem"
  text: "projeto para a matéria de computação em nuvem"
  tagline: Configure suas instâncias de forma simples e eficiente com o nosso guia completo de logs e monitoramento na nuvem.
  actions:
    - theme: brand
      text: Contextualização
      link: /contextualizacao
    - theme: alt
      text: Projeto
      link: /projeto

# features:
# - icon: 👨
#   title: Pedro Henrique Britto Aragão Andrade
#   details: Criador do projeto, sendo responsável por toda a parte de infraestrutura, configuração do site, documentação e contextualização do projeto.
#   link: https://github.com/Pedro2712
#   linkText: Github
# - icon: 👨
#   title: Luciano Felix
#   details: Luciano foi fundamental na criação visual do site, trazendo habilidades e expertise em design que agregaram valor estético e funcionalidade ao projeto. Com sua criatividade e atenção aos detalhes, ele contribuiu para uma experiência visualmente atraente e intuitiva para os visitantes do site.
#   link: https://github.com/FelixLuciano
#   linkText: Github
members:
  - avatar: 'https://www.github.com/Pedro2712.png'
    name: 'Pedro H. B. A. Andrade'
    title: 'Autor'
    links:
    - icon: 'github' 
      link: 'https://github.com/Pedro2712'

  - avatar: 'https://www.github.com/FelixLuciano.png'
    name: 'Luciano Felix'
    title: 'Template'
    links:
    - icon: 'github' 
      link: 'https://github.com/FelixLuciano'
---

<script setup>
  import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
</script>

<VPTeamPage class="VPHomeDocTeamPage">
  <VPTeamMembers size="small" :members="$frontmatter.members" />
</VPTeamPage>