const { User } = require("../models"); // your updated User model

/**
 * Maps a GitHub profile object to the User model fields
 * @param {Object} githubProfile - the profile object returned by GitHub
 * @returns {Object} - mapped user data
 */
function mapGitHubProfileToUser(githubProfile) {
  const json = githubProfile._json || {};

  return {
    github_id: json.id?.toString(),
    node_id: json.node_id,
    username: json.login,
    name: githubProfile.displayName || json.name || "",
    avatar_url: json.avatar_url,
    profile_url: json.html_url,
    followers_url: json.followers_url,
    following_url: json.following_url,
    company: json.company,
    blog: json.blog,
    location: json.location,
    bio: json.bio,
    twitter_username: json.twitter_username,
    //publicGists: json.public_gists,
    followers_count: json.followers,
    following_count: json.following,
    github_updated_at: json.updated_at || null,
    email: githubProfile.emails?.[0]?.value || json.email || null,
    html_url:json.html_url,
    gists_url: json.gists_url,
    repos_url:json.repos_url,
    starred_url: json.starred_url,
    public_repos_count: json.public_repos,
    github_created_at: json.created_at,
  };
}

/**
 * Example usage:
 */
async function upsertGitHubUser(githubProfile) {
  const userData = mapGitHubProfileToUser(githubProfile);
  console.log(githubProfile, 'data being stoed');
  
  // Upsert user (create if not exists, otherwise update)
  const [user, created] = await User.upsert(userData, {
    where: { github_id: userData.github_id },
    returning: true,
  });

  return user;
}

module.exports = { mapGitHubProfileToUser, upsertGitHubUser };
