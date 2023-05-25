---
# https://vitepress.dev/reference/default-theme-home-page
title: Início
layout: home
sidebar: false

hero:
  name: MonitorEC2 Alert+
  text: Aplicação de monitoramento
  tagline: O objetivo é a criação de alarmes para instâncias EC2 em duas regiões distintas com a utilização de CloudWatch e CloudTrail.
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