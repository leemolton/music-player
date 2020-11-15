const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'Z-Cars',
    displayName: '1. Z-Cars',
    artist: 'Johnny Keats',
  },
  {
    name: 'call-it-the-blues',
    displayName: '2. Guess thats why they call it the Blues',
    artist: 'Elton John',
  },
  {
    name: 'Cant-Smile-Without-You',
    displayName: '3. Cant Smile Without You',
    artist: 'Barry Manilow',
  },
  {
    name: 'Third-Finger-Left-Hand',
    displayName: '4. Third Finger Left Hand',
    artist: 'Martha Reeves and the Vandellas',
  },
  {
    name: 'Greatest-Day',
    displayName: '5. Greatest Day',
    artist: 'Take That',
  },
  {
    name: 'Always-and-forever',
    displayName: '6. Always and Forever',
    artist: 'Luther Vandross',
  },
  {
    name: 'When-my-little-girl-is-smiling',
    displayName: '7. When my little girl is smiling',
    artist: 'The Drifters',
  },
  {
    name: 'Eye-of-the-tiger',
    displayName: '8. Eye of the Tiger',
    artist: 'Survivor',
  },
  {
    name: 'All-Night-Long',
    displayName: '9. All Night Long',
    artist: 'Lionel Richie',
  },
  {
    name: 'Hello',
    displayName: '10. Hello',
    artist: 'Lionel Richie',
  },
  {
    name: 'Dancing-on-the-ceiling',
    displayName: '11. Dancing on the ceiling',
    artist: 'Lionel Richie',
  },
  {
    name: 'Havent-Met-You-Yet',
    displayName: '12. Havent Met You Yet',
    artist: 'Michael Buble',
  },
  {
    name: 'Copacabana',
    displayName: '13. Copacabana',
    artist: 'Barry Manilow',
  },
  {
    name: 'From-This-Moment',
    displayName: '14. From This Moment',
    artist: 'Shania Twain',
  },
  {
    name: 'Mandy',
    displayName: '15. Mandy',
    artist: 'Barry Manilow',
  },
  {
    name: 'Strange-days',
    displayName: '16. Strange Days',
    artist: 'The Struts feat. Robbie Williams',
  },
  {
    name: 'Even-Now',
    displayName: '17. Even Now',
    artist: 'Barry Manilow',
  },
  {
    name: 'Perfect',
    displayName: '18. Perfect',
    artist: 'Ed Sheeran',
  },
  {
    name: 'Read-em-and-weep',
    displayName: '19. Read Em and Weep',
    artist: 'Barry Manilow',
  },
  {
    name: 'Space',
    displayName: '20. Space',
    artist: 'Biffy Clyro',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume Bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding Volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.styleWidth = `${volume * 100}%`;
    music.volume = volume;
    // Change Icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    lastVolume = volume;
}

// Mute/Unmute
function toggleMute() {
    volumeIcon.className = '';
    if (music.volume) {
        lastVolume = music.volume;
        music.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'unmute');
    } else {
        music.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);