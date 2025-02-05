import { required, maxValue, minValue } from '@/rules/fieldRules'

export const useValidationRules = () => {
  const durationRules = [required, maxValue(60), minValue(10)]
  const wdywRules = [required]
  const bgmRules = [required]
  return {
    durationRules,
    wdywRules,
    bgmRules,
  }
}
