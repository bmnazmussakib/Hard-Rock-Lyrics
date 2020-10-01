
var fetchData =null;

document.getElementById("search_Btn").addEventListener('click',function(){
    let title = document.getElementById("form-control").value;

    document.getElementById("form-control").value = '';
    document.getElementById("title&Artist").innerHTML = '';
    document.getElementById("lyricsTitle").innerHTML = '';
    document.getElementById("lyrics").innerHTML = '';
    
    fetch(`https://api.lyrics.ovh/suggest/${title}`)
    .then(res => res.json())
    .then(data => {

        
        fetchData = data;
        
        for (let i = 0; i < data.data.length; i++) {
            const title = data.data[i].title;
            const artist = data.data[i].artist.name;
            
            // const titleArtist = document.getElementById("title&Artist");
            // titleArtist.innerHTML += `<p class="author lead"><strong>${title}</strong> Album by <span>${artist}</span> <button onclick="getLyrics(${i})" class="btn btn-success">Get Lyrics</button></p>`;

            const titleArtist = document.getElementById("title&Artist");
            titleArtist.innerHTML += `
            <div  class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Album by <span>${artist}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics(${i})" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
            </div>`;
            
            if(i==9){
                break;
            }
        }

    })
})

function getLyrics(index){

    const title = fetchData.data[index].title;
    const artist = fetchData.data[index].artist.name;

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => {

        console.log(data);

        const lyricsTitle = document.getElementById("lyricsTitle");
        lyricsTitle.innerHTML = `<h2 class="text-success mb-4">${title}</h2>`;

        const lyrics = document.getElementById("lyrics");
        lyrics.innerHTML = `<pre  class="lyric text-white">${data.lyrics}</pre>`;
    })
}

