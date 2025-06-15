<template>
  <footer class="footer">
    <p>© 2024 AI Template. Все права защищены.</p>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 24px 16px;
  font-size: 0.9rem;
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
