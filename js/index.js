function getRepositories() {
   const req = new XMLHttpRequest();
   const username = document.getElementById('username').value;
   req.addEventListener("load", displayRepositories);
   req.open("GET",
   'https://api.github.com/users/' + username + '/repos');
   req.send();
   return false;
 }
 
function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  const repoList = "<ul>" + repos.map(repo => {
  const dataUsername = 'data-username="' + repo.owner.login + '"';
  const dataRepoName = 'data-repository="' + repo.name + '"';
  return(`
  <li>
  <h2>${repo.name}</h2>
  <a href="${repo.html_url}">${repo.html_url}</a><br>
  <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
  <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
  </li>`
  );
   }).join('') + "</ul>";
   document.getElementById("repositories").innerHTML = repoList;
}
 
function getCommits(ele) {
  const repoName = ele.dataset.repository;
  const uri = "https://api.github.com/repos/" + ele.dataset.username + "/" + repoName + "/commits";
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", displayCommits);
  xhr.open("GET", uri);
  xhr.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name +
' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}
 
function getBranches(ele) {
  const repoName = ele.dataset.repository;
  const uri = "https://api.github.com" + "/repos/" + ele.dataset.username + "/" + repoName + "/branches";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", uri);
  req.send();
}
 
//   function displayBranches() {
//   const branches = JSON.parse(this.responseText);
//   const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
//   document.getElementById("details").innerHTML = branchesList;
// } 
