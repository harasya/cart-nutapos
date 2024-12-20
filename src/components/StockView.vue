<template>
  <div class="row align-items-center mb-3">
    <div class="col-sm-12">
      <div class="row">
        <label for="nama" class="col-sm-2 col-form-label">Nama Pelanggan</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="nama"
            v-model="data.namaPelanggan"
            class="form-control"
            aria-describedby="nama"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row align-items-center mb-3">
    <div class="col-sm-12">
      <div class="row">
        <label for="tanggal" class="col-sm-2 col-form-label">Tanggal</label>
        <div class="col-sm-4">
          <div class="row">
            <div class="col-sm-7">
              <div class="input-group">
                <DatePicker
                  v-model="date"
                  :popover="false"
                  @dayclick="
                    (_, event) => {
                      event.target.blur()
                    }
                  "
                >
                  <template #default="{ togglePopover, inputValue, inputEvents }">
                    <input
                      type="text"
                      id="tanggal"
                      class="form-control"
                      :value="dateFormat(inputValue)"
                      v-on="inputEvents"
                      aria-describedby="tanggal"
                    />
                    <span class="input-group-text" @click="() => togglePopover()">
                      <i class="bi bi-grid-3x3-gap"></i>
                    </span>
                  </template>
                </DatePicker>
              </div>
            </div>
            <label for="jam" class="col-sm-1 col-form-label">Jam</label>
            <div class="col-sm-4">
              <input
                type="time"
                id="jam"
                v-model="time"
                class="form-control"
                aria-describedby="jam"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row align-items-center mb-3">
    <div class="col-sm-12">
      <div class="row">
        <label for="item" class="col-sm-2 col-form-label">Item yang dijual</label>
        <div class="col-sm-10">
          <StockItem :fields :items>
            <template #cell(action)="{ item }">
              <button type="button" class="btn bg-body-secondary" @click="onDeleteItem(item)">
                <i class="bi bi-trash3"></i>
              </button>
            </template>
          </StockItem>
          <div class="mt-3">
            <button type="button" class="btn text-primary" @click="onAddItem">
              <i class="bi bi-plus-lg"></i> Tambah Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TotalView :items @submit="onSubmit" @cancel="onCancel" />
</template>

<script setup>
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'
import { ref, onMounted, watch, computed, reactive } from 'vue'
import { format, parse, isValid } from 'date-fns'
import StockItem from './StockItem.vue'
import { uid } from 'radash'
import TotalView from './TotalView.vue'

const date = ref(format(new Date(), 'd MMM yyyy'))
const time = ref('')

const getCurrentTime = () => {
  const now = new Date()

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  time.value = `${hours}:${minutes}`
}

onMounted(() => {
  getCurrentTime()
})

const fields = ref([
  {
    key: 'item',
    label: 'Item',
    tag: 'input',
    type: 'text',
  },
  {
    key: 'qty',
    label: 'Qty',
    tag: 'input',
    type: 'number',
    step: '0.01',
    min: 0,
  },
  {
    key: 'harga',
    label: 'Harga Satuan',
    tag: 'input',
    type: 'number',
    step: '0.01',
    min: 0,
  },
  {
    key: 'total',
    label: 'Sub Total',
    tag: 'input',
    type: 'number',
    disabled: true,
    step: '0.01',
    min: 0,
  },
  {
    key: 'action',
  },
])

const items = ref([])
const data = reactive({
  namaPelanggan: '',
  total: 0,
  bayar: 0,
  kembali: 0,
})

const payload = computed(() => {
  return {
    NamaPelanggan: data.namaPelanggan,
    Tanggal: format(date.value, 'd MMM yyyy'),
    Jam: time.value,
    Total: data.total,
    BayarTunai: data.bayar,
    Kembali: data.kembali,
    DetailPenjualan: items.value.map((item) => ({
      Item: item.item,
      Qty: item.qty,
      HargaSatuan: item.harga,
      SubTotal: item.total,
    })),
  }
})

const onSubmit = (item) => {
  Object.assign(data, item)

  alert(JSON.stringify(payload.value, null, 2))
}

const onCancel = () => {
  Object.assign(data, {
    namaPelanggan: '',
    total: 0,
    bayar: 0,
    kembali: 0,
  })
}

const onAddItem = () => {
  items.value.push({
    id: uid(items.value.length),
    item: '',
    qty: 0,
    harga: 0,
    total: 0,
  })
}

const fetchData = async () => {
  setTimeout(() => {
    items.value = [
      { id: 1, item: 'Beras', qty: 10, harga: 10000, total: 100000 },
      { id: 2, item: 'Gula', qty: 10, harga: 10000, total: 100000 },
    ]
  }, 1000)
}

watch(
  items,
  () => {
    items.value.forEach((item) => {
      item.total = item.qty * item.harga
    })
  },
  { deep: true },
)

onMounted(async () => {
  await fetchData()
})

const onDeleteItem = (item) => {
  items.value = items.value.filter((i) => i.id !== item.id)
}

const dateFormat = (item) => {
  const convertDate = isValid(item) ? parse(item, 'MM/dd/yyyy', new Date()) : new Date(item)
  if (item) return format(convertDate, 'd MMM yyyy')
}
</script>

<style lang="scss" scoped></style>
