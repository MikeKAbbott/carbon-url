<template>
  <div
    class="header-section grid mb-2 place-items-center py-4 px-4"
  >
    <h2
      class="font-bold mb-1 mr-2 text-xl text-white"
    >
      Carbon URL
    </h2>
    <div
      class="gap-3 grid grid-cols-2 mb-2"
    >
      <LinkTooltip
        :url="tabUrl"
      />
      <PoweredByTooltip />
    </div>
    <small
      class="text-center text-white"
    >
      Test Real Time Carbon Emissions Per Page View
    </small>
  </div>
</template>

<script>
import LinkTooltip from '@/components/LinkTooltip';
import PoweredByTooltip from '@/components/PoweredByTooltip';

export default {
  name: 'Header',

  components: {
    LinkTooltip,
    PoweredByTooltip,
  },

  props: {
    tabUrl: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss">
.header-section {
  background-color: #0EAD69;
}
</style>