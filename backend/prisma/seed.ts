import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const categories = [
    'Infraestrutura',
    'Trânsito e Mobilidade',
    'Segurança Pública',
    'Poluição',
    'Habitação',
    'Saneamento Básico',
    'Coleta de Lixo',
    'Áreas Verdes',
    'Iluminação Pública',
    'Saúde Pública',
    'Educação',
    'Ruído Urbano',
    'Transporte Público',
    'Desigualdade Social',
    'Acessibilidade',
    'Desemprego',
    'Planejamento Urbano',
    'Enchentes',
    'Conservação do Patrimônio Histórico',
    'Violência no Trânsito',
  ]

  await Promise.all(
    categories.map((name) => {
      return prisma.category.create({
        data: {
          name,
        },
      })
    }),
  )

  await Promise.all([
    prisma.user.create({
      data: {
        role: 'BACKOFFICE',
        cpf: '333.333.333-33',
        name: 'Backoffice',
        email: 'backoffice@gmail.com',
        phone: '49999999999',
        passwordHash:
          '$2a$08$mgn1HqinL1YlSeNBmpUsv.EApk296vnzKNNj4DLbQIKOaeFt4f1FG',
      },
    }),
    prisma.user.create({
      data: {
        role: 'CITIZEN',
        cpf: '111.111.111-11',
        name: 'Citizen 01',
        email: 'citizen@gmail.com',
        phone: '49888888888',
        passwordHash:
          '$2a$08$wfZXJhPhBuAhXuRstC2UJ.eLIg57EPHs/V/dBFxKfmiNCkxeA.gX2',
      },
    }),
  ])
}

seed()
