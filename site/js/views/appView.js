/**
 * Created by xie on 2015/2/19.
 */
var app = app || {};
app.appView = Backbone.View.extend({
    template : _.template("<%=name%>您好，欢迎登陆页面，你的身份是<%=role%>！"),
    el : 'body',
    initialize : function(){
       this.userView =  new app.userListView();
       this.missionView =  new app.searchMissionView();
        this.getUser();
    },
    events :{
        'click #kecheng' :'showMission',
        'click #quanxian':'showUser',
        'click #exit' : 'exit'
    },
    showMission : function(){
        this.missionView.show();
    },
    showUser : function (){
        this.userView.show();
    },
    getUser : function(){
        var that = this;
        $.get('/apis/currentUser',{},undefined,'json').then(function(data){
            if(data.role === 'admin'){
                 role = "管理员";
                new app.appRouter();
                $("#insertNav").append($("#adminNav").html());
            } else {
                new app.userRouter();
                 role = "普通用户";
                $("#insertNav").append($("#userNav").html());
            }
            that.$el.find("#hello").html(that.template({
                name : data.realName,
                role : role
            }));
        });
    },
    exit : function(){
        $.get('/api/loginOut').then(function(){
           location.href ='/login.html';
        });
    }
});