<template>
  <div
    class="grid mb-2 place-items-center"
  >
    <div
      v-if="item.green !== 'unkown'"
      class="mb-2"
      :style="{ color: `${item.isSustainable ? '#0EAD69' : '#FB3640'}` }"
    >
      {{ item.isSustainable ? 'Sustainable' : 'Not Sustainable' }}
    </div>
    <div
      class="font-bold grid mb-4 place-items-center rounded-full shadow-lg text-2xl w-9"
      :style="{ color: overallGrade.color }"
    >
      {{ overallGrade.grade }}
    </div>
    <div
      class="font-bold text-gray-500"
    >
      OVERALL
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverallSection',

  props: {
    item: {
      requird: true,
      type: Object,
    },
  },

  computed: {
    /** @type {object} */
    overallGrade() {
      return this.item.overallGrade();
    },
  },
}
</script>