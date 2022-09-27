<script>
export default {
  props: {
    time: Date,
  },
  setup(props) {
    return () => `${props.time.getFullYear()} / ${props.time.getMonth() + 1} / ${props.time.getDate()}`;
  },
};
</script>
