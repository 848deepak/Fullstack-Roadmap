'use strict';

// Mini Project: extensible plugin system.
// Beginner: plugins are functions that receive and modify context.
// Advanced: ordered middleware enables clean feature extension at runtime.
class PluginEngine {
  constructor() {
    this.plugins = [];
  }

  use(plugin) {
    if (typeof plugin !== 'function') throw new Error('Plugin must be a function');
    this.plugins.push(plugin);
  }

  async run(initialContext = {}) {
    let context = { ...initialContext };

    for (const plugin of this.plugins) {
      context = await plugin(context);
      if (!context || typeof context !== 'object') {
        throw new Error('Plugin must return context object');
      }
    }

    return context;
  }
}

const engine = new PluginEngine();
engine.use(async (ctx) => ({ ...ctx, requestId: 'req-001' }));
engine.use(async (ctx) => ({ ...ctx, authorized: true }));
engine.use(async (ctx) => ({ ...ctx, result: `Hello ${ctx.user}` }));

engine.run({ user: 'Deepak' }).then((ctx) => console.log(ctx));
