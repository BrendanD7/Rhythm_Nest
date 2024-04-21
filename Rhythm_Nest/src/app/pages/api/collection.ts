import firebase_app from "../../firebase/config";
import { getFirestore, doc, DocumentReference, DocumentSnapshot, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

interface GetDocumentResult {
  result: DocumentSnapshot | null;
  error: any;
}

export default async function getDocument(collection: string, id: string): Promise<GetDocumentResult> {
  const docRef: DocumentReference = doc(db, collection, id);
  let result: DocumentSnapshot | null = null;
  let error: any = null;

  try {
    result = await getDoc(docRef);
  } catch (e: any) {
    error = e;
  }
  return { result, error };
}
