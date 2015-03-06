/**
 * Created by xie on 2015/2/19.
 */
'use strict';

var app = app || {};

app.searchMissionView = Backbone.View.extend({
    el : ".main",
    template : _.template($('#searchMissionTemplate').html()),
    initialize : function () {
        this.collection = new app.missionCollection();
        /*this.collection.fetch({reset:true});*/

        this.listenTo(this.collection , 'reset', this.render);
        this.listenTo(this.collection,'sync',this.render);//todo 说是__v属性不存在
    },
    events : {
        'click #searchAll' :'searchAll',
        'click #search' :'searchByPeopleInCharge',
        'click #departMission':'createMission',
        'click #kecheng' :'show'
    },
    show :function (){
        this.collection.fetch({reset:true});
    },
    render : function(){
        this.$el.html(this.template());
        this.collection.each(function (mission) {
            this.renderMission(mission);
        },this);
        return this;
    },
    searchAll : function(){
        this.collection.fetch({reset:true});
    },
    searchByPeopleInCharge : function(){
        var name = $("#peopleInCharge").val().trim();
        this.collection.filterByPeopleInCharge(name);
        this.render();
        console.log(this.collection.size());
    },
    renderMission : function(mission){
        var missionView = new app.missionView({
            model : mission
        });
        this.$el.find('tbody').append(missionView.render().el);
    },
    createMission : function () {
        var createView = new app.missionCreateView({
            collection : this.collection
        });
    }
});