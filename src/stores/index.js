import * as todoStore from './TodoStore'
import * as talkStore from './TalkStore'
import * as scriptStore from './ScriptStore'
import * as asyncStorage from './asyncStorage'

export default {
  ...todoStore,
  ...talkStore,
  ...scriptStore,
  ...asyncStorage
}
