import { createTemplateFromVueFile, getIconNames } from '@/common/storybook_utils';
import DtRecipeGroupedChip from './grouped_chip';
import DtRecipeGroupedChipMdx from './grouped_chip.mdx';
import DtRecipeGroupedChipDefaultTemplate from './grouped_chip_default.story.vue';

// Default Prop Values
export const argsData = {};

export const argTypesData = {
  // Props

  // Slots
  leftContent: {
    control: 'text',
    description: 'Slot left hand side content. Ex. ongoing call time value',
    table: {
      category: 'slots',
      type: {
        summary: 'VNode',
      },
    },
  },

  leftIcon: {
    name: 'leftIcon',
    description: 'Slot for left hand chip icon',
    table: {
      category: 'slots',
      type: {
        summary: 'VNode',
      },
    },
    control: {
      type: 'select',
      options: getIconNames(),
    },
  },

  rightContent: {
    control: 'text',
    description: 'Slot right hand side content. Ex. ongoing call hold time value',
    table: {
      category: 'slots',
      type: {
        summary: 'VNode',
      },
    },
  },

  rightIcon: {
    name: 'rightIcon',
    description: 'Slot for right hand chip icon',
    table: {
      category: 'slots',
      type: {
        summary: 'VNode',
      },
    },
    control: {
      type: 'select',
      options: getIconNames(),
    },
  },
};

// Story Collection
export default {
  title: 'Recipes/Chips/Grouped Chips',
  component: DtRecipeGroupedChip,
  args: argsData,
  argTypes: argTypesData,
  excludeStories: /.*Data$/,
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
    docs: {
      page: DtRecipeGroupedChipMdx,
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
  DtRecipeGroupedChipDefaultTemplate,
);

// Stories
export const Default = DefaultTemplate.bind({});
Default.args = {
  leftIcon: 'IconTime',
  leftContent: `<div>
    0.13
</div>`,
  rightIcon: 'IconPause',
  rightContent: `<div>
    0.25
</div>`,
};

Default.parameters = {};
