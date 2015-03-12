/**
 * Created by yangyuhan on 3/10/15.
 */
'use strict';

var app = app || {};

app.appRouter = Backbone.Router.extend({
    routes :{
        "tongji" : "tongji",
        "fenpei" : "fenpei",
        "userControl" : "userControl",
        "personControl" : "personControl"
    },
    userControl : function(){
        new app.userListView();
    }
});

app.userRouter = Backbone.Router.extend({
    routes : {
        "workTask" : "workTask",
        "labNote" : "labNote",
        "workNote" : "workNote",
        "personInfo" : "personInfo"
    }
});