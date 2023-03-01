// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    srcDir:'src/',
    // Plugins:[{
    //     src:'~/src/plugins/element-ui/element-ui',
    //     ssr:true,
    // }],
    modules: [
        '@element-plus/nuxt',
      ],
    elementPlus: { /** Options */ },
    css: ['element-plus/dist/index.css'],
    runtimeConfig: {
      public: {
        strapi_base_url: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:1337' : 'https://cms.xxx',
        graphql_url: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:1337/graphql' : 'https://cms.xxx/graphql',
      },
    },
    app:{
      head: {
        link:[
          { rel:'icon' , type:'image/ico' , href:'/favicon.ico'}
        ]
      } 
    },
})


