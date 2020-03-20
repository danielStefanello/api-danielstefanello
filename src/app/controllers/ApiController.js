class ApiController {
  index(req, res) {
    return res.json({ message: 'Welcome to ApiREST to Daniel Stefanello' });
  }
}

export default new ApiController();
