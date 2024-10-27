import { dbService } from "@/lib/firebase/firebase";
import { GalleryItemDoc } from "@/types";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";

export async function uploadImage(document: GalleryItemDoc) {
  const collectionName = document.isGif ? "gifs" : "images";

  const ref = collection(dbService, collectionName);

  const newImageDoc = await addDoc(ref, document);
  const newImageRef = doc(dbService, collectionName, newImageDoc.id);

  await updateDoc(newImageRef, {
    id: newImageDoc.id,
  });
}

export async function getAllImages() {
  const collectionRef = collection(dbService, "images");

  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return documents;
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

    console.log("가져온 문서들:", documents);
    return documents;
  } catch (error) {
    console.error("문서 가져오기 오류:", error);
  }
}
