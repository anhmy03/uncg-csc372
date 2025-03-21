const defaultUser = "your-github-username";
document.addEventListener("DOMContentLoaded", () => fetchRepos(defaultUser));

function handleKeyPress(event) {
    if (event.key === "Enter") {
        fetchRepos(event.target.value);
    }
}

async function fetchRepos(username) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=20&sort=updated`);
        if (!response.ok) throw new Error("User not found or API limit exceeded.");
        const repos = await response.json();

        gallery.innerHTML = repos.map(repo => `
            <div class="repo-card">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || "No description available"}</p>
                <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
            </div>
        `).join("");
    } catch (error) {
        gallery.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}