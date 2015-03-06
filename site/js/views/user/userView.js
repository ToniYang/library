/**
 * Created by xie on 2015/2/19.
 */
var app = app || {};

app.userView = Backbone.View.extend({
    template: _.template($('#user').html()),
    tagName :'tr',
    events : {
        'click .edit' : 'edit',
        'click .delete' :'deteleOne'
    },
    deteleOne : function () {
        this.model.destroy();
    },
    edit : function () {
        var userCreateView = new app.userCreateView({
            model : this.model,
            collection : this.model.collection
        });
    },
    initialize : function (){
        this.render();
        this.listenTo(this.model,'destroy',this.remove);
    },
    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});