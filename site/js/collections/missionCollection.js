/**
 * Created by xie on 2015/2/19.
 */
'use strict';
var app = app || {};

app.missionCollection = Backbone.Collection.extend({
    model : app.missionModel,
    url : '/api/missions',
    filterByPeopleInCharge : function(peopleInCharge){
        this.fetch();
        var clone = this.clone();
        clone.each(function (mission) {
            console.log(mission);
            if(peopleInCharge !== mission.get('peopleInCharge')){
                this.remove(mission);
            }
        },this)
    }
});