const API_KEY = "7fc552624ec54c4e85fc342d8fc83afa";
const BASE_URL = "https://api.football-data.org/v2/";
const LEAGUE_ID = 2021;
const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const tim = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            return Promise.reject(err);
            
        })
        
};

function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("homeStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="green accent-1-card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table ">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>Win</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Points</th>
                            <th>Goal For</th>
                            <th>Goal Against</th>
                            <th>Goal Difference</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getTim() {
    if ("caches" in window) {
        caches.match(tim).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    showTim(data);
                })
            }
        })
    }

    fetchAPI(tim)
    .then(data => {
        showTim(data);
    })
    .catch(error => {
        return Promise.reject(error);
    })
}
function showTim(data) {
    showLoader();
    dataTim = data;
    var tims = "";
    data.teams.forEach(function (tim) {
        tims += `
        <div class="col s12 m6 l6">
        <div class="card">
          <div class="green accent-1-card-content">
            <div class="center"><img width="64" height="64" src="${tim.crestUrl || 'img/empty_badge.svg'}"></div>
            <div class="center flow-text">${tim.name}</div>
            <div class="center">${tim.area.name}</div>
          </div>
          <div class="card-action right-align">
              <a class="waves-effect waves-light btn-small teal lighten-1" onclick="insertTeamListener(${tim.id})"> Simpan</a>
          </div>
        </div>
      </div>
        `;
    });
    document.getElementById("main-content").innerHTML = tims;
    hideLoader();
}
var gettimSaved = () => {
    var teams = getTimsave()
    showLoader();
  
    teams.then(data => {
      dataTim = data;
      var html = ' '
      html += '<div class="row">'
      data.forEach(tim => {
        html += `
        <div class="col s12 m6 l6">
          <div class="light-green darken-3-card">
            <div class="card-content">
              <div class="center"><img width="64" height="64" src="${tim.crestUrl || 'img/empty_badge.svg'}"></div>
              <div class="center flow-text">${tim.name}</div>
              <div class="center">${tim.area.name}</div>
            </div>
            <div class="card-action right-align">
                <a class="waves-effect waves-light btn-small red" onclick="deleteTeamListener(${tim.id})">Delete</a>
            </div>
          </div>
        </div>
      `
      })
  
      if(data.length == 0) html += '<h6 class="Belum ada yang disimpan!</6>'
  
      html += "</div>"
      let doc = document.getElementById('main-content');
      doc.innerHTML = html;
      hideLoader();
    })
  }