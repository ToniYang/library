/**
 * Created by xie on 2015/2/19.
 */
'use strict';

var app = app || {};

app.missionCreateView = Backbone.View.extend({
    template : _.template($("#createMissionTemplate").html()),
    events : {
        'click #ok': 'addOne'
    },
    initialize : function () {
        this.render();
    },
    render : function(){
        if(this.model){
            this.$el.html(this.template(this.model.toJSON()));
        } else {
            var mission = new app.missionModel({
                missionName :'',
                startDate :'',
                endDate:'',
                peopleInCharge:'',
                missionInstruction:''
            });
            this.$el.html(this.template(mission.toJSON()));
        }
        $("#createMission").html(this.el);
        return this;
    },
    getModel : function(){
        return {
            missionName : $('#missionName').val().trim(),
            startDate :$('#missionStartTime').val().trim(),
            endDate:$("#missionStartTime").val().trim(),
            peopleInCharge:$('#missionPeopleInCharge').val().trim(),
            missionInstruction:$('#missionInstruction').val().trim()
        }
    },
    addOne : function(){
        if(this.model){
            var nmodel = this.getModel();
            this.model.set('missionName',nmodel.missionName);
            this.model.set('startDate',nmodel.startDate);
            this.model.set('endDate',nmodel.endDate);
            this.model.set('peopleInCharge',nmodel.peopleInCharge);
            this.model.set('missionInstruction',nmodel.missionInstruction);
            this.model.save();
        }else {
            this.collection.create(this.getModel());
        }
        this.remove();
        $("#createMission").hide();
        $('#departMission').click();
    }
});