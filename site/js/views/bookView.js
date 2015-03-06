/**
 * Created by xie on 2015/2/17.
 */
var app = app || {};

app.bookView = Backbone.View.extend({
    tagName : 'div',
    className : 'bookContainer',
    template: _.template($('#bookTemplate').html()),

    events:{
        'click .delete' : 'deleteOneBook'
    },

    render :function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    deleteOneBook : function(){
        this.model.destroy();
        this.remove();
    }
});