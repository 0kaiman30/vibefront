<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
function goChat() {
  router.push("/chat");
}
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">AsmanAI</h1>
      <p>A new AI chat experience in your browser.</p>
      <button class="cta btn-gradient" @click="goChat">Try Chat</button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: var(--primary-gradient);
  animation: fadeIn 0.6s ease;
}
.hero-content {
  text-align: center;
  max-width: 640px;
  color: #fff;
}
.hero-title {
  font-size: 3rem;
  margin-bottom: 16px;
  color: #fff;
}
p {
  margin-bottom: 24px;
  font-size: 1.125rem;
  color: #f2f2f2;
}
.cta {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.4s ease;
}
.cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
