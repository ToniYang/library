/**
 * Created by xie on 2015/2/19.
 */
'use strict';

var app = app || {};

app.userListView = Backbone.View.extend({
    el : '.main',
    template : _.template($('#userTabel').html()),
    initialize : function(){
        this.collection = new app.userCollection();
        /*this.collection.fetch({reset:true});*/
        this.listenTo(this.collection,'reset',this.render);
        this.listenTo(this.collection,'sync',this.render);
    },
    events : {
        'click #addUser':'addOne'
    },
    show :function (){
        this.collection.fetch({reset:true});
    },
    render : function (){
        this.$el.html(this.template());
        this.collection.each(function(temp){
            this.renderOne(temp);
        },this);
    },
    renderOne : function (temp){
        var userView = new app.userView({
            model:temp
        });
        this.$el.find("tbody").append(userView.el);
    },
    addOne : function(){
        var userCreateView = new app.userCreateView({
            collection : this.collection
        });
    }
});