import { RouteHandlerMethod } from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import { runInThisContext } from "vm"
const fetch = require('cross-fetch')

declare global {
  var webhook: (url: string) => Promise<void>
  var result: number
  var EF: {
    [name: string]: number
  }
}

// some EF's
global.EF = {
  PAPER_PRECHAIN: 0.12342,
  PAPER_ECO: 0.912
}

global.webhook = async(url: string) => {
  await fetch(url)
}

// GET http://localhost:3002/calculateFormula?formulaCode=${formulaCode}
// RETURNS { result: number }
export const calculateFormula: RouteHandlerMethod<Server, IncomingMessage, ServerResponse, { Querystring: { formulaCode: string } }> = async(request, reply) => {

  reply.header('Access-Control-Allow-Origin', '*')

  console.log('Calculating formula...', request.query)

  global.result = 0

  // use "vm" context, to filter dangerous code (eval is evil!)
  runInThisContext(`
    result = ${request.query.formulaCode}
    if (typeof WEBHOOK_URL !== 'undefined') {
      webhook(WEBHOOK_URL + '?result=' + result)
    }
  `)

  reply.send({
    result: global.result
  })
}
