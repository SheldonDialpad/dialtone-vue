import sinon from 'sinon';
import { assert } from 'chai';
import { mount, createLocalVue } from '@vue/test-utils';
import DtCombobox from './combobox.vue';

// Constants
const basePropsData = {
  listAriaLabel: '',
  listId: 'list',
  showList: true,
};

describe('Dialtone Vue Combobox tests', function () {
  // Wrappers
  let wrapper;
  let inputWrapper;
  let input;
  let listWrapper;

  // Test Environment
  let propsData;
  let attrs;
  let scopedSlots;
  let slots;
  let listeners;
  let selectStub;
  let escapeStub;
  let highlightStub;

  // Helpers
  const _setChildWrappers = () => {
    inputWrapper = wrapper.find('[data-qa="dt-combobox-input-wrapper"]');
    input = wrapper.find('input');
    listWrapper = wrapper.find('[data-qa="dt-combobox-list-wrapper"]');
  };

  const _mountWrapper = () => {
    wrapper = mount(DtCombobox, {
      propsData,
      attrs,
      slots,
      scopedSlots,
      listeners,
      localVue: this.localVue,
    });
  };

  // Test Setup
  before(function () {
    this.localVue = createLocalVue();
  });

  beforeEach(function () {
    propsData = basePropsData;
    selectStub = sinon.stub();
    escapeStub = sinon.stub();
    highlightStub = sinon.stub();
    listeners = { select: selectStub, escape: escapeStub, highlight: highlightStub };
    _mountWrapper();
    _setChildWrappers();
  });

  // Test Teardown
  afterEach(function () {
    propsData = basePropsData;
    slots = {};
    scopedSlots = {};
  });

  describe('Presentation Tests', function () {
    it('should render the component', function () { assert.exists(wrapper, 'wrapper exists'); });

    describe('When a input is provided', function () {
      // Test Setup
      beforeEach(async function () {
        scopedSlots = { input: '<input v-bind="props.inputProps" />' };
        _mountWrapper();
        _setChildWrappers();
      });

      it('should render the input wrapper', function () { assert.isTrue(inputWrapper.exists()); });
      it('should render the input', function () { assert.isTrue(wrapper.find('input').exists()); });
    });

    describe('When a list is provided', function () {
      // Test Setup
      beforeEach(async function () {
        scopedSlots = { list: '<ol id="list"></ol>' };
        _mountWrapper();
        _setChildWrappers();
      });

      it('should render the list wrapper', function () { assert.isTrue(listWrapper.exists()); });
      it('should render the list', function () { assert.isTrue(wrapper.find('#list').exists()); });
    });
  });

  describe('Accessibility Tests', function () {
    describe('When a input is provided', function () {
      // Test Setup
      beforeEach(async function () {
        scopedSlots = { input: '<input v-bind="props.inputProps" />' };
        _mountWrapper();
        _setChildWrappers();
      });

      describe('When list is not expanded', function () {
        beforeEach(async function () {
          await wrapper.setProps({ showList: false });
        });

        it('aria-expanded should be "false"', function () {
          assert.isTrue(input.attributes('aria-expanded') === 'false');
        });
      });

      describe('When list is expanded', function () {
        beforeEach(async function () {
          await wrapper.setProps({ showList: true });
        });

        it('aria-expanded should be "true"', function () {
          assert.isTrue(input.attributes('aria-expanded') === 'true');
        });
      });
    });
  });

  describe('Interactivity Tests', function () {
    // Test Setup
    beforeEach(async function () {
      slots = { list: '<ol id="list"><li role="option">item1</li><li role="option">item2</li></ol>' };
      _mountWrapper();
      _setChildWrappers();
    });

    describe('When "Enter" key is pressed but no item is highlighted', function () {
      beforeEach(async function () {
        await wrapper.setData({ highlightIndex: -1 });
        await wrapper.trigger('keydown.enter');
      });

      it('should not call listener', function () { assert.isFalse(selectStub.called); });
      it('should not emit select event', function () { assert.isUndefined(wrapper.emitted().select); });
    });

    describe('When "Enter" key is pressed and item is highlighted', function () {
      beforeEach(async function () {
        await wrapper.setData({ highlightIndex: 1 });
        await wrapper.trigger('keydown.enter');
      });

      it('should call listener', function () { assert.isTrue(selectStub.called); });
      it('should emit select event', function () { assert.equal(wrapper.emitted().select.length, 1); });
    });

    describe('When "Enter" key is pressed with another key and item is highlighted', function () {
      beforeEach(async function () {
        await wrapper.setData({ highlightIndex: 1 });
        await wrapper.trigger('keydown.shift.enter');
      });

      it('should not call listener', function () { assert.isFalse(selectStub.called); });
      it('should not emit select event', function () { assert.isUndefined(wrapper.emitted().select); });
    });

    describe('When "Esc" key is pressed', function () {
      beforeEach(async function () {
        await wrapper.trigger('keydown.esc');
      });

      it('should call listener', function () { assert.isTrue(escapeStub.called); });
      it('should emit escape event', function () { assert.equal(wrapper.emitted().escape.length, 1); });
    });

    describe('When the highlightIndex changes', function () {
      beforeEach(async function () {
        wrapper.vm.setHighlightIndex(1);
        await wrapper.vm.$nextTick();
      });

      it('should call listener', function () { assert.isTrue(highlightStub.called); });
      it('should emit highlight event', function () { assert.equal(wrapper.emitted().highlight.length, 1); });
    });

    describe('When mouseleave is detected on the list wrapper', function () {
      // Test Setup
      beforeEach(async function () {
        await listWrapper.trigger('mouseleave');
      });

      it('should reset the highlightIndex', function () { assert.equal(wrapper.vm.highlightIndex, -1); });
    });

    describe('When focusout is detected on the list wrapper', function () {
      // Test Setup
      beforeEach(async function () {
        await listWrapper.trigger('focusout');
      });

      it('should reset the highlightIndex', function () { assert.equal(wrapper.vm.highlightIndex, -1); });
    });
  });
});