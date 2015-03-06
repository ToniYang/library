/**
 * Created by xie on 2015/2/19.
 */
var app = app || {};

app.missionView = Backbone.View.extend({
    tagName : 'tr',
    template: _.template($('#missionTemplate').html()),
    events : {
        'click .delete' : 'deleteOne',
        'dblclick' : 'edit'
    },
    initialize : function () {
        this.listenTo(this.model,'destroy',this.remove);
    },
    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    deleteOne : function(){
        this.model.destroy();
    },
    edit : function (){
        var edit = new app.missionCreateView({
            model : this.model,
            collection : this.model.collection
        });
        edit.render();
    }
});