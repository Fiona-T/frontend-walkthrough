
// user is the object being returned from GitHub API. Display user info
function userInformationHTML(user) {
    console.log(user);
    // display username with link to their profile on github, avatar, following/ers, repos
    return `
    <h2>${user.name}<span class="small-name">(@<a href="${user.html_url}" target="_blank">${user.login}</a>)</span></h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}">
            </a>
        </div>
        <p>Followers: ${user.followers} - Following: ${user.following} <br>
        Repos: ${user.public_repos}</p>
    </div>`;

}

// display the repo info. GitHub returns this as an array
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    // array of the repos containing li with link to repo and its name
    let listItemsHTML = repos.map(function(repo) {
        return `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>`;
    });
    return `
        <div class="clearfix repo-list">
            <p>
                <strong>Repo list:</strong>
            </p>
            <ul>
                ${listItemsHTML.join("\n")}
            </ul>
        </div>`
}

function fetchGitHubInformation(event) {
    // jQuery get value in gh-uername field
    let username = $("#gh-username").val();
    // if no username (no text input into the field), display msg and exit function
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    // otherwise, show the 'loading' gif while data is being accessed
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading...">
        </div>`
    );
    
    // handle response from github API, pass userData to userInformationHTML, or display error
    $.when(
        // call to github API for the user info
        $.getJSON(`https://api.github.com/users/${username}`),
        // call to github API for the repo info
        $.getJSON(`https://api.github.com/users/${username}/repos`) 
        ).then(
            function(firstRepsonse, secondResponse) {
                let userData = firstRepsonse[0];
                let repoData = secondResponse[0];
                // call function to display the userData in the div
                $("#gh-user-data").html(userInformationHTML(userData));
                // call function to display the repoData in the div
                $("#gh-repo-data").html(repoInformationHTML(repoData));
            }, function(errorResponse) {
                if (errorResponse.status === 404) {
                    $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
                } else {
                    console.log(errorResponse);
                    $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                }
            });
}