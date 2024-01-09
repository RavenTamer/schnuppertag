<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useCollection, getCurrentUser, useFirebaseAuth } from 'vuefire';
import { Timestamp, addDoc, orderBy, query } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { messagesCollection } from "./firebase";

const messages = useCollection(query(messagesCollection, orderBy("timestamp")));

const auth = useFirebaseAuth();

// Füge hier die Zustandsvariable zur Speicherung der Eingabe des Nachrichtenfelds hinzu


async function sendMessage() {
  // Füge hier den Code zum Senden der Nachricht hinzu


}

function isMyMessage(author) {
  // Füge hier den Code hinzu, der prüft, ob eine Nachricht von dir geschrieben wurde


}

// Füge hier die Zustandsvariable ein, die speichert, ob der Benutzer eingeloggt ist oder nicht


// Füge hier die Zustandsvariable ein, welche die Account Infos des eingeloggten Users speichert


const credentials = reactive({
  email: "",

  // Aufgabe 5: Füge hier eine zweite Zustandseigenschaft zur Speicherung des Passworts ein

})


async function loginUser() {
  // Füge hier den Code zum Anmelden des Benutzers ein


}

async function logoutUser() {
  // Füge hier den Code zum Abmelden des Benutzers ein


}

onMounted(async () => {
  // Füge hier den Code ein, der prüft ob der Nutzer eingeloggt ist und die Accountdaten
  // danach in der zugehörigen Zustandsvariable speichert, die in einem vorherigen Schritt erstellt wurde


});
</script>

<template>
  <main v-if="isLoggedIn && currentUser">
    <!-- Füge hier den Code für den Logout Knopf ein -->


    <div id="chat-messages">
      <ul>
        <li class="chat-message" v-for="message in messages" :key="message.id"
          :data-receiver="!isMyMessage(message.author)">

          <!-- Füge hier den Code zum Anzeigen einer einzelnen Nachricht ein -->

        </li>
      </ul>
    </div>
    <div id="message">
      <form @submit.prevent="sendMessage">

        <!-- Füge hier den Code des Eingabefelds zum Senden einer Nachricht ein -->

      </form>
    </div>
  </main>

  <form v-else @submit.prevent="loginUser">

    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="credentials.email">

    <!-- Aufgabe 5: Füge hier den Code für das Passwortfeld ein, analog des Emailfeldes -->



    <input type="submit" value="Login">

  </form>
</template>