<script>
import { HCI } from '../../../../../types';
import NovncConsoleWrapper from '../../../../../components/novnc/NovncConsoleWrapper.vue';
import Loading from '@shell/components/Loading';

export default {
  layout: 'blank',

  components: { NovncConsoleWrapper, Loading },

  async fetch() {
    this.rows = await this.$store.dispatch('harvester/findAll', { type: HCI.VMI });
  },

  data() {
    return { uid: this.$route.params.uid };
  },

  computed: {
    vmi() {
      const vmiList = this.$store.getters['harvester/all'](HCI.VMI) || [];

      const vmi = vmiList.find( (VMI) => {
        return VMI?.metadata?.ownerReferences?.[0]?.uid === this.uid;
      });

      return vmi;
    },
  },
  watch: {
    vmi(neu) {
      document.title = neu?.metadata?.name;
    }
  },

  mounted() {
    document.title = this.vmi?.metadata?.name;
    window.addEventListener('beforeunload', () => {
      this.$refs.console.close();
    });
  }
};
</script>

<template>
  <Loading v-if="$fetchState.pending" />
  <NovncConsoleWrapper
    v-else
    ref="console"
    v-model="vmi"
    class="novnc-wrapper"
  />
</template>

<style>
HTML, BODY, MAIN, #__nuxt, #__layout, #app, .vm-console, .vm-console > DIV, .vm-console > DIV > DIV {
  height: 100%;
}
</style>
