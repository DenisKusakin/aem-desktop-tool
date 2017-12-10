import getLogger from './../logger'

const gotFromRendererLogger = getLogger('Got from renderer')

export default event$ =>
  event$
    .do(x => gotFromRendererLogger.info(JSON.stringify(x, null, '\t')))
    .filter(x => false)
