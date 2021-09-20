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
    
}