<script setup lang="ts">
import { ref } from "vue";
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

function submit() {
  const fakeToken = Date.now().toString();
  localStorage.setItem("token", fakeToken);
  localStorage.setItem("email", email.value);
  router.push("/profile");
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-card slide-up-enter-active">
      <h2 class="auth-title text-gradient">Добро пожаловать!</h2>
      <p class="subtitle">Войдите, чтобы начать общаться с PenisAi</p>
      <form @submit.prevent="submit" class="auth-form">
        <Input v-model="email" placeholder="Email" />
        <Input v-model="password" placeholder="Пароль" type="password" />
        <Button type="submit" class="btn-gradient w-full">Войти</Button>
      </form>
      <p class="alt">
        Нет аккаунта?
        <router-link class="link" to="/register">Зарегистрируйтесь</router-link>
      </p>
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
</style>
