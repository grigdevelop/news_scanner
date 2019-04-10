var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        newsSources: [],
        newsLinks: []
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
        }
    }
});