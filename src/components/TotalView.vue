<template>
  <div class="row align-items-center mb-3">
    <div class="col-sm-6 offset-sm-6">
      <div class="row justify-content-end">
        <label for="total" class="col-sm-2 col-form-label text-end">Total</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="total"
            class="form-control"
            aria-describedby="total"
            :value="total"
            disabled
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row align-items-center mb-3">
    <div class="col-sm-6 offset-sm-6">
      <div class="row justify-content-end">
        <label for="tunai" class="col-sm-2 col-form-label text-end">Bayar Tunai</label>
        <div class="col-sm-4">
          <input
            type="text"
            autocomplete="off"
            id="tunai"
            :class="{ 'is-invalid': bayar < total }"
            class="form-control"
            @focus="onFocus"
            @blur="onBlur"
            aria-describedby="tunai"
            v-model="bayar"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row align-items-center mb-3">
    <div class="col-sm-6 offset-sm-6">
      <div class="row justify-content-end">
        <label for="kembali" class="col-sm-2 col-form-label text-end">Kembali</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="kembali"
            class="form-control"
            aria-describedby="kembali"
            :value="kembali"
            disabled
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row align-items-center mb-3">
    <div class="col-sm-6 offset-sm-6 text-end">
      <button type="button" class="btn btn-secondary me-3" @click="onCancel">Cancel</button>
      <button type="button" class="btn btn-primary" @click="onSubmit">Simpan</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onFocus, onBlur } from '../composable/helper'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['submit'])

const total = computed(() => {
  return props.items.reduce((total, item) => {
    return total + item.qty * item.harga
  }, 0)
})

const bayar = ref(0)

const kembali = computed(() => {
  if (bayar.value === 0) return 0
  return bayar.value - total.value
})

const onSubmit = () => {
  emit('submit', {
    bayar: bayar.value,
    kembali: kembali.value,
    total: total.value,
  })
}
</script>

<style lang="postcss" scoped>
.is-invalid {
  border-color: red;
}
</style>
