<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>HOME/REJESTRACJA PRODUKTU</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <produkt
        :is-open="modalInfo.show"
        :initialValues="modalInfo.data"
        @modal-closed="handleModalClosed"
      />
      <!-- ALERT -->
      <ion-alert
        :is-open="alert.isOpen"
        :header="alert.header"
        :sub-header="alert.subHeader"
        :message="alert.message"
        :buttons="['OK']"
        @onDidDismiss="clearAlert()"
      >
      </ion-alert>
      <ion-button @click="showModal">Dodaj Produkt</ion-button>
      <div v-for="item in listData" :key="item.id">
        <ion-item>
          <ion-label @click="handleEdit(item)">
            <div>Nazwa Produktu: {{ item.title }}</div>
            <div class="ion-text-wrap">Krotki opis: {{ item.description }}</div>
            <div class="ion-text-wrap">Cena za 1 szt: {{ item.number }} ZŁ.</div>
            <div class="ion-text-wrap">Ilosc Produktu: {{ item.numberSecond }} SZT.</div>
            <div class="ion-text-wrap">Termin Waznosci: {{ item.dueDate }}</div>
            <p>ID PRODUKTU: {{ item.id }}</p>
          </ion-label>
          <ion-button @click.self="handleDelete(item)" slot="end" fill="clear"
            ><ion-icon
              :icon="trashSharp"
              slot="icon-only"
              color="danger"
            ></ion-icon>
          </ion-button>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonIcon,
  IonAlert
} from "@ionic/vue";
import { trashSharp } from "ionicons/icons";
import { defineComponent, reactive, computed } from "vue";
import Produkt from "./Produkt.vue";
import dataStore from "../datastore";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    Produkt,
    IonItem,
    IonIcon,
    IonLabel,
    IonAlert
  },
  setup() {
    // get functions
    const { listData, deleteItem, addOrUpdate } = dataStore();
    // hold list of items
    const modalInfo = reactive<{ show: boolean; data: any }>({
      show: false,
      data: null
    });

    const alert = reactive<any>({
      isOpen: false,
      header: "",
      subHeader: "",
      message: ""
    });

    /**
     *
     */
    const setAlert = (subHeader: string, message: string) => {
      Object.assign(alert, {
        isOpen: true,
        header: "REJESTRACJA PRODUKTU",
        subHeader,
        message
      });
    };

    const clearAlert = () => {
      Object.assign(alert, {
        isOpen: false,
        header: "WYCZYSZCZONO EKRAN",
        subHeader: "",
        message: ""
      });
    };

    const showModal = () => {
      modalInfo.show = true;
      modalInfo.data = null;
    };

    // delete the item
    //USUWANIE PRODUKTU
    const handleDelete = async (item: any) => {
      await deleteItem(item);
      setAlert("Usunięto Produkt", `Produkt ${item.id} usunięty pomyślnie`);
    };

    // edit the item
    //EDYTOWANIE PRODUKTU
    const handleEdit = (item: any) => {
      modalInfo.show = true;
      modalInfo.data = { ...item };
    };

    //GŁÓWNA FUNKCJA ZAPISUJACA PO KLIKNIECIU SAVE
    const handleModalClosed = async (eventData: any) => {
      modalInfo.show = false;
      if (eventData.isCancelled) {
        alert("Przerwano operacje");
      } else {
        // update item
        if (eventData.formInfo.id) {
          await addOrUpdate(eventData.formInfo, eventData.formInfo.id);
          setAlert(
            "Modyfikacja Produktu",
            `Produkt ${eventData.formInfo.id} zmodyfikowanie pomyslnie`
          );
        } else {
          // want to save the data
          await addOrUpdate(eventData.formInfo);
          setAlert("Dodawanie Produktu", "Produkt dodany pomyslnie");
        }
      }
      modalInfo.data = null;
    };
    return {
      // functions
      showModal,
      handleModalClosed,
      handleDelete,
      handleEdit,
      clearAlert,

      // properties
      listData,
      modalInfo,
      trashSharp,
      alert
    };
  }
});
</script>

<style scoped>
</style>