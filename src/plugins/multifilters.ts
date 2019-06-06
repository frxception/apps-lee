class MultiFilters {
    public static updateFilters(filters: any, val: any) {
        return Object.assign({}, filters, val)
    }
    public items: any
    public filter: any
    public headers: any
    public filters: any
    public filterCallbacks: any

    constructor(items: any, filters: any, filter: any, headers: any) {
        this.items = items
        this.filter = filter
        this.headers = headers
        this.filters = filters
        this.filterCallbacks = {}
    }
    public registerFilter(filterName: any, filterCallback: any) {
        this.filterCallbacks[filterName] = filterCallback
    }

    public runFilters() {
        const self = this
        let filteredItems = self.items

        Object.entries(this.filterCallbacks).forEach(([entity, cb]) => {
            filteredItems = (cb as any).call(
                self,
                self.filters[entity],
                filteredItems
            )
        })

        return filteredItems
    }
}

const MultiFiltersPlugin = {
    install(Vue: any, options: any) {
        Vue.prototype.$MultiFilters = MultiFilters
    }
}

export default MultiFiltersPlugin
