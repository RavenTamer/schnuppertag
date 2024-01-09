<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useCollection, getCurrentUser, useFirebaseAuth } from 'vuefire';
import { Timestamp, addDoc, orderBy, query } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { messagesCollection } from "./firebase";

const messages = useCollection(query(messagesCollection, orderBy("timestamp")));

const auth = useFirebaseAuth();

const newMessage = ref("");

async function sendMessage() {
  const user = await getCurrentUser();

  addDoc(messagesCollection, {
    text: newMessage.value,
    author: user.email,
    timestamp: Timestamp.now()
  });
}

function isMyMessage(author) {
  return author === currentUser.value.email;
}

const currentUser = ref();

const credentials = reactive({
  email: "",
  password: ""
});

async function loginUser() {
  const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  currentUser.value = result.user;
}

async function logoutUser() {
  await signOut(auth);
  currentUser.value = undefined;
}

// onMounted(async () => {
//   const user = await getCurrentUser();

//   if (!user) return;

//   currentUser.value = user;
// });
</script>

<template>
  <main v-if="currentUser">
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
        <!-- Eingabefeld für neue Nachricht -->
        <input type="text" name="message" id="message-input" v-model="newMessage">

        <!-- Knopf zum Absenden der neuen Nachricht -->
        <input type="submit" id="message-send" value="Senden">
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