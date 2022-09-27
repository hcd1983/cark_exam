<script>
import { toRefs, computed } from 'vue';

export default {
  name: 'Pagination',
  props: {
    totalItems: Number,
    perPage: Number,
    current: Number,
  },
  setup(props, ctx) {
    const { totalItems, perPage, current } = toRefs(props);
    const slotProps = computed(() => {
      const totalPages = Math.ceil(totalItems.value / perPage.value);
      const nextPage = current.value < totalPages ? current.value + 1 : null;
      const prevPage = current.value > 1 ? current.value - 1 : null;
      return {
        totalPages,
        current,
        totalItems,
        nextPage,
        prevPage,
      };
    });
    console.log({ ...slotProps });
    return () => ctx.slots.default?.(slotProps.value) ?? '';
  },
};
</script>
