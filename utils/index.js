const { User } = require("../models/user"); // your updated User model

/**
 * Maps a GitHub profile object to the User model fields
 * @param {Object} githubProfile - the profile object returned by GitHub
 * @returns {Object} - mapped user data
 */
function mapGitHubProfileToUser(githubProfile) {
  const json = githubProfile._json || {};

  return {
    githubId: json.id?.toString(),
    nodeId: json.node_id,
    username: json.login,
    displayName: githubProfile.displayName || json.name || "",
    avatarUrl: json.avatar_url,
    gravatarId: json.gravatar_id,
    profileUrl: json.html_url,
    apiUrl: json.url,
    followersUrl: json.followers_url,
    followingUrl: json.following_url,
    gistsUrl: json.gists_url,
    starredUrl: json.starred_url,
    subscriptionsUrl: json.subscriptions_url,
    organizationsUrl: json.organizations_url,
    reposUrl: json.repos_url,
    eventsUrl: json.events_url,
    receivedEventsUrl: json.received_events_url,
    type: json.type,
    userViewType: json.user_view_type,
    siteAdmin: json.site_admin,
    name: json.name,
    company: json.company,
    blog: json.blog,
    location: json.location,
    bio: json.bio,
    twitterUsername: json.twitter_username,
    notificationEmail: json.notification_email,
    publicRepos: json.public_repos,
    publicGists: json.public_gists,
    followers: json.followers,
    following: json.following,
    createdAtGitHub: json.created_at ? new Date(json.created_at) : null,
    updatedAtGitHub: json.updated_at ? new Date(json.updated_at) : null,
    email: githubProfile.emails?.[0]?.value || json.email || null,
  };
}

/**
 * Example usage:
 */
async function upsertGitHubUser(githubProfile) {
  const userData = mapGitHubProfileToUser(githubProfile);

  // Upsert user (create if not exists, otherwise update)
  const [user, created] = await User.upsert(userData, {
    where: { githubId: userData.githubId },
    returning: true,
  });

  return user;
}

module.exports = { mapGitHubProfileToUser, upsertGitHubUser };
