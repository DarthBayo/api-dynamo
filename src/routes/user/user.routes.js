import { Router } from 'express'
import * as uuid from 'uuid'
import { db, USER_TABLE } from './user.repository.js'

const userRouter = Router()

// Find
userRouter.get('/', async (req, res) => {
  let { limit } = req.query
  limit = limit > 0 && limit < 100 ? req.query?.limit : 50
  const params = {
    TableName: USER_TABLE.TableName,
    Limit: limit
  }
  db.scan(params, (err, data) => {
    if (err) {
      return res.status(400).send('Error')
    }

    return res.status(200).json(data)
  })
})

// Create or Update
userRouter.post('/:id?', async (req, res) => {
  const { id } = req.params
  const { name, lastName, age } = req.body
  const Item = {
    [USER_TABLE.ID]: id ?? uuid.v1(),
    [USER_TABLE.Name]: name,
    [USER_TABLE.LastName]: lastName,
    [USER_TABLE.Age]: age
  }

  const params = {
    TableName: USER_TABLE.TableName,
    Key: {
      [USER_TABLE.ID]: Item[[USER_TABLE.ID]]
    },
    UpdateExpression: 'SET #name = :name, #lastname = :lastname, #age = :age',
    ExpressionAttributeNames: {
      '#name': [USER_TABLE.Name],
      '#lastname': [USER_TABLE.LastName],
      '#age': [USER_TABLE.Age]
    },
    ExpressionAttributeValues: {
      ':name': Item[USER_TABLE.Name],
      ':lastname': Item[USER_TABLE.LastName],
      ':age': Item[USER_TABLE.Age]
    }
  }
  db.update(params, (err, _) => {
    if (err) {
      res.status(400).send('It was not possible to create/update the user!')
      return
    }

    return res.json(Item)
  })
})

// Delete
userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const Item = {
    [USER_TABLE.ID]: id
  }

  const params = {
    TableName: USER_TABLE.TableName,
    Key: {
      [USER_TABLE.ID]: Item[USER_TABLE.ID]
    }
  }
  db.delete(params, (err, _) => {
    if (err) {
      return res.status(400).send('It was not possible to delete the user!')
    }
  })

  return res.status(204).send()
})

export {
  userRouter
}
