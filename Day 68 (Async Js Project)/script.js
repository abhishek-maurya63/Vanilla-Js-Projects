function getProfileData(userName) {
  return fetch(`https://api.github.com/users/${userName}`).then((raw) => {
    if (!raw.ok) throw new Error("User not found.");
    return raw.json();
  });
}

// function getRepos(userName) {
//   return fetch(
//     `https://api.github.com/users/${userName}/repos?sort=updated&per_page=100`
//   ).then((raw) => {
//     if (!raw.ok) throw new Error("User repos not found.");
//     return raw.json();
//   });
// }

function userCard(data) {
  let userCard = document.querySelector(".userCard");

  userCard.innerHTML = `
    <img
      src="${data.avatar_url}"
      alt="Profile Image"
      class="w-20 h-20 rounded-full object-cover border border-gray-600"
    />
    <div class="flex-1">
      <h2 class="text-xl font-semibold">${data.name || data.login}</h2>
      <p class="text-sm text-gray-400">@${data.login}</p>

      ${
        data.bio
          ? `<p class="mt-2 text-sm text-gray-300 italic">"${data.bio}"</p>`
          : ""
      }

      <div class="flex gap-4 mt-3 text-sm text-gray-300">
        <span>Repos: ${data.public_repos}</span>
        <span>Followers: ${data.followers}</span>
        <span>Following: ${data.following}</span>
      </div>

      <div class="mt-3 text-sm text-gray-400 space-y-1">
        ${data.location ? `<p><strong>📍</strong> ${data.location}</p>` : ""}
        ${
          data.blog
            ? `<p><strong>🔗</strong> <a href="${data.blog}" target="_blank" class="text-blue-400 hover:underline">${data.blog}</a></p>`
            : ""
        }
        ${
          data.created_at
            ? `<p><strong>🕒</strong> Joined on ${new Date(
                data.created_at
              ).toDateString()}</p>`
            : ""
        }
      </div>
    </div>
  `;
}

let search = document.querySelector(".search");
let userNameINP = document.querySelector(".usernameinp");
search.addEventListener("click", () => {
  userName = userNameINP.value.trim();
  console.log(userName);
  if (userName.length > 0) {
    getProfileData(userName).then((data) => {
      console.log(data);
      userCard(data);
    });
  }
});
