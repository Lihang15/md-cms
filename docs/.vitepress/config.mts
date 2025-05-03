import { defineConfig } from 'vitepress'
import { generateSidebar } from './sidebar'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite:{
    // resolve:{
    //   alias:[
    //     {
    //       find: /^.*\/VPSidebarItem\.vue$/,
    //       replacement: fileURLToPath(
    //         new URL('./components/CustomVPSidebarItem.vue',import.meta.url)
    //       )
    //     }
    //   ]
    // }
    define: {
      API_ENV: JSON.stringify(process.env.API_ENV)
    }
  },
  base: "/md-cms/",
  title: "Lihang's cms",
  description: "A VitePress Site",
  ignoreDeadLinks: true,
  cleanUrls: true,
  head:[
     ["link",{rel: "icon", href: "/assets/asset8600/logo/logo.png"}]
  ],

  locales:{
    root: {
      label: 'English',
      lang: 'en',
      themeConfig:{
        sidebar: {
          '/Software-center':[
            {
              // link:'/Sts8600',
              // collapsed:true,
              // text:'Sts8600 Documentation',
              items:generateSidebar('Software-center')
            }
          ],
          '/Foreign-language':[
            {
              // link:'/Sts8600',
              // collapsed:true,
              // text:'Sts8600 Documentation',
              items:generateSidebar('Foreign-language')
            }
          ]
        },
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh', // 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/zh', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
      dir: 'zh',
      themeConfig:{
        sidebar:{
          '/zh/':[
            {
              items:generateSidebar('zh/')
              }
          ],
         
        }
      }
      // 其余 locale 特定属性...
    },
    // jp: {
    //   label: '日本語',
    //   lang: 'jp', // 可选，将作为 `lang` 属性添加到 `html` 标签中
    //   link: '/jp', // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的
    //   dir: 'jp',
    //   themeConfig:{
    //     sidebar:{
    //       '/jp':[
    //         {
    //           // text: 'STS8600 Documentation-jp',
    //           // collapsed: true,
    //           // link: '/jp/STS8600-Documentation',
    //           items:generateSidebar('jp/level1')
    //           }
    //       ],
    //     }
    //   }
    //   // 其余 locale 特定属性...
    // }
  },
  themeConfig: {
    logo:"/assets/asset8600/logo/logo.png",
    search: {
      provider: 'local',
      options: {
        locales: {
           zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          },
          // jp: {
          //   translations: {
          //     button: {
          //       buttonText: '文書を検索します',
          //       buttonAriaLabel: '文書を検索します'
          //     },
          //     modal: {
          //       noResultsText: '相関は見られません',
          //       resetButtonTitle: 'クエリ条件を削除します',
          //       footer: {
          //         selectText: '選択します',
          //         navigateText: '切り替えます'
          //       }
          //     }
          //   }
          // }
        },
        // _render(src,env,md){
        //   const html = md.render(src, env)
        //   //  return '<div>xxaxaxax</div>
        //   md.render('xxxx')
        //    return '<div>123</div>'+html
        // }
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],
    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      copyright: 'Copyright © 2025"'
    },
  },

})

// const data = generateSidebar('Sts8600')
// console.log(data);


