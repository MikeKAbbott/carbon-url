<template>
  <div>
    <div
      class="mb-2 text-gray-500"
    >
      {{ item.text }}
    </div>
    <div
      class="flex items-center"
    >
      <div
        class="w-80 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-5"
      >
        <div
          class="h-2.5 rounded-full"
          :style="{ backgroundColor: '#0EAD69', width: item.progress }" 
        />
      </div>
      <Popper
        arrow
        hover
      >
        <template
          #content
        >
          <div
            class="grid text-center break-normal px-2"
          >
            {{ item.tooltip }}
          </div>
      </template>
      <div
        class="font-bold text-lg rounded-full shadow-lg w-8 grid justify-items-center cursor-default"
        :style="{ color: item.grade.color }"
      >
        {{ item.grade.grade }}
      </div>
    </Popper>
    </div>
  </div>
</template>

<script>
import Popper from "vue3-popper";

export default {
  name: 'StatsCard',

  components: {
    Popper,
  },

  props: {
    item: {
      required: true,
      type: Object,
    },
  },
}
</script>