import { onMounted, ref } from "vue";

// FIREBASE
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCJmR2smkPR_UUWJa1lXU6KpznDOjuVD8",
    authDomain: "projekt-ionic.firebaseapp.com",
    projectId: "projekt-ionic",
    storageBucket: "projekt-ionic.appspot.com",
    messagingSenderId: "1061286706728",
    appId: "1:1061286706728:web:f8fce27b01b860d2f93f1d",
    measurementId: "G-JGQ0K16784"
  };

const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();

const itemCollection = db.collection("item_collection");

// keep data / state here
const listData = ref<any>([]);

export default function() {
  /**
   *
   */
  const loadData = async () => {
    const querySnapShot = await itemCollection.get();
    listData.value = querySnapShot.docs.map((doc: any) => {
      return { ...doc.data(), id: doc.id };
    });
    return true;
  };

  /**
   * 
   * @param item 
   */
  const deleteItem = async (item: any) => {
    await itemCollection.doc(item.id).delete();
    await loadData();
    return true;
  };

  /**
   * 
   * @param item 
   * @param id 
   */
  const addOrUpdate = async (item: any, id?: string) => {
    if (id) {
      await itemCollection.doc(id).set(item, { merge: true });
      await loadData();
      return true;
    } else {
      await itemCollection.doc().set(item);
      await loadData();
      return true;
    }
  };

  onMounted(async () => {
    await loadData();
  });

  return {
    // props
    listData,

    // functions
    deleteItem,
    addOrUpdate,
  };
}