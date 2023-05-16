<script setup>
import { useData } from 'vitepress'
import {
  VPTeamPage,
  VPTeamMembers,
} from 'vitepress/theme'

import VPHomeHero from 'vitepress/dist/client/theme-default/components/VPHomeHero.vue'
import VPHomeFeatures from 'vitepress/dist/client/theme-default/components/VPHomeFeatures.vue'

const { frontmatter } = useData()
</script>

<template>
  <VPHomeHero class="VPHomeDocHero" />
  <VPHomeFeatures class="VPHomeDocFeatures" />

  <template v-if="frontmatter.members">
    <VPTeamPage class="VPHomeDocTeamPage">
      <VPTeamMembers size="small" :members="$frontmatter.members" />
    </VPTeamPage>
  </template>
</template>


<style>
.VPHomeDocHero .VPButton.brand {
  animation-name: bounce;
  animation-delay: 2s;
  animation-duration: 1s;
  animation-iteration-count: 3;
  transform-origin: center bottom;
}
.VPHomeDocHero .VPImage {
  width: 256px;
}
.VPHomeDocHero ~ .Layout > .VPContent h2:first-of-type {
    margin-top: 0;
    border-top: none;
    padding-top: 0;
}

.VPDocHero .VPImage{
  width: 128px;
}

@keyframes bounce {
  /* Source: https://github.com/animate-css/animate.css/blob/main/source/attention_seekers/bounce.css */
  from, 20%, 53%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05);
  }
  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }
  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
}
</style>

<style scoped>
.VPHomeDocHero {
    --vp-home-hero-image-background-image: linear-gradient( -45deg, var(--vp-c-brand) 50%, var(--vp-c-brand-accent) 50% );

    padding-top: var(--vp-nav-height) !important;
    margin-top: var(--vp-nav-height) !important;
}
.VPHomeDocTeamPage {
  margin-top: 24px;
  padding-bottom: 64px !important;
}

.VPFeature .title {
  font-size: 1.5rem;
}
</style>
