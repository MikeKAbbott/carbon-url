<template>
  <Popper
    arrow
    hover
    >
    <template
      #content
    >
      <div
        class="grid text-center break-all px-2"
      >
        Current Page:
        <a
          href="https://api.websitecarbon.com/"
          target="_blank"
        >
          {{ url }}
        </a>
      </div>
    </template>
  <LinkIcon />
  </Popper>
</template>
<script>
import LinkIcon from '@/icons/LinkIcon';
import Popper from "vue3-popper";

export default {
  name: 'LinkTooltipTooltip',

  components: {
    LinkIcon,
    Popper,
  },

  props: {
    url: {
      required: true,
      type: String,
    }
  }
}
</script>

<style lang="scss">
  a {
    color: #0EAD69 !important;
  }

  a:hover {
    text-decoration: underline 2px #0EAD69;
  }

  :root {
    font-weight: 700;
    --popper-theme-background-color: #ffffff;
    --popper-theme-background-color-hover: #ffffff;
    --popper-theme-text-color: #333333;
    --popper-theme-border-width: 1px;
    --popper-theme-border-style: solid;
    --popper-theme-border-color: #eeeeee;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 32px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>