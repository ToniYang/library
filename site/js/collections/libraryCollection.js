/**
 * Created by xie on 2015/2/17.
 */
var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book,
    url : '/api/books'
});