

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
  
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
}


//const client_id = '54f1685fdce140b3bcbf2c8642050242';
//const client_secret = '3dcb34e6656a4163bca673a9cf8cac57';
//const refresh_token = 'AQCDLSpBDbnkawxB4Ralg-zCbIm5cWlrQa_pB5uxfKcpE6J_ahaqL6E8V2ldheNsIxXwD0-o1sjs0DaUWZTvLqJOni34V9PgCFkL9sguDY70X0XxANkschvqODnP2pCTaaY';

let access_token;

function getAccessToken() {
return fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST', headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`)
  },
body: 'grant_type=refresh_token&refresh_token=' + refresh_token
})
  
  
.then(response => response.json())
.then(data => {
  access_token = data.access_token;
setTimeout(getAccessToken, (data.expires_in - 60) * 1000);
return access_token;
})
.catch(error => {
    console.error(error);

});
}

function getSongInfo() {
return fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
    'Authorization': `Bearer ${access_token}`
  }
})
.then(response => {
  if (response.status === 204) {
    instead
    return fetch('https://api.spotify.com/v1/me/player/recently-played', {
    headers: {
    'Authorization': `Bearer ${access_token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.items.length > 0) {
        const lastPlayed = data.items[0].track;
return {
    songName: lastPlayed.name,
songArtist: lastPlayed.artists[0].name,
songImageUrl: lastPlayed.album.images[0].url,
songUrl: lastPlayed.external_urls.spotify
        };
      } else {
       
        throw new Error('No recently played tracks found');
      }
    });
  } else {
    return response.json()
    .then(data => {
      return {
    songName: data.item.name,
songArtist: data.item.artists[0].name,
songImageUrl: data.item.album.images[0].url,
songUrl: data.item.external_urls.spotify
      };
    });
  }
})
.catch(error => {
    console.error(error);
document.getElementById('song').innerHTML = 'Error fetching song information';
});
}
let songtitle = document.getElementById("songname")
let songImg = document.getElementById("songImg")
let songowner = document.getElementById("songowner")
function updateSongInfo() {
    getAccessToken()
        .then(() => {
            return getSongInfo();
        })
        .then(songInfo => {
          songtitle.textContent = songInfo.songName
          songImg.src = songInfo.songImageUrl
          songowner.textContent = songInfo.songArtist
            
            setTimeout(updateSongInfo, 800); 
        });
}

updateSongInfo();



