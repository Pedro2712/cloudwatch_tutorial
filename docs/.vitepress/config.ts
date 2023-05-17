import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/cloudwatch_tutorial/',
  lang: 'pt-BR',
  title: "Cloudwatch",
  description: "This website will teach you how to set up two instances in different regions that will send logs to different CloudWatch instances. This information will be captured and redirected to the user by CloudTrail.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/contextualizacao' }
    ],

    

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Contextualização', link: '/contextualizacao' },
          { text: 'Projeto', link: '/projeto' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Pedro2712/cloudwatch_tutorial' }
    ],

    outline: 'deep',
    outlineTitle: 'Tópicos',

    footer: {
      copyright: '© 2023 Pedro Henrique Britto Aragão Andrade. Todos os direitos reservados.'
    }
  }
})
