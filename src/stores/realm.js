import Realm from 'realm';

class Talk {
  static get () { return realm.objects(Talk.schema.id) }
  static schema = {
    name: 'Talk',
    primaryKey: 'id',
    properties: {
      id: 'int',
      event: 'string',
      image_16x9:  'string',
      name: 'string',
      description: 'string',
      published_at: 'date',
      updated_at: 'date',
      script: {type : 'Script'},
    }
  }
};


class Script {
  static get () { return realm.objects(Script.schema.id) }
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
  properties: { value: 'string' }
};
class Sen {
  static get () { return realm.objects(Sen.schema.id) }
  static schema = {
    name: 'Sen',
    primaryKey: 'id',
    properties: {
      id: 'int',
      content: 'string',
      words : {type: 'list',  objectType:'StringObject'},
    }
  }
};

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