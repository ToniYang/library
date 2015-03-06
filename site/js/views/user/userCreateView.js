/**
 * Created by xie on 2015/2/19.
 */
'use strict';
var app = app || {};

app.userCreateView = Backbone.View.extend({
    template : _.template($('#createUserTemplate').html()),
    initialize : function () {
      this.render();
    },
    events : {
        'click #addOk' : 'addOne'
    },
    addOne : function () {
        if(this.model){
            var nmodel = this.getModel();
            this.model.set('userName',nmodel.userName);
            this.model.set('realName',nmodel.realName);
            this.model.set('password',nmodel.password);
            this.model.set('role',nmodel.role);
            this.model.set('sex',nmodel.sex);
            this.model.set('telphone',nmodel.telphone);
            this.model.set('phone',nmodel.phone);
            this.model.set('email',nmodel.email);
            this.model.set('group',nmodel.group);
            this.model.set('note',nmodel.note);
            this.model.save();
        } else {
            this.collection.create(this.getModel());
        }
        this.remove();
        $("#createMission").hide();
        $('#addUser').click();
    },
    getModel : function () {
        return {
            userName : $('.userName').val().trim(),
            realName :$('.realName').val().trim(),
            password :$('.password').val().trim(),
            role :$('.role').val().trim(),
            sex : $('.sex').val().trim(),
            telphone : $('.telphone').val().trim(),
            phone :$('.phone').val().trim(),
            email :$('.email').val().trim(),
            group :$('.group').val().trim(),
            note :$('.note').val().trim()
        }
    },
    render : function(){
        if(this.model) {
            this.$el.html(this.template(this.model.toJSON()));
        } else {
            var userMock = new app.userModel({
                userName : '',
                realName :'',
                password :'',
                role :'',
                sex : '',
                telphone : '',
                phone :'',
                email :'',
                group :'',
                note :''
            });
            this.$el.html(this.template(userMock.toJSON()));
        }
        $("#createMission").html(this.el);
        return this;
    }
});
