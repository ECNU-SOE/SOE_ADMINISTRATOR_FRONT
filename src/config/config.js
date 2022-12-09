let env = process.env.NODE_ENV || 'development'
   console.log(env)
   const config = {
      development: {
         baseUrl: 'http://47.101.58.72:8888'
   },

   prod: {
      baseUrl: 'http://47.101.58.72:8888'
   }
}
export default config[env]