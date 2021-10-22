const datatable = {
  template: `
  <div class="datatable">
    <div class="overflow-x-scroll">
      <table class="w-full" ref="table">
        <thead class="text-left align-bottom">
          <th v-for="column in columns">{{column}}</th>
        </thead>
        <tbody>
          <tr class="border-t border-secondary" v-for="row in table">
            <td v-for="value in _.values(row)">
              <a :href="value" target="_blank" v-if="_.split(value, ' ').length == 1 && _.startsWith(_.lowerCase(value), 'http')">{{value}}</a>
              <template v-else>{{value}}</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between items-center border-t border-secondary pt-5" v-if="options.paginate">
      <button class="btn btn-sm" :class="button" @click="previous()" :disabled="page == 1">&larr; Previous Page</button>
      <div class="text-gray text-xs">
        <div v-if="paging">Loading...</div>
        <div v-else>Page {{page}}<span v-if="numpages > 0"> of {{numpages | numbreviate}}</span></div>
      </div>
      <button class="btn btn-sm ml-3" :class="button" @click="next()" :disabled="page == numpages || table.length < this.options.limit">Next Page &rarr;</button>
    </div>
  </div>
  `,
  props: {
    count: {
      type: Number,
      default: -1
    },
    columns: Array,
    data: Array,
    head: Boolean,
    options: {
      type: Object,
      default: function () {
        return {
          paginate: true,
          pagination: 'server',
          numpages: 0,
          limit: 20
        }
      }
    },
    button: String,
    paging: Boolean
  },
  data() {
    return {
      page: 1
    }
  },
  computed: {
    table() {
      if (this.options.paginate && this.options.pagination == 'client') {
        return this.data[this.page-1]
      }
      return this.data
    },
    numpages() {
      if (this.options.pagination == 'client') {
        return this.options.numpages
      } else if (this.count > 0) {
        return Math.ceil(this.count/this.options.limit)
      } else {
        return -1
      }
    }
  },
  watch: {
    head(val) {
      if (val) {
        this.page = 1
      }
    }
  },
  methods: {
    previous() {
      if (this.options.pagination == 'server') {
        this.$emit('previous')
      }
      this.page--
    },
    next() {
      if (this.options.pagination == 'server') {
        this.$emit('next')
      }
      this.page++
    }
  }
}
