<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

defineOptions({ inheritAttrs: false });

const showPassword = ref(false);
const inputRef = useTemplateRef('inputRef');

defineExpose({
    $el: inputRef,
    focus: () => {
        const el = inputRef.value as
            | { $el?: { focus?: () => void }; focus?: () => void }
            | null;

        if (el?.focus) {
            el.focus();

            return;
        }

        el?.$el?.focus?.();
    },
});
</script>

<template>
    <UInput
        ref="inputRef"
        :type="showPassword ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
        v-bind="$attrs"
    >
        <template #trailing>
            <UTooltip
                :text="showPassword ? 'Hide password' : 'Show password'"
            >
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="
                        showPassword ? 'Hide password' : 'Show password'
                    "
                    :padded="false"
                    tabindex="-1"
                    @click="showPassword = !showPassword"
                />
            </UTooltip>
        </template>
    </UInput>
</template>
