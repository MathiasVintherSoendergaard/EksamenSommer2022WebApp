const baseurl = "https://mvseksamensommer2022restapi.azurewebsites.net/api/cyclists"

const app = Vue.createApp({
    data() {
        return {
            cyclists: [],
            newCyclist: {"id":0,"name":"","yearOfBirth":0},
            addMessage: null,
            getId: 0,
            gottenCyclist: {"id":0,"name":"","yearOfBirth":0},
            deleteId: 0,
            deletedCyclist: {"id":0,"name":"","yearOfBirth":0},
            deleteMessage: null,
            latestBirthYear: 0
        }
    },
    created(){
        this.getAllCyclists(baseurl)
    },
    methods: {
        async getAllCyclists(url){
            try {
                const response = await axios.get(url)
                this.cyclists = response.data
                console.log(this.cyclists)
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async addCyclist(){
            try {
                const response = await axios.post(baseurl, this.newCyclist)
                this.getAllCyclists(baseurl)
                this.addMessage = "Cyclist added"
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async getCyclistById(){
            const url = baseurl + "/" + this.getId
            try {
                const response = await axios.get(url)
                this.gottenCyclist = response.data
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async deleteCyclist(){
            const url = baseurl + "/" + this.deleteId
            try {
                const response = await axios.delete(url)
                this.deletedCyclist = response.data
                this.deleteMessage = "Nedenstående cyklist er slettet"
                this.getAllCyclists(baseurl)
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async filterList(){
            const url = baseurl + "?year=" + this.latestBirthYear
            try {
                this.getAllCyclists(url)
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        sortListAsc() {
            this.cyclists.sort((cyclist1, cyclist2) => cyclist1.yearOfBirth - cyclist2.yearOfBirth)
        },
        sortListDesc() {
            this.cyclists.sort((cyclist1, cyclist2) => cyclist2.yearOfBirth - cyclist1.yearOfBirth)
        },
        sortById(){
            this.cyclists.sort((cyclist1, cyclist2) => cyclist1.id - cyclist2.id)
        }
    }
}).mount('#app')