function nuxtSocket(ioOpts) {
  const {
    name,
    channel = '',
    statusProp = 'socketStatus',
    persist,
    teardown = !persist,
    emitTimeout,
    emitErrorsProp = 'emitErrors',
    ioApiProp = 'ioApi',
    ioDataProp = 'ioData',
    apiIgnoreEvts = [],
    serverAPI,
    clientAPI,
    vuex,
    namespaceCfg,
    ...connectOpts
  } = ioOpts
  const pluginOptions = _pOptions.get()
  const { $config, $store: store } = this

  const runtimeOptions = { ...pluginOptions }
  if ($config && $config.io) {
    Object.assign(runtimeOptions, $config.io)
    runtimeOptions.sockets = validateSockets(pluginOptions.sockets)
      ? pluginOptions.sockets
      : []
    if (validateSockets($config.io.sockets)) {
      $config.io.sockets.forEach((socket) => {
        const fnd = runtimeOptions.sockets.find(({ name }) => name === socket.name)
        if (fnd === undefined) {
          runtimeOptions.sockets.push(socket)
        }
      })
    }
  }

  const mergedOpts = Object.assign({}, runtimeOptions, ioOpts)
  const { sockets, warnings = true } = mergedOpts

  warn =
    warnings && process.env.NODE_ENV !== 'production' ? console.warn : () => {}

  if (!validateSockets(sockets)) {
    throw new Error(
      "Please configure sockets if planning to use nuxt-socket-io: \r\n [{name: '', url: ''}]"
    )
  }

  let useSocket = null

  if (!name) {
    useSocket = sockets.find((s) => s.default === true)
  } else {
    useSocket = sockets.find((s) => s.name === name)
  }

  if (!useSocket) {
    useSocket = sockets[0]
  }

  if (!useSocket.name) {
    useSocket.name = 'dflt'
  }

  if (!useSocket.url) {
    warn(
      `URL not defined for socket "${useSocket.name}". Defaulting to "window.location"`
    )
  }

  if (!useSocket.registeredWatchers) {
    useSocket.registeredWatchers = []
  }

  if (!useSocket.registeredVuexListeners) {
    useSocket.registeredVuexListeners = []
  }

  let { url: connectUrl } = useSocket
  if (connectUrl) {
    connectUrl += channel
  }

  const vuexOpts = vuex || useSocket.vuex
  const { namespaces = {} } = useSocket

  let socket
  const label =
    persist && typeof persist === 'string'
      ? persist
      : `${useSocket.name}${channel}`

  if (!store.state.$nuxtSocket) {
    debug('vuex store $nuxtSocket does not exist....registering it')
    register.vuexModule({ store })
  }

  if (emitTimeout) {
    store.commit('$nuxtSocket/SET_EMIT_TIMEOUT', { label, emitTimeout })
  }

  function connectSocket() {
    if (connectUrl) {
      socket = io(connectUrl, connectOpts)
      console.info('[nuxt-socket-io]: connect', useSocket.name, connectUrl, connectOpts)
    } else {
      socket = io(channel, connectOpts)
      console.info(
        '[nuxt-socket-io]: connect',
        useSocket.name,
        window.location,
        channel,
        connectOpts
      )
    }
  }

  if (persist) {
    if (_sockets[label]) {
      debug(`resuing persisted socket ${label}`)
      socket = _sockets[label]
      if (socket.disconnected) {
        debug('persisted socket disconnected, reconnecting...')
        connectSocket()
      }
    } else {
      debug(`socket ${label} does not exist, creating and connecting to it..`)
      connectSocket()
      _sockets[label] = socket
    }
  } else {
    connectSocket()
  }

  const _namespaceCfg = namespaceCfg || namespaces[channel]
  if (_namespaceCfg) {
    register.namespace({
      ctx: this,
      namespace: channel,
      namespaceCfg: _namespaceCfg,
      socket,
      useSocket,
      emitTimeout,
      emitErrorsProp
    })
    debug('namespaces configured for socket', {
      name: useSocket.name,
      channel,
      namespaceCfg
    })
  }

  if (serverAPI) {
    register.serverAPI({
      store,
      label,
      apiIgnoreEvts,
      ioApiProp,
      ioDataProp,
      ctx: this,
      socket,
      emitTimeout,
      emitErrorsProp,
      serverAPI,
      clientAPI
    })
  }

  if (clientAPI) {
    register.clientAPI({
      ctx: this,
      store,
      socket,
      clientAPI
    })
  }

  if (vuexOpts) {
    register.vuexOpts({
      ctx: this,
      vuexOpts,
      useSocket,
      socket,
      store
    })
    debug('vuexOpts configured for socket', { name: useSocket.name, vuexOpts })
  }

  if (
    this.socketStatus !== undefined &&
    typeof this.socketStatus === 'object'
  ) {
    register.socketStatus({ ctx: this, socket, connectUrl, statusProp })
    debug('socketStatus registered for socket', {
      name: useSocket.name,
      url: connectUrl
    })
  }

  if (teardown) {
    register.teardown({
      ctx: this,
      socket,
      useSocket
    })
  }
  _pOptions.set({ sockets })
  return socket
}

export default function(context, inject) {
  //inject('nuxtSocket', nuxtSocket)
}
console.log('gi pl test')
console.log('gi pl test - connected')




// export let pOptions
// if (process.env.TEST) {
//   pOptions = {}
//   Object.assign(pOptions, _pOptions)
// }
