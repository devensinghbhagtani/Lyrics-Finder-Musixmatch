document.getElementById("searchButton").addEventListener("click", searchLyrics);

function scrollPageToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // You can change this to 'auto' for an instant scroll
    });
}

function searchLyrics() {
    const songArtist = document.getElementById("songArtist").value;
    const searchUrl = `http://localhost:3000/search-artist?songArtist=${songArtist}`;
    
    fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
            const trackList = data.message.body.track_list;
            displayTrackOptions(trackList);
        })
        .catch((error) => {
            console.error(error);
        });
}

async function fetchThumbnail(trackName) {
    const suggestionUrl = `https://api.lyrics.ovh/suggest/${trackName}`;
    try {
        const response = await fetch(suggestionUrl);
        const data = await response.json();
        return data.data[0].album.cover_big;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function displayTrackOptions(trackList) {
    const tracksDiv = document.getElementById("tracks");
    tracksDiv.innerHTML = ''; // Clear previous options

    for (let i = 0; i < trackList.length && i < 10; i++) {
        const track_id = trackList[i].track.track_id;
        const trackName = trackList[i].track.track_name;
        const artistName = trackList[i].track.artist_name;
        const albumName = trackList[i].track.album_name;
        const songTitle = trackName.split(" (")[0];

        const thumbnailUrl = await fetchThumbnail(trackName);

        const trackOptionDiv = document.createElement("div");
        trackOptionDiv.className = "card mb-3";

        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";
        cardBodyDiv.style.display = "flex";

        const thumbnailImg = document.createElement("img");
        thumbnailImg.className = "card-thumbnail";
        thumbnailImg.src = thumbnailUrl;

        const detailsDiv = document.createElement("div");
        detailsDiv.className = "card-details";

        const trackNameHeading = document.createElement("h5");
        trackNameHeading.className = "card-title";
        trackNameHeading.textContent = songTitle;

        const artistNameParagraph = document.createElement("p");
        artistNameParagraph.className = "card-text";
        artistNameParagraph.textContent = `Artist: ${artistName}`;

        const albumNameParagraph = document.createElement("p");
        albumNameParagraph.className = "card-text";
        albumNameParagraph.textContent = `Album: ${albumName}`;

        const trackButton = document.createElement("button");
        trackButton.className = "btn btn-primary card-button";
        trackButton.textContent = "Show Lyrics";
        trackButton.addEventListener("click", () => {
            showSongDetails(songTitle, artistName);
            songTrack(track_id, songTitle);
        });

        detailsDiv.appendChild(trackNameHeading);
        detailsDiv.appendChild(artistNameParagraph);
        detailsDiv.appendChild(albumNameParagraph);
        detailsDiv.appendChild(trackButton);

        cardBodyDiv.appendChild(thumbnailImg);
        cardBodyDiv.appendChild(detailsDiv);
        trackOptionDiv.appendChild(cardBodyDiv);
        tracksDiv.appendChild(trackOptionDiv);
    }
}

function showSongDetails(songName, artistName) {
    document.getElementById("songName").textContent = songName;
    document.getElementById("artistName").textContent = artistName;
    scrollPageToTop();
}


function songTrack(track_id) {
    const lyricsfetch = `http://localhost:3000/search-lyrics?songTrack=${track_id}`;

    fetch(lyricsfetch)
        .then((response) => response.json())
        .then((data) => {
            const lyrics = data.message.body.lyrics.lyrics_body;
            
            // Find the index of "******* This Lyrics is NOT for Commercial use *******"
            const endIndex = lyrics.indexOf("******* This Lyrics is NOT for Commercial use *******");

            if (endIndex !== -1) {
                // Split the lyrics into lines based on '\n' and only include lines before the marker
                const lines = lyrics.substring(0, endIndex).split('\n');
                
                // Select the element where you want to display the lyrics
                const lyricsContainer = document.getElementById("lyrics");

                // Clear previous lyrics
                lyricsContainer.innerHTML = '';

                // Display each line as a new paragraph
                lines.forEach((line) => {
                    const paragraph = document.createElement("p");
                    paragraph.textContent = line;
                    lyricsContainer.appendChild(paragraph);
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
