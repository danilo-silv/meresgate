import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

if (!process.env.API_BASE_URL) {
  throw new Error('API_BASE_URL variable missing .env')
}

if (!process.env.X_API_KEY) {
  throw new Error('X_API_KEY variable missing .env')
}

const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.X_API_KEY
  }
})

const mock = new MockAdapter(client)

/// criar arquivo para colocar essas rotas

mock.onPost(`${process.env.API_BASE_URL}v1/pre-auth`).reply(
  200,
  {
    id: 'acc90f9f-ff59-4e08-b78c-a92ce50a232f',
    status: 7,
    phone_number_cell: '***********'
  },
  {
    'x-slt': '000000000'
  }
)

mock.onPost(`${process.env.API_BASE_URL}v1/auth`).reply(
  200,
  {
    data: {
      auth: {
        type: 'bearer',
        token: 'MQ.ypOARTZRVco1YyhZNipOPPa-aFJ_eBUIpiBY1rtyP_inbKqhvJy-wnl7vxNT',
        expires_at: '2020-11-03T17:51:34.767-03:00'
      },
      user: {
        name: 'Danilo Silva',
        profile_image_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/davidsasda/128.jpg',
        accepted_commitment_term_at: null,
        accepted_responsibility_term_at: null
      }
    }
  },
  {
    'x-slt': '000000000'
  }
)

mock.onPatch(`${process.env.API_BASE_URL}v1/users/me/term/1/accept`).reply(
  200,
  {},
  {
    'x-slt': '000000000'
  }
)

mock.onPatch(`${process.env.API_BASE_URL}v1/users/me/term/2/accept`).reply(
  200,
  {},
  {
    'x-slt': '000000000'
  }
)

mock.onPost(`${process.env.API_BASE_URL}v1/users`).reply(
  200,
  {
    data: {
      id: 'f327bd0b-897c-4557-a469-87e98a4bbf01',
      status: 1
    }
  },
  {
    'x-slt': '000000000'
  }
)

mock.onPatch(`${process.env.API_BASE_URL}v1/users/{id}/confirm-phone-number`).reply(
  200,
  {
    message: 'success'
  },
  {
    'x-slt': '000000000'
  }
)

mock.onPost(`${process.env.API_BASE_URL}v1/users/reset-password`).reply(
  200,
  {
    message: 'success'
  },
  {
    'x-slt': '000000000'
  }
)

export default client
