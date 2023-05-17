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