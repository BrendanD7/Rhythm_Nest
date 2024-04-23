import firebase_app from "../../firebase/config";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const db = getFirestore(firebase_app);

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET || "";

interface Album {
  albumName: string;
  artistName: string;
  albumFormat: string;
  releaseDate: string;
  albumCover: string;
  tracklist: Track[];
}

interface Track {
  name: string;
  duration: string;
}

// Declare Spotify API instance
export const spotifyApi = SpotifyApi.withClientCredentials(
  clientId,
  clientSecret
);

export async function getUserCollection(uid: string) {
  try {
    const userCollectionRef = collection(db, `Users/${uid}/Collection`);
    const userCollectionQuery = query(userCollectionRef);
    const querySnapshot = await getDocs(userCollectionQuery);
    const userCollection: Album[] = [];

    querySnapshot.forEach((doc) => {
      const albumData = doc.data() as Album;
      userCollection.push(albumData);
    });
    return userCollection;
  } catch (error) {
    console.error("Error retrieving collection");
    return [];
  }
}

export async function getUserWishlist(uid: string) {
  try {
    const userCollectionRef = collection(db, `Users/${uid}/Wishlist`);
    const userCollectionQuery = query(userCollectionRef);
    const querySnapshot = await getDocs(userCollectionQuery);
    const userCollection: Album[] = [];

    querySnapshot.forEach((doc) => {
      const albumData = doc.data() as Album;
      userCollection.push(albumData);
    });
    return userCollection;
  } catch (error) {
    console.error("Error retrieving Wishlist");
    return [];
  }
}

export async function addAlbumCollection(
  albumName: string,
  artistName: string,
  albumFormat: string,
  userUid: string
) {
  const searchResult = await spotifyApi.search(albumName, ["album"]);
  // Filter the search results to find the album matching the artist name
  const album = searchResult.albums?.items.find((item) =>
    item.artists.some((artist) => artist.name === artistName)
  );

  if (!album) {
    console.log("Album Not Found");
    return;
  }
  const tracksPage = await spotifyApi.albums.tracks(album.id);
  const { name, artists, images, release_date, genres } = album;
  const tracks = tracksPage.items;
  const formattedTracklist = tracks.map((track) => {
    const minutes = Math.floor(track.duration_ms / 60000);
    const seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
    return {
      name: track.name,
      duration: `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`,
    };
  });

  // Map Data and Save to Firebase
  const albumData: Album = {
    albumName: name,
    artistName: artists[0].name,
    albumFormat: albumFormat,
    releaseDate: release_date,
    albumCover: images[0].url,
    tracklist: formattedTracklist,
  };

  const userCollectionRef = collection(db, `Users/${userUid}/Collection`);
  const newAlbumRef = doc(userCollectionRef);
  await setDoc(newAlbumRef, albumData);
}

export async function addAlbumWishlist(
  albumName: string,
  artistName: string,
  albumFormat: string,
  userUid: string
) {
  const searchResult = await spotifyApi.search(albumName, ["album"]);
  // Filter the search results to find the album matching the artist name
  const album = searchResult.albums?.items.find((item) =>
    item.artists.some((artist) => artist.name === artistName)
  );

  if (!album) {
    console.log("Album Not Found");
    return;
  }
  const tracksPage = await spotifyApi.albums.tracks(album.id);
  const { name, artists, images, release_date, genres } = album;
  const tracks = tracksPage.items;
  const formattedTracklist = tracks.map((track) => {
    const minutes = Math.floor(track.duration_ms / 60000);
    const seconds = ((track.duration_ms % 60000) / 1000).toFixed(0);
    return {
      name: track.name,
      duration: `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`,
    };
  });

  // Map Data and Save to Firebase
  const albumData: Album = {
    albumName: name,
    artistName: artists[0].name,
    albumFormat: albumFormat,
    releaseDate: release_date,
    albumCover: images[0].url,
    tracklist: formattedTracklist,
  };

  const userCollectionRef = collection(db, `Users/${userUid}/Wishlist`);
  const newAlbumRef = doc(userCollectionRef);
  await setDoc(newAlbumRef, albumData);
}

export async function deleteItem(
  albumName: string,
  artistName: string,
  albumFormat: string,
  userUid: string,
  location: string
) {
  try {
    let collectionRef = collection(db, `Users/${userUid}/${location}`);
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      if (
        data.albumName === albumName &&
        data.artistName === artistName &&
        data.albumFormat === albumFormat
      ) {
        await deleteDoc(doc.ref);
      }
    });
  } catch (error) {
    console.error("Error deleting item", error);
  }
}

export async function transferToCatalogue(
  albumName: string,
  artistName: string,
  albumFormat: string,
  userUid: string
) {
  try {
    const querySnapshot = await getDocs(
      collection(db, `Users/${userUid}/Wishlist`)
    );
    const itemToTransfer = querySnapshot.docs.find((doc) => {
      const data = doc.data();
      return (
        data.albumName === albumName &&
        data.artistName === artistName &&
        data.albumFormat === albumFormat
      );
    });
    if (!itemToTransfer) {
      console.error("Transfer Item not Found");
      return;
    }
    const collectionRef = collection(db, `Users/${userUid}/Collection`);
    await setDoc(doc(collectionRef, itemToTransfer.id), itemToTransfer.data());
    await deleteDoc(itemToTransfer.ref);
  } catch (error) {
    console.error("Error transferring item: ", error);
  }
}
