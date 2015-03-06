/**
 * Created by xie on 2015/2/19.
 */
'use strict';

var app = app || {};

app.userCollection = Backbone.Collection.extend({
    model : app.userModel,
    url : '/api/users'
});