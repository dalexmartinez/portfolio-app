<script setup lang="ts">
import { ref, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import { useTransitions } from '@/composables/useTransitions'

const container = ref<HTMLElement | null>(null)
const { zoomIn } = useTransitions()

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const form = ref({
  name: '',
  email: '',
  type: '',
  subject: '',
  message: ''
})

const contactTypes = [
  'Design Project',
  'Development Project',
  'UI / UX',
  'Collaboration',
  'General'
]

const isSubmitting = ref(false)
const submitted = ref(false)
const error = ref('')

onMounted(() => {
  if (container.value) zoomIn(container.value, () => {})
})

async function handleSubmit() {
  if (!form.value.name || !form.value.email || !form.value.type || !form.value.message) {
    error.value = 'Please fill in all required fields.'
    return
  }
  error.value = ''
  isSubmitting.value = true

  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        name: form.value.name,
        from_email: form.value.email,
        type: form.value.type.replace(' / ', '-'),
        subject: form.value.subject || '—',
        message: form.value.message
      },
      PUBLIC_KEY
    )
    submitted.value = true
  } catch (e) {
    error.value = 'Something went wrong. Please try again or email me directly.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div ref="container" class="min-h-screen bg-background pt-[54px]">

    <!-- Header -->
    <div class="px-7 py-12 border-b border-border">
      <div class="font-display font-semibold text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
        Contact
      </div>
      <h1 class="font-display font-semibold text-[30px] uppercase tracking-tight leading-none text-foreground">
        Let's work together
      </h1>
    </div>

    <!-- Body -->
    <div class="grid grid-cols-[1fr_280px] gap-12 px-7 py-10">

      <!-- Left — Form -->
      <div>

        <!-- Success state -->
        <div v-if="submitted" class="flex flex-col gap-4 py-10">
          <div class="font-display font-semibold text-[22px] text-foreground">Message sent.</div>
          <p class="font-sans font-light text-[13px] text-muted-foreground">
            Thanks for reaching out — I'll get back to you as soon as possible.
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-5">

          <!-- Name + Email -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                Name <span class="text-foreground/40">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="bg-muted border border-border rounded-md px-3 py-2 font-sans text-[12px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors bg-input-bg text-input-text placeholder:text-input-placeholder"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                Email <span class="text-foreground/40">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                class="bg-muted border border-border rounded-md px-3 py-2 font-sans text-[12px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors bg-input-bg text-input-text placeholder:text-input-placeholder"
              />
            </div>
          </div>

          <!-- Type + Subject -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                Type <span class="text-foreground/40">*</span>
              </label>
              <select
                v-model="form.type"
                class="bg-muted border border-border rounded-md px-3 py-2 font-sans text-[12px] text-foreground focus:outline-none focus:border-foreground/30 transition-colors bg-input-bg text-input-text"
              >
                <option value="" disabled>Select type</option>
                <option v-for="type in contactTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                Subject <span class="text-foreground/30 normal-case tracking-normal">(optional)</span>
              </label>
              <input
                v-model="form.subject"
                type="text"
                placeholder="e.g. Product Catalog Redesign"
                class="bg-muted border border-border rounded-md px-3 py-2 font-sans text-[12px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors bg-input-bg text-input-textº placeholder:text-input-placeholder"
              />
            </div>
          </div>

          <!-- Message -->
          <div class="flex flex-col gap-2">
            <label class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
              Message <span class="text-foreground/40">*</span>
            </label>
            <textarea
              v-model="form.message"
              rows="6"
              placeholder="Tell me about your project..."
              class="bg-muted border border-border rounded-md px-3 py-2 font-sans text-[12px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors resize-none bg-input-bg text-input-text"
            ></textarea>
          </div>

          <!-- Error -->
          <p v-if="error" class="font-sans text-[11px] text-destructive">{{ error }}</p>

          <!-- Submit -->
          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="font-display font-semibold text-[11px] uppercase tracking-widest text-foreground border border-foreground/30 px-6 py-3 rounded-full hover:bg-foreground/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </div>

        </form>
      </div>

      <!-- Right — Info -->
      <div class="flex flex-col gap-6 pt-2">
        <div>
          <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-3">Email</div>
          <a href="mailto:your@email.com" class="font-sans text-[13px] text-foreground/70 hover:text-foreground transition-colors no-underline">
            your@email.com
          </a>
        </div>
        <div class="h-px bg-border"></div>
        <div>
          <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-3">Links</div>
          <div class="flex flex-col gap-2">
            <a href="https://behance.net/kheiron" target="_blank" rel="noopener noreferrer"
              class="font-sans text-[12px] text-foreground/70 hover:text-foreground transition-colors no-underline">
              Behance ↗
            </a>
            <a href="https://github.com/dalexmartinez" target="_blank" rel="noopener noreferrer"
              class="font-sans text-[12px] text-foreground/70 hover:text-foreground transition-colors no-underline">
              GitHub ↗
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer"
              class="font-sans text-[12px] text-foreground/70 hover:text-foreground transition-colors no-underline">
              LinkedIn ↗
            </a>
          </div>
        </div>
        <div class="h-px bg-border"></div>
        <div>
          <div class="font-sans text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-2">Location</div>
          <div class="font-sans text-[12px] text-foreground/70">Mexico City, MX</div>
        </div>
      </div>

    </div>
  </div>
</template>