module.exports = (router) => {
    
    router.get("/", (request, response) => response.send("Panel Admin"));    

    return router;
}