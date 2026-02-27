// Dynamic import enables code splitting in modern bundlers.
async function loadMathModule() {
  const module = await import('../05-oop-and-modules/modules/mathUtils.js')
  console.log('Lazy loaded add:', module.add(2, 3))
}

loadMathModule()
