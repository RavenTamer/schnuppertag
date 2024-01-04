<script setup>
import { computed, ref, watch } from 'vue';
import { useCollection } from 'vuefire';
import { addDoc, getDocs, query, where } from "firebase/firestore"
import { messagesCollection } from "./firebase"

const messages = useCollection(messagesCollection);

const me = ref();

const newMessage = ref("");
const newUsername = ref("");

function sendMessage() {
  addDoc(messagesCollection, {
    text: newMessage.value,
    author: me.value
  });
}

function isMyMessage(author) {
  return author === me.value
}

function setUsername() {
  me.value = newUsername.value;
}
</script>

<template>
  <main>
    <div>
      <form @submit.prevent="setUsername">
        <label for="username">Benutzername</label>
        <input type="text" id="username" name="username" v-model="newUsername">
        <input type="submit" value="Speichern">
      </form>
    </div>
    <div id="chat-messages">
      <ul>
        <li class="chat-message" v-for="message in messages" :key="message.id"
          :data-receiver="isMyMessage(message.author)">
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
        <input type="submit" id="message-send" value="Senden" v-if="!me">
      </form>
      <p v-if="!me" class="error">Du must zuerst einen Benutzernamen wählen</p>
    </div>
  </main>
</template>