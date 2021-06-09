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
        <transition class="bounceIn">
        <ion-button @click="handleDidDismiss(false)" shape="round">ZAPISZ</ion-button>
        </transition>
        <transition class="bounceIn">
        <ion-button color="danger" @click="handleDidDismiss(true)" shape="round"
          >COFNIJ</ion-button
        >
        </transition>
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
  @-webkit-keyframes bounceIn { /*the animation will gradually change from the current style to the new style at certain times*/
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
</style>