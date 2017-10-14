import Realm from 'realm';

class Talk {
  static get () { return realm.objects(Talk.schema.name) }
  static schema = {
    name: 'Talk',
    primaryKey: 'id',
    properties: {
      id: 'int',
      event: 'string',
      image_16x9:  'string',
      name: 'string',
      description: 'string',
      published_at: { type: 'date', optional: true},
      updated_at: { type: 'date', optional: true},
      media: 'string',
      script: {type : 'Script'},
    }
  }
};

class Script {
  static get () { return realm.objects(Script.schema.name) }
  static schema = {
    name: 'Script',
    primaryKey: 'talk_id',
    properties: {
      talk_id:  'int',
      sens: {type: 'list', objectType: 'Sen'},
    }
  }
};

let StringObjectSchema = {
  name: 'StringObject',
  properties: { text: 'string' }
};

class Sen {
  static get () { return realm.objects(Sen.schema.name) }
  static schema = {
    name: 'Sen',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      start: 'int',
      end: 'int',
      content: 'string',
      words : {type: 'list',  objectType:'StringObject'},
    }
  }
};

export const saveTalk = (talkData, scriptData) => {
   realm.write(() => {
    return realm.create(Talk.schema.name, {
        id:  talkData.id,
        event: talkData.event,
        image_16x9: talkData.image_16x9,
        name: talkData.name,
        description: talkData.description,
        script: {
          talk_id: talkData.id,
          sens: scriptData.sens,
        },
        media: talkData.video,
        //published_at: talk.published_at,
        //updated_at: talk.updated_at

    },true)
  })
}

export const saveScript = (scriptData) => {
  realm.write(() => {
   return realm.create(Script.schema.name, {
         talk_id: scriptData.talk_id,
         sens: scriptData.sens
   },true)
 })
}

export const getTalkById = (talkId) => {
  let talks=  Talk.get().filtered(`script.talk_id= ${talkId}`);
  return talks[0];
}

export const getTalks = () => {
  const talks = Talk.get().sorted('published_at', 0);
  return talks;
}


export const getScripts = () => {
  const scripts = Script.get();//.sorted('-published_at', true)
  return scripts;
}

const realm = new Realm({schema: [Talk, Script, Sen, StringObjectSchema]});




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