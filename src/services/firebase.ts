import { dbService } from "@/lib/firebase/firebase";
import { GalleryItemDoc } from "@/types";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export async function uploadImage(document: GalleryItemDoc) {
  const collectionName = document.isGif ? "gif" : "images";

  const ref = collection(dbService, collectionName);

  const newImageDoc = await addDoc(ref, document);
  const newImageRef = doc(dbService, collectionName, newImageDoc.id);

  await updateDoc(newImageRef, {
    id: newImageDoc.id,
  });
}
