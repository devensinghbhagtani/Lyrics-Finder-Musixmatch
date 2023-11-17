<img src="https://user-images.githubusercontent.com/67409912/283704594-29746d95-640d-489d-ac8b-b66160f4c778.png" alt="Lyrics-Finder" width="600"/>

This project is a Lyrics Finder website that allows users to search for song lyrics using the Musixmatch AP with an amazing user interface.

## Background

Initially, most projects and applications on GitHub and across the internet used the `lyrics.ovh` API for fetching song lyrics due to its simplicity and ease of use. However, the `lyrics.ovh` API has undergone changes, and it now provides only song information, rendering it unsuitable for a website like Lyrics Finder. Thus, the Musixmatch API was integrated into this project, although it offers only 30% of the lyrics for free.

## How to Install and Run

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/LyricsFinder.git

2. **Navigate to the Project Directory:**
    ```bash
    cd LyricsFinder

3. **Install Dependencies:**
    ```bash
    npm install

4. **Start the Server:**
    ```bash
    npm start

5. **Access the Website:**<br>
    Run index.html in your browser to use the website.

<img src="https://github.com/devensinghbhagtani/Lyrics-Finder-Musixmatch/assets/67409912/e30e2961-c83e-423c-b564-b5949acfb922" alt="First-Screenshot" width="900"/><br>
<img src="https://github.com/devensinghbhagtani/Lyrics-Finder-Musixmatch/assets/67409912/7bf00f2d-8169-45db-8a9a-6e6a87c001c6" alt="Second-Screenshot" width="900"/>

## Requirements
The project requires Node.js and npm to be installed on your machine.

## Dependencies Used
- Express.js
- Cors
- Node-fetch

## Disclaimer
Please note that the Musixmatch API used in this project **provides a limited portion (30%) of the song lyrics for free**. To access full lyrics and additional features, a premium subscription might be required.
