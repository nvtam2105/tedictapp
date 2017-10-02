import * as realm from './TodoStore'
import * as asyncStorage from './asyncStorage'

export default {
  ...realm,
  ...asyncStorage
}
