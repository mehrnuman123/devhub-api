
const axios = require("axios")

const githubController = {

    userGitHubProfile: async (req, res) => {
        try {
            const githubToken = req.cookies.token // stored during OAuth login
          
             const authHeader = githubToken.startsWith("gh") ? `Bearer ${githubToken}` : `token ${githubToken}`;
            
            const response = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: authHeader,
                Accept: "application/vnd.github+json",
            },
            })
          
            
            res.json(response.data)
        } catch (err) {
           
            res.status(500).json({ error: "Failed to fetch profile" })
        }

    }
}

module.exports = { githubController }


