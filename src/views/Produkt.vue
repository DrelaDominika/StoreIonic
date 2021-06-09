<template>
  <ion-modal :is-open="isOpen" @onDidDismiss="handleDidDismiss(true)">
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Produkt</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Nazwa Produktu</ion-label>
          <ion-input v-model="formInfo.title"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Krotki Opis</ion-label>
          <ion-textarea v-model="formInfo.description" rows="4"></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Cena</ion-label>
          <ion-input v-model="formInfo.number" type="number"></ion-input>
        </ion-item>
         <ion-item>
          <ion-label position="stacked">Ilosc</ion-label>
          <ion-input v-model="formInfo.numberSecond" type="number"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Termin Waznosci</ion-label>
          <ion-datetime
            display-format="MM DD YY"
            v-model="formInfo.dueDate"
          ></ion-datetime>
        </ion-item>
        <ion-button @click="handleDidDismiss(false)">ZAPISZ</ion-button>
        <ion-button color="danger" @click="handleDidDismiss(true)"
          >COFNIJ</ion-button
        >
      </ion-content>
    </ion-page>
  </ion-modal>
</template>

<script lang="ts">
import {
  IonModal,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonItem,
} from "@ionic/vue";
import { defineComponent, SetupContext, reactive, computed, watch } from "vue";

export default defineComponent({
  name: "Produkt",
  components: {
    IonModal,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonLabel,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonItem,
  },
  props: {
    isOpen: {
      default: false,
      required: true,
    },
    initialValues: {
      default: {},
    },
  },
  setup(props: any, ctx: SetupContext) {
    const formInfo = reactive<any>({
      title: "",
      description: "",
      number: "",
      numberSecond: "",
      dueDate: "",
    });

    // check if modal is in edit mode
    const inEditMode = computed(() => (props.initialValues?.id ? true : false));

    // will watch to see if we have initial values
    // to add to the form
    watch(
      () => props.initialValues,
      (newVal) => {
        if (newVal && inEditMode.value) {
          Object.assign(formInfo, props.initialValues);
        }
      }
    );

    const handleDidDismiss = (isCancelled: boolean) => {
      // this is to ignore the onDidDismiss if we
      // are closed from a button click
      if (!props.isOpen) return;

      let payload = null;

      console.log(isCancelled);
      if (isCancelled) {
        payload = {
          isCancelled: true,
          formInfo: null,
        };
      } else if (inEditMode.value) {
        // editing, need to pass back id
        payload = {
          isCancelled: false,
          formInfo: { ...formInfo, id: props.initialValues?.id },
        };
      } else {
        // creating
        delete formInfo.id;
        payload = {
          isCancelled: false,
          formInfo: { ...formInfo },
        };
      }

      // emit event...
      ctx.emit("modal-closed", payload);

      // clear fields
      Object.assign(formInfo, {
        title: "",
        description: "",
        number: "",
        numberSecond: "",
        dueDate: "",
      });
    };
    return {
      // functions
      handleDidDismiss,

      // properties
      formInfo,
      inEditMode,
    };
  },
});
</script>

<style scoped>
</style>