/**
 * Created by xie on 2015/2/17.
 */
var app = app || {};

app.Book = Backbone.Model.extend({
    defaults: {
        coverImage : 'img/book.jpg',
        title :'',
        author:'',
        releaseDate :'',
        keywords: '',
        idAttribute : '_id'
    }
});