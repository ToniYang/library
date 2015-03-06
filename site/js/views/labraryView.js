/**
 * Created by xie on 2015/2/17.
 */
var app = app || {};

app.labraryView = Backbone.View.extend({
    el : '#books',
    initialize : function(){
        this.collection = new app.Library();
        this.collection.fetch({reset:true});

        this.listenTo(this.collection,'reset',this.render);
        this.listenTo(this.collection,'add',this.renderBook);
    },
    events : {
        'click #add' : 'addBook'
    },
    render : function () {
        this.collection.each(function(item){
            this.renderBook(item);
        },this);
    },
    renderBook : function(item) {
        var bookView = new app.bookView({
           model : item
        });
        this.$el.append(bookView.render().el);
    },
    addBook : function(e){
        e.preventDefault();

        var formData = {};

        $('#addBook div').children('input').each(function(i,el){
            if($(el).val()!=''){
                formData[el.id] = $(el).val();
            }
        });
        this.collection.create(formData);
    }
});
