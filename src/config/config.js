let env = process.env.NODE_ENV || 'development'
   console.log(env)
   const config = {
      development: {
         baseUrl: 'http://localhost:8080'
   },

   prod: {
      baseUrl: 'http://47.101.58.72:8080'
   }
}
export default config[env]