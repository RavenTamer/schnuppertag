<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useCollection, getCurrentUser, useFirebaseAuth } from 'vuefire';
import { Timestamp, addDoc, orderBy, query } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { messagesCollection } from "./firebase";

const messages = useCollection(query(messagesCollection, orderBy("timestamp")));

const auth = useFirebaseAuth();

// Füge hier die beiden Zustandsvariablen zur Speicherung der Eingabewerte der Textfelder hinzu
const newMessage = ref("");

const isLoggedIn = ref(false);
const currentUser = ref();

const credentials = reactive({
  email: "",
  password: ""
});

async function loginUser() {
  await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  isLoggedIn.value = true;
}

async function sendMessage() {
  // Füge hier den Code zum Senden der Nachricht hinzu


}

function isMyMessage(author) {
  // Füge hier den Code hinzu, der prüft, ob eine Nachricht von dir geschrieben wurde


}

async function logoutUser() {
  await signOut(auth);
  isLoggedIn.value = false;
}

onMounted(async () => {
  const user = await getCurrentUser();

  if (!user) return;

  isLoggedIn.value = true;
  currentUser.value = user;
});
</script>

<template>
  <main v-if="isLoggedIn && currentUser">
    <button @click="logoutUser">Logout</button>
    <div id="chat-messages">
      <ul>
        <li class="chat-message" v-for="message in messages" :key="message.id"
          :data-receiver="!isMyMessage(message.author)">
          <span>
            {{ message.text }} <br />
            <small>by {{ message.author }}</small>
          </span>
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

    <label for="email">Passwort</label>
    <input type="password" name="password" id="password" v-model="credentials.password">

    <input type="submit" value="Login">

  </form>
</template>