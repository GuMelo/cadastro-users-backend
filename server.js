import express from 'express'
import cors from "cors"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

//Add novo usuário
app.post('/users', async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.nome,
      email: req.body.email,
      age: req.body.idade
    }
  })
  res.status(201).json(req.body)
})

//Busca todos os usuários no banco
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany()
  res.status(200).json(users)
})

//Atualiza dados de um  usuário
app.put('/users/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.nome,
      email: req.body.email,
      age: req.body.idade
    }
  })
  res.status(201).json(req.body)
})

//Exclui um  usuário
app.delete('/users/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({"message": "Usuário excluído com sucesso!"})
})

app.listen(3000)

/* 
  CRIAR API DE USUÁRIOS (CRUD):

    1. Criar usuários
    2. Listar todos os usuários
    3. Editar um usuário
    4. Deletar usuários
*/