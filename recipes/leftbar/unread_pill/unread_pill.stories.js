import { action } from '@storybook/addon-actions';
import { createTemplateFromVueFile } from '@/common/storybook_utils';
import DtRecipeUnreadPill from './unread_pill.vue';
import DtRecipeUnreadPillMdx from './unread_pill.mdx';
import DtRecipeUnreadPillDefaultTemplate from './unread_pill_default.story.vue';
import DtRecipeUnreadPillVariantsTemplate from './unread_pill_variants.story.vue';
import { UNREAD_PILL_DIRECTIONS, UNREAD_PILL_KINDS } from '@/recipes/leftbar/unread_pill/unread_pill_constants';

// Default Prop Values
export const argsData = {
  onClick: action('click'),
};

export const argTypesData = {
  // Props
  kind: {
    control: {
      type: 'select',
      options: UNREAD_PILL_KINDS,
    },
  },

  direction: {
    control: {
      type: 'select',
      options: UNREAD_PILL_DIRECTIONS,
    },
  },

  // Slots
  default: {
    table: {
      type: { summary: 'VNode' },
    },
    control: {
      type: 'text',
    },
  },

  // Action Event Handlers
  onClick: {
    table: {
      disable: true,
    },
  },

  click: {
    table: {
      type: { summary: 'event' },
    },
  },
};

const decorator = () => ({
  template: '<div class="d-w264 d-theme-sidebar-bgc d-p8"><story /></div>',
});

// Story Collection
export default {
  title: 'Recipes/leftbar/Unread Pill',
  component: DtRecipeUnreadPill,
  args: argsData,
  argTypes: argTypesData,
  decorators: [decorator],
  excludeStories: /.*Data$/,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: DtRecipeUnreadPillMdx,
    },
    options: {
      showPanel: true,
    },
  },
};

// Templates
const DefaultTemplate = (args, { argTypes }) => createTemplateFromVueFile(
  args,
  argTypes,
  DtRecipeUnreadPillDefaultTemplate,
);
const VariantsTemplate = (args, { argTypes }) => createTemplateFromVueFile(
  args,
  argTypes,
  DtRecipeUnreadPillVariantsTemplate,
);

// Stories
export const Default = DefaultTemplate.bind({});
Default.args = {
  default: 'Unread mentions',
  kind: 'mentions',
  direction: 'up',
};

export const Variants = VariantsTemplate.bind({});
Variants.args = {};
Variants.parameters = { controls: { disable: true }, actions: { disable: true }, options: { showPanel: false } };