import { RouteHandlerMethod } from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"

// code has to start with P, 
// can contain an arbitrary number of: 0 to 9 or X
const PRODUCT_NAMING_PATTERN_REGEXP = /^P(X|[0-9]+)*$/

// GET http://localhost:3002/checkProductCode?code=P92348333202XXX330
export const checkProductCode: RouteHandlerMethod<Server, IncomingMessage, ServerResponse, { Querystring: { code: string } }> = (request, reply) => {

  reply.header('Access-Control-Allow-Origin', '*')

  console.log('Checking product code...', request.query)

  if (!request.query.code) {
    reply.send({
      isValid: false
    })
    return
  }

  reply.send({
    isValid: PRODUCT_NAMING_PATTERN_REGEXP.test(request.query.code)
  })
}
