const GitHub = require('github-api');

function GitHubAPIException(message) {
    const error = new Error(message);
    return error;
}

class GitHubSocializer {

    constructor(credentialsObject) {
        this.api = new GitHub(credentialsObject);
    }

    getContributors(username, repositoryName) {
        const repository = this.api.getRepo(username, repositoryName);
        return new Promise(async (resolve, reject) => {
            await repository.getContributors((err, contributors) => {
                if (err) {
                    return reject(new GitHubAPIException(err));
                }
                resolve(contributors);
            });
        });
    }

    followContributor(contributorUsername) {
        const user = this.api.getUser();
        return new Promise(async(resolve, reject) => {
            await user.follow(contributorUsername, (err, status) => {
                if (err) {
                    return reject(new GitHubAPIException(err));
                }
                resolve(true);
            });
        });
    }

    // cb - callback; called after successful follow
    followContributors(username, repositoryName, cb) {
        return new Promise(async (resolve, reject) => {
            const contributors = await this.getContributors(username, repositoryName);
            for (const contributor of contributors) {
                if (!this.isBot(contributor.type)) {
                    this.followContributor(contributor.login).then(() => {
                        cb(contributor);
                    });

                }
            }
        });
    }

    isBot(type) {
        return type === 'Bot';
    }
};

module.exports = GitHubSocializer;
