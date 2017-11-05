import Realm from 'realm';

class Talk {
  static get() { return realm.objects(Talk.schema.name) }

  static schema = {
    name: 'Talk',
    primaryKey: 'id',
    properties: {
      id: 'int',
      event: 'string',
      name: 'string',
      description: 'string',
      slug: 'string',
      tag: { type: 'string', optional: true },
      native_language_code: 'string',
      media: 'string',
      image: 'string',
      speaker: 'string',
      published_at: { type: 'date', optional: true },
      has_sub: { type: 'bool', optional: true },
      length: { type: 'int', optional: true },
      script: { type: 'Script', optional: true },
    }
  }
};

class Script {
  static get() { return realm.objects(Script.schema.name) }
  static schema = {
    name: 'Script',
    primaryKey: 'talk_id',
    properties: {
      talk_id: 'int',
      lang: { type: 'string', optional: true },
      sens: { type: 'list', objectType: 'Sen' },
    }
  }
};

let Word = {
  name: 'Word',
  properties: { text: 'string', length: 'int' }
};

class Sen {
  static get() { return realm.objects(Sen.schema.name) }
  static schema = {
    name: 'Sen',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      start: 'int',
      end: 'int',
      content: 'string',
      words: { type: 'list', objectType: 'Word' },
      completed_gap: { type: 'bool', optional: true },
      completed_dict: { type: 'bool', optional: true },
      completed_date: { type: 'date', optional: true },
    }
  }
};

export const saveTalk = (talk, script) => {
  realm.write(() => {
    return realm.create(Talk.schema.name, {
      id: talk.id,
      event: talk.event,
      name: talk.name,
      description: talk.description,
      slug: talk.slug,
      tag: talk.tag,
      native_language_code: talk.native_language_code,
      media: talk.media,
      image: talk.image,
      speaker: talk.speaker,
      published_at: new Date(talk.published_at),
      has_sub: talk.has_sub,
      length: talk.length,
      script: {
        talk_id: script.talk_id,
        lang: script.lang,
        sens: script.sens,
      },
    }, true)
  })
}

export const saveScript = (script) => {
  realm.write(() => {
    return realm.create(Script.schema.name, {
      talk_id: script.talk_id,
      lang: script.lang,
      sens: script.sens
    }, true)
  })
}

export const getTalkById = (talkId) => {
  let talks = Talk.get().filtered(`script.talk_id= ${talkId}`);
  return talks[0];
}

export const getTalks = () => {
  const talks = Talk.get().sorted('published_at', 0);
  return talks;
}

export const deleteTalk = (talk) => {
  realm.write(() => {
    realm.delete(talk)
  })
}

export const getScripts = () => {
  const scripts = Script.get();//.sorted('-published_at', true)
  return scripts;
}

const realm = new Realm({ schema: [Talk, Script, Sen, Word] });


// User user = realm.where(User.class).equalTo("cardId", cardId).findFirst();

// if (user != null) {
//     // Exists
// } else {
//     // Not exist
// }

// export const getTodoItems = () => {
//   const todoItems = TodoItem.get().sorted('createdTimestamp', true)
//   return todoItems
// }

// export const getTodoItem = (id) => {
//   const todoItem = realm.objectForPrimaryKey(TodoItem, id)
//   return todoItem
// }

// export const updateTodoItem = (todoItem, value, completed) => {
//   realm.write(() => {
//     try {
//       todoItem.value = value
//       todoItem.completed = completed
//     } catch (e) {
//       console.warn(e)
//     }
//   })
// }

// export const createTodoItem = (value) => {
//   realm.write(() => {
//     return realm.create(TodoItem.schema.name, {
//       id: uuid.v1(),
//       value,
//       createdTimestamp: new Date()
//     })
//   })
// }

// export const deleteTodoItem = (todoItem) => {
//   realm.write(() => {
//     realm.delete(todoItem)
//   })
// }