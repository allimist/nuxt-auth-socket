import colors from 'vuetify/es5/util/colors'

export default {

  server: {
    // port: 3000, // default: 3000
    host: 'localhost', // default: localhost,
    timing: false
  },

  serverMiddleware: [
    // '~/api/index.js',
    '~/api_users/index.js',
    // '~/service/index.js'
    // '~/server/index.js'
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          // these are the API endpoints we created in Express
          // register: {
          //   url: '/api/auth/register',
          //   method: 'post',
          //   propertyName: 'token'
          // },
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: true,
          user: {
            url: '/api/auth/user',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
    },
    redirect: {
      login: '/login', // User will be redirected to this path if login is required
      logout: '/login', // User will be redirected to this path if after logout, current route is protected
      home: '/account' // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - e',
    title: 'e',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/vuetify',
    '~/io/module'

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // 'bootstrap-vue/nuxt', // enables bootstrap vue module
    // '@nuxtjs/axios', // enables Nuxt Axios module
    // '@nuxtjs/auth', // enables Nuxt Auth module
    // '~/io/module',
    // '~/io/t1'
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  io: {
    sockets: [
      {
        name: 'home',
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://nuxt-socket-io.herokuapp.com'
            : 'http://localhost:3000',
        vuex: {
          mutations: [{ progress: 'examples/SET_PROGRESS' }],
          actions: [{ chatMessage: 'FORMAT_MESSAGE' }],
          emitBacks: [
            'examples/someObj',
            'examples/sample',
            { 'examples/sample2': 'sample2' },
            'titleFromUser'
          ]
        },
        namespaces: {
          '/index': {
            emitters: ['getMessage2 + testMsg --> message2Rxd'],
            listeners: ['chatMessage2', 'chatMessage3 --> message3Rxd']
          },
          '/examples': {
            emitBacks: ['sample3', 'sample4 <-- myObj.sample4'],
            emitters: [
              'reset] getProgress + refreshInfo --> progress [handleDone'
            ],
            listeners: ['progress']
          }
        }
      },
      {
        name: 'chatSvc',
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://nuxt-socket-io.herokuapp.com'
            : 'http://localhost:3000'
        // vuex: {
        //   mutations: [{ progress: 'examples/SET_PROGRESS' }],
        //   actions: [{ chatMessage: 'FORMAT_MESSAGE' }],
        //   emitBacks: [
        //     'examples/someObj',
        //     'examples/sample',
        //     { 'examples/sample2': 'sample2' },
        //     'titleFromUser'
        //   ]
        // },
        // namespaces: {
        //   '/index': {
        //     emitters: ['getMessage2 + testMsg --> message2Rxd'],
        //     listeners: ['chatMessage2', 'chatMessage3 --> message3Rxd']
        //   },
        //   '/examples': {
        //     emitBacks: ['sample3', 'sample4 <-- myObj.sample4'],
        //     emitters: [
        //       'reset] getProgress + refreshInfo --> progress [handleDone'
        //     ],
        //     listeners: ['progress']
        //   }
        // }
      },
      { name: 'goodSocket', url: 'http://localhost:3000' },
      { name: 'badSocket', url: 'http://localhost:3001' },
      { name: 'work', url: 'http://somedomain1:3000' },
      { name: 'car', url: 'http://somedomain2:3000' },
      { name: 'tv', url: 'http://somedomain3:3000' },
      {
        name: 'test',
        url: 'http://localhost:4000',
        vuex: {
          mutations: [{ progress: 'examples/SET_PROGRESS' }],
          actions: [{ chatMessage: 'FORMAT_MESSAGE' }],
          emitBacks: ['examples/sample', { 'examples/sample2': 'sample2' }]
        }
      }
    ]
  }

}
