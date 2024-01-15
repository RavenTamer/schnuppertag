<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useCollection, getCurrentUser, useFirebaseAuth } from 'vuefire';
import { Timestamp, addDoc, orderBy, query } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { messagesCollection } from "./firebase";

const messages = useCollection(query(messagesCollection, orderBy("timestamp")));

const auth = useFirebaseAuth();

// Aufgabe 7: Füge hier die Zustandsvariable zur Speicherung der Eingabe des Nachrichtenfelds hinzu
const messageInput = ref("");

async function sendMessage() {
  // Aufgabe 7: Füge hier den Code zum Senden der Nachricht hinzu
  await addDoc(messagesCollection, {
    text: messageInput.value,
    author: currentUser.value.email,
    timestamp: Timestamp.now()
  });

  messageInput.value = "";
}

function isMyMessage(author) {
  // Aufgabe 8: Füge hier den Code hinzu, der prüft, ob eine Nachricht von dir geschrieben wurde
  return author === currentUser.value.email;
}

// Aufgabe 5: Füge hier die Zustandsvariable ein, welche die Account Infos des eingeloggten Users speichert
const currentUser = ref();

const credentials = reactive({
  email: "",

  // Aufgabe 5: Füge hier eine zweite Zustandseigenschaft zur Speicherung des Passworts ein
  password: "",
})


async function loginUser() {
  // Aufgabe 5: Füge hier den Code zum Anmelden des Benutzers ein
  const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  currentUser.value = result.user;
}

async function logoutUser() {
  // Aufgabe 9: Füge hier den Code zum Abmelden des Benutzers ein
  await signOut(auth);
  currentUser.value = undefined;
}
</script>

<template>
  <main v-if="currentUser">
    <button @click="logoutUser">Logout</button>
    <div id="chat-messages">
      <ul>
        <li class="chat-message" v-for="message in messages" :key="message.id"
          :data-receiver="!isMyMessage(message.author)">

          <!-- Aufgabe 6: Füge hier den Code zum Anzeigen einer einzelnen Nachricht ein -->
          <span>
            {{ message.text }}<br />
            <small>by {{ message.author }}</small>
          </span>

        </li>
      </ul>
    </div>
    <div id="message">
      <form @submit.prevent="sendMessage">

        <!-- Aufgabe 7: Füge hier den Code des Eingabefelds und Knopfs zum Senden einer Nachricht ein -->
        <input type="text" name="message" id="message-input" v-model="messageInput">
        <input type="submit" value="Senden">

      </form>
    </div>
  </main>

  <form v-else @submit.prevent="loginUser">

    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="credentials.email">

    <!-- Aufgabe 5: Füge hier den Code für das Passwortfeld ein, analog des Emailfeldes -->
    <label for="password">Passwort</label>
    <input type="password" name="password" id="password" v-model="credentials.password">


    <input type="submit" value="Login">

  </form>
</template>