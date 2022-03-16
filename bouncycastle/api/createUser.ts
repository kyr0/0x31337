import { RouteHandlerMethod } from "fastify"
import { Server, IncomingMessage, ServerResponse } from "http"
import md5 from 'md5'

  // sec_audit TODO: No TLS!!! Man-in-the-Middle attack can read every password in clear-text
// GET http://localhost:3002/createUser?email=string&password=string
export const createUser: RouteHandlerMethod<Server, IncomingMessage, ServerResponse, { Querystring: { email: string, password: string } }> = async(request, reply) => {

  // sec_audit TODO: No input validation at all!

  // sec_audit TODO: Never log credentials!
  console.log('Creating user...', request.query)

  // sec_audit TODO: Should not allow any host to connect
  reply.header('Access-Control-Allow-Origin', '*')

  try { 
    // using prepared statements
    const insertStmt = await globalThis.db.prepare(
        // sec_audit TODO: String interpolation used, mitigates prepared statement. WRONG USE!

        // sec_audit TODO: Wrong use of password hashing
        `INSERT INTO users (email, password) VALUES ('${request.query.email}', '${md5(request.query.password)}')`
    )
    // bind parameters
  // sec_audit TODO: String interpolation used, mitigates prepared statement. Not binded
    await insertStmt.bind()

    // run query
  // sec_audit TODO: Executing all statements can lead to last stmt executed (SQL injection)
    await insertStmt.all()

    // --sdasld

  // sec_audit TODO: When exceptions are not handled, maybe vulnerable code is executed thereafter
  } catch(e) {}

  try {

    // using prepared statements
  // sec_audit TODO: Same as above
    const selectStmt = await globalThis.db.prepare(
        `SELECT * FROM users WHERE email = '${request.query.email}'`
    )
    // sec_audit TODO: Same as above
    // bind parameters
    await selectStmt.bind()

    // run query
    // sec_audit TODO: Same as above
    const result = await selectStmt.all()
    
    // return result
    // sec_audit TODO: NEVER EVER RETURN UNVALIDATED OUTPUT
    reply.send({
        success: true,
        result
    })

  } catch (e) {
      console.error(e)
      // return error
      reply.send({
          success: false,
          error: e
      })
  }
}
