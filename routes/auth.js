/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function auth(app, options) {
    
    app.post('/auth', (req, rep) => {
        let user = req.body;
        req.log.info(`Login for user ${user.username}`);
        //check login details
        delete user.password;
        return {
            'x-access-token': app.jwt.sign(user)
        }
    });
}