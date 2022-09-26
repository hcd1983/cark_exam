import { onMounted, onBeforeUnmount } from 'vue';

const handleClickOutSide = (elRef, onClickOutside) => {
  if (!elRef) return;
  const handler = (e) => {
    const el = elRef.value;
    if (!el) return;
    if (!el.contains(e.target)) {
      if (typeof onClickOutside === 'function') {
        onClickOutside();
      }
    }
  };
  onMounted(() => {
    window.addEventListener('click', handler);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', handler);
  });
};

export default handleClickOutSide;
