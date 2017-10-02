import Realm from 'realm';
const uuid = require('uuid');

class TodoItem {
  static get () { return realm.objects(TodoItem.schema.name) }
  static schema = {
    name: 'TodoItem',
    primaryKey: 'id',
    properties: {
      id: {type: 'string'},
      value: {type: 'string'},
      completed: {type: 'bool', default: false},
      createdTimestamp: {type: 'date'}
    }
  }
}

export const getTodoItems = () => {
  const todoItems = TodoItem.get().sorted('createdTimestamp', true)
  return todoItems
}

export const getTodoItem = (id) => {
  const todoItem = realm.objectForPrimaryKey(TodoItem, id)
  return todoItem
}

export const updateTodoItem = (todoItem, value, completed) => {
  realm.write(() => {
    try {
      todoItem.value = value
      todoItem.completed = completed
    } catch (e) {
      console.warn(e)
    }
  })
}

export const createTodoItem = (value) => {
  realm.write(() => {
    return realm.create(TodoItem.schema.name, {
      id: uuid.v1(),
      value,
      createdTimestamp: new Date()
    })
  })
}

export const deleteTodoItem = (todoItem) => {
  realm.write(() => {
    realm.delete(todoItem)
  })
}

const realm = new Realm({schema: [TodoItem]})