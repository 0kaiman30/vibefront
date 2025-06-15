<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Modal from "@/shared/ui/Modal.vue";
import Input from "@/shared/ui/Input.vue";
import Button from "@/shared/ui/Button.vue";

const router = useRouter();

const open = ref(false);
const success = ref(false);
const error = ref(false);
const needLogin = ref(false);
const activePlan = ref<any>(null);
const card = ref("");
const date = ref("");
const cvv = ref("");

function openModal(plan: any) {
  if (!localStorage.getItem("token")) {
    needLogin.value = true;
    return;
  }
  activePlan.value = plan;
  open.value = true;
}
function close() {
  open.value = false;
}
function pay() {
  if (!activePlan.value) return;
  if (!canPay.value) {
    error.value = true;
    return;
  }
  localStorage.setItem("subscription", activePlan.value.name);
  card.value = date.value = cvv.value = "";
  open.value = false;
  success.value = true;
}

const activePrice = computed(() => activePlan.value?.price ?? "");

const canPay = computed(
  () =>
    card.value.trim().length >= 12 &&
    date.value.trim().length >= 4 &&
    cvv.value.trim().length >= 3
);

const plans = [
  {
    name: "START",
    price: "$4.99 / month",
    benefits: ["100 requests per day", "Normal queue"],
  },
  {
    name: "PRO",
    price: "$9.99 / month",
    benefits: ["Unlimited requests", "Priority queue", "New features"],
  },
  {
    name: "ULTIMATE",
    price: "$19.99 / month",
    benefits: ["Unlimited +", "Highest priority", "Beta early access"],
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
        <Button class="btn-gradient w-full" @click="openModal(plan)">
          Subscribe
        </Button>
      </div>
    </div>
  </section>

  <Modal :open="open" @close="close">
    <h3 class="modal-title">Card Details</h3>
    <form class="pay-form" @submit.prevent="pay">
      <Input placeholder="Card number" v-model="card" />
      <div class="row">
        <Input placeholder="MM/YY" v-model="date" />
        <Input placeholder="CVV" v-model="cvv" />
      </div>
      <Button type="submit" class="btn-gradient w-full"
        >Pay {{ activePrice }}</Button
      >
    </form>
  </Modal>

  <Modal :open="success" @close="success = false">
    <div class="success-modal">
      <div class="icon">🎉</div>
      <h3 class="modal-title">Congratulations!</h3>
      <p>
        You have successfully subscribed to the
        <strong>{{ activePlan?.name }}</strong> plan.
      </p>
      <Button class="btn-gradient w-full" @click="success = false"
        >Awesome!</Button
      >
    </div>
  </Modal>

  <Modal :open="error" @close="error = false">
    <h3 class="modal-title">Fill in all fields</h3>
    <p>
      Please enter a valid card number (16 digits), expiry date (MM/YY) and CVV
      (3 digits).
    </p>
    <Button class="btn-gradient w-full" @click="error = false">Got it</Button>
  </Modal>

  <Modal :open="needLogin" @close="needLogin = false">
    <h3 class="modal-title">Please sign in</h3>
    <p>You must be logged in to purchase a subscription.</p>
    <div class="login-action">
      <Button
        class="btn-gradient w-full"
        @click="
          () => {
            needLogin = false;
            router.push('/login');
          }
        "
        >Log in</Button
      >
    </div>
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
.success-modal {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.success-modal .icon {
  font-size: 3rem;
}
.login-action {
  margin-top: 16px;
}

@media (max-width: 600px) {
  .plans {
    grid-template-columns: 1fr;
  }
  .sub-card {
    padding: 32px 24px;
    min-height: auto;
  }
  .title {
    font-size: 1.6rem;
  }
}
</style>
