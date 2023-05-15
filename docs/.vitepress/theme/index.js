import DefaultTheme, { VPHomeHero } from 'vitepress/theme'

import './style.css'

export default {
    ...DefaultTheme,

    enhanceApp(ctx) {
      DefaultTheme.enhanceApp(ctx)
      ctx.app.component('VPDocHero', VPHomeHero)
    },
}