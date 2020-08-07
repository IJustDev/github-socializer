const Socializer = require('./index.js');

const social = new Socializer({
    username: 'IJustDev',
    token: 'token',
    // or
    // password: 'this-is-the-safest-password-ever-123!@$'
});

// Check https://github.com/github-tools/github/blob/master/lib/User.js for the user object.
social.followContributors('ijustdev', 'gitea-vscode', (contributor) => {
    console.log('You\'ve followed: ' + contributor.login);
});
