<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref(localStorage.getItem("name") || "Mr. Asman");
const email = ref(localStorage.getItem("email") || "example@mail.com");
const subscription = ref(
  localStorage.getItem("subscription") || "No subscription"
);
const planClass = computed(() => subscription.value.toLowerCase());

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("subscription");
  router.push("/");
}
</script>

<template>
  <section class="profile-page">
    <div :class="['profile-card', planClass, 'slide-up-enter-active']">
      <h2 class="title text-gradient">Profile</h2>
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Subscription:</strong> {{ subscription }}</p>
      <button class="logout" @click="logout">Logout</button>
    </div>
  </section>
</template>

<style scoped>
.profile-page {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}
.profile-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 40px 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
}
.title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
}
.logout {
  margin-top: 20px;
  background: var(--primary-gradient);
  color: #fff;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.4s ease, transform 0.2s ease;
}
.logout:hover {
  transform: translateY(-2px);
}

/* Plan specific styles */
.profile-card.start {
  border: 2px solid var(--primary-color);
}
.profile-card.pro {
  background: var(--bg-secondary);
  color: var(--text);
  border: 1px solid var(--border);
  position: relative;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.profile-card.pro::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: var(--primary-gradient);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.profile-card.pro .logout {
  background: var(--primary-gradient);
  color: #fff;
}
.profile-card.pro .title {
  color: var(--text);
}
.profile-card.pro::after {
  content: "";
  position: absolute;
  bottom: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  background: var(--primary-gradient);
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  pointer-events: none;
}
.profile-card.ultimate {
  background: rgba(115, 102, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  border: 2px solid rgba(255, 107, 203, 0.6);
  color: #fff;
  box-shadow: 0 0 25px rgba(115, 102, 255, 0.4),
    0 0 40px rgba(255, 107, 203, 0.25);
}
.profile-card.ultimate .title {
  color: #fff;
}
/* logout buttons */
.profile-card.pro .logout {
  background: var(--primary-gradient);
  color: #fff;
}
.profile-card.ultimate .logout {
  background: #fff;
  color: var(--primary-color);
}
</style>
