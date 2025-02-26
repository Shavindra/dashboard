<script>
import { LabeledInput } from '@components/Form/LabeledInput';
import { Banner } from '@components/Banner';
import { Checkbox } from '@components/Form/Checkbox';
import SelectOrCreateAuthSecret from '@shell/components/form/SelectOrCreateAuthSecret';
import AdvancedSection from '@shell/components/AdvancedSection.vue';

import RegistryConfigs from './RegistryConfigs';

import RegistryMirrors from './RegistryMirrors';

export default {
  components: {
    LabeledInput,
    Banner,
    Checkbox,
    SelectOrCreateAuthSecret,
    AdvancedSection,
    RegistryConfigs,
    RegistryMirrors
  },

  props: {
    registerBeforeHook: {
      type:     Function,
      required: true,
    },

    mode: {
      type:     String,
      required: true,
    },

    value: {
      type:     Object,
      required: true,
    },

    showCustomRegistryInput: {
      type:     Boolean,
      required: true,
    },

    registryHost: {
      type:     String,
      required: false,
      default:  null
    },

    registrySecret: {
      type:     String,
      required: false,
      default:  null
    },

    showCustomRegistryAdvancedInput: {
      type:     Boolean,
      required: true,
    },

    isK3s: {
      type:     Boolean,
      required: true
    },
  }
};
</script>

<template>
  <div>
    <div class="row">
      <h3>{{ t('cluster.privateRegistry.label') }}</h3>
    </div>
    <div class="row">
      <div class="col span-12">
        <Banner
          :closable="false"
          class="cluster-tools-tip"
          color="info"
          label-key="cluster.privateRegistry.description"
        />
      </div>
    </div>
    <div class="row">
      <Checkbox
        :value="showCustomRegistryInput"
        class="mb-20"
        :label="t('cluster.privateRegistry.label')"
        @input="$emit('custom-registry-changed', $event)"
      />
    </div>
    <div
      v-if="showCustomRegistryInput"
      class="row"
    >
      <div class="col span-6">
        <LabeledInput
          :value="registryHost"
          label-key="catalog.chart.registry.custom.inputLabel"
          placeholder-key="catalog.chart.registry.custom.placeholder"
          :min-height="30"
          @input="$emit('registry-host-changed', $event)"
        />
        <SelectOrCreateAuthSecret
          v-model="registrySecret"
          :register-before-hook="registerBeforeHook"
          :hook-priority="1"
          :mode="mode"
          in-store="management"
          :allow-ssh="false"
          :allow-rke="true"
          :vertical="true"
          :namespace="value.metadata.namespace"
          generate-name="registryconfig-auth-"
          @input="$emit('registry-secret-changed', $event)"
        />
      </div>
    </div>
    <template>
      <div
        v-if="showCustomRegistryInput"
        class="row"
      >
        <AdvancedSection
          class="col span-12 advanced"
          :is-open-by-default="showCustomRegistryAdvancedInput"
          :mode="mode"
        >
          <Banner
            :closable="false"
            class="cluster-tools-tip"
            color="info"
            :label-key="isK3s ? 'cluster.privateRegistry.docsLinkK3s' : 'cluster.privateRegistry.docsLinkRke2'"
          />
          <RegistryMirrors
            v-model="value"
            class="mt-20"
            :mode="mode"
          />
          <RegistryConfigs
            v-model="value"
            class="mt-20"
            :mode="mode"
            :cluster-register-before-hook="registerBeforeHook"
            @updateConfigs="$emit('update-configs-changed', $event)"
          />
        </AdvancedSection>
      </div>
    </template>
  </div>
</template>
