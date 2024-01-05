import { ref } from 'vue'

interface Translations {
   [key: string]: string
}

export const useTranslate = () => {
  const translations = ref<Translations>({
    'per kg': 'кг',
  })

  const translate = (text: string | undefined) => {
    return translations.value[text] || text
  }

  return {
    translate,
  }
}
