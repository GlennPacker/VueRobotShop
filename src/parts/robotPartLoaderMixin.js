import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            'parts': 'robot/getParts'
        }),
    },
    methods: {
        ...mapActions('robot', ['loadParts'])
    },
    created () {
        this.loadParts();
    }
}