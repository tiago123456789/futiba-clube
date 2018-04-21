module.exports = (router) => {
    
    router.get("/", (request, response) => response.render("games", { error: "" }));    

    return router;
}