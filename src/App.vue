<template>

  <div class="container mx-auto mt-5 text-center text-3xl font-mono">

    <h1 class="mb-16">VUE Calculator</h1>

    <div
      class="bg-[#2D2A37] rounded-3xl p-5 text-white w-[420px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

      <input type="text" class="p-2 border-gray-300 rounded-lg" placeholder="0" v-model="display" disabled />

      <div class="grid grid-cols-4 gap-10 mt-5">
        <button v-for="btn in buttons" :key="btn.value" @click="update(btn)" :class="buttonClasses(btn)">

          {{ btn.value }}

        </button>
      </div>

    </div>

  </div>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const display = ref('0')
const lastInputType = ref(null)

const buttons = [
  { value: 'AC', type: 'clear' },
  { value: 'C', type: 'delete' },
  { value: '%', type: 'operator' },
  { value: '/', type: 'operator' },

  { value: '7', type: 'number' },
  { value: '8', type: 'number' },
  { value: '9', type: 'number' },
  { value: 'x', type: 'operator' },

  { value: '4', type: 'number' },
  { value: '5', type: 'number' },
  { value: '6', type: 'number' },
  { value: '-', type: 'operator' },

  { value: '1', type: 'number' },
  { value: '2', type: 'number' },
  { value: '3', type: 'number' },
  { value: '+', type: 'operator' },

  { value: '00', type: 'number' },
  { value: '0', type: 'number' },
  { value: '.', type: 'number' },
  { value: '=', type: 'equal' }
]

const update = (btn) => {
  if (btn.type === 'number') {
    if (lastInputType.value === 'equal') {
      display.value = btn.value 
    } else {
      display.value = display.value === '0' ? btn.value : display.value + btn.value
    }
    lastInputType.value = 'number'
  } else if (btn.type === 'operator') {
    if (lastInputType.value !== 'operator' && lastInputType.value !== 'equal') {
      display.value += ' ' + btn.value + ' '
      lastInputType.value = 'operator'
    }
  } else if (btn.type === 'clear') {
    display.value = '0'
    lastInputType.value = null
  } else if (btn.type === 'delete') {
    display.value = display.value.slice(0, -1)
    if (display.value === '' || display.value === ' ') {
      display.value = '0'
    }
  } else if (btn.type === 'equal') {
    try {
      display.value = String(eval(display.value.replace(/x/g, '*').replace(/%/g, '/100')))
      lastInputType.value = 'equal'
    } catch {
      display.value = 'Error'
    }
  }
}

const handleKeyPress = (e) => {
  const keyMap = {
    '0': { value: '0', type: 'number' },
    '1': { value: '1', type: 'number' },
    '2': { value: '2', type: 'number' },
    '3': { value: '3', type: 'number' },
    '4': { value: '4', type: 'number' },
    '5': { value: '5', type: 'number' },
    '6': { value: '6', type: 'number' },
    '7': { value: '7', type: 'number' },
    '8': { value: '8', type: 'number' },
    '9': { value: '9', type: 'number' },
    '+': { value: '+', type: 'operator' },
    '-': { value: '-', type: 'operator' },
    '*': { value: 'x', type: 'operator' },
    '/': { value: '/', type: 'operator' },
    '=': { value: '=', type: 'equal' },
    'Enter': { value: '=', type: 'equal' },
    'Backspace': { value: 'C', type: 'delete' },
    'Escape': { value: 'AC', type: 'clear' },
    '%': { value: '%', type: 'operator' }
  }

  const btn = keyMap[e.key]
  if (btn) {
    update(btn)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

const buttonClasses = (btn) => {
  let baseClasses = 'bg-[#3E3B47] text-white rounded-full p-4 text-3xl font-bold shadow-lg transition-transform transform hover:scale-105  text-center'
  if (btn.type === 'operator' || btn.type === 'equal') {
    baseClasses += ' bg-purple-700 hover:bg-purple-800'
  }
  return baseClasses
}
</script>

<style scoped></style>