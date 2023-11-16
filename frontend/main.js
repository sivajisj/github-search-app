async function search() {
    const username = document.getElementById('searchInput').value;
    const profileUrl = `https://api.github.com/users/${username}`;
    const repoUrl = `https://api.github.com/users/${username}/repos`;

    try {
        const profileResponse = await fetch(profileUrl);
        const repoResponse = await fetch(repoUrl);

        const profileData = await profileResponse.json();
        const repoData = await repoResponse.json();

        displayProfileResult(profileData);
        displayRepoResult(repoData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayProfileResult(data) {
    const profileResultContainer = document.getElementById('profileResult');
    profileResultContainer.innerHTML = `
          <h2> <a href="https://github.com/${document.getElementById('searchInput').value}">${data.name} </a></h2> 
        <p>Followers: ${data.followers}</p>
        <p>Repositories: ${data.public_repos}</p>
    `;
}

function displayRepoResult(data) {
    const repoResultContainer = document.getElementById('repoResult');
    repoResultContainer.innerHTML = '<h2>Repositories:</h2>';

    if (data.length === 0) {
        repoResultContainer.innerHTML += '<p>No repositories found.</p>';
    } else {
        data.forEach(repo => {
            repoResultContainer.innerHTML += `
                <div>
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                </div>
            `;
        });
    }
}









// async function search() {
//     const technology = document.getElementById('searchInput').value;
//     const repoSearchUrl = `https://api.github.com/search/repositories?q=${technology}&sort=stars`;

//     try {
//         const repoSearchResponse = await fetch(repoSearchUrl);
//         const repoSearchData = await repoSearchResponse.json();

//         if (repoSearchData.items.length === 0) {
//             alert('No repositories found for the specified technology.');
//             return;
//         }

//         const topRepo = repoSearchData.items[0]; // Let's consider the top result for simplicity
//         const contributorsUrl = topRepo.contributors_url;

//         const contributorsResponse = await fetch(contributorsUrl);
//         const contributorsData = await contributorsResponse.json();

//         displayResult(topRepo, contributorsData);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// function displayResult(repo, contributors) {
//     const profileResultContainer = document.getElementById('profileResult');
//     profileResultContainer.innerHTML = `
//         <h2>Top Contributor(s) for ${repo.name}</h2>
//         <h3>Repository:</h3>
//         <p>${repo.full_name}</p>
//         <p>${repo.description || 'No description available.'}</p>

//         <h3>Top Contributor(s):</h3>
//     `;

//     if (contributors.length === 0) {
//         profileResultContainer.innerHTML += '<p>No contributors found.</p>';
//     } else {
//         contributors.forEach(contributor => {
//             profileResultContainer.innerHTML += `
//                 <div>
//                     <h4>${contributor.login}</h4>
//                     <p>Contributions: ${contributor.contributions}</p>
//                 </div>
//             `;
//         });
//     }
// }
