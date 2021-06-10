<template>
  <ion-page>
    <transition class="fadeIn">
    <ion-header :translucent="true">
      <ion-toolbar>
        <div class="center">
        <ion-title>REJESTRACJA PRODUKTU</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    </transition>

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
      <div class="center">
        <transition class="fadeInLeft">
      <ion-button @click="showModal" shape="round">Dodaj Produkt</ion-button>
      </transition>
      </div>
      <div v-for="item in listData" :key="item.id">
        <transition class="product_list">
        <ion-item class="container">
          <ion-label @click="handleEdit(item)">
            <div>Nazwa Produktu: {{ item.title }}</div>
            <div class="ion-text-wrap">Krotki opis: {{ item.description }}</div>
            <div class="ion-text-wrap">Cena za 1 szt: {{ item.number }} ZŁ.</div>
            <div class="ion-text-wrap">Ilosc Produktu: {{ item.numberSecond }} SZT.</div>
            <div class="ion-text-wrap">Termin Waznosci: {{ item.dueDate }}</div>
            <p>ID PRODUKTU: {{ item.id }}</p>
          </ion-label>
          <ion-button @click.self="handleAddPicture(item)" slot="end" fill="clear"
            ><ion-icon
              :icon="cameraSharp"
              slot="icon-only"
              color="danger"
            ></ion-icon>
          </ion-button>
          <ion-button @click.self="handleDelete(item)" slot="end" fill="clear"
            ><ion-icon
              :icon="trashSharp"
              slot="icon-only"
              color="danger"
            ></ion-icon>
          </ion-button>
        </ion-item>
        </transition>
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
import { cameraSharp } from "ionicons/icons";
import { defineComponent, reactive, computed } from "vue";
import Produkt from "./Produkt.vue";
import dataStore from "../datastore";
import 'animate.css';

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
      cameraSharp,
      alert
    };
  }
});
</script>

<style scoped>
.product_list{
  opacity: 1;
  transform: scale(0.9);
  transition:1s;
}
.product_list:active{
  opacity: 1;
  transform: scale(1);
  transition:1s;
}
.center{
    text-align: center;
}

.container{
  border-radius: 30px;
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes fadeInLeft {
  0% {
  opacity: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  }
  100% {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  }
  }
  @keyframes fadeInLeft {
  0% {
  opacity: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
  }
  100% {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  }
  } 

   .fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes fadeInRight {
  0% {
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  }
  100% {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  }
  }
  @keyframes fadeInRight {
  0% {
  opacity: 0;
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
  }
  100% {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  }
  } 

  .bounceIn {
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
  -webkit-animation-duration: .75s;
  animation-duration: .75s;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes bounceIn {
  0%, 20%, 40%, 60%, 80%, 100% {
  -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
  opacity: 0;
  -webkit-transform: scale3d(.3, .3, .3);
  transform: scale3d(.3, .3, .3);
  }
  20% {
  -webkit-transform: scale3d(1.1, 1.1, 1.1);
  transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
  -webkit-transform: scale3d(.9, .9, .9);
  transform: scale3d(.9, .9, .9);
  }
  60% {
  opacity: 1;
  -webkit-transform: scale3d(1.03, 1.03, 1.03);
  transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
  -webkit-transform: scale3d(.97, .97, .97);
  transform: scale3d(.97, .97, .97);
  }
  100% {
  opacity: 1;
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  }
  }
  @keyframes bounceIn {
  0%, 20%, 40%, 60%, 80%, 100% {
  -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
  opacity: 0;
  -webkit-transform: scale3d(.3, .3, .3);
  transform: scale3d(.3, .3, .3);
  }
  20% {
  -webkit-transform: scale3d(1.1, 1.1, 1.1);
  transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
  -webkit-transform: scale3d(.9, .9, .9);
  transform: scale3d(.9, .9, .9);
  }
  60% {
  opacity: 1;
  -webkit-transform: scale3d(1.03, 1.03, 1.03);
  transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
  -webkit-transform: scale3d(.97, .97, .97);
  transform: scale3d(.97, .97, .97);
  }
  100% {
  opacity: 1;
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  }
  } 

  .fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes fadeOut {
  0% {opacity: 1;}
  100% {opacity: 0;}
  }
  @keyframes fadeOut {
  0% {opacity: 1;}
  100% {opacity: 0;}
  } 

  .fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  }
  @-webkit-keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
  }
  @keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
  } 

</style>