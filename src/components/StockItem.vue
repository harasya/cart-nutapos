<template>
  <table>
    <thead>
      <tr>
        <th v-for="field in fields" :key="field.key">
          {{ field.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="field in fields" :key="field.key" class="bg-light-subtle">
          <slot :name="`cell(${field.key})`" :item="item">
            <input
              v-model="item[field.key]"
              :type="field.type"
              :disabled="field.disabled"
              autocomplete="off"
              :step="field.step"
              :min="field.min"
              :id="`input-${item.id}-${field.key}`"
            />
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  fields: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="postcss" scoped>
table {
  width: 100%;
  th {
    font-weight: 600;
    padding: 0.5rem 1rem;
  }

  td {
    padding: 0.5rem 1rem;
  }
}

table,
th,
td {
  border: 1px solid #dee2e6;
}
</style>
