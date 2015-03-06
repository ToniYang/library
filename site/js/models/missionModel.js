/**
 * Created by xie on 2015/2/19.
 */
var app = app || {};

app.missionModel = Backbone.Model.extend({
    default:{
        missionName :'',
        startDate :'',
        endDate:'',
        peopleInCharge:'',
        missionInstruction:''
    },
    initialize : function(){
        this.idAttribute = '_id';
    },
    url : function(){
        var base =
            _.result(this, 'urlRoot') ||
            _.result(this.collection, 'url') ||
            urlError();
        if (this.isNew()) return base;
        return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.get(this.idAttribute));
    }
});