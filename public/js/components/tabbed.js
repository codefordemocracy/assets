const tabbed = {
  tabs: {
    template: `
      <div ref="tabs" class="border-b border-secondary tabs">
        <div class="flex overflow-x-scroll border-l border-r border-secondary" :class="{'lg:border-r-0': !fill}">
          <div v-for="(tab, index) in tabs" @click="select(tab)" class="py-2 px-3 cursor-pointer text-xs border border-r-0 border-secondary bg-light text-center flex-1" :class="{'tab-active border-b-0 bg-white': tab.active, 'lg:flex-0': !fill, 'border-l-0': index == 0}">
            {{tab.name}}
          </div>
          <div class="bg-light border-l border-b border-secondary flex-grow hidden lg:block" v-if="!fill"></div>
        </div>
        <div class="tab-content bg-white border-l border-r border-secondary" :class="overflow ? 'overflow-visible' : 'overflow-auto'">
          <slot></slot>
        </div>
      </div>
    `,
    props: {
      fill: {
        type: Boolean,
        default: false
      },
      overflow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tabs: []
      }
    },
    created() {
      this.tabs = this.$children
    },
    methods: {
      select(selected) {
        if (selected.placeholder) {
          this.$emit('placeholder')
        } else {
          this.tabs.forEach(tab => {
            tab.active = (tab.name == selected.name);
          })
        }
        this.$emit('change', selected.name)
      }
    }
  },
  tab: {
    template: `
      <div v-show="active"><slot></slot></div>
    `,
    props: {
      name: {
        type: String,
        required: true
      },
      selected: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: false
      }
    },
    mounted() {
      this.active = this.selected;
    }
  }
}
