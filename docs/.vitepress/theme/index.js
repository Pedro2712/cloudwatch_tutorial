import DefaultTheme, { VPHomeHero } from 'vitepress/theme'
import layout from './Layout.vue'
import ImgZoom from '../components/ImgZoom.vue'
import './style.css'

export default {
  ...DefaultTheme,

  Layout: layout,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VPDocHero', VPHomeHero)
    ctx.app.component('ImgZoom', ImgZoom)
  }
}
