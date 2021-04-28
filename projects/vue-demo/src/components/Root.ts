import { h, Prop, SetupContext } from 'vue';

function Root(prop: Prop<Record<string, any>>, ctx: SetupContext) {
  console.info('i am root');
  return h('div', ctx.attrs, ctx.slots);
}
export default Root;
