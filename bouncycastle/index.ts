import 'dotenv/config'
import fastify from "fastify"
import { pid } from 'process'
import { calculateFormula } from "./api/calculateFormula"
import { checkProductCode } from "./api/checkProductCode"
import { createUser } from "./api/createUser"
import "./db"

const server = fastify()

// ROUTES

// GET /checkProductCode?name=$someProductName
// returns: { isValid: boolean }
server.route({ method: 'GET', url: '/checkProductCode', handler: checkProductCode, 
  schema: {
    querystring: {
      code: { type: 'string' }
    },
  },
})

// GET /user?email=string&password=string 
// returns: { isValid: boolean }
server.route({ method: 'GET', url: '/createUser', handler: createUser, 
  schema: {
    querystring: {
      email: { type: 'string' },
      password: { type: 'string' }
    },
  },
})

// GET /calculateFormula?formulaeCode=$formulaeCode
// returns: { result: number }
server.route({ method: 'GET', url: '/calculateFormula', handler: calculateFormula, 
  schema: {
    querystring: {
      formulaCode: { type: 'string' }
    },
  },
})

// serve on http://localhost:3002/createUser
server.listen(3002)

// write to console when online
console.log(`
running pid: ${pid}
▀█████████▄   ▄██████▄  ███    █▄  ███▄▄▄▄    ▄████████ ▄██   ▄         
  ███    ███ ███    ███ ███    ███ ███▀▀▀██▄ ███    ███ ███   ██▄       
  ███    ███ ███    ███ ███    ███ ███   ███ ███    █▀  ███▄▄▄███       
 ▄███▄▄▄██▀  ███    ███ ███    ███ ███   ███ ███        ▀▀▀▀▀▀███       
▀▀███▀▀▀██▄  ███    ███ ███    ███ ███   ███ ███        ▄██   ███       
  ███    ██▄ ███    ███ ███    ███ ███   ███ ███    █▄  ███   ███       
  ███    ███ ███    ███ ███    ███ ███   ███ ███    ███ ███   ███       
▄█████████▀   ▀██████▀  ████████▀   ▀█   █▀  ████████▀   ▀█████▀        
 ▄████████    ▄████████    ▄████████     ███      ▄█          ▄████████ 
███    ███   ███    ███   ███    ███ ▀█████████▄ ███         ███    ███ 
███    █▀    ███    ███   ███    █▀     ▀███▀▀██ ███         ███    █▀  
███          ███    ███   ███            ███   ▀ ███        ▄███▄▄▄     
███        ▀███████████ ▀███████████     ███     ███       ▀▀███▀▀▀     
███    █▄    ███    ███          ███     ███     ███         ███    █▄  
███    ███   ███    ███    ▄█    ███     ███     ███▌    ▄   ███    ███ 
████████▀    ███    █▀   ▄████████▀     ▄████▀   █████▄▄██   ██████████ 
                                                 ▀                      
             THIS CODE IS UNBREAKABLE!!1! ;)  
`)

