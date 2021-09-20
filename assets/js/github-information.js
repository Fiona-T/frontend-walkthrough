
// user is the object being returned from GitHub API
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
        $.getJSON(`https://api.github.com/users/${username}`)
        ).then(
            function(response) {
                let userData = response;
                $("#gh-user-data").html(userInformationHTML(userData));
            }, function(errorResponse) {
                if (errorResponse.status === 404) {
                    $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
                } else {
                    console.log(errorResponse);
                    $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                }
            });
}