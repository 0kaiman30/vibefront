<script setup lang="ts">
import { ref } from "vue";
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";
import { useRouter } from "vue-router";
import Modal from "@/shared/ui/Modal.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref(false);

function submit() {
  if (!email.value.trim() || !password.value.trim()) {
    error.value = true;
    return;
  }
  const fakeToken = Date.now().toString();
  localStorage.setItem("token", fakeToken);
  localStorage.setItem("email", email.value);
  router.push("/profile");
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-card slide-up-enter-active">
      <h2 class="auth-title text-gradient">Welcome!</h2>
      <p class="subtitle">Log in to start chatting with AsmanAI</p>
      <form @submit.prevent="submit" class="auth-form">
        <Input v-model="email" placeholder="Email" />
        <Input v-model="password" placeholder="Password" type="password" />
        <Button type="submit" class="btn-gradient w-full">Log in</Button>
      </form>
      <p class="alt">
        Don't have an account?
        <router-link class="link" to="/register">Sign up</router-link>
      </p>
      <Modal :open="error" @close="error = false">
        <h3 class="modal-title">Fill in all fields</h3>
        <p>Please enter email and password.</p>
        <Button class="btn-gradient w-full" @click="error = false"
          >Got it</Button
        >
      </Modal>
    </div>
  </section>
</template>

<style scoped>
.auth-page {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: var(--primary-gradient);
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 40px 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}

.subtitle {
  text-align: center;
  font-size: 0.95rem;
  margin: 6px 0 24px;
  color: var(--text-secondary);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.w-full {
  width: 100%;
}

.alt {
  margin-top: 20px;
  font-size: 0.875rem;
  text-align: center;
  color: var(--text-secondary);
}

.link {
  color: var(--primary-color);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-page {
    padding: 20px 10px;
  }
  .auth-card {
    padding: 28px 20px;
  }
  .auth-title {
    font-size: 1.6rem;
  }
}
</style>
