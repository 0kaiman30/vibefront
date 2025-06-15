<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/shared/ui/Modal.vue";
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";

const open = ref(false);
const activePlan = ref("");
const card = ref("");
const date = ref("");
const cvv = ref("");

function openModal(plan: string) {
  activePlan.value = plan;
  open.value = true;
}
function close() {
  open.value = false;
}
function pay() {
  localStorage.setItem("subscription", activePlan.value);
  alert("Спасибо за покупку!");
  close();
}

const plans = [
  {
    name: "START",
    price: "$4.99 / месяц",
    benefits: ["100 запросов в день", "Обычная очередь"],
  },
  {
    name: "PRO",
    price: "$9.99 / месяц",
    benefits: ["Безлимитные запросы", "Приоритетная очередь", "Новые функции"],
  },
  {
    name: "ULTIMATE",
    price: "$19.99 / месяц",
    benefits: [
      "Безлимит +",
      "Самая высокая приоритетность",
      "Ранний доступ к beta",
    ],
  },
];
</script>

<template>
  <section class="sub-page">
    <div class="plans">
      <div
        class="sub-card slide-up-enter-active"
        v-for="plan in plans"
        :key="plan.name"
      >
        <h2 class="title text-gradient">{{ plan.name }}</h2>
        <p class="price">{{ plan.price }}</p>
        <ul class="benefits">
          <li v-for="b in plan.benefits" :key="b">{{ b }}</li>
        </ul>
        <Button class="btn-gradient w-full" @click="openModal(plan.name)"
          >Оформить</Button
        >
      </div>
    </div>
  </section>

  <Modal :open="open" @close="close">
    <h3 class="modal-title">Данные карты</h3>
    <form class="pay-form" @submit.prevent="pay">
      <Input placeholder="Номер карты" v-model="card" />
      <div class="row">
        <Input placeholder="MM/YY" v-model="date" />
        <Input placeholder="CVV" v-model="cvv" />
      </div>
      <Button type="submit" class="btn-gradient w-full">Оплатить $9.99</Button>
    </form>
  </Modal>
</template>

<style scoped>
.sub-page {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}
.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1000px;
}
.sub-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-secondary);
  border-radius: 10px;
  padding: 40px 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
  min-height: 420px;
}
.title {
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
}
.price {
  text-align: center;
  font-size: 1.25rem;
  margin-top: -10px;
  margin-bottom: 10px;
  color: var(--text-secondary);
}
.benefits {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0;
  margin-bottom: 10px;
}
.benefits li::before {
  content: "✓";
  margin-right: 6px;
  color: var(--primary-color);
}
.modal-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}
.pay-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.row {
  display: flex;
  gap: 10px;
}
.row :deep(input) {
  width: 100%;
}
.w-full {
  width: 100%;
}
.sub-card .btn-gradient {
  margin-top: auto;
}
</style>
