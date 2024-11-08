import { auth, dbService, storageService } from "@/lib/firebase/firebase";
import { GalleryItemDoc, UserDoc } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { API_BASE_URL, API_TAG } from ".";
import { User } from "firebase/auth/web-extension";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";

export async function uploadImage(document: GalleryItemDoc) {
  const collectionName = document.isGif ? "gifs" : "images";

  const ref = collection(dbService, collectionName);

  const newImageDoc = await addDoc(ref, document);
  const newImageRef = doc(dbService, collectionName, newImageDoc.id);

  await updateDoc(newImageRef, {
    id: newImageDoc.id,
  });
}
export async function getGallery() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/gallery/`, {
      cache: "force-cache",
      next: { tags: [API_TAG.gallery] },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllImages() {
  const collectionRef = collection(dbService, "images");

  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents as GalleryItemDoc[];
  } catch (error) {
    console.error("문서 가져오기 오류:", error);
  }
}

export async function getAllGifs() {
  const collectionRef = collection(dbService, "gifs");

  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents as GalleryItemDoc[];
  } catch (error) {
    console.error("문서 가져오기 오류:", error);
  }
}

export async function googleLogin() {
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  let status = null;
  let userData = null;

  try {
    const loginRes = await signInWithPopup(auth, provider);
    console.log(loginRes);
    status = true;
    userData = loginRes.user;
  } catch (error) {
    status = false;
  }

  return { status, userData };
}

export async function getUserDocument(uid: string) {
  const ref = doc(dbService, "user", uid);
  const res = await getDoc(ref);

  if (res.exists()) {
    return res.data();
  }
  return null;
}
export async function postUserDocument(user: UserDoc) {
  const ref = doc(dbService, "user", user.uid);
  const res = await setDoc(ref, user);
}

export async function deleteGalleryItem(imageDoc: GalleryItemDoc) {
  let imageRef;

  if (imageDoc.isGif) {
    imageRef = ref(storageService, `gallery/gif/${imageDoc.storageFileName}`);
  } else {
    imageRef = ref(
      storageService,
      `gallery/images/${imageDoc.storageFileName}`
    );
  }

  const fileDelRes = await deleteObject(imageRef);
  console.log(fileDelRes);
  const docDelRes = await deleteDoc(
    doc(dbService, imageDoc.isGif ? "gif" : "images", imageDoc.id!)
  );
  console.log(docDelRes);
}
