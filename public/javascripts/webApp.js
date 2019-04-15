var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        newsSources: [],
        newsLinks: [],
        state: {
            links: {
                error: false,
                message: '',
                loading: false
            }
        }
    },
    methods: {
        getSources: function(){
            var self = this;
            axios.post('/scanner/getSources')
                .then(function(response){
                    self.newsSources = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        scanSources: function(){
            var self = this;
            axios.post('/scanner/scanSources')
                .then(function(response){
                    console.log(response.data);
                    self.newsLinks = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        scanSource: function(source){
            var self = this;
            self.state.links.loading = true;
            axios.post('/scanner/scanSource',  {"source": source} )
                .then(function( response ){
                    self.newsLinks = response.data;
                })
                .catch(function( error ){
                    console.error(error);
                })
                .finally(function(){
                    self.state.links.loading = false;
                });
        }
    },
    beforeMount(){
        this.getSources();
    }
});