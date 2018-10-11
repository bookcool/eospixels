const Eos = require('eosjs')
const { ecc } = Eos.modules
const binaryen = require(`binaryen`)
const dotenv = require(`dotenv`)

dotenv.config({
  path: process.env.NODE_ENV === `production` ? `.env.production` : `.env`,
})
// used in dev only
const eosioPrivateKey = `5KZifpqRTxWKbH9xNsssUwqVzV3BhpeXMqU7ttXv9t82Na7yfq2`

const contractPrivate = process.env.CONTRACT_PRIVATE_KEY
const contractPublicKey = ecc.privateToPublic(contractPrivate)

const testerPrivate = process.env.TESTER_PRIVATE_KEY
const testerPublicKey = ecc.privateToPublic(testerPrivate)

const keyProvider = [eosioPrivateKey, contractPrivate, testerPrivate]
const logger = { error: null }

const httpProtocol = process.env.EOS_NETWORK_PROTOCOL
const host = process.env.EOS_NETWORK_HOST
const port = process.env.EOS_NETWORK_PORT
const chainId = process.env.EOS_NETWORK_CHAINID

const eos = Eos({
  keyProvider,
  binaryen,
  logger,
  httpEndpoint: `${httpProtocol}://${host}:${port}`,
  chainId,
  // uncomment next line for debugging
  // verbose: true,
})

module.exports = {
  eos,
  contractPublicKey,
  testerPublicKey,
}
