// initial state
const state = () => ({
    items: [
        {
            id: 1,
            officeCode: 'ABC',
            billingCode: '1A',
            description: 'This is a test service',
            uomType: 'Days',
            baseCharge: 12,
            claimType: 'Professional',
            serviceType: 'Group',
            modifiers: [
                {
                    code: 'AE - EA',
                    position: 2
                },
                {
                    code: 'AB - BA',
                    position: 1
                },
                {
                    code: 'CD - DC',
                    position: 3
                },
            ]
        },
        {
            id: 2,
            officeCode: 'XYZ',
            billingCode: '1B',
            description: 'This is another test service',
            uomType: 'Units',
            baseCharge: 5,
            claimType: 'Institutional',
            serviceType: 'Individual',
            modifiers: [
                {
                    code: 'AE - EA',
                    position: 1
                },
                {
                    code: 'AB - BA',
                    position: 2
                },
            ]
        }
    ],
    checkoutStatus: null
})

// getters
const getters = {
    services: state => {
        return state.items.slice(0)
    },
    serviceById: (state) => id => {
        return JSON.parse(JSON.stringify(state.items.find(item => +item.id === +id)))
    },
}

// actions
const actions = {
    addService({ commit }, item) {
        commit('addService', item)
    },

    updateService({ commit }, item) {
        commit('updateService', item)
    },

    deleteService({ commit }, item) {
        commit('deleteService', item)
    }
}

// mutations
const mutations = {
    addService(state, item) {
        item.id = state.items.length + 1
        state.items.push(item)
    },

    updateService(state, item) {
        const index = state.items.findIndex(f => +f.id === +item.id)
        const items = state.items;
        items[index] = item;
        state.items = [...items]
    },

    deleteService(state, item) {
        const index = state.items.indexOf(item)
        state.items.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}