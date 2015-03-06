/**
 * Created by xie on 2015/2/19.
 */
'use strict';

var app = app || {};

app.userModel = Backbone.Model.extend({
    default: {
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